import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Shield, CheckCircle, FileText, Calendar, User, Mail, Clock } from 'lucide-react'
import { apiClient } from '../config/api.js'
import toast, { Toaster } from 'react-hot-toast'

const VerifyAgreement = () => {
  const { code } = useParams()
  const [verificationData, setVerificationData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVerificationData()
  }, [code])

  const loadVerificationData = async () => {
    try {
      const response = await apiClient.get(`/signing-links/verify/${code}`)
      setVerificationData(response)
      setLoading(false)
    } catch (error) {
      console.error('Verification error:', error)
      toast.error('Invalid verification code')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sealia-mint mx-auto mb-4"></div>
          <p className="text-gray-600">Loading verification...</p>
        </div>
      </div>
    )
  }

  if (!verificationData || !verificationData.verified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md text-center shadow-lg">
          <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Verification Code</h2>
          <p className="text-gray-600">This verification code is not valid.</p>
        </div>
      </div>
    )
  }

  const agreement = verificationData.agreement

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            ✅ Verified Agreement
          </h1>
          <p className="text-gray-600 text-center">
            This agreement has been verified and is authentic
          </p>
        </div>

        {/* Agreement Details */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Agreement Details
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-gray-600 w-32">Title:</span>
              <span className="font-medium text-gray-900">{agreement.title}</span>
            </div>
            
            <div className="flex items-start">
              <span className="text-gray-600 w-32">Client:</span>
              <span className="font-medium text-gray-900">{agreement.signer_name}</span>
            </div>
            
            <div className="flex items-start">
              <span className="text-gray-600 w-32">Email:</span>
              <span className="font-medium text-gray-900">{agreement.signer_email}</span>
            </div>
            
            <div className="flex items-start">
              <span className="text-gray-600 w-32">Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                agreement.status === 'signed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {agreement.status}
              </span>
            </div>
            
            <div className="flex items-start">
              <span className="text-gray-600 w-32">Created:</span>
              <span className="font-medium text-gray-900">
                {new Date(agreement.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Verification Code */}
        <div className="bg-gradient-to-r from-sealia-mint to-sealia-forest rounded-xl p-8 shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Verification Code</h3>
          <p className="text-2xl font-mono font-bold">{code}</p>
          <p className="text-sm mt-2 opacity-90">
            Use this code to verify this agreement on sealia.com
          </p>
        </div>

        {/* Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Secure Verification</h4>
              <p className="text-sm text-blue-800">
                This agreement has been cryptographically signed and verified. 
                All signatures are legally binding and tamper-proof.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyAgreement
