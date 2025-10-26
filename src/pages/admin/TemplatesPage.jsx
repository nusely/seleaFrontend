import React, { useState, useEffect, useRef } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
  User,
  History
} from "lucide-react";
// SuperAdminLayout is already provided by SuperAdminDashboard
import toast, { Toaster } from "react-hot-toast";
import superAdminApiService from "../../services/superAdminApiService";

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTemplates, setTotalTemplates] = useState(0);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editorMode, setEditorMode] = useState("edit"); // edit, preview
  const [showAddModal, setShowAddModal] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [stats, setStats] = useState({
    totalTemplates: 0,
    activeTemplates: 0,
    totalUsage: 0,
    topUsedTemplates: []
  });

  // Ref for ReactQuill to avoid findDOMNode warning
  const quillRef = useRef(null);
  const [editorContent, setEditorContent] = useState('');

  const itemsPerPage = 50;

  useEffect(() => {
    loadTemplates();
    loadStats();
  }, [currentPage, searchTerm, categoryFilter, statusFilter, sortBy, sortOrder]);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const response = await superAdminApiService.getTemplates({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        category: categoryFilter,
        status: statusFilter,
        sort_by: sortBy,
        sort_order: sortOrder,
      });
      
      if (response && response.success && response.data) {
        setTemplates(response.data.templates || []);
        setTotalTemplates(response.data.count || 0);
        setTotalPages(Math.ceil((response.data.count || 0) / itemsPerPage));
      } else {
        // Fallback to mock data if API fails
        const mockTemplates = [
          {
            id: "tpl_001",
            name: "Employment Contract",
            category: "Employment",
            // Removed basePrice - Super Admin doesn't need pricing info
            createdBy: "Admin User",
            usageCount: 45,
            status: "active",
            content:
              "This Employment Agreement is made between [company_name] and [employee_name]...",
            variables: [
              "company_name",
              "employee_name",
              "position",
              "salary",
              "start_date",
            ],
            accessLevel: "premium",
            version: "v2.1.0",
            lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          },
          {
            id: "tpl_002",
            name: "Service Agreement",
            category: "Services",
            // Removed basePrice - Super Admin doesn't need pricing info
            createdBy: "Admin User",
            usageCount: 32,
            status: "active",
            content:
              "This Service Agreement is entered into between [service_provider] and [client_name]...",
            variables: [
              "service_provider",
              "client_name",
              "service_description",
              "duration",
              "payment_terms",
            ],
            accessLevel: "public",
            version: "v1.8.2",
            lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          },
          {
            id: "tpl_003",
            name: "Tenancy Agreement",
            category: "Tenancy",
            // Removed basePrice - Super Admin doesn't need pricing info
            createdBy: "Admin User",
            usageCount: 28,
            status: "active",
            content:
              "This Tenancy Agreement is made between [landlord_name] and [tenant_name]...",
            variables: [
              "landlord_name",
              "tenant_name",
              "property_address",
              "rent_amount",
              "lease_duration",
            ],
            accessLevel: "premium",
            version: "v1.5.1",
            lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        ];
        setTemplates(mockTemplates);
        toast.error("Failed to load templates. Using mock data.");
      }
    } catch (error) {
      console.error("Error loading templates:", error);
      toast.error("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setEditorContent(template?.content || '');
    setEditorMode("edit");
    setShowTemplateEditor(true);
  };

  const handleSaveTemplate = async () => {
    try {
      const templateData = {
        ...selectedTemplate,
        content: editorContent
      };
      
      if (selectedTemplate.id) {
        // Update existing template
        await superAdminApiService.updateTemplate(selectedTemplate.id, templateData);
        toast.success("Template updated successfully");
      } else {
        // Create new template
        await superAdminApiService.createTemplate(templateData);
        toast.success("Template created successfully");
      }
      setShowTemplateEditor(false);
      setSelectedTemplate(null);
      setEditorContent('');
      loadTemplates();
    } catch (error) {
      console.error("Error saving template:", error);
      toast.error("Failed to save template");
    }
  };

  const loadStats = async () => {
    try {
      const response = await superAdminApiService.getTemplateStats();
      if (response && response.success && response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error("Error loading template stats:", error);
      // Set default stats if API fails
      setStats({
        totalTemplates: 0,
        activeTemplates: 0,
        totalUsage: 0,
        topUsedTemplates: []
      });
    }
  };

  const handleDeleteTemplate = async (templateId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this template? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await superAdminApiService.deleteTemplate(templateId);
      toast.success("Template deleted successfully");
      loadTemplates();
    } catch (error) {
      console.error("Error deleting template:", error);
      toast.error("Failed to delete template");
    }
  };

  const handleViewTemplate = (template) => {
    setSelectedTemplate(template);
    setEditorMode("preview");
    setShowTemplateEditor(true);
  };

  const handleAddTemplate = () => {
    setSelectedTemplate({
      id: null,
      name: "",
      category: "",
      content: "",
      variables: [],
      status: "active"
    });
    setEditorContent('');
    setEditorMode("edit");
    setShowAddModal(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'category':
        setCategoryFilter(value);
        break;
      case 'status':
        setStatusFilter(value);
        break;
      case 'sort':
        setSortBy(value);
        break;
      case 'order':
        setSortOrder(value);
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  const handleExportTemplates = async () => {
    try {
      const response = await superAdminApiService.exportTemplates({
        search: searchTerm,
        category: categoryFilter,
        status: statusFilter,
      });
      
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `templates-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Templates exported successfully");
    } catch (error) {
      console.error("Error exporting templates:", error);
      toast.error("Failed to export templates");
    }
  };

  const handleViewVersionHistory = (template) => {
    setSelectedTemplate(template);
    setShowVersionHistory(true);
  };


  const getAccessLevelColor = (level) => {
    switch (level) {
      case "public":
        return "bg-green-100 text-green-800";
      case "premium":
        return "bg-blue-100 text-blue-800";
      case "restricted":
        return "bg-red-100 text-red-800";
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

  try {
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
                  Agreement Templates
                </h2>
                <p className="text-sm text-gray-600">
                  Control all contract templates available across users
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => setShowTemplateEditor(true)}
                  className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Template</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              >
                <option value="">All Categories</option>
                <option value="Employment">Employment</option>
                <option value="Services">Services</option>
                <option value="Tenancy">Tenancy</option>
                <option value="Sales">Sales</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent">
                <option value="">All Access Levels</option>
                <option value="public">Public</option>
                <option value="premium">Premium</option>
                <option value="restricted">Restricted</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Template Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Access Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {templates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {template.template_code || template.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {template.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        v{template.version}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {template.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-green-500" />
                        {template.createdBy}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <UsersIcon className="h-4 w-4 mr-1 text-blue-500" />
                        {template.usageCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccessLevelColor(
                          template.accessLevel
                        )}`}
                      >
                        {template.accessLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditTemplate(template)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit Template"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleViewTemplate(template)}
                          className="text-green-600 hover:text-green-900"
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleViewVersionHistory(template)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Version History"
                        >
                          <History className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Template"
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
        </div>

        {/* Analytics Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Used Templates */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top Used Templates
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Employment Contract
                    </p>
                    <p className="text-xs text-gray-500">45 uses</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900">45</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Service Agreement
                    </p>
                    <p className="text-xs text-gray-500">32 uses</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900">32</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Tenancy Agreement
                    </p>
                    <p className="text-xs text-gray-500">28 uses</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900">28</span>
              </div>
            </div>
          </div>

          {/* Template Performance */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Template Performance
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Templates</span>
                <span className="font-semibold text-gray-900">
                  {templates.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Templates</span>
                <span className="font-semibold text-green-600">
                  {templates.filter((t) => t.status === "active").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Usage</span>
                <span className="font-semibold text-blue-600">
                  {templates.reduce((sum, t) => sum + (t.usageCount || 0), 0)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Avg Usage per Template
                </span>
                <span className="font-semibold text-purple-600">
                  {Math.round(
                    templates.reduce((sum, t) => sum + t.usageCount, 0) /
                      templates.length
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Editor Modal */}
      {showTemplateEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedTemplate ? "Edit Template" : "Add New Template"}
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditorMode("edit")}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        editorMode === "edit"
                          ? "bg-sealia-mint text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setEditorMode("preview")}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        editorMode === "preview"
                          ? "bg-sealia-mint text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                  <button
                    onClick={() => setShowTemplateEditor(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {editorMode === "preview" ? (
                /* PDF-like Document Preview */
                <div className="bg-white border border-gray-300 rounded-lg shadow-lg">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-300 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <File className="h-5 w-5 text-gray-600" />
                        <span className="font-medium text-gray-900">{selectedTemplate?.name || 'Template Preview'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Category: {selectedTemplate?.category || 'N/A'}</span>
                        <span>•</span>
                        <span>Status: {selectedTemplate?.status || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                        <Download className="h-4 w-4 inline mr-1" />
                        Download PDF
                      </button>
                      <button className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">
                        <ExternalLink className="h-4 w-4 inline mr-1" />
                        Print
                      </button>
                    </div>
                  </div>
                  
                  {/* Document Content - PDF-like View */}
                  <div className="p-8 bg-white min-h-[600px]">
                    <div className="max-w-4xl mx-auto">
                      {/* Document Header */}
                      <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                          {selectedTemplate?.name || 'Document Title'}
                        </h1>
                        <div className="text-sm text-gray-600">
                          <p>Category: {selectedTemplate?.category || 'General'}</p>
                          <p>Created: {selectedTemplate?.created_at ? new Date(selectedTemplate.created_at).toLocaleDateString() : 'N/A'}</p>
                        </div>
                      </div>
                      
                      {/* Document Body */}
                      <div className="prose prose-lg max-w-none">
                        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                          {selectedTemplate?.content || 'No content available'}
                        </div>
                      </div>
                      
                      {/* Document Footer */}
                      <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <div>
                            <p>Template Code: {selectedTemplate?.template_code || selectedTemplate?.id || 'N/A'}</p>
                            <p>Usage Count: {selectedTemplate?.usage_count || 0}</p>
                          </div>
                          <div className="text-right">
                            <p>Generated on: {new Date().toLocaleDateString()}</p>
                            <p>Sealia Document Management System</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Template Editor Form */
                <>
                  {/* Template Basic Info */}
                  <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Name
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedTemplate?.name || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                    placeholder="Enter template name..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent">
                    <option value="Employment">Employment</option>
                    <option value="Services">Services</option>
                    <option value="Tenancy">Tenancy</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Variables
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedTemplate?.variables?.join(", ") || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                    placeholder="Enter template variables (comma separated)"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Access Level
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent">
                    <option value="public">Public</option>
                    <option value="premium">Premium</option>
                    <option value="restricted">Restricted</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                    placeholder="Enter template description..."
                  />
                </div>
              </div>

              {/* Template Content Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Content
                </label>
                {editorMode === "edit" ? (
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    {/* ReactQuill Rich Text Editor */}
                    <ReactQuill
                      ref={quillRef}
                      theme="snow"
                      value={editorContent}
                      onChange={setEditorContent}
                      placeholder="Enter template content with variables like [company_name], [employee_name], etc..."
                      style={{ minHeight: '300px' }}
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ 'color': [] }, { 'background': [] }],
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                          [{ 'indent': '-1'}, { 'indent': '+1' }],
                          [{ 'align': [] }],
                          ['link', 'image'],
                          ['clean']
                        ]
                      }}
                      formats={[
                        'header', 'font', 'size',
                        'bold', 'italic', 'underline', 'strike', 'blockquote',
                        'list', 'bullet', 'indent',
                        'link', 'image', 'color', 'background',
                        'align', 'direction'
                      ]}
                    />
                    
                    {/* Custom Variable Insertion Buttons */}
                    <div className="bg-gray-50 px-4 py-2 border-t border-gray-300 flex items-center space-x-2">
                      <span className="text-sm text-gray-600 mr-2">Insert Variables:</span>
                      <button 
                        onClick={() => {
                          if (quillRef.current) {
                            const quill = quillRef.current.getEditor();
                            const range = quill.getSelection();
                            if (range) {
                              quill.insertText(range.index, '[company_name]');
                              quill.setSelection(range.index + '[company_name]'.length);
                            } else {
                              quill.insertText(quill.getLength(), '[company_name]');
                            }
                          }
                        }}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      >
                        [company_name]
                      </button>
                      <button 
                        onClick={() => {
                          if (quillRef.current) {
                            const quill = quillRef.current.getEditor();
                            const range = quill.getSelection();
                            if (range) {
                              quill.insertText(range.index, '[employee_name]');
                              quill.setSelection(range.index + '[employee_name]'.length);
                            } else {
                              quill.insertText(quill.getLength(), '[employee_name]');
                            }
                          }
                        }}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      >
                        [employee_name]
                      </button>
                      <button 
                        onClick={() => {
                          if (quillRef.current) {
                            const quill = quillRef.current.getEditor();
                            const range = quill.getSelection();
                            if (range) {
                              quill.insertText(range.index, '[date]');
                              quill.setSelection(range.index + '[date]'.length);
                            } else {
                              quill.insertText(quill.getLength(), '[date]');
                            }
                          }
                        }}
                        className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                      >
                        [date]
                      </button>
                      <button 
                        onClick={() => {
                          if (quillRef.current) {
                            const quill = quillRef.current.getEditor();
                            const range = quill.getSelection();
                            if (range) {
                              quill.insertText(range.index, '[signature]');
                              quill.setSelection(range.index + '[signature]'.length);
                            } else {
                              quill.insertText(quill.getLength(), '[signature]');
                            }
                          }
                        }}
                        className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                      >
                        [signature]
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 min-h-[300px] font-mono text-sm">
                    {selectedTemplate?.content ||
                      "Template preview will appear here..."}
                  </div>
                )}
              </div>

              {/* Variables Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Variables
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
                  {selectedTemplate?.variables?.map((variable, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-lg"
                    >
                      [{variable}]
                    </span>
                  )) || (
                    <span className="text-sm text-gray-500">
                      No variables defined
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Use [variable_name] format in your template content to create
                  variables
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSaveTemplate}
                  className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Template</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Save as Draft
                </button>
                <button
                  onClick={() => setShowTemplateEditor(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
  } catch (error) {
    console.error("Error rendering TemplatesPage:", error);
    return (
      <div className="flex items-center justify-center h-48 md:h-64">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">Something went wrong</div>
          <div className="text-gray-600">Please refresh the page or contact support if the problem persists.</div>
        </div>
      </div>
    );
  }
};

export default TemplatesPage;
