import { useState, useEffect, useRef } from 'react'
import { Plus, Edit, Trash2, Copy, Eye, BarChart3, Calendar, Save, X, Loader2, AlertCircle, FileText } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import toast from 'react-hot-toast'
import { templatesService } from '../services/supabaseApiService'

const Templates = () => {
  const [visibleElements, setVisibleElements] = useState(new Set())
  const elementsRef = useRef({})
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    content: '',
    variables: []
  })

  useEffect(() => {
    loadTemplates()
    
    const handleScroll = () => {
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
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const loadTemplates = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await templatesService.getUserTemplates()
      setTemplates(response.templates || [])
    } catch (err) {
      console.error('Error loading templates:', err)
      setError('Failed to load templates')
      // Fallback to mock data for development
      setTemplates([
        {
          id: 1,
          name: "Photography Contract",
          description: "Professional photography service agreement",
          content: "I, {client_name}, agree to hire {photographer_name} for photography services on {event_date} at {location}. The total cost is {amount} and payment is due upon completion.",
          variables: ["client_name", "photographer_name", "event_date", "location", "amount"],
          useCount: 15,
          lastUsed: "2024-01-20",
          createdAt: "2024-01-01",
          shortCode: "PHOTO001",
          isPublic: false
        },
        {
          id: 2,
          name: "Freelance Project",
          description: "Freelance work agreement template",
          content: "This agreement is between {client_name} and {freelancer_name} for the project: {project_name}. Deliverables: {deliverables}. Timeline: {timeline}. Payment: {amount}.",
          variables: ["client_name", "freelancer_name", "project_name", "deliverables", "timeline", "amount"],
          useCount: 8,
          lastUsed: "2024-01-14",
          createdAt: "2024-01-05",
          shortCode: "FREE001",
          isPublic: true
        }
      ])
      toast.error('Failed to load templates. Using mock data.')
    } finally {
      setLoading(false)
    }
  }

  // CRUD Functions
  const handleCreateTemplate = async (e) => {
    e.preventDefault()
    try {
      const response = await templatesService.createTemplate({
        name: newTemplate.name,
        description: newTemplate.description,
        content: newTemplate.content,
        variables: newTemplate.variables
      })
      
      setTemplates([...templates, response.template])
      setNewTemplate({ name: '', description: '', content: '', variables: [] })
      setShowCreateModal(false)
      toast.success('Template created successfully!')
    } catch (err) {
      console.error('Error creating template:', err)
      toast.error('Failed to create template')
    }
  }

  const handleEditTemplate = (template) => {
    setEditingTemplate(template)
    setNewTemplate({
      name: template.name,
      description: template.description,
      content: template.content,
      variables: template.variables
    })
    setShowEditModal(true)
  }

  const handleUpdateTemplate = async (e) => {
    e.preventDefault()
    try {
      const response = await templatesService.updateTemplate(editingTemplate.id, {
        name: newTemplate.name,
        description: newTemplate.description,
        content: newTemplate.content,
        variables: newTemplate.variables
      })
      
      setTemplates(templates.map(t => 
        t.id === editingTemplate.id 
          ? { ...t, ...response.template }
          : t
      ))
      setShowEditModal(false)
      setEditingTemplate(null)
      setNewTemplate({ name: '', description: '', content: '', variables: [] })
      toast.success('Template updated successfully!')
    } catch (err) {
      console.error('Error updating template:', err)
      toast.error('Failed to update template')
    }
  }

  const handleDeleteTemplate = async (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await templatesService.deleteTemplate(id)
        setTemplates(templates.filter(t => t.id !== id))
        toast.success('Template deleted successfully!')
      } catch (err) {
        console.error('Error deleting template:', err)
        toast.error('Failed to delete template')
      }
    }
  }

  const handleDuplicateTemplate = (template) => {
    const duplicate = {
      ...template,
      id: Date.now(),
      name: `${template.name} (Copy)`,
      shortCode: `TEMP${Date.now().toString().slice(-4)}`,
      useCount: 0,
      lastUsed: null,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setTemplates([...templates, duplicate])
    toast.success('Template duplicated successfully!')
  }

  const handleInputChange = (e) => {
    setNewTemplate({
      ...newTemplate,
      [e.target.name]: e.target.value
    })
  }

  const extractVariables = (content) => {
    const matches = content.match(/\{([^}]+)\}/g)
    return matches ? matches.map(match => match.slice(1, -1)) : []
  }

  const handleContentChange = (e) => {
    const content = e.target.value
    setNewTemplate({
      ...newTemplate,
      content,
      variables: extractVariables(content)
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agreement Templates</h1>
            <p className="text-gray-600">Create and manage reusable contract templates</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-sealia-mint text-sealia-forest font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Template</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-sealia-forest" />
            <span className="ml-2 text-gray-600">Loading templates...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-800">{error}</span>
          </div>
        )}

        {/* Stats */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Templates</p>
                <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Uses</p>
                <p className="text-2xl font-bold text-sealia-forest">
                  {templates.reduce((sum, template) => sum + template.useCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-sealia-mint rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-sealia-forest" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Public Templates</p>
                <p className="text-2xl font-bold text-green-600">
                  {templates.filter(t => t.isPublic).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Templates Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 bg-sealia-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-sealia-forest" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Templates Yet</h3>
                <p className="text-gray-600 mb-4">Create your first template to get started</p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-sealia-mint text-sealia-forest font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Template</span>
                </button>
              </div>
            ) : (
              templates.map((template) => (
            <div 
              key={template.id}
              ref={el => elementsRef.current[`template-${template.id}`] = el}
              className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${
                visibleElements.has(`template-${template.id}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-sealia-mint/20 text-sealia-forest text-xs font-medium rounded">
                        {template.shortCode}
                      </span>
                      {template.isPublic && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          Public
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Uses:</span>
                    <span className="font-semibold text-gray-900">{template.useCount}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Used:</span>
                    <span className="font-semibold text-gray-900">{template.lastUsed}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">Variables:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.variables.slice(0, 3).map((variable) => (
                        <span key={variable} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {variable}
                        </span>
                      ))}
                      {template.variables.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{template.variables.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => {/* View template logic */}}
                    className="p-2 text-gray-400 hover:text-sealia-forest transition-colors"
                    title="View Template"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleEditTemplate(template)}
                    className="p-2 text-gray-400 hover:text-sealia-forest transition-colors"
                    title="Edit Template"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDuplicateTemplate(template)}
                    className="p-2 text-gray-400 hover:text-sealia-forest transition-colors"
                    title="Duplicate Template"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <button 
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="p-2 text-red-400 hover:text-red-600 transition-colors"
                  title="Delete Template"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
              ))
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-sealia-mint rounded-lg flex items-center justify-center">
                <Plus className="h-5 w-5 text-sealia-forest" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Create Template</h4>
                <p className="text-sm text-gray-600">Build a new agreement template</p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Copy className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Import Template</h4>
                <p className="text-sm text-gray-600">Import from existing documents</p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Template Analytics</h4>
                <p className="text-sm text-gray-600">View usage statistics</p>
              </div>
            </button>
          </div>
        </div>

        {/* Create Template Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-sealia-forest">Create New Template</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleCreateTemplate} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">
                      Template Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newTemplate.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                      placeholder="e.g., Photography Contract"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={newTemplate.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                      placeholder="Brief description of this template"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sealia-forest mb-2">
                    Template Content *
                  </label>
                  <textarea
                    name="content"
                    value={newTemplate.content}
                    onChange={handleContentChange}
                    required
                    rows={8}
                    className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors resize-none"
                    placeholder="Enter your template content. Use {variable_name} for dynamic fields..."
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Use {`{variable_name}`} for dynamic fields that will be filled in when creating agreements.
                  </p>
                </div>

                {newTemplate.variables.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">
                      Detected Variables
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {newTemplate.variables.map((variable, index) => (
                        <span key={index} className="px-3 py-1 bg-sealia-mint/20 text-sealia-forest rounded-full text-sm">
                          {`{${variable}}`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
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
                    className="px-6 py-3 bg-sealia-mint text-sealia-forest font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Create Template</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Template Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-sealia-forest">Edit Template</h2>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleUpdateTemplate} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">
                      Template Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newTemplate.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={newTemplate.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sealia-forest mb-2">
                    Template Content *
                  </label>
                  <textarea
                    name="content"
                    value={newTemplate.content}
                    onChange={handleContentChange}
                    required
                    rows={8}
                    className="w-full px-4 py-3 border border-sealia-mint/30 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent transition-colors resize-none"
                  />
                </div>

                {newTemplate.variables.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-sealia-forest mb-2">
                      Detected Variables
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {newTemplate.variables.map((variable, index) => (
                        <span key={index} className="px-3 py-1 bg-sealia-mint/20 text-sealia-forest rounded-full text-sm">
                          {`{${variable}}`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
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
                    className="px-6 py-3 bg-sealia-mint text-sealia-forest font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Update Template</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Templates
