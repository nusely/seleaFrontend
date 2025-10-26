import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Shield, Eye, EyeOff, Mail, Lock, User, Building, Phone, MapPin, ArrowLeft, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

// Animation Components (only for login)
import DigitalSigningJourney from '../components/auth/DigitalSigningJourney'
import VerifiedContractShowcase from '../components/auth/VerifiedContractShowcase'
import AgreementMorphing from '../components/auth/AgreementMorphing'
import SigningMiniGame from '../components/auth/SigningMiniGame'

const EnhancedAuth = ({ mode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(mode === 'login')
  const [showPassword, setShowPassword] = useState(false)
  const [selectedAnimation, setSelectedAnimation] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    sector: ''
  })
  const [loading, setLoading] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  // Randomly select animation on component mount (only for login)
  useEffect(() => {
    if (isLogin) {
      const animations = ['showcase', 'morphing', 'game']
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)]
      setSelectedAnimation(randomAnimation)
    } else {
      setSelectedAnimation(null)
    }
  }, [isLogin])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    setCurrentStep(prev => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const resetSteps = () => {
    setCurrentStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isLogin) {
      setLoading(true)
      try {
        const result = await signIn(formData.email, formData.password)
        if (result.error) {
          toast.error(result.error.message || 'Login failed')
          return
        }
        toast.success('Welcome back!')
        navigate('/dashboard')
      } catch (error) {
        console.error('Auth error:', error)
        toast.error(error.message || 'Authentication failed')
      } finally {
        setLoading(false)
      }
    } else {
      // For signup, handle step navigation
      if (currentStep < 4) {
        nextStep()
      } else {
        // Final step - submit signup
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match')
          return
        }
        
        setLoading(true)
        try {
          const result = await signUp(
            formData.email, 
            formData.password,
            {
              first_name: formData.firstName,
              last_name: formData.lastName,
              business_name: formData.businessName,
              phone: formData.phone,
              city: formData.city,
              state: formData.state,
              country: formData.country,
              sector_id: formData.sector
            }
          )
          if (result.error) {
            toast.error(result.error.message || 'Signup failed')
            return
          }
          toast.success('Account created! Please check your email to verify.')
          navigate('/email-verification')
        } catch (error) {
          console.error('Auth error:', error)
          toast.error(error.message || 'Authentication failed')
        } finally {
          setLoading(false)
        }
      }
    }
  }

  const renderAnimation = () => {
    if (!isLogin || !selectedAnimation) return null
    
    const props = {
      formData,
      onGameComplete: setGameCompleted,
      gameCompleted
    }

    switch (selectedAnimation) {
      case 'showcase':
        return <VerifiedContractShowcase {...props} />
      case 'morphing':
        return <AgreementMorphing {...props} />
      case 'game':
        return <SigningMiniGame {...props} />
      default:
        return <VerifiedContractShowcase {...props} />
    }
  }

  // Dynamic positioning based on animation type
  const getLoginBoxPosition = () => {
    switch (selectedAnimation) {
      case 'morphing': // Document draft autocompleting
        return 'pl-2 pr-10' // Shift further left
      case 'showcase': // Contract showcase
        return 'pl-2 pr-10' // Shift further left
      case 'journey': // Timeline experience
        return 'pl-2 pr-10' // Shift further left
      case 'game': // Signing mini game
        return 'pl-2 pr-10' // Shift further left
      default:
        return 'pl-2 pr-10' // Default shifted left
    }
  }

  const getStepTitle = () => {
    if (isLogin) return 'Welcome Back'
    switch (currentStep) {
      case 1: return 'Personal Information'
      case 2: return 'Contact Details'
      case 3: return 'Location & Business'
      case 4: return 'Security Setup'
      default: return 'Create Account'
    }
  }

  const getStepDescription = () => {
    if (isLogin) return 'Sign in to your secure dashboard'
    switch (currentStep) {
      case 1: return 'Tell us about yourself'
      case 2: return 'How can we reach you?'
      case 3: return 'Where is your business located?'
      case 4: return 'Create a secure password'
      default: return 'Join thousands of businesses securing their agreements via WhatsApp'
    }
  }

  return (
    <div className="h-screen bg-[#10131A] flex overflow-hidden">
      {/* Left Panel - Animation (60%) - Only for login */}
      {isLogin && (
        <div className="w-3/5 relative overflow-hidden pl-8 pr-4">
          <div className="absolute inset-0 bg-[#10131A]">
            {/* Subtle dot pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #A7E3B5 1px, transparent 0)',
                backgroundSize: '20px 20px'
              }}></div>
            </div>
          </div>
          
          {/* Sealia Branding */}
          <div className="absolute top-8 left-8 z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sealia-mint to-sealia-green rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-sealia-forest" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Sealia</h1>
                <p className="text-sealia-mint text-sm">Secure Digital Agreements</p>
              </div>
            </div>
          </div>

          {/* Animation Container */}
          <div className="flex items-center justify-center h-full px-12">
            {renderAnimation()}
          </div>

          {/* Legal Tech Badge */}
          <div className="absolute bottom-8 left-8">
            <div className="flex items-center space-x-2 text-sealia-mint">
              <div className="w-2 h-2 bg-sealia-mint rounded-full"></div>
              <span className="text-sm font-medium">Enterprise-Grade Security</span>
            </div>
          </div>
        </div>
      )}

      {/* Right Panel - Auth Form */}
      <div className={`${isLogin ? 'w-2/5' : 'w-full'} bg-[#10131A] flex items-center justify-center ${isLogin ? getLoginBoxPosition() : ''}`}>
        {/* Floating Form Container */}
        <div className="w-full max-w-md bg-[#1a1f2e] rounded-2xl border border-sealia-mint/20 shadow-2xl shadow-sealia-mint/10 p-6 max-h-[90vh] overflow-y-auto">
          {/* Form Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              {getStepTitle()}
            </h2>
            <p className="text-sealia-mint">
              {getStepDescription()}
            </p>
            
            {/* Step Progress for Signup */}
            {!isLogin && (
              <div className="mt-4">
                <div className="flex items-center justify-center space-x-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= currentStep 
                          ? 'bg-sealia-mint text-sealia-forest' 
                          : 'bg-gray-600 text-gray-400'
                      }`}>
                        {step}
                      </div>
                      {step < 4 && (
                        <div className={`w-8 h-0.5 mx-2 ${
                          step < currentStep ? 'bg-sealia-mint' : 'bg-gray-600'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isLogin ? (
              // Login Form
              <>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sealia-mint" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-[#10131A] border border-sealia-mint/30 text-white rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-sealia-mint focus:shadow-lg focus:shadow-sealia-mint/25"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sealia-mint" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-12 py-3 bg-[#10131A] border border-sealia-mint/30 text-white rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-sealia-mint focus:shadow-lg focus:shadow-sealia-mint/25"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sealia-mint hover:text-sealia-green"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Multi-step Signup Form
              <>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sealia-mint" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-[#10131A] border border-sealia-mint/30 text-white rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-sealia-mint focus:shadow-lg focus:shadow-sealia-mint/25"
                            placeholder="John"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Last Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sealia-mint" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-[#10131A] border border-sealia-mint/30 text-white rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-sealia-mint focus:shadow-lg focus:shadow-sealia-mint/25"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Business Name *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sealia-mint" />
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-[#10131A] border border-sealia-mint/30 text-white rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-sealia-mint focus:shadow-lg focus:shadow-sealia-mint/25"
                          placeholder="Your Company Inc."
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === 2 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sealia-mint" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-[#10131A] border border-sealia-mint/30 text-white rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-sealia-mint focus:shadow-lg focus:shadow-sealia-mint/25"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sealia-mint" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-[#10131A] border border-sealia-mint/30 text-white rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-sealia-mint focus:shadow-lg focus:shadow-sealia-mint/25"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3: Location Information */}
                {currentStep === 3 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          City *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sealia-mint" />
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-[#10131A] border border-sealia-mint/30 text-white rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-sealia-mint focus:shadow-lg focus:shadow-sealia-mint/25"
                            placeholder="New York"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          State *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sealia-mint" />
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-[#10131A] border border-sealia-mint/30 text-white rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-sealia-mint focus:shadow-lg focus:shadow-sealia-mint/25"
                            placeholder="NY"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Country *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sealia-mint" />
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-[#10131A] border border-sealia-mint/30 text-white rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-sealia-mint focus:shadow-lg focus:shadow-sealia-mint/25"
                          placeholder="United States"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Business Sector *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sealia-mint" />
                        <select
                          name="sector"
                          value={formData.sector}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-[#10131A] border border-sealia-mint/30 text-white rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-sealia-mint focus:shadow-lg focus:shadow-sealia-mint/25"
                        >
                          <option value="">Select your sector</option>
                          <option value="1">Technology</option>
                          <option value="2">Healthcare</option>
                          <option value="3">Finance</option>
                          <option value="4">Education</option>
                          <option value="5">Other</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 4: Security Information */}
                {currentStep === 4 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sealia-mint" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-12 py-3 bg-[#10131A] border border-sealia-mint/30 text-white rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-sealia-mint focus:shadow-lg focus:shadow-sealia-mint/25"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sealia-mint hover:text-sealia-green"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sealia-mint" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-[#10131A] border border-sealia-mint/30 text-white rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-sealia-mint focus:shadow-lg focus:shadow-sealia-mint/25"
                          placeholder="Confirm your password"
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Navigation Buttons for Signup */}
            {!isLogin && (
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 px-4 py-2 text-sealia-mint hover:text-sealia-green disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2 bg-gradient-to-r from-sealia-mint to-sealia-green text-sealia-forest font-semibold py-2 px-6 rounded-lg hover:from-sealia-green hover:to-sealia-mint disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-sealia-mint/25"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sealia-forest"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>{currentStep === 4 ? 'Create Account' : 'Next'}</span>
                      {currentStep < 4 && <ArrowRight className="w-4 h-4" />}
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Submit Button for Login */}
            {isLogin && (
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-sealia-mint to-sealia-green text-sealia-forest font-semibold py-3 px-6 rounded-lg hover:from-sealia-green hover:to-sealia-mint disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-sealia-mint/25"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-sealia-forest mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            )}

            {/* Toggle between login/signup */}
            <div className="text-center">
              <p className="text-sealia-mint">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin)
                    resetSteps()
                  }}
                  className="ml-2 text-sealia-mint hover:text-sealia-green font-medium hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            {/* Terms and Privacy for Signup */}
            {!isLogin && currentStep === 4 && (
              <div className="text-center text-sm text-sealia-mint">
                <p>
                  By creating an account, you agree to our{' '}
                  <Link to="/terms" target="_blank" className="text-sealia-green hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" target="_blank" className="text-sealia-green hover:underline">
                    Privacy Policy
                  </Link>
                </p>
                <p className="mt-2 text-xs text-sealia-mint/70">
                  Note: Captcha verification will be implemented in production
                </p>
              </div>
            )}

            {/* Back to Homepage Link */}
            <div className="text-center mt-6">
              <Link 
                to="/" 
                className="text-sealia-mint hover:text-sealia-green text-sm font-medium hover:underline"
              >
                ← Back to Homepage
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EnhancedAuth