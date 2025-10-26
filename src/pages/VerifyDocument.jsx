import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Shield, CheckCircle, XCircle, Clock, MapPin, Globe, ArrowLeft, User, Mail, Calendar, Fingerprint } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const VerifyDocument = () => {
  const { id } = useParams()
  const [verificationData, setVerificationData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
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

  useEffect(() => {
    // TODO: Fetch verification data from API
    // This will be implemented when we set up the backend
    const fetchVerificationData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data for now
        setVerificationData({
          id: id,
          title: "Sample Agreement",
          status: "verified",
          signers: [
            { name: "John Doe", email: "john@example.com", signedAt: "2024-01-15T10:30:00Z" },
            { name: "Jane Smith", email: "jane@example.com", signedAt: "2024-01-15T11:45:00Z" }
          ],
          createdAt: "2024-01-15T09:00:00Z",
          location: { city: "New York", country: "USA", lat: 40.7128, lng: -74.0060 },
          ipAddress: "192.168.1.100",
          signatureMethod: "fingerprint"
        })
      } catch (err) {
        setError('Failed to verify document')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchVerificationData()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sealia-green mx-auto mb-4"></div>
          <p className="text-gray-400">Verifying document...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navigation />

      {/* Large Shield Background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10">
        <Shield className="w-full h-full text-sealia-green" />
      </div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-sealia-green rounded-2xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <span className="text-sealia-green font-semibold text-xl">Document Verification</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-sealia-green bg-clip-text text-transparent">
                Verify Document
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Verify the authenticity and integrity of this document.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Results */}
      <div className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={el => elementsRef.current['verification'] = el}
            className={`bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 transition-all duration-700 ${
              visibleElements.has('verification') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Shield Background */}
            <div className="absolute inset-0 opacity-5">
              <Shield className="w-full h-full text-sealia-green" />
            </div>

            <div className="relative z-10">
              {/* Document Info */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">{verificationData.title}</h2>
                <div className="flex items-center justify-center space-x-2">
                  {verificationData.status === 'verified' ? (
                    <>
                      <CheckCircle className="h-6 w-6 text-sealia-green" />
                      <span className="text-sealia-green font-semibold text-lg">Verified</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-6 w-6 text-red-500" />
                      <span className="text-red-500 font-semibold text-lg">Not Verified</span>
                    </>
                  )}
                </div>
              </div>

              {/* Document Details */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">Document Information</h3>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-sealia-green" />
                    <div>
                      <p className="text-sm text-gray-400">Created</p>
                      <p className="text-white">{new Date(verificationData.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Fingerprint className="h-5 w-5 text-sealia-green" />
                    <div>
                      <p className="text-sm text-gray-400">Signature Method</p>
                      <p className="text-white capitalize">{verificationData.signatureMethod}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-sealia-green" />
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="text-white">{verificationData.location.city}, {verificationData.location.country}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-sealia-green" />
                    <div>
                      <p className="text-sm text-gray-400">IP Address</p>
                      <p className="text-white">{verificationData.ipAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Signers */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Signers</h3>
                  <div className="space-y-4">
                    {verificationData.signers.map((signer, index) => (
                      <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                        <div className="flex items-center space-x-3 mb-2">
                          <User className="h-5 w-5 text-sealia-green" />
                          <span className="text-white font-medium">{signer.name}</span>
                        </div>
                        <div className="flex items-center space-x-3 mb-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-400 text-sm">{signer.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-400 text-sm">
                            Signed: {new Date(signer.signedAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Verification Status</h4>
                    <p className="text-gray-400">
                      This document has been verified and is authentic. All signatures are valid and the document has not been tampered with.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-8 w-8 text-sealia-green" />
                    <span className="text-sealia-green font-semibold">Verified</span>
                  </div>
                </div>
              </div>

              {/* Back to Homepage Link */}
              <div className="text-center pt-8">
                <Link 
                  to="/" 
                  className="flex items-center justify-center space-x-2 text-gray-400 hover:text-sealia-green transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Homepage</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default VerifyDocument