import { useState, useEffect, useRef } from 'react'
import { Eye, Download, Clock, CheckCircle, XCircle, Filter, Search } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'

const Agreements = () => {
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

  const agreements = [
    {
      id: 1,
      title: "Photography Service Agreement",
      clientName: "Sarah Johnson",
      status: "signed",
      createdAt: "2024-01-15T10:30:00Z",
      signedAt: "2024-01-15T11:45:00Z",
      verificationId: "SEA-001-2024"
    },
    {
      id: 2,
      title: "Web Development Contract",
      clientName: "Mike Chen",
      status: "pending",
      createdAt: "2024-01-14T15:45:00Z",
      verificationId: "SEA-002-2024"
    },
    {
      id: 3,
      title: "Product Purchase Agreement",
      clientName: "Emma Wilson",
      status: "signed",
      createdAt: "2024-01-13T09:20:00Z",
      signedAt: "2024-01-13T14:30:00Z",
      verificationId: "SEA-003-2024"
    },
    {
      id: 4,
      title: "NDA Agreement",
      clientName: "John Doe",
      status: "expired",
      createdAt: "2024-01-10T08:15:00Z",
      verificationId: "SEA-004-2024"
    }
  ]

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

  return (
    <DashboardLayout>
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
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
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Signed</p>
                <p className="text-2xl font-bold text-green-600">
                  {agreements.filter(a => a.status === 'signed').length}
                </p>
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
                <p className="text-2xl font-bold text-yellow-600">
                  {agreements.filter(a => a.status === 'pending').length}
                </p>
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
                <p className="text-2xl font-bold text-red-600">
                  {agreements.filter(a => a.status === 'expired').length}
                </p>
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
            {agreements.map((agreement) => (
              <div 
                key={agreement.id}
                ref={el => elementsRef.current[`agreement-${agreement.id}`] = el}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  visibleElements.has(`agreement-${agreement.id}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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
                        <span className="font-mono text-xs">{agreement.verificationId}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-sealia-forest transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-sealia-forest transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    {getStatusIcon(agreement.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Agreements

