import React, { useState, useEffect } from 'react'
import { PenTool, Shield, FileText, CheckCircle } from 'lucide-react'

const AgreementMorphing = ({ formData, onGameComplete, gameCompleted }) => {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const phases = [
    {
      title: 'Draft Agreement',
      text: 'This agreement is between the parties...',
      icon: FileText,
      color: '#3D4A58'
    },
    {
      title: 'AI Enhancement',
      text: 'This comprehensive agreement is established between the contracting parties...',
      icon: PenTool,
      color: '#D4AF37'
    },
    {
      title: 'Legal Review',
      text: 'This legally binding agreement is established between the contracting parties with full consideration of applicable laws...',
      icon: Shield,
      color: '#D4AF37'
    },
    {
      title: 'Final Contract',
      text: 'This legally binding agreement is established between the contracting parties with full consideration of applicable laws and industry standards, ensuring complete compliance and protection of all parties involved.',
      icon: CheckCircle,
      color: '#D4AF37'
    }
  ]

  // Typing animation effect
  useEffect(() => {
    const currentPhaseData = phases[currentPhase]
    if (!currentPhaseData) return

    setIsTyping(true)
    setDisplayedText('')
    
    let index = 0
    const typingInterval = setInterval(() => {
      if (index < currentPhaseData.text.length) {
        setDisplayedText(currentPhaseData.text.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [currentPhase])

  // Progress through phases
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const currentPhaseData = phases[currentPhase]
  const Icon = currentPhaseData?.icon

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">AI-Powered Refinement</h3>
        <p className="text-[#A7E3B5]">Watch Sealia enhance your agreements via WhatsApp</p>
      </div>

      {/* Document Container */}
      <div className="relative">
        {/* Document Background */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-[#A7E3B5]/30 p-6 min-h-[300px]">
          {/* Document Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#A7E3B5]/20">
            <div className="flex items-center space-x-2">
              {Icon && <Icon className="w-5 h-5 text-[#A7E3B5]" />}
              <span className="text-white font-semibold">{currentPhaseData?.title}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-[#A7E3B5] rounded-full animate-pulse"></div>
              <span className="text-xs text-[#A7E3B5]">Live</span>
            </div>
          </div>

          {/* Document Content */}
          <div className="space-y-4">
            <div className="text-sm text-[#A7E3B5]">
              <span className="font-semibold">Agreement ID:</span> SEA-2024-{Math.random().toString(36).substr(2, 8).toUpperCase()}
            </div>
            
            <div className="text-sm text-[#A7E3B5]">
              <span className="font-semibold">Parties:</span> {formData.businessName || 'Your Company'} & Client
            </div>
            
            <div className="text-sm text-[#A7E3B5]">
              <span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}
            </div>

            {/* Morphing Text */}
            <div className="mt-6">
              <div className="text-white text-sm leading-relaxed min-h-[120px]">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-2 h-4 bg-[#D4AF37] ml-1 animate-pulse"></span>
                )}
              </div>
            </div>
          </div>

          {/* Signature Line */}
          <div className="mt-6 pt-4 border-t border-[#A7E3B5]/20">
            <div className="flex items-center justify-between">
              <div className="text-xs text-[#A7E3B5]">Digital Signature:</div>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-8 bg-[#A7E3B5]/20 rounded border border-[#A7E3B5]/30 flex items-center justify-center">
                  <PenTool className="w-3 h-3 text-[#A7E3B5]" />
                </div>
                <span className="text-xs text-[#A7E3B5] font-mono">
                  {currentPhase >= 2 ? 'a7f8d9e2c1b4...' : 'Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Phase Indicator */}
        <div className="mt-6 flex justify-center space-x-2">
          {phases.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentPhase 
                  ? 'bg-[#A7E3B5] w-8' 
                  : index < currentPhase 
                    ? 'bg-[#A7E3B5]/50' 
                    : 'bg-[#A7E3B5]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Enhancement Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-[#A7E3B5]/10 rounded-lg border border-[#A7E3B5]/20">
          <div className="text-lg font-bold text-[#A7E3B5]">+47%</div>
          <div className="text-xs text-[#A7E3B5]">Clarity</div>
        </div>
        <div className="text-center p-3 bg-[#A7E3B5]/10 rounded-lg border border-[#A7E3B5]/20">
          <div className="text-lg font-bold text-[#A7E3B5]">+23%</div>
          <div className="text-xs text-[#A7E3B5]">Security</div>
        </div>
      </div>
    </div>
  )
}

export default AgreementMorphing
