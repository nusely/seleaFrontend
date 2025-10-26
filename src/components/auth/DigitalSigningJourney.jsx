import React, { useState, useEffect } from 'react'
import { FileText, Eye, PenTool, Shield, Archive, CheckCircle, Clock } from 'lucide-react'

const DigitalSigningJourney = ({ formData, onGameComplete, gameCompleted }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps = [
    { 
      id: 'draft', 
      title: 'Draft', 
      description: 'Create your agreement',
      icon: FileText,
      color: '#A7E3B5'
    },
    { 
      id: 'review', 
      title: 'Review', 
      description: 'Verify all details',
      icon: Eye,
      color: '#A7E3B5'
    },
    { 
      id: 'sign', 
      title: 'Sign', 
      description: 'Secure digital signature',
      icon: PenTool,
      color: '#A7E3B5'
    },
    { 
      id: 'verify', 
      title: 'Verify', 
      description: 'Blockchain verification',
      icon: Shield,
      color: '#A7E3B5'
    },
    { 
      id: 'archive', 
      title: 'Archive', 
      description: 'Secure storage',
      icon: Archive,
      color: '#A7E3B5'
    }
  ]

  // Update progress based on form completion
  useEffect(() => {
    let completedSteps = 0
    
    if (formData.firstName && formData.lastName) completedSteps++
    if (formData.email && formData.email.includes('@')) completedSteps++
    if (formData.password && formData.password.length >= 8) completedSteps++
    if (formData.businessName) completedSteps++
    
    setActiveStep(completedSteps)
    setProgress((completedSteps / steps.length) * 100)
  }, [formData])

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Your Digital Journey</h3>
        <p className="text-[#A7E3B5]">Watch your agreement come to life via WhatsApp</p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#A7E3B5] opacity-30">
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#A7E3B5] to-[#7dd87d] transition-all duration-1000 ease-out"
            style={{ height: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => {
            const isActive = index <= activeStep
            const isCurrent = index === activeStep
            const Icon = step.icon
            
            return (
              <div key={step.id} className="relative flex items-start space-x-4">
                {/* Step Circle */}
                <div className={`
                  relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500
                  ${isActive 
                  ? 'bg-gradient-to-br from-[#A7E3B5] to-[#7dd87d] shadow-lg shadow-[#A7E3B5]/25' 
                  : 'bg-[#A7E3B5] opacity-50'
                  }
                  ${isCurrent ? 'animate-pulse' : ''}
                `}>
                  {isActive ? (
                    <CheckCircle className="w-6 h-6 text-[#1E4D2B]" />
                  ) : (
                    <Icon className="w-6 h-6 text-[#A7E3B5]" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-2">
                  <h4 className={`text-lg font-semibold transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-[#A7E3B5]'
                  }`}>
                    {step.title}
                  </h4>
                  <p className={`text-sm transition-colors duration-300 ${
                    isActive ? 'text-[#A7E3B5]' : 'text-[#A7E3B5]'
                  }`}>
                    {step.description}
                  </p>
                  
                  {/* Status Indicator */}
                  {isActive && (
                    <div className="mt-2 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#A7E3B5] rounded-full animate-pulse"></div>
                    <span className="text-xs text-[#A7E3B5] font-medium">
                        {isCurrent ? 'In Progress...' : 'Completed'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Glow Effect for Current Step */}
                {isCurrent && (
                  <div className="absolute -inset-2 bg-[#A7E3B5] opacity-20 rounded-full animate-ping"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Completion Message */}
      {activeStep === steps.length && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#A7E3B5]/10 to-[#7dd87d]/10 px-4 py-2 rounded-full border border-[#A7E3B5]/20">
            <CheckCircle className="w-5 h-5 text-[#A7E3B5]" />
            <span className="text-[#A7E3B5] font-medium">Journey Complete!</span>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="flex justify-between text-sm text-[#A7E3B5] mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-[#A7E3B5] rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#A7E3B5] to-[#7dd87d] h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default DigitalSigningJourney
