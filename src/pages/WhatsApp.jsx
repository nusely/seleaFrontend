import React, { useState, useEffect } from 'react'
import {
  MessageCircle,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Bot,
  FileText,
  Shield,
  Info
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const WhatsApp = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected')
  const [loading, setLoading] = useState(false)

  // Check WhatsApp connection status
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // TODO: Replace with actual API call
        const saved = localStorage.getItem('sealia-whatsapp-config')
        if (saved) {
          const config = JSON.parse(saved)
          setConnectionStatus(config.connectionStatus || 'disconnected')
        }
      } catch (error) {
        console.error('Error checking WhatsApp status:', error)
      }
    }

    checkConnection()
  }, [])

  const handleConnect = async () => {
    setLoading(true)
    try {
      // Open WhatsApp Business setup in new tab
      window.open('https://business.whatsapp.com/products/business-api', '_blank')
      
      // TODO: Replace with actual API call
      setTimeout(() => {
        setConnectionStatus('connected')
        toast.success('WhatsApp Business account connected successfully!')
      }, 2000)
    } catch (error) {
      console.error('Error connecting WhatsApp:', error)
      toast.error('Failed to connect WhatsApp Business account')
    } finally {
      setLoading(false)
    }
  }

  const handleDisconnect = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setConnectionStatus('disconnected')
      toast.success('WhatsApp Business account disconnected')
    } catch (error) {
      console.error('Error disconnecting WhatsApp:', error)
      toast.error('Failed to disconnect WhatsApp Business account')
    } finally {
      setLoading(false)
    }
  }

  const handleTestConnection = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('WhatsApp connection test successful!')
    } catch (error) {
      console.error('Error testing WhatsApp connection:', error)
      toast.error('WhatsApp connection test failed')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800'
      case 'disconnected':
        return 'bg-red-100 text-red-800'
      case 'error':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'disconnected':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">WhatsApp Integration</h1>
            <p className="text-gray-600">Connect your WhatsApp Business account to send agreements to clients</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(connectionStatus)}`}>
              {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
            {getStatusIcon(connectionStatus)}
          </div>
        </div>

        {/* Connection Status Card */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                connectionStatus === 'connected' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <MessageCircle className={`h-6 w-6 ${
                  connectionStatus === 'connected' ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">WhatsApp Business Account</h3>
                <p className="text-gray-600">
                  {connectionStatus === 'connected' 
                    ? 'Your WhatsApp Business account is connected and ready to use'
                    : 'Connect your WhatsApp Business account to start sending agreements'
                  }
                </p>
              </div>
            </div>
            {connectionStatus === 'connected' ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleTestConnection}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Testing...' : 'Test Connection'}
                </button>
                <button
                  onClick={handleDisconnect}
                  disabled={loading}
                  className="px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Disconnecting...' : 'Disconnect'}
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                disabled={loading}
                className="px-4 py-2 bg-sealia-mint text-white font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors disabled:opacity-50"
              >
                {loading ? 'Connecting...' : 'Connect WhatsApp'}
              </button>
            )}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3 mb-4">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900">How WhatsApp Integration Works</h3>
              <p className="text-blue-700 text-sm">Simple 3-step process to connect your WhatsApp Business account</p>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Create WhatsApp Business Account</h4>
                <p className="text-blue-700 text-sm">
                  Go to{' '}
                  <a 
                    href="https://business.whatsapp.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center space-x-1"
                  >
                    <span>business.whatsapp.com</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  {' '}and create your business account.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Connect to Sealia</h4>
                <p className="text-blue-700 text-sm">
                  Click "Connect WhatsApp" button above to link your WhatsApp Business account with Sealia.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <div>
                <h4 className="font-medium text-blue-900">Start Sending Agreements</h4>
                <p className="text-blue-700 text-sm">
                  Once connected, you can send agreement links to clients via WhatsApp with a simple click.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Instant Agreements</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Send agreement links to clients instantly via WhatsApp. No email delays, faster turnaround.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Smart Templates</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Use sector-specific templates to quickly create agreements for different business types.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Secure Signing</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Clients can sign agreements securely with biometric authentication or enhanced passcodes.
            </p>
          </div>
        </div>

        {/* Setup Help */}
        {connectionStatus === 'disconnected' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-900">Need Help Setting Up?</h3>
                <p className="text-yellow-700 text-sm mt-2">
                  Our team is here to help you connect your WhatsApp Business account. 
                  <a href="/contact" className="text-yellow-600 hover:underline ml-1">Contact support</a> if you need assistance.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default WhatsApp