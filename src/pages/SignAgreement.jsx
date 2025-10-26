import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Shield, Clock, Fingerprint, KeyRound, AlertCircle, CheckCircle } from 'lucide-react'
import { apiClient } from '../config/api.js'
import toast, { Toaster } from 'react-hot-toast'

const SignAgreement = () => {
  const { code } = useParams()
  const navigate = useNavigate()
  
  const [linkInfo, setLinkInfo] = useState(null)
  const [timeLeft, setTimeLeft] = useState(30)
  const [loading, setLoading] = useState(true)
  const [authenticating, setAuthenticating] = useState(false)
  const [authMethod, setAuthMethod] = useState(null) // 'fingerprint', 'face', 'passcode'

  useEffect(() => {
    verifyLink()
  }, [code])

  useEffect(() => {
    if (linkInfo && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      toast.error('Link expired. Please request a new one.')
      setTimeout(() => navigate('/'), 3000)
    }
  }, [timeLeft, linkInfo])

  const verifyLink = async () => {
    try {
      const response = await apiClient.get(`/signing-links/${code}/verify`)
      setLinkInfo(response)
      setTimeLeft(response.expires_in)
      setLoading(false)
    } catch (error) {
      console.error('Link verification error:', error)
      toast.error(error.error || 'Invalid or expired link')
      setLoading(false)
      setTimeout(() => navigate('/'), 3000)
    }
  }

  const handleFingerprintAuth = async () => {
    setAuthenticating(true)
    setAuthMethod('fingerprint')
    
    try {
      // TODO: Implement actual fingerprint authentication
      // For now, simulate with WebAuthn
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32),
          rp: { name: 'Sealia' },
          user: {
            id: new Uint8Array(16),
            name: 'user@example.com',
            displayName: 'User'
          },
          pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
          attestation: 'direct'
        }
      })
      
      // Capture device info
      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language
      }
      
      // Mark link as used
      await apiClient.post(`/signing-links/${code}/use`, {
        ip_address: '192.168.1.1', // TODO: Get real IP
        location: { city: 'Unknown', country: 'Unknown' },
        device_info: deviceInfo
      })
      
      toast.success('Authentication successful!')
      
      // TODO: Actually sign the agreement
      // Redirect to success page
      setTimeout(() => navigate('/agreement-signed'), 2000)
      
    } catch (error) {
      console.error('Fingerprint auth error:', error)
      toast.error('Authentication failed')
      setAuthenticating(false)
    }
  }

  const handlePasscodeAuth = async () => {
    setAuthMethod('passcode')
    toast.info('Passcode authentication - Coming soon')
  }

  const handleFaceAuth = async () => {
    setAuthMethod('face')
    toast.info('Face ID authentication - Coming soon')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sealia-mint to-sealia-forest flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Verifying link...</p>
        </div>
      </div>
    )
  }

  if (!linkInfo || !linkInfo.valid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sealia-mint to-sealia-forest flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 max-w-md text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h2>
          <p className="text-gray-600">This signing link is invalid or has expired.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sealia-mint to-sealia-forest flex items-center justify-center p-4">
      <Toaster position="top-right" />
      
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        {/* Timer */}
        <div className="flex items-center justify-center mb-6">
          <Clock className="h-5 w-5 text-orange-500 mr-2" />
          <span className="text-lg font-semibold text-gray-900">
            {timeLeft}s remaining
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-sealia-mint rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-sealia-forest" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign Agreement</h1>
          <p className="text-gray-600">Authenticate to sign this agreement</p>
        </div>

        {/* Authentication Methods */}
        <div className="space-y-3">
          <button
            onClick={handleFingerprintAuth}
            disabled={authenticating || timeLeft === 0}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors disabled:opacity-50"
          >
            <Fingerprint className="h-5 w-5" />
            <span>Use Fingerprint</span>
          </button>

          <button
            onClick={handleFaceAuth}
            disabled={authenticating || timeLeft === 0}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Use Face ID</span>
          </button>

          <button
            onClick={handlePasscodeAuth}
            disabled={authenticating || timeLeft === 0}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <KeyRound className="h-5 w-5" />
            <span>Use Passcode</span>
          </button>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Security:</strong> This link expires in {timeLeft} seconds and can only be used once.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignAgreement
