import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Shield, Eye, EyeOff, Mail, Phone, User, Building, MapPin, Fingerprint, ArrowRight, ArrowLeft, CheckCircle, Globe, Lock, Zap, Crown } from 'lucide-react'
import toast from 'react-hot-toast'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import superAdminApiService from '../services/superAdminApiService'

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    sector: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
    country: '',
    preferredContact: '',
    acceptTerms: false,
    selectedPlan: 'Free',
    billingCycle: 'monthly'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [sectors, setSectors] = useState([])
  const [sectorsLoading, setSectorsLoading] = useState(true)
  const elementsRef = useRef({})
  const { signUp, user } = useAuth()
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

  // Fetch sectors on component mount
  useEffect(() => {
    const fetchSectors = async () => {
      try {
        setSectorsLoading(true)
        const response = await fetch('http://localhost:5000/api/sectors')
        if (response.ok) {
          const data = await response.json()
          setSectors(data.sectors || [])
        } else {
          console.error('Failed to fetch sectors')
          // Fallback to default sectors if API fails
          setSectors([
            { id: '1', name: 'Photography' },
            { id: '2', name: 'Web Development' },
            { id: '3', name: 'Graphic Design' },
            { id: '4', name: 'Consulting' },
            { id: '5', name: 'Writing' },
            { id: '6', name: 'Marketing' },
            { id: 'other', name: 'Other' }
          ])
        }
      } catch (error) {
        console.error('Error fetching sectors:', error)
        // Fallback to default sectors
        setSectors([
          { id: '1', name: 'Photography' },
          { id: '2', name: 'Web Development' },
          { id: '3', name: 'Graphic Design' },
          { id: '4', name: 'Consulting' },
          { id: '5', name: 'Writing' },
          { id: '6', name: 'Marketing' },
          { id: 'other', name: 'Other' }
        ])
      } finally {
        setSectorsLoading(false)
      }
    }

    fetchSectors()
  }, [])

  const totalSteps = 5

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.firstName.trim() !== '' && formData.lastName.trim() !== '' && formData.sector !== ''
      case 2:
        return formData.email.trim() !== '' && formData.phone.trim() !== '' && formData.preferredContact !== ''
      case 3:
        return formData.city.trim() !== '' && formData.state.trim() !== '' && formData.country !== ''
      case 4:
        return formData.password.length >= 6 && formData.password === formData.confirmPassword && formData.acceptTerms
      case 5:
        return formData.selectedPlan !== ''
      default:
        return false
    }
  }

  const initiatePayment = async (plan, billingCycle) => {
    try {
      // Get plan pricing
      const plans = {
        'Starter': { monthly: 29, yearly: 290 },
        'Pro': { monthly: 79, yearly: 790 },
        'Business': { monthly: 199, yearly: 1990 },
        'Enterprise': { monthly: 499, yearly: 4990 }
      }

      const amount = plans[plan]?.[billingCycle] || 0
      if (amount === 0) {
        toast.error('Invalid plan selected')
        return
      }

      // Initialize payment with Paystack
      const response = await superAdminApiService.initializePayment({
        email: formData.email,
        amount: amount * 100, // Convert to kobo/pesewas
        currency: 'GHS',
        planId: plan,
        planName: plan,
        billingCycle: billingCycle
      })

      if (response.success && response.data?.authorization_url) {
        // Redirect to Paystack payment page
        window.location.href = response.data.authorization_url
      } else {
        toast.error('Failed to initialize payment. Please try again.')
      }
    } catch (error) {
      console.error('Payment initialization error:', error)
      toast.error('Failed to initialize payment. Please try again.')
    }
  }

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

    if (!formData.acceptTerms) {
      toast.error('Please accept the terms and conditions')
      return
    }

    if (!formData.selectedPlan) {
      toast.error('Please select a plan')
      return
    }

    setLoading(true)

    try {
      // First create the user account
      const { error } = await signUp(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        businessName: formData.businessName,
        sector: formData.sector,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        preferredContact: formData.preferredContact,
        selectedPlan: formData.selectedPlan,
        billingCycle: formData.billingCycle
      })
      
      if (error) {
        toast.error(error.message)
      } else {
        // Store email and plan info for verification page
        localStorage.setItem('pending_verification_email', formData.email)
        localStorage.setItem('pending_plan', JSON.stringify({
          plan: formData.selectedPlan,
          billingCycle: formData.billingCycle
        }))
        
        if (formData.selectedPlan === 'Free') {
          // For free plan, create subscription directly and redirect to email verification
          try {
            // Create free subscription
            const response = await fetch('http://localhost:5000/api/super-admin/subscriptions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                plan_name: 'Free',
                billing_cycle: 'monthly',
                status: 'active'
              })
            });
            
            toast.success('Free account created! Please check your email to verify your account.')
            navigate('/email-verification')
          } catch (error) {
            console.error('Error creating free subscription:', error);
            toast.success('Account created! Please check your email to verify your account.')
            navigate('/email-verification')
          }
        } else {
          // For paid plans, initiate payment
          toast.success('Account created! Initiating payment...')
          await initiatePayment(formData.selectedPlan, formData.billingCycle)
        }
      }
    } catch (error) {
      console.error('Signup error:', error)
      toast.error(error?.message || 'An unexpected error occurred')
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome</h1>
            <p className="text-xl text-gray-400">Create your account</p>
          </div>

          {/* Registration Form */}
          <div 
            ref={el => elementsRef.current['form'] = el}
            className={`bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 transition-all duration-700 animate-border-shine ${
              visibleElements.has('form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative z-10">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-300">Step {currentStep} of {totalSteps}</span>
                  <span className="text-sm text-gray-400">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-sealia-green h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Let's get to know you</h3>
                      <p className="text-gray-400">Tell us a bit about yourself</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                          First Name <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sealia-green focus:border-transparent transition-all duration-300"
                            placeholder="Enter your first name"
                          />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="lastName"
                            name="lastName"
                          type="text"
                          required
                            value={formData.lastName}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sealia-green focus:border-transparent transition-all duration-300"
                            placeholder="Enter your last name"
                        />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-2">
                        Business Name (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="businessName"
                          name="businessName"
                          type="text"
                          value={formData.businessName}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sealia-green focus:border-transparent transition-all duration-300"
                          placeholder="Enter your business name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="sector" className="block text-sm font-medium text-gray-300 mb-2">
                        Business Sector <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="sector"
                          name="sector"
                          required
                          value={formData.sector}
                          onChange={handleChange}
                          disabled={sectorsLoading}
                          className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sealia-green focus:border-transparent transition-all duration-300 disabled:opacity-50"
                        >
                          <option value="">
                            {sectorsLoading ? 'Loading sectors...' : 'Select your business sector'}
                          </option>
                          {sectors.map((sector) => (
                            <option key={sector.id} value={sector.id}>
                              {sector.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {sectorsLoading && (
                        <p className="mt-2 text-sm text-gray-400">
                          Loading available sectors...
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Contact Information</h3>
                      <p className="text-gray-400">How can we reach you?</p>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address <span className="text-red-400">*</span>
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
                          value={formData.email}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sealia-green focus:border-transparent transition-all duration-300"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sealia-green focus:border-transparent transition-all duration-300"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Contact Method <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="preferredContact"
                          name="preferredContact"
                          required
                          value={formData.preferredContact}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sealia-green focus:border-transparent transition-all duration-300"
                        >
                          <option value="">How would you like to be contacted?</option>
                          <option value="email">Email</option>
                          <option value="phone">Phone Call</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="sms">SMS</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Location Information</h3>
                      <p className="text-gray-400">Where are you located?</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
                          City <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="city"
                            name="city"
                            type="text"
                          required
                            value={formData.city}
                          onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sealia-green focus:border-transparent transition-all duration-300"
                            placeholder="Enter your city"
                          />
                      </div>
                    </div>

                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-2">
                          State/Province <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="state"
                            name="state"
                            type="text"
                          required
                            value={formData.state}
                          onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sealia-green focus:border-transparent transition-all duration-300"
                            placeholder="Enter your state/province"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">
                        Country <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Globe className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="country"
                          name="country"
                          required
                          value={formData.country}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sealia-green focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Select your country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="IT">Italy</option>
                          <option value="ES">Spain</option>
                          <option value="NL">Netherlands</option>
                          <option value="SE">Sweden</option>
                          <option value="NO">Norway</option>
                          <option value="DK">Denmark</option>
                          <option value="FI">Finland</option>
                          <option value="CH">Switzerland</option>
                          <option value="AT">Austria</option>
                          <option value="BE">Belgium</option>
                          <option value="IE">Ireland</option>
                          <option value="PT">Portugal</option>
                          <option value="GR">Greece</option>
                          <option value="PL">Poland</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="HU">Hungary</option>
                          <option value="RO">Romania</option>
                          <option value="BG">Bulgaria</option>
                          <option value="HR">Croatia</option>
                          <option value="SI">Slovenia</option>
                          <option value="SK">Slovakia</option>
                          <option value="LT">Lithuania</option>
                          <option value="LV">Latvia</option>
                          <option value="EE">Estonia</option>
                          <option value="MT">Malta</option>
                          <option value="CY">Cyprus</option>
                          <option value="LU">Luxembourg</option>
                          <option value="JP">Japan</option>
                          <option value="KR">South Korea</option>
                          <option value="CN">China</option>
                          <option value="IN">India</option>
                          <option value="SG">Singapore</option>
                          <option value="HK">Hong Kong</option>
                          <option value="TW">Taiwan</option>
                          <option value="TH">Thailand</option>
                          <option value="MY">Malaysia</option>
                          <option value="ID">Indonesia</option>
                          <option value="PH">Philippines</option>
                          <option value="VN">Vietnam</option>
                          <option value="BR">Brazil</option>
                          <option value="MX">Mexico</option>
                          <option value="AR">Argentina</option>
                          <option value="CL">Chile</option>
                          <option value="CO">Colombia</option>
                          <option value="PE">Peru</option>
                          <option value="ZA">South Africa</option>
                          <option value="NG">Nigeria</option>
                          <option value="KE">Kenya</option>
                          <option value="EG">Egypt</option>
                          <option value="MA">Morocco</option>
                          <option value="TN">Tunisia</option>
                          <option value="DZ">Algeria</option>
                          <option value="GH">Ghana</option>
                          <option value="ET">Ethiopia</option>
                          <option value="UG">Uganda</option>
                          <option value="TZ">Tanzania</option>
                          <option value="ZW">Zimbabwe</option>
                          <option value="BW">Botswana</option>
                          <option value="NA">Namibia</option>
                          <option value="ZM">Zambia</option>
                          <option value="MW">Malawi</option>
                          <option value="MZ">Mozambique</option>
                          <option value="AO">Angola</option>
                          <option value="CM">Cameroon</option>
                          <option value="CI">Ivory Coast</option>
                          <option value="SN">Senegal</option>
                          <option value="ML">Mali</option>
                          <option value="BF">Burkina Faso</option>
                          <option value="NE">Niger</option>
                          <option value="TD">Chad</option>
                          <option value="SD">Sudan</option>
                          <option value="SS">South Sudan</option>
                          <option value="ER">Eritrea</option>
                          <option value="DJ">Djibouti</option>
                          <option value="SO">Somalia</option>
                          <option value="ET">Ethiopia</option>
                          <option value="KE">Kenya</option>
                          <option value="UG">Uganda</option>
                          <option value="RW">Rwanda</option>
                          <option value="BI">Burundi</option>
                          <option value="TZ">Tanzania</option>
                          <option value="MZ">Mozambique</option>
                          <option value="MW">Malawi</option>
                          <option value="ZM">Zambia</option>
                          <option value="ZW">Zimbabwe</option>
                          <option value="BW">Botswana</option>
                          <option value="NA">Namibia</option>
                          <option value="ZA">South Africa</option>
                          <option value="LS">Lesotho</option>
                          <option value="SZ">Eswatini</option>
                          <option value="MG">Madagascar</option>
                          <option value="MU">Mauritius</option>
                          <option value="SC">Seychelles</option>
                          <option value="KM">Comoros</option>
                          <option value="YT">Mayotte</option>
                          <option value="RE">Réunion</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Terms & Security</h3>
                      <p className="text-gray-400">Set your password and accept our terms</p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                      <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-sealia-green mr-2" />
                        Account Summary
                      </h4>
                      <div className="space-y-3 text-sm text-gray-300">
                        <p><strong className="text-white">Name:</strong> {formData.firstName} {formData.lastName}</p>
                        {formData.businessName && <p><strong className="text-white">Business:</strong> {formData.businessName}</p>}
                        <p><strong className="text-white">Sector:</strong> {formData.sector === 'other' ? 'Other' : (sectors.find(s => s.id === formData.sector)?.name || 'Not selected')}</p>
                        <p><strong className="text-white">Email:</strong> {formData.email}</p>
                        <p><strong className="text-white">Phone:</strong> {formData.phone}</p>
                        <p><strong className="text-white">Preferred Contact:</strong> {formData.preferredContact}</p>
                        <p><strong className="text-white">Location:</strong> {formData.city}, {formData.state}, {formData.country}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                          Password <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-10 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sealia-green focus:border-transparent transition-all duration-300"
                            placeholder="Create a strong password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                          Confirm Password <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-10 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sealia-green focus:border-transparent transition-all duration-300"
                            placeholder="Confirm your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="acceptTerms"
                          name="acceptTerms"
                          type="checkbox"
                          required
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="focus:ring-sealia-green h-4 w-4 text-sealia-green border-gray-600 bg-gray-800 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="acceptTerms" className="text-gray-300">
                          I agree to the{' '}
                          <Link 
                            to="/terms" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sealia-green hover:text-sealia-green/80 underline"
                          >
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link 
                            to="/privacy" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sealia-green hover:text-sealia-green/80 underline"
                          >
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Choose Your Plan</h3>
                      <p className="text-gray-400">Select a plan that fits your business needs</p>
                      {formData.selectedPlan === 'Free' && (
                        <div className="mt-4 p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                          <p className="text-blue-300 text-sm">
                            🎉 Free plan selected! No payment required - you can upgrade anytime.
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Billing Cycle Toggle */}
                    <div className="flex justify-center mb-6">
                      <div className="bg-gray-800 rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, billingCycle: 'monthly' }))}
                          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                            formData.billingCycle === 'monthly'
                              ? 'bg-sealia-green text-black'
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          Monthly
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, billingCycle: 'yearly' }))}
                          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                            formData.billingCycle === 'yearly'
                              ? 'bg-sealia-green text-black'
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          Yearly
                          <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">
                            Save 15%
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Plan Selection */}
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Free Plan */}
                      <div 
                        className={`relative bg-gray-800 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                          formData.selectedPlan === 'Free' 
                            ? 'ring-2 ring-sealia-green scale-105' 
                            : 'hover:scale-105'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, selectedPlan: 'Free' }))}
                      >
                        {formData.selectedPlan === 'Free' && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                              Selected
                            </span>
                          </div>
                        )}
                        <div className="text-center">
                          <div className="flex justify-center mb-4">
                            <Shield className="h-8 w-8 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">Free</h3>
                          <p className="text-gray-300 mb-4">Perfect for trying out Sealia</p>
                          <div className="text-3xl font-bold text-white mb-4">Free</div>
                          <ul className="text-sm text-gray-300 space-y-2 mb-6">
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              3 agreements per month
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              Preset templates only
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              1 team member
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              200 MB storage
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              Self-service support
                            </li>
                            <li className="flex items-center text-gray-400">
                              <div className="h-4 w-4 mr-2 flex items-center justify-center">
                                <span className="text-xs">❌</span>
                              </div>
                              Witness support
                            </li>
                            <li className="flex items-center text-gray-400">
                              <div className="h-4 w-4 mr-2 flex items-center justify-center">
                                <span className="text-xs">❌</span>
                              </div>
                              Verification logs
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Starter Plan */}
                      <div 
                        className={`relative bg-gray-800 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                          formData.selectedPlan === 'Starter' 
                            ? 'ring-2 ring-sealia-green scale-105' 
                            : 'hover:scale-105'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, selectedPlan: 'Starter' }))}
                      >
                        {formData.selectedPlan === 'Starter' && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span className="bg-sealia-green text-black px-4 py-1 rounded-full text-sm font-medium">
                              Most Popular
                            </span>
                          </div>
                        )}
                        <div className="text-center">
                          <div className="flex justify-center mb-4">
                            <Zap className="h-8 w-8 text-yellow-600" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                          <p className="text-gray-300 mb-4">Great for small businesses</p>
                          <div className="text-3xl font-bold text-white mb-4">
                            GHS {formData.billingCycle === 'yearly' ? '500' : '49'}
                            <span className="text-sm text-gray-400">
                              /{formData.billingCycle === 'yearly' ? 'year' : 'month'}
                            </span>
                          </div>
                          {formData.billingCycle === 'yearly' && (
                            <div className="mb-4">
                              <span className="text-lg text-gray-400 line-through">GHS 588</span>
                              <span className="ml-2 text-green-400 font-medium">Save 15%</span>
                            </div>
                          )}
                          <ul className="text-sm text-gray-300 space-y-2 mb-6">
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              10 agreements per month
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              Full template library
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              1 team member
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              1 GB storage
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              ✅ One witness per agreement
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              ✅ No watermark
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              Email + WhatsApp support
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              ✅ Basic verification logs
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Pro Plan */}
                      <div 
                        className={`relative bg-gray-800 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                          formData.selectedPlan === 'Pro' 
                            ? 'ring-2 ring-sealia-green scale-105' 
                            : 'hover:scale-105'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, selectedPlan: 'Pro' }))}
                      >
                        <div className="text-center">
                          <div className="flex justify-center mb-4">
                            <Crown className="h-8 w-8 text-purple-600" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                          <p className="text-gray-300 mb-4">For growing businesses</p>
                          <div className="text-3xl font-bold text-white mb-4">
                            GHS {formData.billingCycle === 'yearly' ? '2020' : '199'}
                            <span className="text-sm text-gray-400">
                              /{formData.billingCycle === 'yearly' ? 'year' : 'month'}
                            </span>
                          </div>
                          {formData.billingCycle === 'yearly' && (
                            <div className="mb-4">
                              <span className="text-lg text-gray-400 line-through">GHS 2388</span>
                              <span className="ml-2 text-green-400 font-medium">Save 15%</span>
                            </div>
                          )}
                          <ul className="text-sm text-gray-300 space-y-2 mb-6">
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              100 agreements per month
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              Full + Custom templates
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              Up to 4 team members
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              20 GB storage
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              ✅ Up to 2 witnesses per agreement
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              ✅ Full compliance dashboard
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              ✅ Priority SLA support
                            </li>
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              ✅ Full audit trail
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6">
                  {currentStep > 1 ? (
                    <button 
                      type="button" 
                      onClick={prevStep} 
                      className="group relative px-6 py-3 border border-gray-600 rounded-xl text-gray-300 hover:bg-gray-800 hover:border-sealia-green/50 transition-all duration-300 transform hover:scale-105 flex items-center overflow-hidden"
                    >
                      <span className="flex items-center relative z-10">
                        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Previous
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sealia-green/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-button-shine transition-opacity duration-300"></div>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < totalSteps ? (
                    <button 
                      type="button" 
                      onClick={nextStep} 
                      disabled={!validateStep(currentStep)} 
                      className="group relative px-6 py-3 bg-sealia-green text-black font-bold rounded-xl hover:bg-sealia-green/90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center overflow-hidden"
                    >
                      <span className="flex items-center relative z-10">
                        Next Step
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-button-shine transition-opacity duration-300"></div>
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      disabled={loading || !validateStep(currentStep)} 
                      className="group relative px-6 py-3 bg-sealia-green text-black font-bold rounded-xl hover:bg-sealia-green/90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center overflow-hidden"
                    >
                      <span className="flex items-center relative z-10">
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                            Creating account...
                          </>
                        ) : (
                          <>
                            {formData.selectedPlan === 'Free' ? 'Create Free Account' : 'Complete Registration & Pay'}
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-button-shine transition-opacity duration-300"></div>
                    </button>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="font-medium text-sealia-green hover:text-sealia-green/80 transition-colors"
                    >
                      Sign in
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

export default Register