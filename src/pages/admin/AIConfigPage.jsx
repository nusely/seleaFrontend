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
  User,
  History,
  Play,
  Pause,
  Settings as SettingsIcon,
  Key,
  Link,
  Monitor,
  Target,
  Lightbulb,
  Shield as ShieldIcon,
  Zap as ZapIcon,
  Brain as BrainIcon,
  MessageSquare,
  BarChart,
  TrendingUp as TrendingUpIcon
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import superAdminApiService from "../../services/superAdminApiService";

const AIConfigPage = () => {
  const [activeTab, setActiveTab] = useState("features");
  const [aiConfig, setAiConfig] = useState([]);
  const [usageStats, setUsageStats] = useState({
    totalTokens: 0,
    totalCost: 0,
    dailyUsage: {},
    recentUsage: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    loadAIConfig();
    loadUsageStats();
  }, []);

  const loadAIConfig = async () => {
    try {
      setLoading(true);
      const response = await superAdminApiService.getAIConfig();
      if (response.success && response.data.aiConfig) {
        setAiConfig(response.data.aiConfig);
      } else {
        // Fallback to mock data
        const mockConfig = [
          {
            id: "ai_001",
            feature_name: "template_generation",
            description: "AI-powered contract template generation",
            is_enabled: false,
            settings: {
              auto_generate: false,
              quality_threshold: 0.8,
              language: "en"
            },
            api_endpoint: "https://api.openai.com/v1/chat/completions",
            api_key_masked: "sk-1234...",
            model_name: "gpt-3.5-turbo",
            max_tokens: 2000,
            temperature: 0.7
          },
          {
            id: "ai_002",
            feature_name: "content_optimization",
            description: "Smart contract content improvement and optimization",
            is_enabled: false,
            settings: {
              suggest_improvements: true,
              legal_compliance: true,
              readability: true
            },
            api_endpoint: "https://api.openai.com/v1/chat/completions",
            api_key_masked: "sk-1234...",
            model_name: "gpt-3.5-turbo",
            max_tokens: 1500,
            temperature: 0.6
          },
          {
            id: "ai_003",
            feature_name: "risk_analysis",
            description: "Legal risk assessment and compliance checking",
            is_enabled: false,
            settings: {
              risk_threshold: 0.7,
              compliance_check: true,
              suggestions: true
            },
            api_endpoint: "https://api.openai.com/v1/chat/completions",
            api_key_masked: "sk-1234...",
            model_name: "gpt-4",
            max_tokens: 3000,
            temperature: 0.5
          },
          {
            id: "ai_004",
            feature_name: "chatbot_support",
            description: "AI-powered customer support chatbot",
            is_enabled: false,
            settings: {
              response_time: 2,
              context_aware: true,
              escalation: true
            },
            api_endpoint: "https://api.openai.com/v1/chat/completions",
            api_key_masked: "sk-1234...",
            model_name: "gpt-3.5-turbo",
            max_tokens: 1000,
            temperature: 0.8
          },
          {
            id: "ai_005",
            feature_name: "smart_analytics",
            description: "AI-driven insights and analytics",
            is_enabled: false,
            settings: {
              trend_analysis: true,
              predictions: true,
              recommendations: true
            },
            api_endpoint: "https://api.openai.com/v1/chat/completions",
            api_key_masked: "sk-1234...",
            model_name: "gpt-4",
            max_tokens: 2500,
            temperature: 0.6
          },
          {
            id: "ai_006",
            feature_name: "document_summarization",
            description: "Automatic document summarization and key points extraction",
            is_enabled: false,
            settings: {
              summary_length: "medium",
              key_points: 5,
              format: "bullet_points"
            },
            api_endpoint: "https://api.openai.com/v1/chat/completions",
            api_key_masked: "sk-1234...",
            model_name: "gpt-3.5-turbo",
            max_tokens: 1500,
            temperature: 0.5
          }
        ];
        setAiConfig(mockConfig);
        toast.error("Failed to load AI configuration. Using mock data.");
      }
    } catch (error) {
      console.error("Error loading AI config:", error);
      toast.error("Failed to load AI configuration");
    } finally {
      setLoading(false);
    }
  };

  const loadUsageStats = async () => {
    try {
      const response = await superAdminApiService.getAIUsage();
      if (response.success && response.data) {
        setUsageStats(response.data);
      } else {
        // Fallback to mock data
        setUsageStats({
          totalTokens: 125000,
          totalCost: 45.50,
          dailyUsage: {
            "2024-01-15": 5000,
            "2024-01-16": 7500,
            "2024-01-17": 6200,
            "2024-01-18": 8900,
            "2024-01-19": 11000
          },
          recentUsage: [
            { feature_name: "template_generation", tokens_used: 1500, cost: 0.003, created_at: "2024-01-19T10:30:00Z" },
            { feature_name: "content_optimization", tokens_used: 800, cost: 0.0016, created_at: "2024-01-19T09:15:00Z" },
            { feature_name: "risk_analysis", tokens_used: 2000, cost: 0.06, created_at: "2024-01-18T16:45:00Z" }
          ]
        });
      }
    } catch (error) {
      console.error("Error loading AI usage:", error);
    }
  };

  const handleEditConfig = (config) => {
    setSelectedConfig(config);
    setShowConfigModal(true);
  };

  const handleSaveConfig = async () => {
    try {
      await superAdminApiService.updateAIConfig(selectedConfig.id, selectedConfig);
      toast.success("AI configuration updated successfully");
      setShowConfigModal(false);
      setSelectedConfig(null);
      loadAIConfig();
    } catch (error) {
      console.error("Error saving AI config:", error);
      toast.error("Failed to save AI configuration");
    }
  };

  const handleTestConfig = async () => {
    try {
      setTesting(true);
      const response = await superAdminApiService.testAIConfig({
        feature_name: selectedConfig.feature_name,
        api_endpoint: selectedConfig.api_endpoint,
        api_key: "sk-test-key", // In real implementation, this would be the actual key
        model_name: selectedConfig.model_name,
        test_prompt: "Test AI connection from Sealia"
      });
      
      if (response.success) {
        setTestResult(response.data);
        toast.success("AI connection test successful!");
      } else {
        toast.error("AI connection test failed");
      }
    } catch (error) {
      console.error("Error testing AI config:", error);
      toast.error("AI connection test failed");
    } finally {
      setTesting(false);
    }
  };

  const getFeatureIcon = (featureName) => {
    switch (featureName) {
      case "template_generation":
        return <FileText className="h-5 w-5 text-blue-600" />;
      case "content_optimization":
        return <Zap className="h-5 w-5 text-yellow-600" />;
      case "risk_analysis":
        return <Shield className="h-5 w-5 text-red-600" />;
      case "chatbot_support":
        return <MessageSquare className="h-5 w-5 text-green-600" />;
      case "smart_analytics":
        return <BarChart className="h-5 w-5 text-purple-600" />;
      case "document_summarization":
        return <BookOpen className="h-5 w-5 text-indigo-600" />;
      default:
        return <Bot className="h-5 w-5 text-gray-600" />;
    }
  };

  const getFeatureColor = (featureName) => {
    switch (featureName) {
      case "template_generation":
        return "bg-blue-100 text-blue-800";
      case "content_optimization":
        return "bg-yellow-100 text-yellow-800";
      case "risk_analysis":
        return "bg-red-100 text-red-800";
      case "chatbot_support":
        return "bg-green-100 text-green-800";
      case "smart_analytics":
        return "bg-purple-100 text-purple-800";
      case "document_summarization":
        return "bg-indigo-100 text-indigo-800";
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

      <div className="space-y-6 max-w-full overflow-x-hidden">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Brain className="h-8 w-8 text-sealia-mint mr-3" />
                AI Configuration
              </h2>
              <p className="text-gray-600 mt-1">
                Manage AI features, models, and automation settings
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Usage</p>
                <p className="text-2xl font-bold text-gray-900">
                  {usageStats.totalTokens.toLocaleString()} tokens
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Cost</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${usageStats.totalCost.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "features", name: "AI Features", icon: Bot },
                { id: "usage", name: "Usage Analytics", icon: BarChart },
                { id: "models", name: "AI Models", icon: Cpu },
                { id: "settings", name: "Global Settings", icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
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

          <div className="p-6">
            {/* AI Features Tab */}
            {activeTab === "features" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiConfig.map((config) => (
                    <div key={config.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getFeatureIcon(config.feature_name)}
                          <div>
                            <h3 className="font-semibold text-gray-900 capitalize">
                              {config.feature_name.replace(/_/g, ' ')}
                            </h3>
                            <p className="text-sm text-gray-600">{config.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            config.is_enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {config.is_enabled ? 'Enabled' : 'Disabled'}
                          </span>
                          <button
                            onClick={() => handleEditConfig(config)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Settings className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Model:</span>
                          <span className="font-medium">{config.model_name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Max Tokens:</span>
                          <span className="font-medium">{config.max_tokens.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Temperature:</span>
                          <span className="font-medium">{config.temperature}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">API Key:</span>
                          <span className="font-mono text-xs">{config.api_key_masked}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => handleEditConfig(config)}
                          className="w-full px-3 py-2 text-sm bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors"
                        >
                          Configure
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Usage Analytics Tab */}
            {activeTab === "usage" && (
              <div className="space-y-6">
                {/* Usage Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Brain className="h-8 w-8 text-blue-600" />
                      <div className="ml-3">
                        <p className="text-sm text-blue-600">Total Tokens</p>
                        <p className="text-2xl font-bold text-blue-900">
                          {usageStats.totalTokens.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <DollarSign className="h-8 w-8 text-green-600" />
                      <div className="ml-3">
                        <p className="text-sm text-green-600">Total Cost</p>
                        <p className="text-2xl font-bold text-green-900">
                          ${usageStats.totalCost.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Activity className="h-8 w-8 text-purple-600" />
                      <div className="ml-3">
                        <p className="text-sm text-purple-600">Active Features</p>
                        <p className="text-2xl font-bold text-purple-900">
                          {aiConfig.filter(config => config.is_enabled).length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="h-8 w-8 text-orange-600" />
                      <div className="ml-3">
                        <p className="text-sm text-orange-600">Avg Daily Usage</p>
                        <p className="text-2xl font-bold text-orange-900">
                          {Math.round(usageStats.totalTokens / 30).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Usage */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Usage</h3>
                  <div className="space-y-3">
                    {usageStats.recentUsage.map((usage, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                          {getFeatureIcon(usage.feature_name)}
                          <div>
                            <p className="font-medium text-gray-900 capitalize">
                              {usage.feature_name.replace(/_/g, ' ')}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(usage.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {usage.tokens_used.toLocaleString()} tokens
                          </p>
                          <p className="text-sm text-gray-500">
                            ${usage.cost.toFixed(4)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AI Models Tab */}
            {activeTab === "models" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: "GPT-3.5 Turbo", provider: "OpenAI", tokens: 4096, cost: 0.000002, status: "Available" },
                    { name: "GPT-4", provider: "OpenAI", tokens: 8192, cost: 0.00003, status: "Available" },
                    { name: "GPT-4 Turbo", provider: "OpenAI", tokens: 128000, cost: 0.00001, status: "Available" },
                    { name: "Claude-3 Sonnet", provider: "Anthropic", tokens: 200000, cost: 0.000003, status: "Available" },
                    { name: "Claude-3 Opus", provider: "Anthropic", tokens: 200000, cost: 0.000015, status: "Available" },
                    { name: "Gemini Pro", provider: "Google", tokens: 30720, cost: 0.0000005, status: "Available" }
                  ].map((model, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{model.name}</h3>
                          <p className="text-sm text-gray-600">{model.provider}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {model.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Max Tokens:</span>
                          <span className="font-medium">{model.tokens.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Cost per Token:</span>
                          <span className="font-medium">${model.cost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Global Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Global AI Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Enable AI Features</p>
                        <p className="text-sm text-gray-500">Master switch for all AI functionality</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sealia-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sealia-mint"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Auto-optimize Content</p>
                        <p className="text-sm text-gray-500">Automatically improve document quality</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sealia-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sealia-mint"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Smart Notifications</p>
                        <p className="text-sm text-gray-500">AI-powered intelligent notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sealia-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sealia-mint"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Configuration Modal */}
      {showConfigModal && selectedConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  Configure {selectedConfig.feature_name.replace(/_/g, ' ')}
                </h3>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feature Name
                  </label>
                  <input
                    type="text"
                    value={selectedConfig.feature_name}
                    onChange={(e) => setSelectedConfig({...selectedConfig, feature_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model Name
                  </label>
                  <select
                    value={selectedConfig.model_name}
                    onChange={(e) => setSelectedConfig({...selectedConfig, model_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                  >
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                    <option value="claude-3-sonnet">Claude-3 Sonnet</option>
                    <option value="claude-3-opus">Claude-3 Opus</option>
                    <option value="gemini-pro">Gemini Pro</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Tokens
                  </label>
                  <input
                    type="number"
                    value={selectedConfig.max_tokens}
                    onChange={(e) => setSelectedConfig({...selectedConfig, max_tokens: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="2"
                    value={selectedConfig.temperature}
                    onChange={(e) => setSelectedConfig({...selectedConfig, temperature: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Endpoint
                </label>
                <input
                  type="url"
                  value={selectedConfig.api_endpoint}
                  onChange={(e) => setSelectedConfig({...selectedConfig, api_endpoint: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  placeholder="Enter new API key"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Current: {selectedConfig.api_key_masked}
                </p>
              </div>

              {/* Enable/Disable Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Enable Feature</p>
                  <p className="text-sm text-gray-500">Turn this AI feature on or off</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedConfig.is_enabled}
                    onChange={(e) => setSelectedConfig({...selectedConfig, is_enabled: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sealia-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sealia-mint"></div>
                </label>
              </div>

              {/* Test Connection */}
              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={handleTestConfig}
                  disabled={testing}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {testing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Testing...</span>
                    </>
                  ) : (
                    <>
                      <TestTube className="h-4 w-4" />
                      <span>Test Connection</span>
                    </>
                  )}
                </button>

                {testResult && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">Connection Test Successful!</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      AI service is responding correctly.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSaveConfig}
                  className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Configuration</span>
                </button>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIConfigPage;