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
  Mail,
  Phone,
  Wifi,
  WifiOff,
  ServerCrash,
  DollarSign as DollarIcon,
  UserPlus,
  FileText as FileTextIcon,
} from "lucide-react";
// SuperAdminLayout is already provided by SuperAdminDashboard
import toast, { Toaster } from "react-hot-toast";
import superAdminApiService from "../../services/superAdminApiService";

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [notificationStats, setNotificationStats] = useState({
    total: 0,
    unread: 0,
    byType: { system: 0, billing: 0, verification: 0, user: 0, security: 0 },
    byPriority: { high: 0, medium: 0, low: 0 }
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: {
      downtime: true,
      payments: true,
      newUsers: true,
      security: true,
      system: true,
    },
    whatsappHealth: {
      apiStatus: "healthy",
      lastCheck: new Date().toISOString(),
      issues: [],
    },
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'system',
    priority: 'medium',
    user_id: null
  });

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const response = await superAdminApiService.getNotifications({
        page: currentPage,
        limit: 20,
        type: activeTab === 'all' ? '' : activeTab,
        search: searchTerm,
        priority: priorityFilter
      });

      if (response.success && response.data) {
        setNotifications(response.data.notifications || []);
        setNotificationStats(response.data.stats || {
          total: 0,
          unread: 0,
          byType: { system: 0, billing: 0, verification: 0, user: 0, security: 0 },
          byPriority: { high: 0, medium: 0, low: 0 }
        });
        setTotalPages(response.data.pagination?.pages || 1);
      } else {
        throw new Error(response.error || 'Failed to fetch notifications');
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
      toast.error("Failed to load notifications");
      // Fallback to mock data
      setNotifications([
        {
          id: "notif_001",
          type: "system",
          title: "System Maintenance Scheduled",
          message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM UTC",
          created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          is_read: false,
          priority: "high",
        },
        {
          id: "notif_002",
          type: "billing",
          title: "Payment Received",
          message: "Payment of $29.99 received from John Doe for Premium Plan",
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          is_read: false,
          priority: "medium",
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadNotificationSettings = async () => {
    try {
      const response = await superAdminApiService.getNotificationSettings();
      if (response.success && response.data) {
        setNotificationSettings(response.data);
      }
    } catch (error) {
      console.error("Error loading notification settings:", error);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const response = await superAdminApiService.markNotificationAsRead(notificationId);
      if (response.success) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === notificationId ? { ...notif, is_read: true } : notif
          )
        );
        toast.success("Notification marked as read");
      } else {
        throw new Error(response.error || 'Failed to mark as read');
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await superAdminApiService.markAllNotificationsAsRead();
      if (response.success) {
        setNotifications((prev) =>
          prev.map((notif) => ({ ...notif, is_read: true }))
        );
        toast.success("All notifications marked as read");
      } else {
        throw new Error(response.error || 'Failed to mark all as read');
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast.error("Failed to mark all notifications as read");
    }
  };

  const handleCreateNotification = async () => {
    try {
      const response = await superAdminApiService.createNotification(newNotification);
      if (response.success) {
        toast.success("Notification created successfully");
        setShowCreateModal(false);
        setNewNotification({ title: '', message: '', type: 'system', priority: 'medium', user_id: null });
        loadNotifications();
      } else {
        throw new Error(response.error || 'Failed to create notification');
      }
    } catch (error) {
      console.error("Error creating notification:", error);
      toast.error("Failed to create notification");
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      const response = await superAdminApiService.deleteNotification(notificationId);
      if (response.success) {
        setNotifications((prev) => prev.filter(notif => notif.id !== notificationId));
        toast.success("Notification deleted successfully");
      } else {
        throw new Error(response.error || 'Failed to delete notification');
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification");
    }
  };

  const handleUpdateSettings = async () => {
    try {
      const response = await superAdminApiService.updateNotificationSettings(notificationSettings);
      if (response.success) {
        toast.success("Notification settings updated successfully");
      } else {
        throw new Error(response.error || 'Failed to update settings');
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update notification settings");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'priority':
        setPriorityFilter(value);
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    loadNotifications();
    loadNotificationSettings();
  }, [currentPage, activeTab, searchTerm, priorityFilter]);

  const getNotificationTypeColor = (type) => {
    switch (type) {
      case "system":
        return "bg-blue-100 text-blue-800";
      case "billing":
        return "bg-green-100 text-green-800";
      case "verification":
        return "bg-purple-100 text-purple-800";
      case "user":
        return "bg-orange-100 text-orange-800";
      case "security":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
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

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "all") return true;
    return notif.type === activeTab;
  });

  const unreadCount = notifications.filter((notif) => !notif.read).length;

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
                Notifications Center
              </h2>
              <p className="text-sm text-gray-600">
                Centralize all system and activity notifications
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Mark All Read</span>
              </button>
              <button className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={priorityFilter}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              >
                <option value="">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Create</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "all", name: "All", count: notificationStats?.total || 0 },
                {
                  id: "system",
                  name: "System",
                  count: notificationStats?.byType?.system || 0,
                },
                {
                  id: "billing",
                  name: "Billing",
                  count: notificationStats?.byType?.billing || 0,
                },
                {
                  id: "verification",
                  name: "Verification",
                  count: notificationStats?.byType?.verification || 0,
                },
                {
                  id: "user",
                  name: "User",
                  count: notificationStats?.byType?.user || 0,
                },
                {
                  id: "security",
                  name: "Security",
                  count: notificationStats?.byType?.security || 0,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-sealia-mint text-sealia-mint"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span>{tab.name}</span>
                  {tab.count > 0 && (
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                        activeTab === tab.id
                          ? "bg-sealia-mint text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Notification Cards */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl border border-gray-200 p-6 ${
                !notification.is_read ? "border-l-4 border-l-sealia-mint" : ""
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    notification.type === "system"
                      ? "bg-blue-100"
                      : notification.type === "billing"
                      ? "bg-green-100"
                      : notification.type === "verification"
                      ? "bg-purple-100"
                      : notification.type === "user"
                      ? "bg-orange-100"
                      : "bg-red-100"
                  }`}
                >
                  {notification.type === "system" && <ServerCrash className="h-5 w-5 text-blue-600" />}
                  {notification.type === "billing" && <DollarIcon className="h-5 w-5 text-green-600" />}
                  {notification.type === "verification" && <CheckCircle className="h-5 w-5 text-purple-600" />}
                  {notification.type === "user" && <UserPlus className="h-5 w-5 text-orange-600" />}
                  {notification.type === "security" && <Shield className="h-5 w-5 text-red-600" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getNotificationTypeColor(
                          notification.type
                        )}`}
                      >
                        {notification.type}
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                          notification.priority
                        )}`}
                      >
                        {notification.priority}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-2">
                      {!notification.is_read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-xs text-sealia-mint hover:text-sealia-mint/80 font-medium"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="text-xs text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4">
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

        {/* WhatsApp Health Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            WhatsApp Health Status
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  notificationSettings?.whatsappHealth?.apiStatus === "healthy"
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                {notificationSettings?.whatsappHealth?.apiStatus === "healthy" ? (
                  <Wifi className="h-8 w-8 text-green-600" />
                ) : (
                  <WifiOff className="h-8 w-8 text-red-600" />
                )}
              </div>
              <h4 className="text-sm font-medium text-gray-900">API Status</h4>
              <p
                className={`text-2xl font-bold ${
                  notificationSettings?.whatsappHealth?.apiStatus === "healthy"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {notificationSettings?.whatsappHealth?.apiStatus || "Unknown"}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">Last Check</h4>
              <p className="text-sm text-gray-600">
                {notificationSettings?.whatsappHealth?.lastCheck?.toLocaleString() || "Never"}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">Issues</h4>
              <p className="text-2xl font-bold text-orange-600">
                {notificationSettings?.whatsappHealth?.issues?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Notification Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Alerts for Downtime
                </label>
                <p className="text-xs text-gray-500">
                  Receive email notifications when system is down
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings?.emailAlerts?.downtime
                    ? "bg-sealia-mint"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings?.emailAlerts?.downtime
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Alerts for Payments
                </label>
                <p className="text-xs text-gray-500">
                  Receive email notifications for payment events
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings?.emailAlerts?.payments
                    ? "bg-sealia-mint"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings?.emailAlerts?.payments
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Alerts for New Users
                </label>
                <p className="text-xs text-gray-500">
                  Receive email notifications when new users join
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings?.emailAlerts?.newUsers
                    ? "bg-sealia-mint"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings?.emailAlerts?.newUsers
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Alerts for Security
                </label>
                <p className="text-xs text-gray-500">
                  Receive email notifications for security events
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings?.emailAlerts?.security
                    ? "bg-sealia-mint"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings?.emailAlerts?.security
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-4">
            <button
              onClick={handleUpdateSettings}
              className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Create Notification Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  Create New Notification
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                  placeholder="Enter notification title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                  rows="3"
                  placeholder="Enter notification message"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={newNotification.type}
                    onChange={(e) => setNewNotification({...newNotification, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                  >
                    <option value="system">System</option>
                    <option value="billing">Billing</option>
                    <option value="verification">Verification</option>
                    <option value="user">User</option>
                    <option value="security">Security</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={newNotification.priority}
                    onChange={(e) => setNewNotification({...newNotification, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateNotification}
                  className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Notification</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationsPage;
