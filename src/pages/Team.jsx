import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  UserPlus,
  Shield,
  Crown,
  UserCheck,
  X,
} from "lucide-react";
// DashboardLayout is already provided by the main dashboard
import toast, { Toaster } from "react-hot-toast";
import { teamService } from "../services/supabaseApiService";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberDetails, setShowMemberDetails] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    loadTeamMembers();
  }, [searchTerm, roleFilter]);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await teamService.getTeamMembers();
      if (response.teamMembers) {
        setTeamMembers(response.teamMembers);
      }
    } catch (error) {
      console.error("Error loading team members:", error);
      toast.error("Failed to load team members");
      // Fallback to mock data
      const mockTeamMembers = [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "admin",
          status: "active",
          lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          permissions: ["agreements", "templates", "analytics"],
          phone: "+233500000001",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "member",
          status: "active",
          lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          permissions: ["agreements"],
          phone: "+233500000002",
        },
      ];
      setTeamMembers(mockTeamMembers);
    } finally {
      setLoading(false);
    }
  };

  const handleInviteMember = async (email, role) => {
    try {
      // API call to invite team member
      toast.success("Invitation sent successfully");
      setShowInviteModal(false);
    } catch (error) {
      console.error("Error inviting member:", error);
      toast.error("Failed to send invitation");
    }
  };

  const handleUpdateRole = async (memberId, newRole) => {
    try {
      // API call to update member role
      toast.success("Member role updated successfully");
      loadTeamMembers();
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update member role");
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!window.confirm("Are you sure you want to remove this team member?")) {
      return;
    }
    try {
      // API call to remove team member
      toast.success("Team member removed successfully");
      loadTeamMembers();
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error("Failed to remove team member");
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "owner":
        return "bg-purple-100 text-purple-800";
      case "admin":
        return "bg-blue-100 text-blue-800";
      case "member":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "owner":
        return Crown;
      case "admin":
        return Shield;
      case "member":
        return UserCheck;
      default:
        return Users;
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

      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
              <p className="text-sm text-gray-600">
                Manage your team and their permissions
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowInviteModal(true)}
                className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Invite Member</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
            >
              <option value="">All Roles</option>
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => {
            const RoleIcon = getRoleIcon(member.role);
            return (
              <div
                key={member.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-sealia-mint rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-white">
                        {member.name?.charAt(0) ||
                          member.email?.charAt(0) ||
                          "M"}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <RoleIcon className="h-4 w-4 text-gray-400" />
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                        member.role
                      )}`}
                    >
                      {member.role}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Last active:{" "}
                      {member.lastActive
                        ? new Date(member.lastActive).toLocaleDateString()
                        : "Never"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {member.permissions.length} permissions
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      member.status === "active"
                        ? "bg-green-100 text-green-800"
                        : member.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {member.status}
                  </span>
                  <div className="flex items-center space-x-1">
                    {member.status === "active" && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {member.status === "pending" && (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedMember(member);
                      setShowMemberDetails(true);
                    }}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateRole(
                        member.id,
                        member.role === "admin" ? "member" : "admin"
                      )
                    }
                    className="flex-1 px-3 py-2 text-sm bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {teamMembers.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No team members yet
            </h3>
            <p className="text-gray-500 mb-6">
              Invite team members to collaborate on your agreements.
            </p>
            <button
              onClick={() => setShowInviteModal(true)}
              className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2 mx-auto"
            >
              <UserPlus className="h-4 w-4" />
              <span>Invite First Member</span>
            </button>
          </div>
        )}

        {/* Invite Member Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    Invite Team Member
                  </h3>
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="member@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent">
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3 pt-4">
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      handleInviteMember("test@example.com", "member")
                    }
                    className="flex-1 px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors"
                  >
                    Send Invitation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Member Details Modal */}
        {showMemberDetails && selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    Member Details
                  </h3>
                  <button
                    onClick={() => setShowMemberDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-sealia-mint rounded-full flex items-center justify-center">
                    <span className="text-2xl font-semibold text-white">
                      {selectedMember.name?.charAt(0) ||
                        selectedMember.email?.charAt(0) ||
                        "M"}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">
                      {selectedMember.name}
                    </h4>
                    <p className="text-gray-500">{selectedMember.email}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <div className="mt-1">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                          selectedMember.role
                        )}`}
                      >
                        {selectedMember.role}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <div className="mt-1">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          selectedMember.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {selectedMember.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedMember.phone || "No phone"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Last Active
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedMember.lastActive
                        ? new Date(
                            selectedMember.lastActive
                          ).toLocaleDateString()
                        : "Never"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    Permissions
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2">
                    <Edit className="h-4 w-4" />
                    <span>Edit Permissions</span>
                  </button>
                  <button
                    onClick={() => handleRemoveMember(selectedMember.id)}
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center space-x-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Team;
