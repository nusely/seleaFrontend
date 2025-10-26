import { Link } from 'react-router-dom'
import { Shield, CheckCircle, Star, Zap, Crown, Users } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { useState, useEffect, useRef } from 'react'

const Pricing = () => {
  const [scrollY, setScrollY] = useState(0)
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [billingCycle, setBillingCycle] = useState('monthly') // 'monthly' or 'annual'
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


  const pricingPlans = [
    {
      name: 'Free',
      description: 'Perfect for trying out Sealia',
      price: { monthly: 0, annual: 0 },
      originalPrice: { monthly: 0, annual: 0 },
      currency: 'GHS',
      icon: Shield,
      color: 'gray',
      features: [
        '2 agreements per month',
        'Basic WhatsApp integration',
        'Email support',
        'Standard verification',
        'Basic templates'
      ],
      limitations: [
        'Limited to 2 agreements',
        'Basic support only'
      ],
      cta: 'Get Started Free',
      ctaLink: '/register',
      popular: false
    },
    {
      name: 'Starter',
      description: 'Great for small businesses',
      price: { monthly: 49, annual: 500 },
      originalPrice: { monthly: 49, annual: 588 },
      currency: 'GHS',
      icon: Zap,
      color: 'sealia-green',
      features: [
        '10 agreements per month',
        'Full WhatsApp integration',
        'Priority support',
        'Biometric verification',
        'Custom templates',
        'Basic analytics',
        'Email notifications'
      ],
      limitations: [],
      cta: 'Get Started',
      ctaLink: '/register',
      popular: true
    },
    {
      name: 'Pro',
      description: 'For growing businesses',
      price: { monthly: 99, annual: 1010 },
      originalPrice: { monthly: 99, annual: 1188 },
      currency: 'GHS',
      icon: Crown,
      color: 'sealia-deep',
      features: [
        '30 agreements per month',
        'Advanced WhatsApp features',
        '24/7 priority support',
        'Advanced biometric verification',
        'Unlimited templates',
        'Advanced analytics',
        'Team collaboration',
        'API access',
        'Custom branding'
      ],
      limitations: [],
      cta: 'Get Started',
      ctaLink: '/register',
      popular: false
    }
  ]

  const getCurrentPrice = (plan) => {
    return plan.price[billingCycle]
  }

  const getOriginalPrice = (plan) => {
    return plan.originalPrice[billingCycle]
  }

  const getSavings = (plan) => {
    if (billingCycle === 'annual' && plan.price.annual < plan.originalPrice.annual) {
      return Math.round(((plan.originalPrice.annual - plan.price.annual) / plan.originalPrice.annual) * 100)
    }
    return 0
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sealia-deep via-black to-sealia-green">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
        </div>

        {/* Floating Elements */}
        <div 
          className="absolute top-20 left-10 w-20 h-20 bg-sealia-green/20 rounded-full blur-xl"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute top-40 right-20 w-32 h-32 bg-sealia-deep/20 rounded-full blur-2xl"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-sealia-green rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-black" />
              </div>
              <span className="text-sealia-green font-semibold text-lg">Simple Pricing</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-sealia-green bg-clip-text text-transparent">
                Choose Your Plan
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>
          </div>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 mt-8">
        <div className="flex items-center justify-center">
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-sealia-green text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 relative ${
                  billingCycle === 'annual'
                    ? 'bg-sealia-green text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Annual
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 15%
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-8">
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon
            const currentPrice = getCurrentPrice(plan)
            const originalPrice = getOriginalPrice(plan)
            const savings = getSavings(plan)
            
            return (
              <div
                key={plan.name}
                ref={el => elementsRef.current[`plan${index}`] = el}
                className={`bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border transition-all duration-700 relative overflow-hidden ${
                  plan.popular 
                    ? 'border-sealia-green/50 shadow-2xl shadow-sealia-green/20' 
                    : 'border-white/10 hover:border-sealia-green/30'
                } ${
                  visibleElements.has(`plan${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Shield Background */}
                <div className="absolute inset-0 opacity-5">
                  <Shield className="w-full h-full text-sealia-green" />
                </div>

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="bg-sealia-green text-black px-6 py-2 rounded-full font-bold text-sm shadow-2xl border-2 border-black">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                      plan.color === 'sealia-green' ? 'bg-sealia-green' :
                      plan.color === 'sealia-deep' ? 'bg-sealia-deep' :
                      'bg-gray-700'
                    }`}>
                      <Icon className={`h-8 w-8 ${
                        plan.color === 'sealia-green' || plan.color === 'sealia-deep' ? 'text-black' : 'text-white'
                      }`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold">
                          {currentPrice === 0 ? 'Free' : `${plan.currency} ${currentPrice}`}
                        </span>
                        {currentPrice > 0 && (
                          <span className="text-gray-400 ml-2">
                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                          </span>
                        )}
                      </div>
                      
                      {savings > 0 && (
                        <div className="mt-2">
                          <span className="text-sm text-gray-400 line-through">
                            {plan.currency} {originalPrice}
                          </span>
                          <span className="ml-2 text-sealia-green font-semibold">
                            Save {savings}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-sealia-green flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="space-y-2 mb-8">
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <div key={limitationIndex} className="flex items-start space-x-3">
                          <div className="h-5 w-5 rounded-full bg-gray-600 flex-shrink-0 mt-0.5"></div>
                          <span className="text-gray-500 text-sm">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link
                    to={plan.ctaLink}
                    className={`w-full py-3 px-6 rounded-xl font-bold text-center transition-all duration-300 ${
                      plan.popular
                        ? 'bg-sealia-green text-black hover:bg-sealia-green/90'
                        : plan.name === 'Free'
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-sealia-deep text-white hover:bg-sealia-deep/90'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Pricing FAQ</h2>
            <p className="text-xl text-gray-400">Common questions about our pricing</p>
          </div>

          <div className="space-y-8">
            <div 
              ref={el => elementsRef.current['faq1'] = el}
              className={`bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 transition-all duration-700 ${
                visibleElements.has('faq1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="text-xl font-bold mb-3">Can I change plans anytime?</h3>
              <p className="text-gray-400">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.</p>
            </div>

            <div 
              ref={el => elementsRef.current['faq2'] = el}
              className={`bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 transition-all duration-700 delay-200 ${
                visibleElements.has('faq2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="text-xl font-bold mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-400">We accept all major credit cards, debit cards, and mobile money through Paystack. All payments are processed securely.</p>
            </div>

            <div 
              ref={el => elementsRef.current['faq3'] = el}
              className={`bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 transition-all duration-700 delay-400 ${
                visibleElements.has('faq3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="text-xl font-bold mb-3">Is there a free trial?</h3>
              <p className="text-gray-400">Yes! All paid plans come with a 14-day free trial. No credit card required to start. You can cancel anytime during the trial period.</p>
            </div>

            <div 
              ref={el => elementsRef.current['faq4'] = el}
              className={`bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 transition-all duration-700 delay-600 ${
                visibleElements.has('faq4') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="text-xl font-bold mb-3">What happens if I exceed my plan limits?</h3>
              <p className="text-gray-400">We'll notify you when you're approaching your limit. You can upgrade your plan or purchase additional agreements as needed.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-sealia-deep to-sealia-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-black/80">
            Join thousands of businesses using Sealia for secure agreements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-colors">
              Start Free Trial
            </Link>
            <Link to="/contact" className="px-8 py-4 border-2 border-black text-black font-bold rounded-xl hover:bg-black hover:text-white transition-colors">
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default Pricing
