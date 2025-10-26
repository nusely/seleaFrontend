import { Link } from 'react-router-dom'
import { Shield, Fingerprint, FileText, CheckCircle, MessageCircle, Smartphone, ArrowRight, Star, AlertTriangle, Clock, Bot, Eye, ShieldCheck, TrendingUp, Users, Zap, Lock, Globe, Award, Quote } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { useState, useEffect, useRef } from 'react'

const Home = () => {
  const { user } = useAuth()
  const [scrollY, setScrollY] = useState(0)
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const elementsRef = useRef({})

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      company: "TechStart Inc.",
      content: "Sealia has revolutionized how we handle contracts. The biometric verification gives us complete confidence in our agreements.",
      image: "/images/testimonials/user1.jpg"
    },
    {
      id: 2,
      name: "Marcus Rodriguez", 
      company: "Legal Solutions",
      content: "The WhatsApp integration is a game-changer. Our clients can sign contracts instantly without any friction.",
      image: "/images/testimonials/user2.jpg"
    },
    {
      id: 3,
      name: "Emily Watson",
      company: "Creative Agency",
      content: "Finally, a platform that makes contract management simple and secure. Our team loves the intuitive interface.",
      image: "/images/testimonials/user3.jpg"
    }
  ]

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

  // Testimonial carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [])


  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navigation />

      {/* Hero Section with Parallax */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
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
        <div 
          className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Main Headline */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-sealia-green rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sealia-green font-semibold text-lg">Verified by Trust</span>
                </div>
                
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white to-sealia-green bg-clip-text text-transparent">
                    Sealia
                  </span>
                </h1>
                
                <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed">
                  Stop getting <span className="text-red-400 font-semibold">duped</span> by vague agreements.
                </p>
                
                <p className="text-lg text-gray-400 leading-relaxed">
                  <span className="text-sealia-green font-semibold">Bulletproof contracts</span> right in WhatsApp.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="group relative px-8 py-4 bg-sealia-green text-black font-bold rounded-xl hover:bg-sealia-green/90 transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center space-x-2">
                    <span>Start Free Trial</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link to="/verify" className="px-8 py-4 border-2 border-sealia-green text-sealia-green font-bold rounded-xl hover:bg-sealia-green hover:text-black transition-all duration-300">
                  Verify Document
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-sealia-green" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-sealia-green" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-sealia-green" />
                  <span>2-minute setup</span>
                </div>
              </div>
            </div>
            
            {/* WhatsApp Demo with Enhanced Design */}
            <div className="relative">
              <div className="bg-black/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 max-w-sm mx-auto">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-sealia-green rounded-full flex items-center justify-center">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">Sealia Bot</h3>
                      <p className="text-xs text-green-400">Online • Verified</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-sealia-green text-black p-4 rounded-xl rounded-tl-sm">
                      <p className="text-sm font-medium">New agreement ready for review</p>
                      <p className="text-xs mt-1 opacity-80">Service Contract • $5,000/month</p>
                    </div>
                    
                    <div className="bg-gray-700 text-white p-4 rounded-xl rounded-tr-sm">
                      <p className="text-sm">Let me check the terms...</p>
                    </div>
                    
                    <div className="bg-sealia-green text-black p-4 rounded-xl rounded-tl-sm">
                      <p className="text-sm font-medium">Ready to sign? Use your fingerprint to authenticate.</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <Fingerprint className="h-4 w-4" />
                        <span className="text-xs font-medium">Biometric verification required</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Security Badges */}
                <div className="absolute -top-4 -right-4 bg-sealia-deep text-white p-3 rounded-full shadow-lg">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-sealia-green text-black p-3 rounded-full shadow-lg">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pain Points Section */}
      <div className="relative py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The <span className="text-red-400">$2.3 Trillion</span> Problem
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Every year, businesses lose billions due to vague, unenforceable agreements. 
              <span className="text-sealia-green font-semibold"> Sealia fixes this.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div 
              ref={el => elementsRef.current['pain1'] = el}
              className={`bg-red-900/20 border border-red-500/30 rounded-2xl p-8 text-center transition-all duration-700 ${
                visibleElements.has('pain1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-red-400 mb-4">9% revenue loss</h3>
              <p className="text-gray-300">Companies lose 9% of annual revenue due to informal agreements</p>
            </div>
            
            <div 
              ref={el => elementsRef.current['pain2'] = el}
              className={`bg-yellow-900/20 border border-yellow-500/30 rounded-2xl p-8 text-center transition-all duration-700 delay-200 ${
                visibleElements.has('pain2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">6 in 10 businesses</h3>
              <p className="text-gray-300">Operate without written contracts in emerging markets</p>
            </div>
            
            <div 
              ref={el => elementsRef.current['pain3'] = el}
              className={`bg-orange-900/20 border border-orange-500/30 rounded-2xl p-8 text-center transition-all duration-700 delay-400 ${
                visibleElements.has('pain3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <FileText className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-orange-400 mb-4">89% would use contracts</h3>
              <p className="text-gray-300">If they were simpler and free - convenience is the barrier</p>
            </div>
            
            <div 
              ref={el => elementsRef.current['pain4'] = el}
              className={`bg-purple-900/20 border border-purple-500/30 rounded-2xl p-8 text-center transition-all duration-700 delay-600 ${
                visibleElements.has('pain4') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <AlertTriangle className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-purple-400 mb-4">1 in 4 professionals</h3>
              <p className="text-gray-300">Struggle to get clients to sign contracts in the first place</p>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-sealia-green">Sealia</span> Changes Everything
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Right in your WhatsApp. No apps. No PDFs. No BS. Just bulletproof agreements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sealia-green rounded-xl flex items-center justify-center flex-shrink-0">
                    <Fingerprint className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Biometric Verification</h3>
                    <p className="text-gray-400">Every signature is verified with fingerprint or Face ID. No fakes. No disputes.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sealia-green rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Tamper-Proof Storage</h3>
                    <p className="text-gray-400">Every agreement is encrypted and stored with blockchain-level security.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sealia-green rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">WhatsApp Native</h3>
                    <p className="text-gray-400">Create, send, and sign agreements without leaving your favorite chat app.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-sealia-deep to-sealia-green rounded-3xl p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Agreement Stats</h3>
                  <p className="text-gray-300">Real-time verification data</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sealia-green mb-2">99.7%</div>
                    <div className="text-sm text-gray-300">Verification Success</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sealia-green mb-2">2.3s</div>
                    <div className="text-sm text-gray-300">Average Sign Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sealia-green mb-2">0</div>
                    <div className="text-sm text-gray-300">Disputes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sealia-green mb-2">100%</div>
                    <div className="text-sm text-gray-300">Legal Binding</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proof of Use Section */}
      <div className="relative py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by <span className="text-sealia-green">10,000+</span> Businesses
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From freelancers to Fortune 500s, everyone's switching to Sealia for bulletproof agreements.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
            {['TechCorp', 'GlobalBiz', 'SecureFlow', 'DataTrust', 'CloudSafe', 'VerifyPro'].map((company, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 text-center hover:bg-gray-800 transition-colors">
                <div className="w-12 h-12 bg-sealia-green rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-black font-bold text-lg">{company[0]}</span>
                </div>
                <div className="text-sm font-medium text-gray-300">{company}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center space-x-8 bg-gray-900 rounded-2xl p-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-sealia-green mb-2">$2.3M</div>
                <div className="text-sm text-gray-400">Saved in Legal Fees</div>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-sealia-green mb-2">15,000+</div>
                <div className="text-sm text-gray-400">Agreements Signed</div>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-sealia-green mb-2">0</div>
                <div className="text-sm text-gray-400">Disputes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-sealia-green rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-black" />
              </div>
              <span className="text-sealia-green font-semibold text-lg">Trusted by Thousands</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="text-sealia-green">Users</span> Say
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real businesses, real results. See how Sealia is transforming agreement management.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Testimonial 1 */}
              <div 
                className={`bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 transition-all duration-1000 relative overflow-hidden ${
                  currentTestimonial === 0 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8 absolute inset-0'
                }`}
              >
                <div className="relative">
                  {/* Shield Background */}
                  <div className="absolute inset-0 opacity-10">
                    <Shield className="w-full h-full text-sealia-green" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-sealia-green rounded-2xl flex items-center justify-center overflow-hidden">
                        <img 
                          src="/images/testimonials/user1.jpg" 
                          alt="Sarah Chen"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                        <div className="w-full h-full bg-sealia-green flex items-center justify-center text-black font-bold text-xl" style={{display: 'none'}}>
                          SC
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Sarah Chen</h3>
                        <p className="text-gray-400 text-sm">CEO, TechFlow</p>
                      </div>
                    </div>
                    <Quote className="h-8 w-8 text-sealia-green mb-4" />
                    <p className="text-gray-300 leading-relaxed mb-4">
                      "Sealia transformed how we handle contracts. What used to take days now takes minutes. The biometric verification gives our clients complete confidence."
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div 
                className={`bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 transition-all duration-1000 relative overflow-hidden ${
                  currentTestimonial === 1 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8 absolute inset-0'
                }`}
              >
                <div className="relative">
                  {/* Shield Background */}
                  <div className="absolute inset-0 opacity-10">
                    <Shield className="w-full h-full text-sealia-green" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-sealia-green rounded-2xl flex items-center justify-center overflow-hidden">
                        <img 
                          src="/images/testimonials/user2.jpg" 
                          alt="Marcus Rodriguez"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                        <div className="w-full h-full bg-sealia-green flex items-center justify-center text-black font-bold text-xl" style={{display: 'none'}}>
                          MR
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Marcus Rodriguez</h3>
                        <p className="text-gray-400 text-sm">Freelance Designer</p>
                      </div>
                    </div>
                    <Quote className="h-8 w-8 text-sealia-green mb-4" />
                    <p className="text-gray-300 leading-relaxed mb-4">
                      "As a freelancer, I needed something simple and secure. Sealia's WhatsApp integration is genius - my clients love the convenience."
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div 
                className={`bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 transition-all duration-1000 relative overflow-hidden ${
                  currentTestimonial === 2 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8 absolute inset-0'
                }`}
              >
                <div className="relative">
                  {/* Shield Background */}
                  <div className="absolute inset-0 opacity-10">
                    <Shield className="w-full h-full text-sealia-green" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-sealia-green rounded-2xl flex items-center justify-center overflow-hidden">
                        <img 
                          src="/images/testimonials/user3.jpg" 
                          alt="Emily Watson"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                        <div className="w-full h-full bg-sealia-green flex items-center justify-center text-black font-bold text-xl" style={{display: 'none'}}>
                          EW
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Emily Watson</h3>
                        <p className="text-gray-400 text-sm">Legal Counsel, SecureFlow</p>
                      </div>
                    </div>
                    <Quote className="h-8 w-8 text-sealia-green mb-4" />
                    <p className="text-gray-300 leading-relaxed mb-4">
                      "The legal compliance is outstanding. Every agreement is court-admissible and tamper-proof. This is the future of contract management."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 bg-gradient-to-br from-sealia-deep to-sealia-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Stop Getting <span className="text-black">Duped</span>?
          </h2>
          <p className="text-xl mb-8 text-black/80">
            Join thousands of businesses using Sealia for bulletproof agreements. 
            <span className="font-semibold"> Right in WhatsApp.</span>
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

export default Home