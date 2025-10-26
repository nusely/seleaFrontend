import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Fingerprint, Shield, Smartphone, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const Onboarding = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [verificationMethod, setVerificationMethod] = useState('')
  const [loading, setLoading] = useState(false)
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

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const verificationOptions = [
    {
      id: 'fingerprint',
      name: 'Fingerprint',
      description: 'Use your device fingerprint sensor for quick and secure signing',
      icon: Fingerprint,
      features: ['Fastest signing', 'Highest security', 'Device-based']
    },
    {
      id: 'face-id',
      name: 'Face ID',
      description: 'Use facial recognition for convenient and secure document signing',
      icon: Smartphone,
      features: ['Hands-free signing', 'Advanced security', 'Biometric authentication']
    },
    {
      id: 'password',
      name: 'Password Only',
      description: 'Use a secure password for document signing (less secure)',
      icon: Shield,
      features: ['Simple setup', 'Universal compatibility', 'Password-based']
    }
  ]

  const handleVerificationSelect = (method) => {
    setVerificationMethod(method)
  }

  const handleNext = () => {
    if (currentStep === 1) {
      if (!verificationMethod) {
        toast.error('Please select a verification method')
        return
      }
      setCurrentStep(2)
    } else if (currentStep === 2) {
      handleComplete()
    }
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      // TODO: Update user's verification method in database
      // For now, just store in localStorage
      localStorage.setItem('user_verification_method', verificationMethod)
      
      toast.success('Onboarding completed! Welcome to Sealia.')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Failed to complete onboarding')
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    navigate('/dashboard')
  }

  if (!user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navigation />

      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-sealia-green/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-sealia-green/5 rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div 
            ref={el => elementsRef.current['progress'] = el}
            className={`mb-12 transition-all duration-1000 ${
              visibleElements.has('progress') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-300">Step {currentStep} of 2</span>
              <span className="text-sm text-gray-400">{Math.round((currentStep / 2) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-sealia-green h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: Verification Method Selection */}
          {currentStep === 1 && (
            <div 
              ref={el => elementsRef.current['step1'] = el}
              className={`transition-all duration-1000 delay-200 ${
                visibleElements.has('step1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Choose Your Verification Method
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Select how you'd like to sign documents. This can be changed anytime in your settings.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {verificationOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <div
                      key={option.id}
                      onClick={() => handleVerificationSelect(option.id)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        verificationMethod === option.id
                          ? 'border-sealia-green bg-sealia-green/10'
                          : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                          verificationMethod === option.id ? 'bg-sealia-green/20' : 'bg-gray-800'
                        }`}>
                          <Icon className={`w-8 h-8 ${
                            verificationMethod === option.id ? 'text-sealia-green' : 'text-gray-400'
                          }`} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{option.name}</h3>
                        <p className="text-gray-400 mb-4">{option.description}</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {option.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-sealia-green mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 2: Confirmation */}
          {currentStep === 2 && (
            <div 
              ref={el => elementsRef.current['step2'] = el}
              className={`transition-all duration-1000 delay-200 ${
                visibleElements.has('step2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Almost Ready!
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  You're all set up. You can change your verification method anytime in settings.
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-center">Your Setup Summary</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-700">
                      <span className="text-gray-300">Verification Method:</span>
                      <span className="text-white font-medium">
                        {verificationOptions.find(opt => opt.id === verificationMethod)?.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-700">
                      <span className="text-gray-300">Account Type:</span>
                      <span className="text-white font-medium">Business Owner</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-gray-300">Email:</span>
                      <span className="text-white font-medium">{user.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div 
            ref={el => elementsRef.current['navigation'] = el}
            className={`flex justify-between mt-12 transition-all duration-1000 delay-400 ${
              visibleElements.has('navigation') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate('/dashboard')}
              className="flex items-center px-6 py-3 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {currentStep > 1 ? 'Back' : 'Skip for now'}
            </button>

            <button
              onClick={handleNext}
              disabled={loading || (currentStep === 1 && !verificationMethod)}
              className="flex items-center px-8 py-3 bg-sealia-green text-black font-semibold rounded-xl hover:bg-sealia-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                  Completing...
                </>
              ) : (
                <>
                  {currentStep === 2 ? 'Complete Setup' : 'Continue'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Onboarding