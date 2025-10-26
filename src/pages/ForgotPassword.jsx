import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Shield, ArrowLeft, Mail } from 'lucide-react'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await resetPassword(email)
      if (error) {
        toast.error(error.message)
      } else {
        setEmailSent(true)
        toast.success('Password reset email sent!')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sealia-green to-sealia-deep flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Mail className="h-12 w-12 text-white" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-white font-poppins">
              Check Your Email
            </h2>
            <p className="mt-2 text-sm text-white/80">
              We've sent a password reset link to {email}
            </p>
          </div>

          <div className="card">
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Click the link in your email to reset your password. The link will expire in 1 hour.
              </p>
              <div className="space-y-2">
                <Link to="/login" className="btn-primary w-full">
                  Back to Login
                </Link>
                <button
                  onClick={() => setEmailSent(false)}
                  className="text-sealia-deep hover:text-sealia-green text-sm font-medium"
                >
                  Try different email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sealia-green to-sealia-deep flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-white font-poppins">
            Forgot Password?
          </h2>
          <p className="mt-2 text-sm text-white/80">
            No worries, we'll send you reset instructions
          </p>
        </div>

        <div className="card">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sealia-deep focus:border-sealia-deep"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>

            <div className="text-center">
              <Link to="/login" className="flex items-center justify-center text-sealia-deep hover:text-sealia-green text-sm font-medium">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
