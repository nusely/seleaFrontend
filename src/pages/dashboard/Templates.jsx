import { useState, useEffect, useRef } from 'react'
import { Plus, Edit, Trash2, Copy, Eye, BarChart3, Calendar } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'

const Templates = () => {
  const [visibleElements, setVisibleElements] = useState(new Set())
  const elementsRef = useRef({})

  useEffect(() => {
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

  const templates = [
    {
      id: 1,
      name: "Photography Service Agreement",
      shortCode: "PHOTO001",
      useCount: 12,
      lastUsed: "2024-01-15",
      isPublic: true,
      variables: ["client_name", "photographer_name", "event_date", "location", "amount"]
    },
    {
      id: 2,
      name: "Freelance Web Development",
      shortCode: "WEB001",
      useCount: 8,
      lastUsed: "2024-01-14",
      isPublic: true,
      variables: ["client_name", "developer_name", "project_description", "amount", "deadline"]
    },
    {
      id: 3,
      name: "Product Purchase Agreement",
      shortCode: "PURCHASE001",
      useCount: 5,
      lastUsed: "2024-01-13",
      isPublic: false,
      variables: ["client_name", "product_name", "seller_name", "amount", "delivery_date"]
    },
    {
      id: 4,
      name: "NDA Template",
      shortCode: "NDA001",
      useCount: 3,
      lastUsed: "2024-01-10",
      isPublic: false,
      variables: ["client_name", "company_name", "project_description", "duration", "start_date"]
    }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agreement Templates</h1>
            <p className="text-gray-600">Create and manage reusable contract templates</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-sealia-mint text-sealia-forest font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Template</span>
          </button>
        </div>

        {/* Stats */}
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

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
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
                  <button className="p-2 text-gray-400 hover:text-sealia-forest transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-sealia-forest transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-sealia-forest transition-colors">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <button className="p-2 text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
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
      </div>
    </DashboardLayout>
  )
}

export default Templates

