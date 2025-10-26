import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Shield, Eye, EyeOff, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [visibleElements, setVisibleElements] = useState(new Set())
  const elementsRef = useRef({})
  const { signIn } = useAuth()
  const navigate = useNavigate()

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await signIn(email, password)
      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Welcome back!')
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navigation />

      {/* Large Shield Background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10">
        <Shield className="w-full h-full text-sealia-green" />
      </div>


      {/* Welcome Section */}
      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome</h1>
            <p className="text-xl text-gray-400">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div 
            ref={el => elementsRef.current['form'] = el}
            className={`bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 transition-all duration-700 animate-border-shine ${
              visibleElements.has('form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative z-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sealia-green focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sealia-green focus:border-transparent transition-all duration-300"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-sealia-green transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex items-center justify-end">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-sealia-green hover:text-sealia-green/80 transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full group relative px-6 py-3 bg-sealia-green text-black font-bold rounded-xl hover:bg-sealia-green/90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                  >
                    <span className="flex items-center justify-center relative z-10">
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-button-shine transition-opacity duration-300"></div>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      className="font-medium text-sealia-green hover:text-sealia-green/80 transition-colors"
                    >
                      Create one now
                    </Link>
                  </p>
                </div>

                {/* Back to Homepage Link */}
                <div className="text-center pt-4">
                  <Link 
                    to="/" 
                    className="flex items-center justify-center space-x-2 text-gray-400 hover:text-sealia-green transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Homepage</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
