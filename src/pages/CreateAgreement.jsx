import { useState, useEffect, useRef } from 'react'
import { 
  Plus, 
  FileText, 
  User, 
  Calendar,
  Clock,
  Shield,
  Send,
  Save,
  Eye
} from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'

const CreateAgreement = () => {
  const [visibleElements, setVisibleElements] = useState(new Set())
  const elementsRef = useRef({})
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    agreementTitle: '',
    agreementBody: '',
    expirationDate: '',
    signatureMethod: 'password',
    variables: []
  })
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 }
    )

    Object.values(elementsRef.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      Object.values(elementsRef.current).forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Creating agreement:', formData)
    // Handle agreement creation logic here
  }

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData)
    // Handle draft saving logic here
  }

  const handlePreview = () => {
    setPreviewMode(!previewMode)
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-sealia-forest mb-2">Create Agreement</h1>
            <p className="text-gray-600">Create a new agreement and send it to your client.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePreview}
              className="px-4 py-2 border border-sealia-mint/30 text-sealia-forest rounded-lg hover:bg-sealia-mint/10 transition-colors flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>{previewMode ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 border border-sealia-mint/30 text-sealia-forest rounded-lg hover:bg-sealia-mint/10 transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Draft</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div 
            ref={el => elementsRef.current['form'] = el}
            className={`bg-white rounded-3xl p-8 border border-sealia-mint/20 shadow-lg transition-all duration-700 ${
              visibleElements.has('form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client Information */}
              <div>
                <h3 className="text-lg font-semibold text-sealia-forest mb-4">Client Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                      placeholder="Enter client name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                      placeholder="client@example.com"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-sealia-forest mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                    placeholder="+233 55 123 4567"
                  />
                </div>
              </div>

              {/* Agreement Details */}
              <div>
                <h3 className="text-lg font-semibold text-sealia-forest mb-4">Agreement Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">
                      Agreement Title *
                    </label>
                    <input
                      type="text"
                      name="agreementTitle"
                      value={formData.agreementTitle}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                      placeholder="e.g., Photography Service Contract"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">
                      Agreement Content *
                    </label>
                    <textarea
                      name="agreementBody"
                      value={formData.agreementBody}
                      onChange={handleInputChange}
                      required
                      rows={8}
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors resize-none"
                      placeholder="Enter the agreement terms and conditions..."
                    />
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div>
                <h3 className="text-lg font-semibold text-sealia-forest mb-4">Settings</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">
                      Expiration Date
                    </label>
                    <input
                      type="date"
                      name="expirationDate"
                      value={formData.expirationDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">
                      Signature Method
                    </label>
                    <select
                      name="signatureMethod"
                      value={formData.signatureMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                    >
                      <option value="password">Password</option>
                      <option value="fingerprint">Fingerprint</option>
                      <option value="faceid">Face ID</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-sealia-mint/20">
                <button
                  type="button"
                  className="px-6 py-3 border border-sealia-mint/30 text-sealia-forest rounded-lg hover:bg-sealia-mint/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-sealia-mint text-sealia-forest font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Agreement</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div 
            ref={el => elementsRef.current['actions'] = el}
            className={`bg-white rounded-3xl p-6 border border-sealia-mint/20 shadow-lg transition-all duration-700 ${
              visibleElements.has('actions') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-lg font-semibold text-sealia-forest mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-sealia-mint/20 rounded-xl hover:bg-sealia-mint/30 transition-colors">
                <FileText className="h-5 w-5 text-sealia-forest" />
                <span className="text-sealia-forest font-medium">Use Template</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-sealia-mint/20 rounded-xl hover:bg-sealia-mint/30 transition-colors">
                <User className="h-5 w-5 text-sealia-forest" />
                <span className="text-sealia-forest font-medium">Add Variables</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-sealia-mint/20 rounded-xl hover:bg-sealia-mint/30 transition-colors">
                <Shield className="h-5 w-5 text-sealia-forest" />
                <span className="text-sealia-forest font-medium">Security Settings</span>
              </button>
            </div>
          </div>

          {/* Preview */}
          {previewMode && (
            <div 
              ref={el => elementsRef.current['preview'] = el}
              className={`bg-white rounded-3xl p-6 border border-sealia-mint/20 shadow-lg transition-all duration-700 ${
                visibleElements.has('preview') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="text-lg font-semibold text-sealia-forest mb-4">WhatsApp Preview</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-sealia-mint rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-sealia-forest" />
                  </div>
                  <span className="font-medium text-sealia-forest">Sealia Bot</span>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-sm text-gray-700">
                    📄 <strong>{formData.agreementTitle || 'Agreement Title'}</strong>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {formData.agreementBody || 'Agreement content will appear here...'}
                  </p>
                  <div className="mt-3 p-2 bg-sealia-mint/10 rounded border-l-2 border-sealia-mint">
                    <p className="text-xs text-sealia-forest font-medium">
                      To agree, type your full name: [Your Name]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateAgreement