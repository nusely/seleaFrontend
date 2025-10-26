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
} from "lucide-react";
// SuperAdminLayout is already provided by SuperAdminDashboard
import toast, { Toaster } from "react-hot-toast";
import superAdminApiService from "../../services/superAdminApiService";

const OverviewPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeAgreements: 0,
    totalVerifications: 0,
    whatsappSessions: 0,
    verificationSuccessRate: 0,
    systemUptime: {
      api: 99.9,
      supabase: 99.9,
      cloudflare: 99.9,
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOverviewData();
  }, []);

  const loadOverviewData = async () => {
    try {
      setLoading(true);
      const response = await superAdminApiService.getOverview();
      
      // Handle the API response structure
      if (response.success && response.data) {
        const overview = response.data.overview;
        setStats({
          totalUsers: overview.totalUsers || 0,
          activeAgreements: overview.totalAgreements || 0,
          totalVerifications: overview.signedAgreements || 0,
          whatsappSessions: 0, // This will be implemented later
          verificationSuccessRate: overview.agreementConversionRate || 0,
          systemUptime: {
            api: 99.9,
            supabase: 99.9,
            cloudflare: 99.9,
          },
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error("Error loading overview data:", error);
      toast.error("Failed to load overview data");
      // Set mock data for development
      setStats({
        totalUsers: 1247,
        activeAgreements: 89,
        totalVerifications: 156,
        whatsappSessions: 23,
        verificationSuccessRate: 94.2,
        systemUptime: {
          api: 99.9,
          supabase: 99.9,
          cloudflare: 99.9,
        },
      });
    } finally {
      setLoading(false);
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

      <div className="w-full max-w-full overflow-x-hidden px-0">
        {/* Quick Stats */}
        <div className="grid gap-4 mb-6 w-full grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
          <div
            className="bg-white rounded-lg p-4 border border-gray-200 min-w-0"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
            <p className="text-lg font-bold text-gray-900">
              {stats.totalUsers || 0}
            </p>
            <p className="text-xs text-green-600">Active users</p>
          </div>

          <div
            className="bg-white rounded-lg p-4 border border-gray-200 min-w-0"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-green-600" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">Agreements</h3>
            <p className="text-lg font-bold text-gray-900">
              {stats.activeAgreements || 0}
            </p>
            <p className="text-xs text-green-600">Active contracts</p>
          </div>

          <div
            className="bg-white rounded-lg p-4 border border-gray-200 min-w-0"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-purple-600" />
              </div>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">Verifications</h3>
            <p className="text-lg font-bold text-gray-900">
              {stats.totalVerifications || 0}
            </p>
            <p className="text-xs text-green-600">
              {stats.verificationSuccessRate || 0}% success
            </p>
          </div>

          <div
            className="bg-white rounded-lg p-4 border border-gray-200 min-w-0"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-orange-600" />
              </div>
              <Activity className="h-4 w-4 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">WhatsApp</h3>
            <p className="text-lg font-bold text-gray-900">
              {stats.whatsappSessions || 0}
            </p>
            <p className="text-xs text-green-600">Active sessions</p>
          </div>
        </div>

        {/* System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              System Uptime
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">API Server</span>
                <span className="text-green-600 font-semibold">
                  {stats.systemUptime?.api || 99.9}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Database</span>
                <span className="text-green-600 font-semibold">
                  {stats.systemUptime?.supabase || 99.9}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">CDN</span>
                <span className="text-green-600 font-semibold">
                  {stats.systemUptime?.cloudflare || 99.9}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  System running normally
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  All services operational
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  No security alerts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
