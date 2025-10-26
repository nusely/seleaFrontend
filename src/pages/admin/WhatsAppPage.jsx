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
} from "lucide-react";
// SuperAdminLayout is already provided by SuperAdminDashboard
import toast, { Toaster } from "react-hot-toast";
import superAdminApiService from "../../services/superAdminApiService";

const WhatsAppPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSessions, setTotalSessions] = useState(0);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [stats, setStats] = useState({
    totalSessions: 0,
    activeSessions: 0,
    messagesToday: 0,
    successRate: 0,
    averageResponseTime: 0
  });

  const itemsPerPage = 50;

  useEffect(() => {
    loadSessions();
    loadStats();
  }, [currentPage, searchTerm, statusFilter, dateFilter]);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const response = await superAdminApiService.getWhatsAppSessions({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        status: statusFilter,
        date_range: dateFilter,
      });
      
      if (response.success && response.data) {
        setSessions(response.data.sessions || []);
        setTotalSessions(response.data.count || 0);
        setTotalPages(Math.ceil((response.data.count || 0) / itemsPerPage));
      } else {
        // Fallback to mock data if API fails
        const mockSessions = [
          {
            id: "sess_001",
            user: "John Doe",
            phone: "+233501234567",
            startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
            duration: "2h 15m",
            status: "completed",
            messagesSent: 12,
            errors: 0,
            conversation: [
              {
                type: "user",
                message: "Hello, I need to create a contract",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
              },
              {
                type: "bot",
                message:
                  "Hi! I can help you create a contract. What type of agreement do you need?",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30000),
              },
              {
                type: "user",
                message: "Employment contract",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 60000),
              },
              {
                type: "bot",
                message:
                  "Great! I'll help you create an employment contract. Please provide the employee's name.",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 90000),
              },
            ],
            triggers: ["/@create", "/@employment"],
            actions: ["fetch_template", "send_verification_link"],
            webhookEvents: [
              {
                event: "message_received",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                status: "success",
              },
              {
                event: "template_fetched",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30000),
                status: "success",
              },
              {
                event: "verification_sent",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 90000),
                status: "success",
              },
            ],
          },
          {
            id: "sess_002",
            user: "Jane Smith",
            phone: "+233509876543",
            startTime: new Date(Date.now() - 45 * 60 * 1000),
            duration: "45m",
            status: "in_progress",
            messagesSent: 8,
            errors: 1,
            conversation: [
              {
                type: "user",
                message: "I want to verify a contract",
                timestamp: new Date(Date.now() - 45 * 60 * 1000),
              },
              {
                type: "bot",
                message:
                  "I can help you verify a contract. Please provide the verification code.",
                timestamp: new Date(Date.now() - 45 * 60 * 1000 + 30000),
              },
            ],
            triggers: ["/@verify"],
            actions: ["request_verification_code"],
            webhookEvents: [
              {
                event: "message_received",
                timestamp: new Date(Date.now() - 45 * 60 * 1000),
                status: "success",
              },
              {
                event: "verification_requested",
                timestamp: new Date(Date.now() - 45 * 60 * 1000 + 30000),
                status: "error",
              },
            ],
          },
        ];
        setSessions(mockSessions);
      }
    } catch (error) {
      console.error("Error loading WhatsApp sessions:", error);
      toast.error("Failed to load WhatsApp sessions");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await superAdminApiService.getWhatsAppStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error("Error loading WhatsApp stats:", error);
    }
  };

  const handleViewDetails = (session) => {
    setSelectedSession(session);
    setShowDetails(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'status':
        setStatusFilter(value);
        break;
      case 'date':
        setDateFilter(value);
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  const handleExportSessions = async () => {
    try {
      const response = await superAdminApiService.exportWhatsAppSessions({
        search: searchTerm,
        status: statusFilter,
        date_range: dateFilter,
      });
      
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `whatsapp-sessions-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("WhatsApp sessions exported successfully");
    } catch (error) {
      console.error("Error exporting sessions:", error);
      toast.error("Failed to export sessions");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <Send className="h-4 w-4 text-blue-500" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "read":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
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
        {/* Header with Search */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  WhatsApp Sessions
                </h2>
                <p className="text-sm text-gray-600">
                  Monitor and troubleshoot WhatsApp bot interactions
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2">
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
                  placeholder="Search by user, phone, or date..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                />
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent">
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="failed">Failed</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent">
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
                    Session ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Messages Sent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Errors
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sessions.map((session) => (
                  <tr
                    key={session.id}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {session.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-sealia-mint rounded-full flex items-center justify-center mr-3">
                          <span className="text-xs font-medium text-white">
                            {session.user.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {session.user}
                          </div>
                          <div className="text-xs text-gray-500">
                            {session.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {session.startTime.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Timer className="h-4 w-4 mr-1 text-gray-400" />
                        {session.duration}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          session.status
                        )}`}
                      >
                        {session.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Send className="h-4 w-4 mr-1 text-blue-500" />
                        {session.messagesSent}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        {session.errors > 0 ? (
                          <XCircle className="h-4 w-4 mr-1 text-red-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                        )}
                        {session.errors}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(session)}
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
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">
              Total Sessions Today
            </h3>
            <p className="text-2xl font-bold text-gray-900">23</p>
            <p className="text-sm text-green-600 mt-1">+12% from yesterday</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">Success Rate</h3>
            <p className="text-2xl font-bold text-gray-900">94.2%</p>
            <p className="text-sm text-green-600 mt-1">+2.1% this week</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <Activity className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">
              Avg Session Duration
            </h3>
            <p className="text-2xl font-bold text-gray-900">1h 23m</p>
            <p className="text-sm text-green-600 mt-1">-5m from last week</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">
              Failed Messages
            </h3>
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-red-600 mt-1">-1 from yesterday</p>
          </div>
        </div>
      </div>

      {/* Session Details Drawer */}
      {showDetails && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  Session Details - {selectedSession.id}
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
              {/* Session Overview */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Session Info
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">User:</span>
                      <span className="text-sm text-gray-900">
                        {selectedSession.user}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Phone:</span>
                      <span className="text-sm text-gray-900">
                        {selectedSession.phone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Duration:</span>
                      <span className="text-sm text-gray-900">
                        {selectedSession.duration}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          selectedSession.status
                        )}`}
                      >
                        {selectedSession.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Message Stats
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Messages Sent:
                      </span>
                      <span className="text-sm text-gray-900">
                        {selectedSession.messagesSent}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Errors:</span>
                      <span className="text-sm text-gray-900">
                        {selectedSession.errors}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        Success Rate:
                      </span>
                      <span className="text-sm text-gray-900">
                        {(
                          ((selectedSession.messagesSent -
                            selectedSession.errors) /
                            selectedSession.messagesSent) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Triggers & Actions
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Triggers:</span>
                      <span className="text-sm text-gray-900">
                        {selectedSession.triggers.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Actions:</span>
                      <span className="text-sm text-gray-900">
                        {selectedSession.actions.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversation Transcript */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Conversation Transcript
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 max-h-48 md:max-h-64 overflow-y-auto">
                  {selectedSession.conversation.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-3 ${
                        msg.type === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-block p-3 rounded-lg max-w-xs ${
                          msg.type === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-900 border"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {msg.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Delivery Report */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Message Delivery Report
                </h4>
                <div className="space-y-2">
                  {selectedSession.messagesSent > 0 && (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-900">
                          Messages Delivered
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-green-600">
                        {selectedSession.messagesSent - selectedSession.errors}
                      </span>
                    </div>
                  )}
                  {selectedSession.errors > 0 && (
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-900">
                          Failed Messages
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-red-600">
                        {selectedSession.errors}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Triggers & Actions */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Triggers Detected
                  </h4>
                  <div className="space-y-2">
                    {selectedSession.triggers.map((trigger, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg"
                      >
                        <Zap className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-900">{trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Bot Actions Executed
                  </h4>
                  <div className="space-y-2">
                    {selectedSession.actions.map((action, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-900">
                          {action.replace("_", " ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Webhook Event Logs */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Webhook Event Logs
                </h4>
                <div className="space-y-2">
                  {selectedSession.webhookEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {event.status === "success" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {event.event}
                          </p>
                          <p className="text-xs text-gray-500">
                            {event.timestamp.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          event.status === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppPage;
