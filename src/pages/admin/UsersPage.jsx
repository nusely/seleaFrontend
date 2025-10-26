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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
// SuperAdminLayout is already provided by SuperAdminDashboard
import toast, { Toaster } from "react-hot-toast";
import superAdminApiService from "../../services/superAdminApiService";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const itemsPerPage = 50;

  useEffect(() => {
    loadUsers();
  }, [currentPage, searchTerm, roleFilter, statusFilter, planFilter, regionFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await superAdminApiService.getUsers({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        role: roleFilter,
        status: statusFilter,
        plan: planFilter,
        region: regionFilter,
      });
      
      if (response.success && response.data) {
        console.log('📊 Users data received:', response.data.users);
        setUsers(response.data.users || []);
        setTotalUsers(response.data.count || 0);
        setTotalPages(Math.ceil((response.data.count || 0) / itemsPerPage));
      }
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await superAdminApiService.updateUser(userId, { role: newRole });
      toast.success("User role updated successfully");
      loadUsers(); // Refresh data
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await superAdminApiService.deleteUser(userId);
      toast.success("User deleted successfully");
      loadUsers(); // Refresh data
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleViewUser = async (userId) => {
    try {
      const response = await superAdminApiService.getUserDetails(userId);
      if (response.success) {
        setSelectedUser(response.data);
        setShowUserDetails(true);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to load user details");
    }
  };

  const handleVerifyUser = async (userId) => {
    try {
      await superAdminApiService.verifyUser(userId);
      toast.success("User verified successfully");
      loadUsers();
    } catch (error) {
      console.error("Error verifying user:", error);
      toast.error("Failed to verify user");
    }
  };

  const handleSuspendUser = async (userId) => {
    try {
      await superAdminApiService.suspendUser(userId);
      toast.success("User suspended successfully");
      loadUsers();
    } catch (error) {
      console.error("Error suspending user:", error);
      toast.error("Failed to suspend user");
    }
  };

  const handleExportUsers = async () => {
    try {
      const response = await superAdminApiService.exportUsers({
        search: searchTerm,
        role: roleFilter,
        status: statusFilter,
        plan: planFilter,
        region: regionFilter,
      });
      
      // Create and download the file
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Users exported successfully");
    } catch (error) {
      console.error("Error exporting users:", error);
      toast.error("Failed to export users");
    }
  };

  const handleCleanupOrphanedUsers = async () => {
    if (!window.confirm(
      "Are you sure you want to clean up orphaned authentication users? This will delete users that exist in Supabase Auth but not in the users table. This action cannot be undone."
    )) {
      return;
    }

    try {
      const response = await superAdminApiService.cleanupOrphanedAuthUsers();
      toast.success(`Cleanup completed: ${response.deleted} users deleted, ${response.errors} errors`);
      loadUsers(); // Refresh the users list
    } catch (error) {
      console.error("Error cleaning up orphaned users:", error);
      toast.error("Failed to clean up orphaned users");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'role':
        setRoleFilter(value);
        break;
      case 'status':
        setStatusFilter(value);
        break;
      case 'plan':
        setPlanFilter(value);
        break;
      case 'region':
        setRegionFilter(value);
        break;
      default:
        break;
    }
    setCurrentPage(1); // Reset to first page when filtering
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
                <h2 className="text-2xl font-bold text-gray-900">All Users</h2>
                <p className="text-sm text-gray-600">
                  Manage user accounts, roles, and activity
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add User</span>
                </button>
                <button 
                  onClick={handleExportUsers}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button 
                  onClick={handleCleanupOrphanedUsers}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                  title="Clean up orphaned authentication users"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Cleanup Auth</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or phone..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => handleFilterChange('role', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              >
                <option value="">All Roles</option>
                <option value="business_owner">Business Owner</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
              <select 
                value={statusFilter}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
              <select 
                value={planFilter}
                onChange={(e) => handleFilterChange('plan', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              >
                <option value="">All Plans</option>
                <option value="free">Free</option>
                <option value="starter">Starter</option>
                <option value="pro">Pro</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscribed Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contracts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-sealia-mint rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {user.full_name?.charAt(0) ||
                              user.email?.charAt(0) ||
                              "U"}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.full_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || "No Name"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.business_name || "No Business"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.phone || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.role || "business_owner"}
                        onChange={(e) =>
                          handleUpdateUserRole(user.id, e.target.value)
                        }
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      >
                        <option value="business_owner">Business Owner</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : user.status === "suspended"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.status || "active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.is_verified ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {user.subscription_plan || "Free"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>{user.contracts_count || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.last_login
                        ? new Date(user.last_login).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewUser(user.id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleVerifyUser(user.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Verify User"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleSuspendUser(user.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Suspend User"
                        >
                          <Shield className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={user.role === "super_admin"}
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4" />
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
                    {Math.min((currentPage - 1) * itemsPerPage + 1, totalUsers)}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, totalUsers)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{totalUsers}</span>{' '}
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

        {/* Quick Actions Panel */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                📊 Export User Analytics
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                📧 Send Bulk Email
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                🔄 Reset All Passwords
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                📱 WhatsApp Broadcast
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              User Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Users</span>
                <span className="font-semibold text-gray-900">
                  {users.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Today</span>
                <span className="font-semibold text-green-600">
                  {users.filter(user => {
                    if (!user.last_login) return false;
                    const lastLogin = new Date(user.last_login);
                    const today = new Date();
                    return lastLogin.toDateString() === today.toDateString();
                  }).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">New This Week</span>
                <span className="font-semibold text-blue-600">
                  {users.filter(user => {
                    if (!user.created_at) return false;
                    const created = new Date(user.created_at);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return created >= weekAgo;
                  }).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Suspended</span>
                <span className="font-semibold text-red-600">
                  {users.filter(user => user.status === 'suspended').length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Filter by Region
            </h3>
            <div className="space-y-2">
              {(() => {
                const regionCounts = users.reduce((acc, user) => {
                  const country = user.country || 'Other';
                  acc[country] = (acc[country] || 0) + 1;
                  return acc;
                }, {});
                
                const total = users.length;
                const regions = Object.entries(regionCounts)
                  .map(([country, count]) => ({
                    country,
                    count,
                    percentage: total > 0 ? Math.round((count / total) * 100) : 0
                  }))
                  .sort((a, b) => b.count - a.count);
                
                const getFlag = (country) => {
                  const flags = {
                    'Ghana': '🇬🇭',
                    'Nigeria': '🇳🇬',
                    'Other': '🌍'
                  };
                  return flags[country] || '🌍';
                };
                
                return regions.map((region, index) => (
                  <button 
                    key={index}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {getFlag(region.country)} {region.country} ({region.percentage}%)
                  </button>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">User Details</h3>
              <button
                onClick={() => setShowUserDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-900">{selectedUser.full_name || 'No Name'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900">{selectedUser.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Role</label>
                  <p className="text-gray-900">{selectedUser.role}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedUser.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedUser.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Verified</label>
                  <div className="flex items-center">
                    {selectedUser.is_verified ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Business Name</label>
                  <p className="text-gray-900">{selectedUser.business_name || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Subscription Plan</label>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {selectedUser.subscription_plan || 'Free'}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Country</label>
                  <p className="text-gray-900">{selectedUser.country || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created At</label>
                  <p className="text-gray-900">
                    {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Login</label>
                  <p className="text-gray-900">
                    {selectedUser.last_login ? new Date(selectedUser.last_login).toLocaleDateString() : 'Never'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowUserDetails(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersPage;
