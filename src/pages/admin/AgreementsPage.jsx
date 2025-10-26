import React, { useState, useEffect } from "react";
import {
  Shield,
  Users,
  FileText,
  BarChart3,
  Settings,
  Crown,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
  DollarSign,
  TrendingUp,
  Server,
  Database,
  Globe,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  MessageCircle,
  CreditCard,
  Bot,
  File,
  Lock,
  Bell,
  UserCheck,
  FileCheck,
  X,
  Plus,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  Hash,
  MapPin,
  Smartphone,
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
// SuperAdminLayout is already provided by SuperAdminDashboard
import toast, { Toaster } from "react-hot-toast";
import superAdminApiService from "../../services/superAdminApiService";

const AgreementsPage = () => {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAgreements, setTotalAgreements] = useState(0);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const itemsPerPage = 50;

  useEffect(() => {
    loadAgreements();
  }, [currentPage, searchTerm, statusFilter, categoryFilter, dateFilter]);

  const loadAgreements = async () => {
    try {
      setLoading(true);
      const response = await superAdminApiService.getAgreements({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        status: statusFilter,
        category: categoryFilter,
        date_range: dateFilter,
      });
      
      if (response.success && response.data) {
        setAgreements(response.data.agreements || []);
        setTotalAgreements(response.data.count || 0);
        setTotalPages(Math.ceil((response.data.count || 0) / itemsPerPage));
      }
    } catch (error) {
      console.error("Error loading agreements:", error);
      toast.error("Failed to load agreements");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (agreement) => {
    setSelectedAgreement(agreement);
    setShowDetails(true);
  };

  const handleForceVerify = async (agreementId) => {
    if (
      !window.confirm(
        "Are you sure you want to force verify this agreement? This will mark it as verified regardless of the normal verification process."
      )
    ) {
      return;
    }

    try {
      await superAdminApiService.forceVerifyAgreement(agreementId);
      toast.success("Agreement force verified successfully");
      loadAgreements();
    } catch (error) {
      console.error("Error force verifying:", error);
      toast.error("Failed to force verify agreement");
    }
  };

  const handleRevokeAgreement = async (agreementId) => {
    if (
      !window.confirm(
        "Are you sure you want to revoke this agreement? This action cannot be undone and will invalidate the agreement."
      )
    ) {
      return;
    }

    try {
      await superAdminApiService.revokeAgreement(agreementId);
      toast.success("Agreement revoked successfully");
      loadAgreements();
    } catch (error) {
      console.error("Error revoking agreement:", error);
      toast.error("Failed to revoke agreement");
    }
  };

  const handleExportAgreements = async () => {
    try {
      const response = await superAdminApiService.exportAgreements({
        search: searchTerm,
        status: statusFilter,
        category: categoryFilter,
        date_range: dateFilter,
      });
      
      // Create and download the file
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `agreements-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Agreements exported successfully");
    } catch (error) {
      console.error("Error exporting agreements:", error);
      toast.error("Failed to export agreements");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'status':
        setStatusFilter(value);
        break;
      case 'category':
        setCategoryFilter(value);
        break;
      case 'date':
        setDateFilter(value);
        break;
      default:
        break;
    }
    setCurrentPage(1); // Reset to first page when filtering
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "signed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "verified":
        return "bg-blue-100 text-blue-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSignatureMethodIcon = (method) => {
    switch (method) {
      case "fingerprint":
        return "👆";
      case "faceid":
        return "👤";
      case "passcode":
        return "🔐";
      default:
        return "✍️";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 md:h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sealia-mint"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="space-y-6 max-w-full overflow-x-hidden">
        {/* Header with Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  All Agreements
                </h2>
                <p className="text-sm text-gray-600">
                  Monitor all agreements created and verified on the platform
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleExportAgreements}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button 
                  onClick={loadAgreements}
                  className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search agreements by ID, title, or client..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="signed">Signed</option>
                <option value="verified">Verified</option>
                <option value="expired">Expired</option>
              </select>
              <select 
                value={categoryFilter}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              >
                <option value="">All Categories</option>
                <option value="tenancy">Tenancy</option>
                <option value="services">Services</option>
                <option value="sales">Sales</option>
                <option value="employment">Employment</option>
              </select>
              <select 
                value={dateFilter}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agreement ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verification ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agreements.map((agreement) => (
                  <tr
                    key={agreement.id}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      #{agreement.id.slice(-8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {agreement.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {agreement.category || "General"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-sealia-mint rounded-full flex items-center justify-center mr-3">
                          <span className="text-xs font-medium text-white">
                            {agreement.creator?.full_name?.charAt(0) || "U"}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {agreement.creator?.full_name || "Unknown"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {agreement.creator?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {agreement.signer_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {agreement.signer_email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          agreement.status
                        )}`}
                      >
                        {agreement.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(agreement.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                      {agreement.verification_id?.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(agreement)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="Force Verify"
                          onClick={() => handleForceVerify(agreement.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          title="Revoke Agreement"
                          onClick={() => handleRevokeAgreement(agreement.id)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">
                    {Math.min((currentPage - 1) * itemsPerPage + 1, totalAgreements)}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, totalAgreements)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{totalAgreements}</span>{' '}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          pageNum === currentPage
                            ? 'z-10 bg-sealia-mint border-sealia-mint text-white'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Agreements per Category */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Agreements per Category
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Tenancy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900">
                    45
                  </span>
                  <span className="text-xs text-gray-500">(35%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Services</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900">
                    32
                  </span>
                  <span className="text-xs text-gray-500">(25%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Sales</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900">
                    28
                  </span>
                  <span className="text-xs text-gray-500">(22%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Employment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900">
                    23
                  </span>
                  <span className="text-xs text-gray-500">(18%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Employment Contract Verified
                  </p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Service Agreement Signed
                  </p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Tenancy Agreement Pending
                  </p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agreement Details Drawer */}
      {showDetails && selectedAgreement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  Agreement Details
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Agreement Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">ID:</span>
                      <span className="text-sm font-mono text-gray-900">
                        #{selectedAgreement.id.slice(-8)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Title:</span>
                      <span className="text-sm text-gray-900">
                        {selectedAgreement.title}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          selectedAgreement.status
                        )}`}
                      >
                        {selectedAgreement.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Created:</span>
                      <span className="text-sm text-gray-900">
                        {new Date(
                          selectedAgreement.created_at
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Parties
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-600">Owner:</span>
                      <div className="text-sm text-gray-900">
                        {selectedAgreement.creator?.full_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {selectedAgreement.creator?.email}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Client:</span>
                      <div className="text-sm text-gray-900">
                        {selectedAgreement.signer_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {selectedAgreement.signer_email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Verification */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Security Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Verification ID:
                      </span>
                      <span className="text-sm font-mono text-gray-900">
                        {selectedAgreement.verification_id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        SHA-256 Hash:
                      </span>
                      <span className="text-sm font-mono text-gray-900">
                        a1b2c3d4e5f6...
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Signature Method:
                      </span>
                      <span className="text-sm text-gray-900 flex items-center">
                        {getSignatureMethodIcon(
                          selectedAgreement.signature_method
                        )}{" "}
                        {selectedAgreement.signature_method || "Passcode"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">IP Address:</span>
                      <span className="text-sm font-mono text-gray-900">
                        192.168.1.100
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm text-gray-900 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        Accra, Ghana
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Storage & Access
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Storage:</span>
                      <span className="text-sm text-gray-900">
                        Cloudflare R2
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">File URL:</span>
                      <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Document
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">File Size:</span>
                      <span className="text-sm text-gray-900">2.4 MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Last Accessed:
                      </span>
                      <span className="text-sm text-gray-900">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Log */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Verification Log
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Agreement Verified
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <FileCheck className="h-4 w-4 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Digital Signature Applied
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Agreement Created
                      </p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleForceVerify(selectedAgreement.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Force Verify</span>
                </button>
                <button
                  onClick={() => handleRevokeAgreement(selectedAgreement.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Revoke Agreement</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgreementsPage;
