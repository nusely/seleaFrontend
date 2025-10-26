import { createContext, useContext, useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { authService } from '../services/supabaseApiService.js'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rlozykcakmbrnfjfjqhe.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsb3p5a2Nha21icm5mamZqcWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwODQwMzMsImV4cCI6MjA3NjY2MDAzM30.4eVxu9YIgAwBuKhT7c_U61eGd2X4BQqb4KckFVvf6_g'

// Validate Supabase configuration
if (!supabaseUrl || supabaseUrl === 'your_supabase_url') {
  console.error('❌ VITE_SUPABASE_URL is not configured properly')
}

if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key') {
  console.error('❌ VITE_SUPABASE_ANON_KEY is not configured properly')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const AuthContext = createContext({})

// Debounce mechanism to prevent multiple simultaneous profile fetches
let profileFetchTimeout = null
let isProfileFetching = false

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session from Supabase
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          setLoading(false)
          return
        }

        if (session?.user) {
          console.log('👤 Initial session user found:', session.user.email)
          setUser(session.user)
          // Use debounced profile fetch to prevent multiple simultaneous calls
          debouncedFetchProfile(session.user.id)
        } else {
          console.log('❌ No initial session found')
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, session?.user?.email)
        if (session?.user) {
          setUser(session.user)
          // Use debounced profile fetch to prevent multiple simultaneous calls
          debouncedFetchProfile(session.user.id)
        } else {
          setUser(null)
          setUserProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])


  const signUp = async (email, password, metadata) => {
    try {
      // First check if user already exists in auth but not in public.users
      // If so, clean up the orphaned auth user first
      try {
        const { data: existingAuthUser } = await supabase.auth.admin.getUserByEmail(email)
        if (existingAuthUser?.user) {
          console.log('🔄 Found existing auth user, checking if orphaned...')
          
          // Check if user exists in public.users
          const { data: existingUser, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('id', existingAuthUser.user.id)
            .single()
          
          // If user doesn't exist in public.users, delete from auth
          if (userError || !existingUser) {
            console.log('🧹 Cleaning up orphaned auth user...')
            await supabase.auth.admin.deleteUser(existingAuthUser.user.id)
            console.log('✅ Orphaned auth user cleaned up')
          }
        }
      } catch (cleanupError) {
        console.log('ℹ️ No existing auth user found or cleanup not needed')
      }

      // Use Supabase's built-in signUp method with proper metadata for the trigger
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: `${metadata.firstName} ${metadata.lastName}`,
            full_name: `${metadata.firstName} ${metadata.lastName}`,
            first_name: metadata.firstName,
            last_name: metadata.lastName,
            business_name: metadata.businessName || null,
            sector: metadata.sector,
            phone: metadata.phone,
            city: metadata.city,
            state: metadata.state,
            country: metadata.country,
            preferred_contact: metadata.preferredContact,
            role: 'business_owner',
            verification_method: 'fingerprint',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language.split('-')[0] || 'en'
          }
        }
      })

      if (error) {
        return { data: null, error: { message: error.message } }
      }

      // Wait a moment for the trigger to execute
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Check if user was created in users table, if not create manually
      if (data.user) {
        try {
          const { data: existingUser, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('id', data.user.id)
            .single()

          if (userError || !existingUser) {
            console.log('🔄 Trigger failed, creating user manually...')
            
            // Create user record manually
            const { error: insertError } = await supabase
              .from('users')
              .insert({
                id: data.user.id,
                email: data.user.email,
                full_name: `${metadata.firstName} ${metadata.lastName}`,
                first_name: metadata.firstName,
                last_name: metadata.lastName,
                business_name: metadata.businessName || null,
                sector: metadata.sector,
                phone: metadata.phone,
                city: metadata.city,
                state: metadata.state,
                country: metadata.country,
                preferred_contact: metadata.preferredContact,
                verification_method: 'fingerprint',
                role: 'business_owner',
                status: 'active',
                email_verified: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })

            if (insertError) {
              console.error('❌ Error creating user manually:', insertError)
              // Don't fail the signup, just log the error
            } else {
              console.log('✅ User created manually successfully')
            }
          } else {
            console.log('✅ User already exists in users table')
          }
        } catch (manualError) {
          console.error('❌ Error checking/creating user:', manualError)
          // Don't fail the signup
        }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: error.message } }
    }
  }

  const signIn = async (email, password) => {
    try {
      // Use Supabase's built-in signIn method
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        return { data: null, error: { message: error.message } }
      }

      // The onAuthStateChange listener will handle setting user and userProfile
      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: error.message } }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      // The onAuthStateChange listener will handle clearing user and userProfile
      return { error: null }
    } catch (error) {
      return { error: { message: error.message } }
    }
  }

  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      
      if (error) {
        return { data: null, error: { message: error.message } }
      }
      
      return { data: { message: 'Password reset email sent' }, error: null }
    } catch (error) {
      return { data: null, error: { message: error.message } }
    }
  }

  const resendVerification = async (email) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      })
      
      if (error) {
        return { data: null, error: { message: error.message } }
      }
      
      return { data: { message: 'Verification email sent' }, error: null }
    } catch (error) {
      return { data: null, error: { message: error.message } }
    }
  }

  // Fetch user profile from users table
  const fetchUserProfileFromDB = async (userId) => {
    try {
      console.log('🔍 Fetching user profile for ID:', userId)
      
      // Try to fetch from users table
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('❌ Error fetching user profile:', error)
        
        // If RLS blocks access, create a basic profile from auth user data
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser) {
          console.log('🔄 Creating basic profile from auth data')
          return {
            id: authUser.id,
            email: authUser.email,
            name: authUser.user_metadata?.name || authUser.email,
            first_name: authUser.user_metadata?.first_name || authUser.email.split('@')[0],
            last_name: authUser.user_metadata?.last_name || '',
            role: 'business_owner'
          }
        }
        return null
      }

      console.log('✅ User profile fetched:', data)
      return data
    } catch (error) {
      console.error('❌ Error fetching user profile:', error)
      
      // Fallback to basic profile
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (authUser) {
          console.log('🔄 Creating fallback profile from auth data')
          return {
            id: authUser.id,
            email: authUser.email,
            name: authUser.user_metadata?.name || authUser.email,
            first_name: authUser.user_metadata?.first_name || authUser.email.split('@')[0],
            last_name: authUser.user_metadata?.last_name || '',
            role: 'business_owner'
          }
        }
      } catch (fallbackError) {
        console.error('❌ Fallback error:', fallbackError)
      }
      
      return null
    }
  }

  const debouncedFetchProfile = (userId) => {
    // Clear any existing timeout
    if (profileFetchTimeout) {
      clearTimeout(profileFetchTimeout)
    }

    // If already fetching, don't start another fetch
    if (isProfileFetching) {
      console.log('⏳ Profile fetch already in progress, skipping...')
      return
    }

    profileFetchTimeout = setTimeout(async () => {
      isProfileFetching = true
      try {
        const profile = await fetchUserProfileFromDB(userId)
        if (profile) {
          setUserProfile(profile)
        }
      } catch (error) {
        console.error('❌ Debounced profile fetch failed:', error)
        // Set basic profile to prevent infinite loading
        setUserProfile({
          id: userId,
          email: user?.email || '',
          name: user?.user_metadata?.name || user?.email || '',
          first_name: user?.user_metadata?.first_name || user?.email?.split('@')[0] || '',
          last_name: user?.user_metadata?.last_name || '',
          role: 'business_owner'
        })
      } finally {
        isProfileFetching = false
      }
    }, 500) // 500ms debounce
  }

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    resendVerification,
    fetchUserProfileFromDB
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
