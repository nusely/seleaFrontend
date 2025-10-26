import React, { useState, useEffect, useRef } from 'react'
import {
  Eye,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  FileText,
  User,
  Calendar,
  Shield,
  X
} from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import toast, { Toaster } from 'react-hot-toast'
import { agreementsService } from '../services/supabaseApiService.js'

/**
 * Agreements.jsx
 *
 * Features:
 * - Loads & persists agreements to localStorage
 * - Search + filter tabs (All, Signed, Pending, Expired)
 * - Create / Edit / Delete agreements via modals
 * - View details modal with signatures (if any)
 * - Basic "download" and "resend" simulated actions (toast)
 * - Simple scroll-in animation per item
 *
 * Notes:
 * - This file uses `verifyId` (not `verificationId`).
 * - Tailwind classes like `bg-sealia-mint` and `text-sealia-forest` are used.
 *   Add those colors to your tailwind.config.js under `extend.colors` if you want them.
 */

const Agreements = () => {
  const [visibleElements, setVisibleElements] = useState(new Set())
  const elementsRef = useRef({})

  const [agreements, setAgreements] = useState([])
  const [loading, setLoading] = useState(true)

  // Load agreements from backend API
  useEffect(() => {
    const loadAgreements = async () => {
      try {
        setLoading(true)
        const response = await agreementsService.getAgreements()
        setAgreements(response.agreements || [])
      } catch (error) {
        console.error('Failed to load agreements:', error)
        toast.error('Failed to load agreements')
        // Fallback to localStorage for demo
        const saved = localStorage.getItem('sealia-agreements')
        if (saved) {
          setAgreements(JSON.parse(saved))
        }
      } finally {
        setLoading(false)
      }
    }

    loadAgreements()
  }, [])

  // Modals & form state
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingAgreement, setEditingAgreement] = useState(null)
  const [viewAgreement, setViewAgreement] = useState(null)

  const [newAgreement, setNewAgreement] = useState({
    title: '',
    clientName: '',
    clientEmail: '',
    content: '',
    expiresAt: '',
    templateId: null
  })

  const [filterStatus, setFilterStatus] = useState('all') // all | signed | pending | expired
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 8

  // Scroll animation: observe elements on scroll and set visible set
  useEffect(() => {
    const handleScroll = () => {
      Object.keys(elementsRef.current).forEach((key) => {
        const element = elementsRef.current[key]
        if (!element) return
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        setVisibleElements((prev) => {
          const newSet = new Set(prev)
          if (isVisible) newSet.add(key)
          return newSet
        })
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // CRUD operations
  const handleCreateAgreement = async (e) => {
    e.preventDefault()
    // Basic validation
    if (!newAgreement.title || !newAgreement.clientName || !newAgreement.clientEmail || !newAgreement.expiresAt) {
      toast.error('Please fill required fields.')
      return
    }

    try {
      const agreementData = {
        title: newAgreement.title,
        signer_name: newAgreement.clientName,
        signer_email: newAgreement.clientEmail,
        content: newAgreement.content,
        expiration_date: newAgreement.expiresAt + 'T00:00:00Z',
        template_id: newAgreement.templateId
      }

      const response = await agreementsService.createAgreement(agreementData)
      setAgreements((prev) => [response.agreement, ...prev])
      setNewAgreement({ title: '', clientName: '', clientEmail: '', content: '', expiresAt: '', templateId: null })
      setShowCreateModal(false)
      toast.success('Agreement created successfully!')
    } catch (error) {
      console.error('Failed to create agreement:', error)
      toast.error('Failed to create agreement')
    }
  }

  const handleEditAgreement = (agreement) => {
    setEditingAgreement(agreement)
    setNewAgreement({
      title: agreement.title,
      clientName: agreement.clientName,
      clientEmail: agreement.clientEmail,
      content: agreement.content,
      expiresAt: agreement.expiresAt ? agreement.expiresAt.split('T')[0] : '',
      templateId: agreement.templateId
    })
    setShowEditModal(true)
  }

  const handleUpdateAgreement = async (e) => {
    e.preventDefault()
    if (!editingAgreement) return

    try {
      const agreementData = {
        title: newAgreement.title,
        signer_name: newAgreement.clientName,
        signer_email: newAgreement.clientEmail,
        content: newAgreement.content,
        expiration_date: newAgreement.expiresAt ? newAgreement.expiresAt + 'T00:00:00Z' : editingAgreement.expiresAt,
        template_id: newAgreement.templateId
      }

      const response = await agreementsService.updateAgreement(editingAgreement.id, agreementData)
      setAgreements((prev) =>
        prev.map((a) => (a.id === editingAgreement.id ? response.agreement : a))
      )
      setEditingAgreement(null)
      setNewAgreement({ title: '', clientName: '', clientEmail: '', content: '', expiresAt: '', templateId: null })
      setShowEditModal(false)
      toast.success('Agreement updated successfully!')
    } catch (error) {
      console.error('Failed to update agreement:', error)
      toast.error('Failed to update agreement')
    }
  }

  const handleDeleteAgreement = async (id) => {
    if (!window.confirm('Are you sure you want to delete this agreement?')) return

    try {
      await agreementsService.deleteAgreement(id)
      setAgreements((prev) => prev.filter((a) => a.id !== id))
      toast.success('Agreement deleted successfully!')
    } catch (error) {
      console.error('Failed to delete agreement:', error)
      toast.error('Failed to delete agreement')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAgreement((prev) => ({ ...prev, [name]: value }))
  }

  const handleDownloadPDF = (agreement) => {
    // Replace this with real PDF generation if needed
    toast.success(`Downloading PDF for ${agreement.title}...`)
  }

  const handleViewAgreement = (agreement) => {
    setViewAgreement(agreement)
    setShowViewModal(true)
  }

  const handleResendAgreement = (agreement) => {
    // Replace with email API integration
    toast.success(`Resending agreement to ${agreement.clientEmail}...`)
  }

  // Filtering & searching
  const filteredAgreements = agreements
    .filter((agreement) => {
      const matchesStatus = filterStatus === 'all' || agreement.status === filterStatus
      const q = searchTerm.trim().toLowerCase()
      if (!q) return matchesStatus
      const matchesSearch =
        (agreement.title || '').toLowerCase().includes(q) ||
        (agreement.clientName || '').toLowerCase().includes(q) ||
        (agreement.verifyId || '').toLowerCase().includes(q) ||
        (agreement.clientEmail || '').toLowerCase().includes(q)
      return matchesStatus && matchesSearch
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  // Simple pagination
  const totalPages = Math.max(1, Math.ceil(filteredAgreements.length / PAGE_SIZE))
  useEffect(() => {
    if (page > totalPages) setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredAgreements.length, totalPages])

  const pagedAgreements = filteredAgreements.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // Helpers for UI
  const getStatusIcon = (status) => {
    switch (status) {
      case 'signed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'expired':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'signed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Auto-expire check (small helper: updates status if past expiresAt)
  useEffect(() => {
    const now = new Date()
    let updated = false
    const newList = agreements.map((a) => {
      if (!a.expiresAt) return a
      const expires = new Date(a.expiresAt)
      if (expires < now && a.status !== 'expired') {
        updated = true
        return { ...a, status: 'expired' }
      }
      return a
    })
    if (updated) setAgreements(newList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // run once on mount

  return (
    <DashboardLayout>
      {/* Toaster for notifications */}
      <Toaster position="top-right" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Agreements</h1>
            <p className="text-gray-600">Manage and track all your contract agreements</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search agreements..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setPage(1)
                }}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-sealia-mint text-white font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Create Agreement</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs / filters */}
        <div className="flex items-center justify-start space-x-3">
          {['all', 'signed', 'pending', 'expired'].map((s) => (
            <button
              key={s}
              onClick={() => {
                setFilterStatus(s)
                setPage(1)
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterStatus === s
                  ? 'bg-sealia-mint text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{agreements.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Signed</p>
                <p className="text-2xl font-bold text-green-600">{agreements.filter((a) => a.status === 'signed').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{agreements.filter((a) => a.status === 'pending').length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-red-600">{agreements.filter((a) => a.status === 'expired').length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Agreements List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Agreements</h3>
          </div>

          <div className="divide-y divide-gray-200">
            {pagedAgreements.length === 0 && (
              <div className="p-6 text-center text-gray-500">No agreements to show.</div>
            )}

            {pagedAgreements.map((agreement) => {
              const key = `agreement-${agreement.id}`
              return (
                <div
                  key={agreement.id}
                  ref={(el) => (elementsRef.current[key] = el)}
                  className={`p-6 hover:bg-gray-50 transition-colors transform-gpu ${
                    visibleElements.has(key) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{agreement.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agreement.status)}`}>
                          {agreement.status}
                        </span>
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Client:</span>
                          <span>{agreement.clientName}</span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Created:</span>
                          <span>{new Date(agreement.createdAt).toLocaleDateString()}</span>
                        </div>

                        {agreement.signedAt && (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">Signed:</span>
                            <span>{new Date(agreement.signedAt).toLocaleDateString()}</span>
                          </div>
                        )}

                        <div className="flex items-center space-x-1">
                          <span className="font-medium">ID:</span>
                          <span className="font-mono text-xs">{agreement.verifyId}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewAgreement(agreement)}
                        className="p-2 text-gray-400 hover:text-sealia-forest transition-colors"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDownloadPDF(agreement)}
                        className="p-2 text-gray-400 hover:text-sealia-forest transition-colors"
                        title="Download PDF"
                      >
                        <Download className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleEditAgreement(agreement)}
                        className="p-2 text-gray-400 hover:text-sealia-forest transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteAgreement(agreement.id)}
                        className="p-2 text-red-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div title={agreement.status}>{getStatusIcon(agreement.status)}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {(page - 1) * PAGE_SIZE + 1} - {Math.min(page * PAGE_SIZE, filteredAgreements.length)} of {filteredAgreements.length}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 rounded-md border border-gray-200 bg-white hover:bg-gray-50"
                disabled={page === 1}
              >
                Prev
              </button>
              <div className="px-3 py-1 rounded-md bg-white border border-gray-200">
                Page {page} / {totalPages}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1 rounded-md border border-gray-200 bg-white hover:bg-gray-50"
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-sealia-forest">Create New Agreement</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleCreateAgreement} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">Agreement Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={newAgreement.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                      placeholder="e.g., Photography Service Contract"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">Expiration Date *</label>
                    <input
                      type="date"
                      name="expiresAt"
                      value={newAgreement.expiresAt}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">Client Name *</label>
                    <input
                      type="text"
                      name="clientName"
                      value={newAgreement.clientName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                      placeholder="Client's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">Client Email *</label>
                    <input
                      type="email"
                      name="clientEmail"
                      value={newAgreement.clientEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                      placeholder="client@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sealia-forest mb-2">Agreement Content *</label>
                  <textarea
                    name="content"
                    value={newAgreement.content}
                    onChange={handleInputChange}
                    required
                    rows={8}
                    className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors resize-none"
                    placeholder="Enter the agreement content..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 border border-sealia-mint/30 text-sealia-forest rounded-lg hover:bg-sealia-mint/10 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-sealia-mint text-white font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Agreement</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-sealia-forest">Edit Agreement</h2>
                <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleUpdateAgreement} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">Agreement Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={newAgreement.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">Expiration Date *</label>
                    <input
                      type="date"
                      name="expiresAt"
                      value={newAgreement.expiresAt}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">Client Name *</label>
                    <input
                      type="text"
                      name="clientName"
                      value={newAgreement.clientName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">Client Email *</label>
                    <input
                      type="email"
                      name="clientEmail"
                      value={newAgreement.clientEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sealia-forest mb-2">Agreement Content *</label>
                  <textarea
                    name="content"
                    value={newAgreement.content}
                    onChange={handleInputChange}
                    required
                    rows={8}
                    className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-3 border border-sealia-mint/30 text-sealia-forest rounded-lg hover:bg-sealia-mint/10 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-sealia-mint text-white font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Update Agreement</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Modal */}
        {showViewModal && viewAgreement && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{viewAgreement.title}</h2>
                  <p className="text-sm text-gray-500">{viewAgreement.clientName} • {viewAgreement.clientEmail}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleResendAgreement(viewAgreement)}
                    className="px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 text-sm"
                  >
                    Resend
                  </button>
                  <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Agreement Details</h3>
                  <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{viewAgreement.content}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-xs text-gray-500">Created</p>
                    <p className="text-sm text-gray-700 mt-1">{new Date(viewAgreement.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-xs text-gray-500">Expires</p>
                    <p className="text-sm text-gray-700 mt-1">{viewAgreement.expiresAt ? new Date(viewAgreement.expiresAt).toLocaleDateString() : '—'}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm text-gray-700 mt-1">{viewAgreement.status}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Signatures</h3>
                  {viewAgreement.signatures && viewAgreement.signatures.length > 0 ? (
                    <ul className="space-y-2">
                      {viewAgreement.signatures.map((s, idx) => (
                        <li key={idx} className="p-3 border rounded-lg flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{s.signer}</p>
                            <p className="text-xs text-gray-500">{new Date(s.signedAt).toLocaleString()}</p>
                          </div>
                          <div className="text-xs text-gray-400">{s.method}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No signatures yet.</p>
                  )}
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={() => {
                      handleDownloadPDF(viewAgreement)
                    }}
                    className="px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={() => {
                      setShowViewModal(false)
                    }}
                    className="px-4 py-2 rounded-md bg-sealia-mint text-white hover:bg-sealia-mint/80"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Agreements
