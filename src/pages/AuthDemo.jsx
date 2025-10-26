import React, { useState } from 'react'
import { Shield, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

// Animation Components
import DigitalSigningJourney from '../components/auth/DigitalSigningJourney'
import VerifiedContractShowcase from '../components/auth/VerifiedContractShowcase'
import AgreementMorphing from '../components/auth/AgreementMorphing'
import SigningMiniGame from '../components/auth/SigningMiniGame'

const AuthDemo = () => {
  const [selectedAnimation, setSelectedAnimation] = useState('journey')
  const [gameCompleted, setGameCompleted] = useState(false)

  const animations = [
    { id: 'journey', name: 'Digital Signing Journey', component: DigitalSigningJourney },
    { id: 'showcase', name: 'Verified Contract Showcase', component: VerifiedContractShowcase },
    { id: 'morphing', name: 'Agreement Text Morphing', component: AgreementMorphing },
    { id: 'game', name: 'Signing Mini Game', component: SigningMiniGame }
  ]

  const mockFormData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@company.com',
    businessName: 'TechCorp Inc.',
    phone: '+1 (555) 123-4567',
    city: 'San Francisco',
    state: 'CA',
    country: 'US'
  }

  const AnimationComponent = animations.find(a => a.id === selectedAnimation)?.component

  return (
    <div className="h-screen bg-[#10131A] flex overflow-hidden">
      {/* Left Panel - Animation (60%) */}
      <div className="w-3/5 relative overflow-hidden">
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
          {AnimationComponent && (
            <AnimationComponent 
              formData={mockFormData}
              onGameComplete={setGameCompleted}
              gameCompleted={gameCompleted}
            />
          )}
        </div>

        {/* Animation Selector */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex space-x-2">
            {animations.map((animation) => (
              <button
                key={animation.id}
                onClick={() => setSelectedAnimation(animation.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedAnimation === animation.id
                    ? 'bg-[#D4AF37] text-[#10131A]'
                    : 'bg-[#3D4A58]/30 text-[#3D4A58] hover:bg-[#3D4A58]/50'
                }`}
              >
                {animation.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Demo Info (40%) */}
      <div className="w-2/5 bg-[#10131A] flex items-center justify-center p-8">
        {/* Floating Form Container */}
        <div className="w-full max-w-md bg-[#1a1f2e] rounded-2xl border border-sealia-mint/20 shadow-2xl shadow-sealia-mint/10 p-6 max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              Animation Demo
            </h2>
            <p className="text-sealia-mint">
              Experience Sealia's engaging authentication flow
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-sealia-mint/10 rounded-lg border border-sealia-mint/20">
              <h3 className="font-semibold text-white mb-2">Current Animation:</h3>
              <p className="text-sm text-sealia-mint">
                {animations.find(a => a.id === selectedAnimation)?.name}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-white">Features:</h3>
              <ul className="space-y-2 text-sm text-sealia-mint">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-sealia-mint rounded-full"></div>
                  <span className="text-white">Interactive form-based animations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-sealia-mint rounded-full"></div>
                  <span className="text-white">Real-time progress tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-sealia-mint rounded-full"></div>
                  <span className="text-white">Legal tech branding</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-sealia-mint rounded-full"></div>
                  <span className="text-white">Gamified signing experience</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                to="/login"
                className="w-full bg-gradient-to-r from-sealia-mint to-sealia-green text-sealia-forest font-semibold py-3 px-6 rounded-lg hover:from-sealia-green hover:to-sealia-mint transition-all duration-200 shadow-lg hover:shadow-sealia-mint/25 text-center block"
              >
                Try Live Experience
              </Link>
              
              <Link
                to="/"
                className="w-full mt-3 flex items-center justify-center space-x-2 text-sealia-mint hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthDemo
