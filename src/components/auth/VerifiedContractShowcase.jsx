import React, { useState, useEffect } from 'react'
import { Shield, CheckCircle, Lock, FileText, Clock, TrendingUp } from 'lucide-react'

const VerifiedContractShowcase = ({ formData, onGameComplete, gameCompleted }) => {
  const [notifications, setNotifications] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const allContractExamples = [
    // Ghanaian Examples
    {
      id: 1,
      company: 'Kumasi Tech Solutions',
      client: 'Kwame Asante',
      agreement: 'Software development contract',
      value: '₵2.4M',
      status: 'signed',
      time: '2 minutes ago',
      hash: 'a7f8d9e2c1b4...',
      country: 'Ghana'
    },
    {
      id: 2,
      company: 'Accra Digital Agency',
      client: 'Ama Serwaa',
      agreement: 'Web design project',
      value: '₵850K',
      status: 'verified',
      time: '5 minutes ago',
      hash: 'b9e3f7a2c8d1...',
      country: 'Ghana'
    },
    {
      id: 3,
      company: 'Ghana Logistics Ltd',
      client: 'Kofi Mensah',
      agreement: 'Supply chain agreement',
      value: '₵1.2M',
      status: 'signed',
      time: '12 minutes ago',
      hash: 'c2d8f4a9e7b1...',
      country: 'Ghana'
    },
    {
      id: 4,
      company: 'Cape Coast Consulting',
      client: 'Efua Boateng',
      agreement: 'Business strategy consulting',
      value: '₵1.8M',
      status: 'signed',
      time: '7 minutes ago',
      hash: 'd4a7c9f2e8b5...',
      country: 'Ghana'
    },
    {
      id: 5,
      company: 'Tamale Agricultural Co',
      client: 'Ibrahim Tanko',
      agreement: 'Farm equipment lease',
      value: '₵650K',
      status: 'pending',
      time: '9 minutes ago',
      hash: 'e5f1a8c3d9b7...',
      country: 'Ghana'
    },
    // Nigerian Examples
    {
      id: 6,
      company: 'Lagos FinTech Inc',
      client: 'Adebayo Ogunlesi',
      agreement: 'Payment processing contract',
      value: '₦3.1M',
      status: 'signed',
      time: '18 minutes ago',
      hash: 'f2b9d4e7a1c6...',
      country: 'Nigeria'
    },
    {
      id: 7,
      company: 'Abuja Consulting Group',
      client: 'Fatima Ibrahim',
      agreement: 'Business advisory services',
      value: '₦650K',
      status: 'pending',
      time: '8 minutes ago',
      hash: 'g3c8f5a2d9e1...',
      country: 'Nigeria'
    },
    {
      id: 8,
      company: 'Port Harcourt Oil Services',
      client: 'Chinedu Okoro',
      agreement: 'Equipment maintenance',
      value: '₦1.8M',
      status: 'signed',
      time: '15 minutes ago',
      hash: 'h4d9f6a3e0f2...',
      country: 'Nigeria'
    },
    {
      id: 9,
      company: 'Kano Trading Ltd',
      client: 'Aisha Mohammed',
      agreement: 'Import/export services',
      value: '₦2.2M',
      status: 'verified',
      time: '11 minutes ago',
      hash: 'i5e0f7a4f1g3...',
      country: 'Nigeria'
    },
    {
      id: 10,
      company: 'Enugu Tech Solutions',
      client: 'Emeka Nwosu',
      agreement: 'Mobile app development',
      value: '₦1.5M',
      status: 'signed',
      time: '6 minutes ago',
      hash: 'j6f1f8a5g2h4...',
      country: 'Nigeria'
    },
    // Other African Countries
    {
      id: 11,
      company: 'Nairobi Digital Hub',
      client: 'Wanjiku Mwangi',
      agreement: 'E-commerce platform',
      value: 'KSh 4.2M',
      status: 'signed',
      time: '4 minutes ago',
      hash: 'k7g2f9a6h3i5...',
      country: 'Kenya'
    },
    {
      id: 12,
      company: 'Cairo Tech Innovations',
      client: 'Ahmed Hassan',
      agreement: 'AI development project',
      value: 'EGP 1.7M',
      status: 'verified',
      time: '13 minutes ago',
      hash: 'l8h3f0a7i4j6...',
      country: 'Egypt'
    },
    {
      id: 13,
      company: 'Cape Town Creative',
      client: 'Thabo Mthembu',
      agreement: 'Brand identity design',
      value: 'R 2.8M',
      status: 'signed',
      time: '10 minutes ago',
      hash: 'm9i4f1a8j5k7...',
      country: 'South Africa'
    },
    {
      id: 14,
      company: 'Dakar Consulting',
      client: 'Aminata Diop',
      agreement: 'Business transformation',
      value: 'XOF 1.3M',
      status: 'pending',
      time: '14 minutes ago',
      hash: 'n0j5f2a9k6l8...',
      country: 'Senegal'
    },
    {
      id: 15,
      company: 'Addis Ababa Logistics',
      client: 'Tigist Bekele',
      agreement: 'Supply chain optimization',
      value: 'ETB 3.5M',
      status: 'signed',
      time: '3 minutes ago',
      hash: 'o1k6f3a0l7m9...',
      country: 'Ethiopia'
    }
  ]

  // Select 3 random contracts
  const contractExamples = React.useMemo(() => {
    const shuffled = [...allContractExamples].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 3)
  }, [])

  // Rotate through notifications with moving selector
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % contractExamples.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [contractExamples.length])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'signed':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'verified':
        return <Shield className="w-4 h-4 text-[#D4AF37]" />
      case 'archived':
        return <Lock className="w-4 h-4 text-[#A7E3B5]" />
      default:
        return <FileText className="w-4 h-4 text-[#A7E3B5]" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'signed':
        return 'text-green-400'
      case 'verified':
        return 'text-[#D4AF37]'
      case 'archived':
        return 'text-[#A7E3B5]'
      default:
        return 'text-[#A7E3B5]'
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Live Activity</h3>
        <p className="text-[#A7E3B5]">Real agreements being secured via WhatsApp right now</p>
      </div>

      {/* Activity Feed */}
      <div className="space-y-4">
        {contractExamples.map((contract, index) => {
          const isActive = index === currentIndex
          const isVisible = index <= currentIndex + 1
          
          return (
            <div
              key={contract.id}
              className={`
                relative p-5 rounded-lg border transition-all duration-500 transform h-32
                ${isActive 
                  ? 'bg-gradient-to-r from-[#A7E3B5]/10 to-[#7dd87d]/10 border-[#A7E3B5]/30 shadow-lg shadow-[#A7E3B5]/10 scale-105' 
                  : 'bg-[#1a1f2e]/50 border-[#A7E3B5]/30'
                }
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              {/* Contract Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(contract.status)}
                  <span className="font-semibold text-white">{contract.company}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-[#A7E3B5]">
                  <Clock className="w-3 h-3" />
                  <span>{contract.time}</span>
                </div>
              </div>

              {/* Contract Details */}
              <div className="space-y-2">
                <p className="text-sm text-[#A7E3B5]">
                  {contract.agreement}
                </p>
                <p className="text-xs text-[#A7E3B5]/70">
                  {contract.client} • {contract.country}
                </p>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-[#A7E3B5] rounded-full animate-pulse"></div>
                    <span className="text-[#A7E3B5] font-mono">Hash: {contract.hash}</span>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(contract.status)}`}>
                    {contract.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Animated Border for Active Item */}
              {isActive && (
                <div className="absolute inset-0 rounded-lg border-2 border-[#A7E3B5] animate-pulse"></div>
              )}
            </div>
          )
        })}
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 space-y-4">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-[#A7E3B5]/10 px-4 py-2 rounded-full border border-[#A7E3B5]/20">
            <TrendingUp className="w-4 h-4 text-[#A7E3B5]" />
            <span className="text-[#A7E3B5] text-sm font-medium">
              {contractExamples.length} agreements secured today
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">99.9%</div>
            <div className="text-xs text-[#A7E3B5]">Uptime</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">256-bit</div>
            <div className="text-xs text-[#A7E3B5]">Encryption</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-xs text-[#A7E3B5]">Monitoring</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifiedContractShowcase
