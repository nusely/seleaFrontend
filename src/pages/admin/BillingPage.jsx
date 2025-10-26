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
} from "lucide-react";
// SuperAdminLayout is already provided by SuperAdminDashboard
import toast, { Toaster } from "react-hot-toast";
import superAdminApiService from "../../services/superAdminApiService";
import TransactionTracker from "../../components/TransactionTracker";

const BillingPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [plans, setPlans] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    annualRevenue: 0,
    activeSubscriptions: 0,
    totalSubscriptions: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    try {
      setLoading(true);
      const [billingResponse, plansResponse, transactionsResponse] = await Promise.all([
        superAdminApiService.getBillingData(),
        superAdminApiService.getBillingPlans(),
        superAdminApiService.getTransactions({
          page: currentPage,
          limit: 50,
          status: statusFilter,
          method: methodFilter,
          date_range: dateFilter
        })
      ]);

      // Set billing metrics
      if (billingResponse.success && billingResponse.data.metrics) {
        setMetrics(billingResponse.data.metrics);
      }

      // Set billing plans
      if (plansResponse.success && plansResponse.data.plans) {
        setPlans(plansResponse.data.plans);
      } else {
        // Fallback to mock data
        const mockPlans = [
          {
            id: "plan_free",
            name: "Free Plan",
            description: "Basic features for getting started",
            price: 0,
            billing_cycle: "monthly",
            features: ["5 agreements/month", "Basic templates", "Email support"],
            status: "active",
          },
          {
            id: "plan_starter",
            name: "Starter Plan",
            description: "Perfect for small businesses",
            price: 29.99,
            billing_cycle: "monthly",
            features: ["Unlimited agreements", "All templates", "Priority support", "Basic analytics"],
            status: "active",
          },
          {
            id: "plan_pro",
            name: "Pro Plan",
            description: "Advanced features for growing businesses",
            price: 99.99,
            billing_cycle: "monthly",
            features: ["Everything in Starter", "AI-powered templates", "Advanced analytics", "API access", "Custom branding"],
            status: "active",
          },
        ];
        setPlans(mockPlans);
      }

      // Set transactions
      if (transactionsResponse.success && transactionsResponse.data.transactions) {
        setTransactions(transactionsResponse.data.transactions);
        setTotalTransactions(transactionsResponse.data.count || 0);
        setTotalPages(Math.ceil((transactionsResponse.data.count || 0) / 50));
      } else {
        // Fallback to mock data
        const mockTransactions = [
          {
            id: "txn_001",
            users: { first_name: "John", last_name: "Doe" },
            billing_plans: { name: "Starter Plan" },
            amount: 29.99,
            currency: "NGN",
            payment_method: "Paystack",
            status: "completed",
            paystack_reference: "T123456789",
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "txn_002",
            users: { first_name: "Jane", last_name: "Smith" },
            billing_plans: { name: "Pro Plan" },
            amount: 99.99,
            currency: "NGN",
            payment_method: "Paystack",
            status: "completed",
            paystack_reference: "T987654321",
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "txn_003",
            users: { first_name: "Mike", last_name: "Johnson" },
            billing_plans: { name: "Starter Plan" },
            amount: 29.99,
            currency: "NGN",
            payment_method: "Bank Transfer",
            status: "pending",
            paystack_reference: null,
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ];
        setTransactions(mockTransactions);
        setTotalTransactions(3);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error loading billing data:", error);
      toast.error("Failed to load billing data");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddPlan = () => {
    setSelectedPlan({
      id: null,
      name: "",
      description: "",
      price: 0,
      billing_cycle: "monthly",
      features: [],
      status: "active"
    });
    setShowAddPlanModal(true);
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setShowAddPlanModal(true);
  };

  const handleSavePlan = async () => {
    try {
      if (selectedPlan.id) {
        await superAdminApiService.updateBillingPlan(selectedPlan.id, selectedPlan);
        toast.success("Plan updated successfully");
      } else {
        await superAdminApiService.createBillingPlan(selectedPlan);
        toast.success("Plan created successfully");
      }
      setShowAddPlanModal(false);
      setSelectedPlan(null);
      loadBillingData();
    } catch (error) {
      console.error("Error saving plan:", error);
      toast.error("Failed to save plan");
    }
  };

  const handleDeletePlan = async (planId) => {
    if (!window.confirm("Are you sure you want to delete this plan? This action cannot be undone.")) {
      return;
    }

    try {
      await superAdminApiService.deleteBillingPlan(planId);
      toast.success("Plan deleted successfully");
      loadBillingData();
    } catch (error) {
      console.error("Error deleting plan:", error);
      toast.error("Failed to delete plan");
    }
  };

  const handleExportTransactions = async () => {
    try {
      const response = await superAdminApiService.exportTransactions({
        status: statusFilter,
        method: methodFilter,
        date_range: dateFilter
      });

      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Transactions exported successfully");
    } catch (error) {
      console.error("Error exporting transactions:", error);
      toast.error("Failed to export transactions");
    }
  };

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'status':
        setStatusFilter(value);
        break;
      case 'method':
        setMethodFilter(value);
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
    loadBillingData();
  }, [currentPage, statusFilter, methodFilter, dateFilter]);

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
                Billing Dashboard
              </h2>
              <p className="text-sm text-gray-600">
                Control plans, manage payments, and view revenue
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleExportTransactions}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
              <button 
                onClick={handleAddPlan}
                className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Plan</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "overview", name: "Overview", icon: BarChart3 },
                { id: "plans", name: "Plans", icon: CreditCard },
                { id: "transactions", name: "Transactions", icon: FileText },
                { id: "tracker", name: "Transaction Tracker", icon: Activity },
                { id: "reports", name: "Reports", icon: TrendingUp },
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
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6 max-w-full overflow-x-hidden">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="text-sm font-medium text-gray-600">
                  Total Revenue This Month
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  ₵{metrics.monthlyRevenue?.toLocaleString() || '0'}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  +{metrics.monthlyRevenue > 0 ? '12.5' : '0'}% from last month
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="text-sm font-medium text-gray-600">
                  Active Subscribers
                </h3>
                <p className="text-2xl font-bold text-gray-900">{metrics.activeSubscriptions || 0}</p>
                <p className="text-sm text-green-600 mt-1">+{Math.floor((metrics.activeSubscriptions || 0) * 0.1)} this week</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                </div>
                <h3 className="text-sm font-medium text-gray-600">
                  Pending Payments
                </h3>
                <p className="text-2xl font-bold text-gray-900">₵{Math.floor((metrics.monthlyRevenue || 0) * 0.1).toLocaleString()}</p>
                <p className="text-sm text-yellow-600 mt-1">{Math.floor((metrics.activeSubscriptions || 0) * 0.05)} transactions</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <PieChart className="h-6 w-6 text-purple-600" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="text-sm font-medium text-gray-600">
                  Top Plan Usage
                </h3>
                <p className="text-2xl font-bold text-gray-900">Premium</p>
                <p className="text-sm text-green-600 mt-1">87% of users</p>
              </div>
            </div>

            {/* Revenue Trend Chart Placeholder */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Monthly Revenue Trend
              </h3>
              <div className="h-48 md:h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">
                    Revenue trend chart will be displayed here
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === "plans" && (
          <div className="space-y-6 max-w-full overflow-x-hidden">
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Plans Management
                </h3>
                <button
                  onClick={handleAddPlan}
                  className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Plan</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monthly Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Agreements
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team Members
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Storage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Features
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {plans.map((plan) => (
                      <tr key={plan.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {plan.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {plan.id?.substring(0, 8) || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          GHS {plan.monthly_price || plan.price}/month
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {plan.agreements_limit || 'Unlimited'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {plan.team_members_limit || 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {plan.storage_limit || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {plan.witness_support && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Witness
                              </span>
                            )}
                            {plan.verification_logs && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Logs
                              </span>
                            )}
                            {plan.compliance_dashboard && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                Compliance
                              </span>
                            )}
                            {plan.priority_support && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Priority
                              </span>
                            )}
                            {plan.audit_trail && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Audit
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              plan.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {plan.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleEditPlan(plan)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeletePlan(plan.id)}
                              className="text-red-600 hover:text-red-900"
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
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="space-y-6 max-w-full overflow-x-hidden">
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Transactions
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Txn ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((txn) => (
                      <tr key={txn.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                          {txn.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {txn.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {txn.plan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${txn.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {txn.method}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {txn.date.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              txn.status
                            )}`}
                          >
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Transaction Tracker Tab */}
        {activeTab === "tracker" && (
          <TransactionTracker />
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="space-y-6 max-w-full overflow-x-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Monthly Revenue Trend
                </h3>
                <div className="h-48 md:h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Revenue trend chart</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Plan Adoption Comparison
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Free Plan</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-900">
                        89
                      </span>
                      <span className="text-xs text-gray-500">(49.7%)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        Premium Plan
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-900">
                        156
                      </span>
                      <span className="text-xs text-gray-500">(87.2%)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        Enterprise Plan
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-900">
                        23
                      </span>
                      <span className="text-xs text-gray-500">(12.8%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Plan Modal */}
        {showAddPlanModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
              {/* Modal Header - Fixed */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedPlan?.id ? 'Edit Plan' : 'Add New Plan'}
                </h3>
                <button
                  onClick={() => setShowAddPlanModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <form onSubmit={(e) => { e.preventDefault(); handleSavePlan(); }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plan Name
                    </label>
                    <input
                      type="text"
                      value={selectedPlan?.name || ''}
                      onChange={(e) => setSelectedPlan({...selectedPlan, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Price (GHS)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={selectedPlan?.monthly_price || ''}
                      onChange={(e) => setSelectedPlan({...selectedPlan, monthly_price: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yearly Price (GHS)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={selectedPlan?.yearly_price || ''}
                      onChange={(e) => setSelectedPlan({...selectedPlan, yearly_price: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agreements Limit
                    </label>
                    <input
                      type="number"
                      value={selectedPlan?.agreements_limit || ''}
                      onChange={(e) => setSelectedPlan({...selectedPlan, agreements_limit: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Templates Access
                    </label>
                    <select
                      value={selectedPlan?.templates_access || ''}
                      onChange={(e) => setSelectedPlan({...selectedPlan, templates_access: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      required
                    >
                      <option value="">Select Access Level</option>
                      <option value="preset">Preset Only</option>
                      <option value="full">Full Library</option>
                      <option value="full_custom">Full + Custom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Members Limit
                    </label>
                    <input
                      type="number"
                      value={selectedPlan?.team_members_limit || ''}
                      onChange={(e) => setSelectedPlan({...selectedPlan, team_members_limit: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage Limit
                    </label>
                    <input
                      type="text"
                      value={selectedPlan?.storage_limit || ''}
                      onChange={(e) => setSelectedPlan({...selectedPlan, storage_limit: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      placeholder="e.g., 200 MB, 1 GB, 20 GB"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Witness Support
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="witness_support"
                          checked={selectedPlan?.witness_support === true}
                          onChange={() => setSelectedPlan({...selectedPlan, witness_support: true})}
                          className="mr-2"
                        />
                        Enabled
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="witness_support"
                          checked={selectedPlan?.witness_support === false}
                          onChange={() => setSelectedPlan({...selectedPlan, witness_support: false})}
                          className="mr-2"
                        />
                        Disabled
                      </label>
                    </div>
                  </div>

                  {selectedPlan?.witness_support && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Witness Limit
                      </label>
                      <input
                        type="number"
                        value={selectedPlan?.witness_limit || 0}
                        onChange={(e) => setSelectedPlan({...selectedPlan, witness_limit: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                        min="0"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Logs
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="verification_logs"
                          checked={selectedPlan?.verification_logs === true}
                          onChange={() => setSelectedPlan({...selectedPlan, verification_logs: true})}
                          className="mr-2"
                        />
                        Enabled
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="verification_logs"
                          checked={selectedPlan?.verification_logs === false}
                          onChange={() => setSelectedPlan({...selectedPlan, verification_logs: false})}
                          className="mr-2"
                        />
                        Disabled
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Compliance Dashboard
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="compliance_dashboard"
                          checked={selectedPlan?.compliance_dashboard === true}
                          onChange={() => setSelectedPlan({...selectedPlan, compliance_dashboard: true})}
                          className="mr-2"
                        />
                        Enabled
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="compliance_dashboard"
                          checked={selectedPlan?.compliance_dashboard === false}
                          onChange={() => setSelectedPlan({...selectedPlan, compliance_dashboard: false})}
                          className="mr-2"
                        />
                        Disabled
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority Support
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="priority_support"
                          checked={selectedPlan?.priority_support === true}
                          onChange={() => setSelectedPlan({...selectedPlan, priority_support: true})}
                          className="mr-2"
                        />
                        Enabled
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="priority_support"
                          checked={selectedPlan?.priority_support === false}
                          onChange={() => setSelectedPlan({...selectedPlan, priority_support: false})}
                          className="mr-2"
                        />
                        Disabled
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Audit Trail
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="audit_trail"
                          checked={selectedPlan?.audit_trail === true}
                          onChange={() => setSelectedPlan({...selectedPlan, audit_trail: true})}
                          className="mr-2"
                        />
                        Enabled
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="audit_trail"
                          checked={selectedPlan?.audit_trail === false}
                          onChange={() => setSelectedPlan({...selectedPlan, audit_trail: false})}
                          className="mr-2"
                        />
                        Disabled
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Watermark
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="watermark"
                          checked={selectedPlan?.watermark === true}
                          onChange={() => setSelectedPlan({...selectedPlan, watermark: true})}
                          className="mr-2"
                        />
                        Applied
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="watermark"
                          checked={selectedPlan?.watermark === false}
                          onChange={() => setSelectedPlan({...selectedPlan, watermark: false})}
                          className="mr-2"
                        />
                        No Watermark
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Billing Cycle
                    </label>
                    <select
                      value={selectedPlan?.billing_cycle || 'monthly'}
                      onChange={(e) => setSelectedPlan({...selectedPlan, billing_cycle: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={selectedPlan?.status || 'active'}
                      onChange={(e) => setSelectedPlan({...selectedPlan, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={selectedPlan?.description || ''}
                    onChange={(e) => setSelectedPlan({...selectedPlan, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features (one per line)
                  </label>
                  <textarea
                    value={selectedPlan?.features?.join('\n') || ''}
                    onChange={(e) => setSelectedPlan({...selectedPlan, features: e.target.value.split('\n').filter(f => f.trim())})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                    rows="4"
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPlan?.is_featured || false}
                      onChange={(e) => setSelectedPlan({...selectedPlan, is_featured: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Featured Plan</span>
                  </label>
                </div>

                </form>
              </div>

              {/* Modal Footer - Fixed */}
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddPlanModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePlan}
                  className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors"
                >
                  {selectedPlan?.id ? 'Update Plan' : 'Create Plan'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BillingPage;
