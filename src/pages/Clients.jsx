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
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { clientsService } from "../services/supabaseApiService";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientDetails, setShowClientDetails] = useState(false);

  useEffect(() => {
    loadClients();
  }, [searchTerm, statusFilter]);

  const loadClients = async () => {
    try {
      setLoading(true);
      const response = await clientsService.getClients({
        searchTerm,
        statusFilter,
      });
      if (response.clients) {
        setClients(response.clients);
      }
    } catch (error) {
      console.error("Error loading clients:", error);
      toast.error("Failed to load clients data");
    } finally {
      setLoading(false);
    }
  };

  const handleViewClient = (client) => {
    setSelectedClient(client);
    setShowClientDetails(true);
  };

  const handleSendMessage = async (clientId) => {
    try {
      // API call to send message to client
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const handleExportClients = async () => {
    try {
      // API call to export clients list
      toast.success("Clients list exported successfully");
    } catch (error) {
      console.error("Error exporting clients:", error);
      toast.error("Failed to export clients");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
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

      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
              <p className="text-sm text-gray-600">
                Manage your client relationships and agreements
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Client</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent">
              <option value="">All Agreements</option>
              <option value="signed">Signed</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-sealia-mint rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-white">
                      {client.name?.charAt(0) || client.email?.charAt(0) || "C"}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {client.name || "No Name"}
                    </h3>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {client.phone || "No phone"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {client.agreementsCount || 0} agreements
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Last active:{" "}
                    {client.lastActive
                      ? new Date(client.lastActive).toLocaleDateString()
                      : "Never"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    client.status
                  )}`}
                >
                  {client.status || "active"}
                </span>
                <div className="flex items-center space-x-1">
                  {client.agreementsCount > 0 && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {client.pendingAgreements > 0 && (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleViewClient(client)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </button>
                <button
                  onClick={() => handleSendMessage(client.id)}
                  className="flex-1 px-3 py-2 text-sm bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center justify-center space-x-1"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {clients.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No clients found
            </h3>
            <p className="text-gray-500 mb-6">
              Start by creating your first client or importing existing
              contacts.
            </p>
            <button className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2 mx-auto">
              <Plus className="h-4 w-4" />
              <span>Add First Client</span>
            </button>
          </div>
        )}

        {/* Client Details Modal */}
        {showClientDetails && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    Client Details
                  </h3>
                  <button
                    onClick={() => setShowClientDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <AlertCircle className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-sealia-mint rounded-full flex items-center justify-center">
                    <span className="text-2xl font-semibold text-white">
                      {selectedClient.name?.charAt(0) ||
                        selectedClient.email?.charAt(0) ||
                        "C"}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">
                      {selectedClient.name || "No Name"}
                    </h4>
                    <p className="text-gray-500">{selectedClient.email}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedClient.phone || "No phone"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        selectedClient.status
                      )}`}
                    >
                      {selectedClient.status || "active"}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Total Agreements
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedClient.agreementsCount || 0}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Last Active
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedClient.lastActive
                        ? new Date(
                            selectedClient.lastActive
                          ).toLocaleDateString()
                        : "Never"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Call</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
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

export default Clients;
