import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Lock, CheckCircle, ArrowLeft, Eye, EyeOff, XCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { resetPassword } = useAuth()
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [linkError, setLinkError] = useState(null)
  const [scrollY, setScrollY] = useState(0)
  const [visibleElements, setVisibleElements] = useState(new Set())
  const elementsRef = useRef({})

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Check which elements are in view
      Object.keys(elementsRef.current).forEach(key => {
        const element = elementsRef.current[key]
        if (element) {
          const rect = element.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0
          setVisibleElements(prev => {
            const newSet = new Set(prev)
            if (isVisible) {
              newSet.add(key)
            }
            return newSet
          })
        }
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check for URL errors on page load
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const error = hashParams.get('error')
    const errorDescription = hashParams.get('error_description')
    
    if (error) {
      setLinkError({
        error,
        description: errorDescription
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      // Import Supabase client
      const { createClient } = await import('@supabase/supabase-js')
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rlozykcakmbrnfjfjqhe.supabase.co'
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsb3p5a2Nha21icm5mamZqcWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwODQwMzMsImV4cCI6MjA3NjY2MDAzM30.4eVxu9YIgAwBuKhT7c_U61eGd2X4BQqb4KckFVvf6_g'
      
      const supabase = createClient(supabaseUrl, supabaseAnonKey)

      // Check for error in URL hash first
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const urlError = hashParams.get('error')
      const errorDescription = hashParams.get('error_description')
      
      if (urlError) {
        console.error('URL Error:', urlError, errorDescription)
        toast.error(`Reset link error: ${errorDescription || urlError}`)
        return
      }

      // Check if user is already authenticated (from the reset link)
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        // If not authenticated, try to get tokens from URL hash
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        
        if (!accessToken) {
          toast.error('Invalid or expired reset link. Please request a new password reset.')
          return
        }

        // Set session with tokens from URL
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        })

        if (sessionError) {
          console.error('Session error:', sessionError)
          toast.error('Invalid or expired reset link')
          return
        }
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.password
      })

      if (updateError) {
        console.error('Update password error:', updateError)
        toast.error(updateError.message)
        return
      }

      toast.success('Password updated successfully!')
      navigate('/login')
    } catch (error) {
      console.error('Password reset error:', error)
      toast.error('Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navigation />

      {/* Large Lock Background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10">
        <Lock className="w-full h-full text-sealia-green" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div 
            ref={el => elementsRef.current['header'] = el}
            className={`text-center mb-8 transition-all duration-1000 ${
              visibleElements.has('header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sealia-green/20 rounded-full mb-6">
              <Lock className="w-8 h-8 text-sealia-green" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Reset Password
            </h1>
            <p className="text-gray-300">
              Enter your new password below
            </p>
          </div>

          {/* Error Display */}
          {linkError && (
            <div 
              ref={el => elementsRef.current['error'] = el}
              className={`bg-red-900/20 border border-red-500 rounded-2xl p-6 mb-8 transition-all duration-1000 delay-200 ${
                visibleElements.has('error') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center mb-4">
                <XCircle className="w-6 h-6 text-red-400 mr-3" />
                <h3 className="text-lg font-semibold text-red-400">Reset Link Error</h3>
              </div>
              <p className="text-red-300 mb-4">
                {linkError.description || linkError.error}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/forgot-password')}
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Request New Reset Link
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 border border-red-500 text-red-400 font-semibold rounded-lg hover:bg-red-500/10 transition-colors"
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form 
            ref={el => elementsRef.current['form'] = el}
            onSubmit={handleSubmit}
            className={`bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 transition-all duration-1000 delay-200 ${
              visibleElements.has('form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="space-y-6">
              {/* New Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-sealia-green transition-colors pr-12"
                    placeholder="Enter new password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Password must be at least 6 characters
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-sealia-green transition-colors pr-12"
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || formData.password !== formData.confirmPassword}
                className="w-full py-3 bg-sealia-green text-black font-semibold rounded-lg hover:bg-sealia-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                    Updating Password...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Update Password
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Back to Login */}
          <div 
            ref={el => elementsRef.current['back'] = el}
            className={`text-center mt-6 transition-all duration-1000 delay-400 ${
              visibleElements.has('back') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link 
              to="/login" 
              className="inline-flex items-center text-sealia-green hover:text-sealia-green/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ResetPassword
