import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import toast from 'react-hot-toast'

const TestPasswordReset = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rlozykcakmbrnfjfjqhe.supabase.co'
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsb3p5a2Nha21icm5mamZqcWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwODQwMzMsImV4cCI6MjA3NjY2MDAzM30.4eVxu9YIgAwBuKhT7c_U61eGd2X4BQqb4KckFVvf6_g'
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('Sending password reset for:', email)
      console.log('Redirect URL:', `${window.location.origin}/reset-password`)
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) {
        console.error('Password reset error:', error)
        toast.error(`Error: ${error.message}`)
      } else {
        console.log('Password reset email sent successfully')
        toast.success('Password reset email sent! Check your email.')
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleCheckAuth = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      console.log('Current user:', user)
      console.log('Auth error:', error)
      
      if (user) {
        toast.success(`Authenticated as: ${user.email}`)
      } else {
        toast.error('Not authenticated')
      }
    } catch (error) {
      console.error('Auth check error:', error)
      toast.error('Error checking auth')
    }
  }

  const handleCheckURL = () => {
    console.log('Current URL:', window.location.href)
    console.log('URL hash:', window.location.hash)
    console.log('URL search:', window.location.search)
    
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const searchParams = new URLSearchParams(window.location.search)
    
    console.log('Hash params:', Object.fromEntries(hashParams))
    console.log('Search params:', Object.fromEntries(searchParams))
    
    toast.success('URL details logged to console')
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Password Reset Test</h1>
        
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-sealia-green text-black font-semibold rounded-lg disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>

        <div className="mt-8 space-y-4">
          <button
            onClick={handleCheckAuth}
            className="w-full py-2 bg-blue-600 text-white rounded-lg"
          >
            Check Current Auth
          </button>
          
          <button
            onClick={handleCheckURL}
            className="w-full py-2 bg-purple-600 text-white rounded-lg"
          >
            Check URL Parameters
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <p className="text-sm text-gray-300">
            Supabase URL: {supabaseUrl}
          </p>
          <p className="text-sm text-gray-300">
            Redirect URL: {window.location.origin}/reset-password
          </p>
        </div>
      </div>
    </div>
  )
}

export default TestPasswordReset
