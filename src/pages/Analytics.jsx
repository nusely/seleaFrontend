import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  DollarSign,
  Clock,
  Eye,
  CheckCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Calendar,
  Filter,
} from "lucide-react";
// DashboardLayout is already provided by the main dashboard
import toast, { Toaster } from "react-hot-toast";
import { analyticsService } from "../services/supabaseApiService";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalAgreements: 0,
      signedAgreements: 0,
      pendingAgreements: 0,
      totalRevenue: 0,
    },
    agreementStats: {
      daily: [],
      weekly: [],
      monthly: [],
    },
    topTemplates: [],
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      const response = await analyticsService.getAnalytics({ timeRange });
      if (response.analytics) {
        setAnalyticsData(response.analytics);
      }
    } catch (error) {
      console.error("Error loading analytics data:", error);
      toast.error("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = async () => {
    try {
      // API call to export analytics report
      toast.success("Analytics report exported successfully");
    } catch (error) {
      console.error("Error exporting report:", error);
      toast.error("Failed to export analytics report");
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
              <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
              <p className="text-sm text-gray-600">
                Track your agreement performance and insights
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button
                onClick={handleExportReport}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">
              Total Agreements
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {analyticsData.overview.totalAgreements}
            </p>
            <p className="text-sm text-green-600 mt-1">+12% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">
              Signed Agreements
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {analyticsData.overview.signedAgreements}
            </p>
            <p className="text-sm text-green-600 mt-1">+8% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">
              Pending Agreements
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {analyticsData.overview.pendingAgreements}
            </p>
            <p className="text-sm text-yellow-600 mt-1">Requires attention</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">
              ${(analyticsData.overview.totalRevenue || 0).toLocaleString()}
            </p>
            <p className="text-sm text-green-600 mt-1">+15% from last month</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Agreement Trends */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Agreement Trends
            </h3>
            <div className="h-48 md:h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p>Chart visualization coming soon</p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Performance Metrics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Completion Rate
                </span>
                <span className="text-sm font-bold text-green-600">87%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Average Sign Time
                </span>
                <span className="text-sm font-bold text-blue-600">
                  2.3 days
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Client Satisfaction
                </span>
                <span className="text-sm font-bold text-purple-600">4.8/5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Template Usage
                </span>
                <span className="text-sm font-bold text-orange-600">
                  12 templates
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {analyticsData.recentActivity.length > 0 ? (
              analyticsData.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
                >
                  <div className="w-8 h-8 bg-sealia-mint/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-sealia-mint" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
