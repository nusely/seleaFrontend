import { Link } from 'react-router-dom'
import { Shield, Users, Award, Globe, Lock, CheckCircle, Bot, Fingerprint, MessageCircle, ShieldCheck } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

const About = () => {
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
              <span className="text-sealia-green font-semibold text-lg">About Sealia</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-sealia-green bg-clip-text text-transparent">
                What is Sealia?
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              In a world where business happens over WhatsApp, agreements should be just as simple — and just as secure.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <div className="w-24 h-1 bg-sealia-green mx-auto mb-8"></div>
            </div>
            
            <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
              <p>
                Sealia is a digital trust platform that lets you create, send, and confirm agreements directly inside WhatsApp. No need for PDF drafting, complex forms, or scanning signatures.
              </p>
              <p>
                With Sealia, every agreement is verified by identity — using fingerprint, Face ID, or password confirmation — and stored safely in the cloud.
              </p>
              <p>
                We're helping small businesses, freelancers, and professionals protect their word with technology-backed trust.
              </p>
              
              <div className="bg-sealia-green/10 border border-sealia-green/30 rounded-2xl p-8 mt-12">
                <p className="font-bold text-sealia-green text-xl mb-2">Seal your word. Digitally.</p>
                <p className="text-sealia-green font-semibold text-lg">Verified by Sealia.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Sealia?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built for the modern business world where trust is everything.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-sealia-green/30 transition-colors relative overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <Shield className="w-full h-full text-sealia-green" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-sealia-green rounded-2xl flex items-center justify-center mb-6">
                  <Fingerprint className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-4">Biometric Security</h3>
                <p className="text-gray-400">Every signature is verified with fingerprint or Face ID. No fakes. No disputes.</p>
              </div>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-sealia-green/30 transition-colors relative overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <Shield className="w-full h-full text-sealia-green" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-sealia-green rounded-2xl flex items-center justify-center mb-6">
                  <MessageCircle className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-4">WhatsApp Native</h3>
                <p className="text-gray-400">Create, send, and sign agreements without leaving your favorite chat app.</p>
              </div>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-sealia-green/30 transition-colors relative overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <Shield className="w-full h-full text-sealia-green" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-sealia-green rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-4">Tamper-Proof</h3>
                <p className="text-gray-400">Every agreement is encrypted and stored with blockchain-level security.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Trusted by Thousands</h2>
            <p className="text-xl text-gray-400">Real businesses, real results.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-sealia-green mb-2">10,000+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-sealia-green mb-2">$2.3M</div>
              <div className="text-gray-400">Saved in Legal Fees</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-sealia-green mb-2">15,000+</div>
              <div className="text-gray-400">Agreements Signed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-sealia-green mb-2">0</div>
              <div className="text-gray-400">Disputes</div>
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
            Join thousands of businesses using Sealia for bulletproof agreements.
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

export default About