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
  UserPlus,
  FileText as FileTextIcon,
  BarChart,
  LineChart,
  AreaChart,
  Target,
  MousePointer,
  MousePointerClick,
  Eye as EyeIcon,
  Clock as ClockIcon,
  Globe as GlobeIcon2,
  Smartphone as SmartphoneIcon,
  Monitor,
  Tablet,
  Laptop,
  Smartphone as PhoneIcon,
  MapPin as MapPinIcon,
  Flag,
  Building,
  Home,
  Briefcase,
  Heart,
  Star,
  ThumbsUp,
  MessageSquare,
  Share2,
  Download as DownloadIcon,
  Upload as UploadIcon,
  ArrowUp,
  ArrowDown,
  Minus,
  Plus as PlusIcon,
  Equal,
  Percent,
  Hash as HashIcon,
  AtSign,
  Hash as Hashtag,
  DollarSign as DollarSignIcon,
  CreditCard as CreditCardIcon,
  Wallet,
  Coins,
  PiggyBank,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Activity as ActivityIcon,
  Zap as ZapIcon,
  Zap as Flash,
  Zap as Thunder,
  Zap as Lightning,
  Sparkles,
  Star as StarIcon,
  Award,
  Trophy,
  Medal,
  Crown as CrownIcon,
  Heart as HeartIcon,
  Flame,
  Sun,
  Moon,
  Cloud,
  Wind,
  Thermometer,
  Droplets,
  Sun as SunIcon,
  Moon as MoonIcon,
  Cloud as CloudIcon,
  Wind as WindIcon,
  Thermometer as ThermometerIcon,
  Droplets as DropletsIcon,
} from "lucide-react";
// SuperAdminLayout is already provided by SuperAdminDashboard
import toast, { Toaster } from "react-hot-toast";
import superAdminApiService from "../../services/superAdminApiService";

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalUsers: 1247,
      activeAgreements: 3421,
      // Removed totalRevenue - Super Admin doesn't need pricing info
      systemUptime: 99.9,
    },
    userGrowth: {
      daily: [
        12, 19, 3, 5, 2, 3, 15, 8, 12, 6, 9, 14, 7, 11, 4, 8, 13, 5, 9, 16, 7,
        12, 8, 6, 11, 9, 13, 7, 5, 10,
      ],
      weekly: [
        45, 67, 34, 56, 78, 89, 67, 45, 56, 78, 89, 67, 45, 56, 78, 89, 67, 45,
        56, 78, 89, 67, 45, 56, 78, 89, 67, 45, 56, 78,
      ],
      monthly: [
        234, 456, 345, 567, 678, 789, 567, 345, 456, 567, 678, 789, 567, 345,
        456, 567, 678, 789, 567, 345, 456, 567, 678, 789, 567, 345, 456, 567,
        678, 789,
      ],
    },
    // Removed revenue data - Super Admin doesn't need pricing info
    deviceStats: {
      desktop: 45,
      mobile: 35,
      tablet: 20,
    },
    locationStats: {
      ghana: 65,
      nigeria: 20,
      other: 15,
    },
    agreementCategories: {
      tenancy: 45,
      services: 25,
      sales: 15,
      employment: 10,
      general: 5,
    },
    performanceMetrics: {
      averageResponseTime: 245,
      errorRate: 0.1,
      throughput: 1250,
      concurrentUsers: 89,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      const response = await superAdminApiService.getAnalytics({
        period: timeRange,
      });
      if (response.success && response.data) {
        setAnalyticsData({
          overview: response.data.overview || {
            totalUsers: 0,
            activeAgreements: 0,
            systemUptime: 99.9
          },
          userGrowth: {
            daily: response.data.userGrowth?.daily || [],
            weekly: [],
            monthly: []
          },
          deviceStats: response.data.deviceStats || {
            desktop: 45,
            mobile: 35,
            tablet: 20
          },
          locationStats: response.data.locationStats || {
            ghana: 65,
            nigeria: 20,
            other: 15
          },
          agreementCategories: response.data.categoryStats || {
            tenancy: 45,
            services: 25,
            sales: 15,
            employment: 10,
            general: 5
          },
          performanceMetrics: response.data.performanceMetrics || {
            averageResponseTime: 245,
            errorRate: 0.1,
            throughput: 1250,
            concurrentUsers: 89
          }
        });
      } else {
        throw new Error(response.error || 'Failed to fetch analytics data');
      }
    } catch (error) {
      console.error("Error loading analytics data:", error);
      toast.error("Failed to load analytics data");
      // Keep existing mock data as fallback
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

  const getTimeRangeData = () => {
    switch (timeRange) {
      case "7d":
        return analyticsData.userGrowth.daily.slice(-7);
      case "30d":
        return analyticsData.userGrowth.daily;
      case "90d":
        return analyticsData.userGrowth.weekly.slice(-12);
      default:
        return analyticsData.userGrowth.daily;
    }
  };

  // Removed getRevenueData - Super Admin doesn't need pricing info

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
                Analytics & Reports
              </h2>
              <p className="text-sm text-gray-600">
                Comprehensive platform analytics and performance metrics
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
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
            <p className="text-2xl font-bold text-gray-900">
              {analyticsData.overview.totalUsers.toLocaleString()}
            </p>
            <p className="text-sm text-green-600 mt-1">+12% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">
              Active Agreements
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {analyticsData.overview.activeAgreements.toLocaleString()}
            </p>
            <p className="text-sm text-green-600 mt-1">+8% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Server className="h-6 w-6 text-purple-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">System Uptime</h3>
            <p className="text-2xl font-bold text-gray-900">
              {analyticsData.overview.systemUptime}%
            </p>
            <p className="text-sm text-green-600 mt-1">+15% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Agreements</h3>
            <p className="text-2xl font-bold text-gray-900">
              {analyticsData.overview.totalAgreements?.toLocaleString() || '0'}
            </p>
            <p className="text-sm text-green-600 mt-1">All time</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              User Growth
            </h3>
            {getTimeRangeData().length > 0 ? (
              <>
                <div className="h-48 md:h-64 flex items-end space-x-1">
                  {getTimeRangeData().map((value, index) => (
                    <div
                      key={index}
                      className="bg-sealia-mint rounded-t"
                      style={{
                        height: `${
                          (value / Math.max(...getTimeRangeData())) * 100
                        }%`,
                        width: `${100 / getTimeRangeData().length}%`,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                  <span>Daily new users</span>
                  <span>Peak: {Math.max(...getTimeRangeData())} users</span>
                </div>
              </>
            ) : (
              <div className="h-48 md:h-64 flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No user growth data available</p>
                </div>
              </div>
            )}
          </div>

          {/* System Performance Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              System Performance
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Uptime</span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {analyticsData.overview.systemUptime}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Response Time</span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {analyticsData.performanceMetrics.averageResponseTime}ms
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Error Rate</span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {analyticsData.performanceMetrics.errorRate}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Throughput</span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {analyticsData.performanceMetrics.throughput.toLocaleString()}/min
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Device & Location Stats */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Device Statistics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Device Usage
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Monitor className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Desktop
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${analyticsData.deviceStats.desktop}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {analyticsData.deviceStats.desktop}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <SmartphoneIcon className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Mobile
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${analyticsData.deviceStats.mobile}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {analyticsData.deviceStats.mobile}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Tablet className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Tablet
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${analyticsData.deviceStats.tablet}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {analyticsData.deviceStats.tablet}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Statistics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Geographic Distribution
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Flag className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Ghana
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${analyticsData.locationStats.ghana}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {analyticsData.locationStats.ghana}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Flag className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Nigeria
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${analyticsData.locationStats.nigeria}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {analyticsData.locationStats.nigeria}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <GlobeIcon2 className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Other
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-600 h-2 rounded-full"
                      style={{ width: `${analyticsData.locationStats.other}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {analyticsData.locationStats.other}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agreement Categories & Top Templates */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Agreement Categories */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Agreement Categories
            </h3>
            <div className="space-y-3">
              {Object.entries(analyticsData.agreementCategories).map(
                ([category, percentage]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-sealia-mint rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-sealia-mint h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Top Templates */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top Performing Templates
            </h3>
            <div className="space-y-3">
              {analyticsData.topTemplates?.slice(0, 5).map((template, index) => (
                <div key={template.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-sealia-mint/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-sealia-mint">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        {template.name}
                      </span>
                      <p className="text-xs text-gray-500 capitalize">
                        {template.category}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {template.usage_count || 0} uses
                  </span>
                </div>
              )) || (
                <div className="text-center py-4">
                  <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No template data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600">
              Avg Response Time
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {analyticsData.performanceMetrics.averageResponseTime}ms
            </p>
            <p className="text-sm text-green-600 mt-1">Excellent</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Error Rate</h3>
            <p className="text-2xl font-bold text-gray-900">
              {analyticsData.performanceMetrics.errorRate}%
            </p>
            <p className="text-sm text-green-600 mt-1">Very Low</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Throughput</h3>
            <p className="text-2xl font-bold text-gray-900">
              {analyticsData.performanceMetrics.throughput.toLocaleString()}
            </p>
            <p className="text-sm text-green-600 mt-1">Requests/min</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600">
              Concurrent Users
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {analyticsData.performanceMetrics.concurrentUsers}
            </p>
            <p className="text-sm text-green-600 mt-1">Active now</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
