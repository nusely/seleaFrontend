import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Mail, CheckCircle, XCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const EmailVerification = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const { resendVerification } = useAuth()
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

  // Get email from URL params or localStorage
  useEffect(() => {
    const emailParam = searchParams.get('email')
    const storedEmail = localStorage.getItem('pending_verification_email')
    const verified = searchParams.get('verified')
    
    if (emailParam) {
      setEmail(emailParam)
    } else if (storedEmail) {
      setEmail(storedEmail)
    }

    // Check if user is coming from email verification
    if (verified === 'true') {
      toast.success('Email verified successfully! You can now sign in.')
      // Clear the stored email
      localStorage.removeItem('pending_verification_email')
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }
  }, [searchParams, navigate])

  const handleResendVerification = async () => {
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setResendLoading(true)
    try {
      const { error } = await resendVerification(email)
      if (error) {
        toast.error(error.message || 'Failed to resend verification email')
      } else {
        toast.success('Verification email sent!')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to resend verification email')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navigation />

      {/* Large Mail Background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10">
        <Mail className="w-full h-full text-sealia-green" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div 
            ref={el => elementsRef.current['header'] = el}
            className={`text-center mb-12 transition-all duration-1000 ${
              visibleElements.has('header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-sealia-green/20 rounded-full mb-6">
              <Mail className="w-10 h-10 text-sealia-green" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Verify Your Email
            </h1>
            <p className="text-xl text-gray-300">
              We've sent a verification link to your email address
            </p>
          </div>

          {/* Email Display */}
          {email && (
            <div 
              ref={el => elementsRef.current['email-display'] = el}
              className={`bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-8 transition-all duration-1000 delay-200 ${
                visibleElements.has('email-display') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-sealia-green" />
                <span className="text-gray-300">Verification email sent to:</span>
                <span className="font-semibold text-white">{email}</span>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div 
            ref={el => elementsRef.current['instructions'] = el}
            className={`bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8 transition-all duration-1000 delay-400 ${
              visibleElements.has('instructions') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 text-sealia-green mr-3" />
              Next Steps
            </h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sealia-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sealia-green text-sm font-bold">1</span>
                </div>
                <p>Check your email inbox for a message from Sealia</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sealia-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sealia-green text-sm font-bold">2</span>
                </div>
                <p>Click the verification link in the email</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sealia-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sealia-green text-sm font-bold">3</span>
                </div>
                <p>You'll be redirected back to Sealia to complete your registration</p>
              </div>
            </div>
          </div>

          {/* Resend Section */}
          <div 
            ref={el => elementsRef.current['resend'] = el}
            className={`bg-gray-900/20 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-8 transition-all duration-1000 delay-600 ${
              visibleElements.has('resend') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <RefreshCw className="w-5 h-5 text-sealia-green mr-3" />
              Didn't receive the email?
            </h3>
            <p className="text-gray-300 mb-4">
              Check your spam folder or resend the verification email
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-sealia-green transition-colors"
              />
              <button
                onClick={handleResendVerification}
                disabled={resendLoading || !email}
                className="px-6 py-3 bg-sealia-green text-black font-semibold rounded-lg hover:bg-sealia-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {resendLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend Email
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Back to Login */}
          <div 
            ref={el => elementsRef.current['back'] = el}
            className={`text-center transition-all duration-1000 delay-800 ${
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

export default EmailVerification
