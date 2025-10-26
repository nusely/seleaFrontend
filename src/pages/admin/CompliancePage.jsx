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
  Send,
  CheckCircle2,
  XCircle,
  Timer,
  Zap,
  PieChart,
  TrendingDown,
  Brain,
  Cpu,
  Code,
  TestTube,
  Save,
  Copy,
  BookOpen,
  DollarSign as Dollar,
  Users as UsersIcon,
  History,
  Key,
  Database as DatabaseIcon,
  Globe as GlobeIcon,
  Shield as FileShield,
  UserCheck as UserCheckIcon,
  AlertTriangle as AlertTriangleIcon,
  CheckCircle as CheckCircleIcon,
} from "lucide-react";
// SuperAdminLayout is already provided by SuperAdminDashboard
import toast, { Toaster } from "react-hot-toast";
import superAdminApiService from "../../services/superAdminApiService";

const CompliancePage = () => {
  const [complianceData, setComplianceData] = useState({
    auditLogs: [],
    securityEvents: [],
    dataRetention: {
      policy_name: 'Default Policy',
      retention_days: 90,
      last_cleanup: new Date().toISOString(),
      next_cleanup: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    stats: {
      totalAuditEvents: 0,
      totalSecurityEvents: 0,
      eventsLast30Days: 0,
      highSeverityEvents: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showRetentionModal, setShowRetentionModal] = useState(false);
  const [retentionSettings, setRetentionSettings] = useState({
    retention_days: 90,
    policy_name: 'Default Policy',
    notifications_enabled: true
  });

  useEffect(() => {
    loadComplianceData();
  }, []);

  const loadComplianceData = async () => {
    try {
      setLoading(true);
      const response = await superAdminApiService.getComplianceData({
        page: currentPage,
        limit: 50,
        search: searchTerm,
        action_filter: actionFilter,
        date_filter: dateFilter
      });

      if (response.success && response.data) {
        setComplianceData({
          auditLogs: response.data.auditLogs || [],
          securityEvents: response.data.securityEvents || [],
          dataRetention: response.data.dataRetention || {
            policy_name: 'Default Policy',
            retention_days: 90,
            last_cleanup: new Date().toISOString(),
            next_cleanup: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            notifications_enabled: true
          },
          stats: response.data.stats || {
            totalAuditEvents: 0,
            totalSecurityEvents: 0,
            eventsLast30Days: 0,
            highSeverityEvents: 0
          }
        });
        setTotalPages(Math.ceil((response.data.stats?.totalAuditEvents || 0) / 50));
      } else {
        console.error('Compliance API error:', response.error);
        // Use fallback data instead of throwing error
        setComplianceData(prev => ({
          ...prev,
          auditLogs: [],
          securityEvents: [],
          stats: {
            totalAuditEvents: 0,
            totalSecurityEvents: 0,
            eventsLast30Days: 0,
            highSeverityEvents: 0
          }
        }));
      }
    } catch (error) {
      console.error("Error loading compliance data:", error);
      toast.error("Failed to load compliance data");
      // Fallback to mock data
      setComplianceData(prev => ({
        ...prev,
        auditLogs: [
          {
            id: "audit_001",
            action: "data_access",
            resource_type: "user_profile",
            user_id: null,
            ip_address: "192.168.1.1",
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            users: { first_name: "Admin", last_name: "User", business_name: "System" }
          },
          {
            id: "audit_002",
            action: "security_scan",
            resource_type: "system",
            user_id: null,
            ip_address: "127.0.0.1",
            created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            users: null
          }
        ],
        securityEvents: [
          {
            id: "sec_001",
            event_type: "failed_login",
            severity: "high",
            description: "Multiple failed login attempts detected",
            ip_address: "192.168.1.100",
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            users: null
          }
        ]
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = async () => {
    try {
      await superAdminApiService.exportComplianceReport({
        format: 'csv',
        date_range: dateFilter || '30'
      });
      toast.success("Compliance report exported successfully");
    } catch (error) {
      console.error("Error exporting report:", error);
      toast.error("Failed to export compliance report");
    }
  };

  const handleRunDataCleanup = async () => {
    try {
      const response = await superAdminApiService.runDataCleanup();
      if (response.success) {
        toast.success("Data cleanup completed successfully");
        loadComplianceData();
      } else {
        throw new Error(response.error || 'Cleanup failed');
      }
    } catch (error) {
      console.error("Error running data cleanup:", error);
      toast.error("Failed to run data cleanup");
    }
  };

  const handleUpdateRetentionPolicy = async () => {
    try {
      const response = await superAdminApiService.updateRetentionPolicy(retentionSettings);
      if (response.success) {
        toast.success("Retention policy updated successfully");
        setShowRetentionModal(false);
        loadComplianceData();
      } else {
        throw new Error(response.error || 'Update failed');
      }
    } catch (error) {
      console.error("Error updating retention policy:", error);
      toast.error("Failed to update retention policy");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'action':
        setActionFilter(value);
        break;
      case 'date':
        setDateFilter(value);
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    loadComplianceData();
  }, [currentPage, searchTerm, actionFilter, dateFilter]);

  const handleViewEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case "data_access":
        return "bg-blue-100 text-blue-800";
      case "security_scan":
        return "bg-green-100 text-green-800";
      case "data_export":
        return "bg-purple-100 text-purple-800";
      case "breach_attempt":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
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
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Compliance & Security Center
              </h2>
              <p className="text-sm text-gray-600">
                Ensure legal compliance, privacy, and security of user data
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleExportReport}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
              <button
                onClick={handleRunDataCleanup}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Run Cleanup</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">
              System Encryption
            </h3>
            <p className="text-2xl font-bold text-gray-900">Active</p>
            <p className="text-sm text-green-600 mt-1">Cloudflare + Supabase</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileShield className="h-6 w-6 text-blue-600" />
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">Audit Events</h3>
            <p className="text-2xl font-bold text-gray-900">
              {complianceData?.stats?.totalAuditEvents || 0}
            </p>
            <p className="text-sm text-green-600 mt-1">Total events</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DatabaseIcon className="h-6 w-6 text-purple-600" />
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">
              Data Retention
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {complianceData?.dataRetention?.retention_days || 0} days
            </p>
            <p className="text-sm text-green-600 mt-1">Automatic cleanup</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <GlobeIcon className="h-6 w-6 text-orange-600" />
              </div>
              {(complianceData?.stats?.highSeverityEvents || 0) > 0 ? (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
            <h3 className="text-sm font-medium text-gray-600">Security Events</h3>
            <p className="text-2xl font-bold text-gray-900">
              {complianceData?.stats?.totalSecurityEvents || 0}
            </p>
            <p className={`text-sm mt-1 ${
              (complianceData?.stats?.highSeverityEvents || 0) > 0 
                ? 'text-red-600' 
                : 'text-green-600'
            }`}>
              {complianceData?.stats?.highSeverityEvents || 0} high severity
            </p>
          </div>
        </div>

        {/* Privacy Alignment */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Privacy Alignment Status
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">
                Malabo Convention
              </h4>
              <p className="text-2xl font-bold text-green-600">
                {complianceData?.privacyAlignment?.malabo?.score || 0}%
              </p>
              <p className="text-xs text-gray-500">Compliant</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">
                DPC Act (Act 843)
              </h4>
              <p className="text-2xl font-bold text-green-600">
                {complianceData?.privacyAlignment?.dpc?.score || 0}%
              </p>
              <p className="text-xs text-gray-500">Compliant</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">GDPR-like</h4>
              <p className="text-2xl font-bold text-green-600">
                {complianceData?.privacyAlignment?.gdpr?.score || 0}%
              </p>
              <p className="text-xs text-gray-500">Compliant</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={actionFilter}
                onChange={(e) => handleFilterChange('action', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              >
                <option value="">All Actions</option>
                <option value="create">Create</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
                <option value="export">Export</option>
              </select>
              <select
                value={dateFilter}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              >
                <option value="">All Time</option>
                <option value="1">Last 24 hours</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audit Log */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Audit Log ({(complianceData?.auditLogs?.length || 0)} Events)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Security Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(complianceData?.auditLogs || []).map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {event.id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEventTypeColor(
                          event.action
                        )}`}
                      >
                        {event.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.resource_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.users ? `${event.users.first_name} ${event.users.last_name}` : 'System'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.ip_address || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(event.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          event.security_level === "high"
                            ? "bg-red-100 text-red-800"
                            : event.security_level === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {event.security_level || "medium"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewEventDetails(event)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Data Retention Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Data Retention Settings
            </h3>
            <button
              onClick={() => setShowRetentionModal(true)}
              className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>Configure Policy</span>
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Policy Name
              </label>
              <p className="text-sm text-gray-900">{complianceData?.dataRetention?.policy_name || 'Default Policy'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retention Period
              </label>
              <p className="text-sm text-gray-900">{complianceData?.dataRetention?.retention_days || 0} days</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Cleanup
              </label>
              <p className="text-sm text-gray-900">
                {complianceData?.dataRetention?.last_cleanup ? new Date(complianceData.dataRetention.last_cleanup).toLocaleDateString() : 'Never'}
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center space-x-4">
            <button 
              onClick={handleRunDataCleanup}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Run Cleanup Now</span>
            </button>
            <button 
              onClick={handleExportReport}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  Event Details
                </h3>
                <button
                  onClick={() => setShowEventDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Event ID
                  </label>
                  <p className="text-sm text-gray-900 font-mono">
                    {selectedEvent.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEventTypeColor(
                      selectedEvent.type
                    )}`}
                  >
                    {selectedEvent.type.replace("_", " ")}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedEvent.date.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedEvent.status === "resolved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedEvent.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <p className="text-sm text-gray-900">
                  {selectedEvent.description}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Resolved By
                </label>
                <p className="text-sm text-gray-900">
                  {selectedEvent.resolvedBy}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Retention Policy Modal */}
      {showRetentionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  Configure Data Retention Policy
                </h3>
                <button
                  onClick={() => setShowRetentionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Policy Name
                </label>
                <input
                  type="text"
                  value={retentionSettings.policy_name}
                  onChange={(e) => setRetentionSettings({...retentionSettings, policy_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                  placeholder="Enter policy name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retention Period (Days)
                </label>
                <input
                  type="number"
                  value={retentionSettings.retention_days}
                  onChange={(e) => setRetentionSettings({...retentionSettings, retention_days: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                  min="1"
                  max="3650"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Data older than this period will be automatically cleaned up
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-xs text-gray-500">Notify before cleanup</p>
                </div>
                <button
                  onClick={() => setRetentionSettings({...retentionSettings, notifications_enabled: !retentionSettings.notifications_enabled})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    retentionSettings.notifications_enabled
                      ? "bg-sealia-mint"
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      retentionSettings.notifications_enabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowRetentionModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateRetentionPolicy}
                  className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Policy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompliancePage;
