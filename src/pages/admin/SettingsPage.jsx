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
  Mail,
  Phone,
  Wifi,
  WifiOff,
  UserPlus,
  BarChart,
  LineChart,
  AreaChart,
  Target,
  MousePointer,
  MousePointerClick,
  Monitor,
  Tablet,
  Laptop,
  Flag,
  Building,
  Home,
  Briefcase,
  Heart,
  Star,
  ThumbsUp,
  MessageSquare,
  Share2,
  ArrowUp,
  ArrowDown,
  Minus,
  Equal,
  Percent,
  AtSign,
  Wallet,
  Coins,
  PiggyBank,
  Sparkles,
  Award,
  Trophy,
  Medal,
  Sun,
  Moon,
  Cloud,
  Wind,
  Thermometer,
  Droplets,
  HardDrive,
  Key,
  User,
  Cog,
  Type,
  Text,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Terminal,
  Command,
  Power,
  Battery,
  BatteryCharging,
  Plug,
  PlugZap,
  Lightbulb,
  Lamp,
} from "lucide-react";
// SuperAdminLayout is already provided by SuperAdminDashboard
import toast, { Toaster } from "react-hot-toast";
import superAdminApiService from "../../services/superAdminApiService";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    general: {
      platformName: "Sealia",
      platformDescription:
        "Secure Agreement and Document Verification Platform",
      timezone: "UTC",
      language: "en",
      maintenanceMode: false,
      registrationEnabled: true,
      emailVerificationRequired: true,
    },
    security: {
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      requireTwoFactor: false,
      ipWhitelist: [],
      allowedDomains: [],
      encryptionLevel: "high",
    },
    integrations: {
      whatsappEnabled: true,
      emailEnabled: true,
      smsEnabled: false,
      cloudflareEnabled: true,
      supabaseEnabled: true,
      openaiEnabled: true,
    },
    storage: {
      provider: "cloudflare",
      bucketName: "sealia",
      maxFileSize: 10,
      allowedTypes: ["pdf", "doc", "docx", "jpg", "png"],
      retentionDays: 90,
    },
    notifications: {
      emailAlerts: true,
      systemAlerts: true,
      securityAlerts: true,
      maintenanceAlerts: true,
      weeklyReports: true,
      monthlyReports: true,
    },
    backup: {
      enabled: true,
      frequency: "daily",
      retention: 30,
      location: "cloudflare",
      encryption: true,
    },
  });
  const [loading, setLoading] = useState(true);
  const [backupStatus, setBackupStatus] = useState(null);
  const [systemHealth, setSystemHealth] = useState(null);
  const [testingConnection, setTestingConnection] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await superAdminApiService.getSettings();
      
      if (response.success && response.data) {
        // Only update if we have valid settings data
        if (response.data.settings) {
          setSettings(response.data.settings);
        }
        if (response.data.backupStatus) {
          setBackupStatus(response.data.backupStatus);
        }
        if (response.data.systemHealth) {
          setSystemHealth(response.data.systemHealth);
        }
      } else {
        throw new Error(response.error || 'Failed to fetch settings');
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      toast.error("Failed to load settings");
      // Keep existing mock data as fallback
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (category) => {
    try {
      const response = await superAdminApiService.updateSettings(category, settings[category]);
      
      if (response.success) {
        toast.success(`${category} settings saved successfully`);
      } else {
        throw new Error(response.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    }
  };

  const handleResetSettings = async (category) => {
    if (
      !window.confirm(
        `Are you sure you want to reset ${category} settings to default?`
      )
    ) {
      return;
    }
    try {
      // Reset to default values
      const defaultSettings = {
        general: {
          platformName: "Sealia",
          platformDescription: "Secure Agreement and Document Verification Platform",
          timezone: "UTC",
          language: "en",
          maintenanceMode: false,
          registrationEnabled: true,
          emailVerificationRequired: true
        },
        security: {
          sessionTimeout: 30,
          maxLoginAttempts: 5,
          passwordMinLength: 8,
          requireTwoFactor: false,
          ipWhitelist: [],
          allowedDomains: [],
          encryptionLevel: "high"
        },
        integrations: {
          whatsappEnabled: true,
          emailEnabled: true,
          smsEnabled: false,
          cloudflareEnabled: true,
          supabaseEnabled: true,
          openaiEnabled: true
        },
        storage: {
          provider: "cloudflare",
          bucketName: "sealia",
          maxFileSize: 10,
          allowedTypes: ["pdf", "doc", "docx", "jpg", "png"],
          retentionDays: 90
        },
        notifications: {
          emailAlerts: true,
          systemAlerts: true,
          securityAlerts: true,
          maintenanceAlerts: true,
          weeklyReports: true,
          monthlyReports: true
        },
        backup: {
          enabled: true,
          frequency: "daily",
          retention: 30,
          location: "cloudflare",
          encryption: true
        }
      };

      setSettings(prev => ({
        ...prev,
        [category]: defaultSettings[category]
      }));

      await superAdminApiService.updateSettings(category, defaultSettings[category]);
      toast.success(`${category} settings reset to default`);
    } catch (error) {
      console.error("Error resetting settings:", error);
      toast.error("Failed to reset settings");
    }
  };

  const handleTestConnection = async (service) => {
    try {
      setTestingConnection(service);
      const response = await superAdminApiService.testConnection(service);
      
      if (response.success) {
        const { status, responseTime } = response.data;
        if (status === 'connected') {
          toast.success(`${service} connection test successful (${responseTime}ms)`);
        } else {
          toast.error(`${service} connection test failed`);
        }
      } else {
        throw new Error(response.error || 'Connection test failed');
      }
    } catch (error) {
      console.error("Error testing connection:", error);
      toast.error(`${service} connection test failed`);
    } finally {
      setTestingConnection(null);
    }
  };

  const handleBackupNow = async () => {
    try {
      const response = await superAdminApiService.initiateBackup();
      
      if (response.success) {
        toast.success("Backup initiated successfully");
        setBackupStatus(prev => ({
          ...prev,
          status: 'initiated',
          lastBackup: new Date().toISOString()
        }));
        
        // Poll for backup completion
        const pollBackupStatus = async () => {
          try {
            const statusResponse = await superAdminApiService.getBackupStatus(response.data.backupId);
            if (statusResponse.success && statusResponse.data.status === 'completed') {
              setBackupStatus(prev => ({
                ...prev,
                status: 'completed',
                size: statusResponse.data.size,
                location: statusResponse.data.location
              }));
              toast.success("Backup completed successfully");
            } else if (statusResponse.data.status === 'failed') {
              toast.error("Backup failed");
            } else {
              // Continue polling
              setTimeout(pollBackupStatus, 2000);
            }
          } catch (error) {
            console.error("Error polling backup status:", error);
          }
        };
        
        setTimeout(pollBackupStatus, 2000);
      } else {
        throw new Error(response.error || 'Failed to initiate backup');
      }
    } catch (error) {
      console.error("Error initiating backup:", error);
      toast.error("Failed to initiate backup");
    }
  };

  if (loading || !settings) {
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
                System Settings
              </h2>
              <p className="text-sm text-gray-600">
                Configure platform settings and preferences
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleBackupNow()}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <Database className="h-4 w-4" />
                <span>Backup Now</span>
              </button>
              <button 
                onClick={() => {
                  // Save all settings
                  Object.keys(settings).forEach(category => {
                    handleSaveSettings(category);
                  });
                }}
                className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save All</span>
              </button>
            </div>
          </div>

          {/* System Status */}
          {systemHealth && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    systemHealth.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-700">
                    System Status: {systemHealth.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Uptime: {systemHealth.uptime}%
                </div>
              </div>
            </div>
          )}

          {/* Backup Status */}
          {backupStatus && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    backupStatus.status === 'completed' ? 'bg-green-500' : 
                    backupStatus.status === 'initiated' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-700">
                    Last Backup: {new Date(backupStatus.lastBackup).toLocaleString()}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {backupStatus.size && `Size: ${backupStatus.size}`}
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "general", name: "General", icon: Settings },
                { id: "security", name: "Security", icon: Shield },
                { id: "integrations", name: "Integrations", icon: Zap },
                { id: "storage", name: "Storage", icon: Database },
                { id: "notifications", name: "Notifications", icon: Bell },
                { id: "backup", name: "Backup", icon: HardDrive },
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

        {/* General Settings */}
        {activeTab === "general" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                General Settings
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSaveSettings("general")}
                  className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => handleResetSettings("general")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={settings?.general?.platformName || ''}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      general: {
                        ...prev.general,
                        platformName: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={settings?.general?.timezone || ''}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      general: { ...prev.general, timezone: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                >
                  <option value="UTC">UTC</option>
                  <option value="GMT">GMT</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={settings?.general?.language || ''}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      general: { ...prev.general, language: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Maintenance Mode
                  </label>
                  <p className="text-xs text-gray-500">
                    Disable platform access for maintenance
                  </p>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings?.general?.maintenanceMode || false
                      ? "bg-red-500"
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings?.general?.maintenanceMode || false
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Security Settings
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSaveSettings("security")}
                  className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => handleResetSettings("security")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  value={settings?.security?.sessionTimeout || ''}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      security: {
                        ...prev.security,
                        sessionTimeout: parseInt(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Login Attempts
                </label>
                <input
                  type="number"
                  value={settings?.security?.maxLoginAttempts || ''}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      security: {
                        ...prev.security,
                        maxLoginAttempts: parseInt(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password Min Length
                </label>
                <input
                  type="number"
                  value={settings?.security?.passwordMinLength || ''}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      security: {
                        ...prev.security,
                        passwordMinLength: parseInt(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Encryption Level
                </label>
                <select
                  value={settings?.security?.encryptionLevel || ''}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      security: {
                        ...prev.security,
                        encryptionLevel: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Require Two-Factor Authentication
                  </label>
                  <p className="text-xs text-gray-500">
                    Force 2FA for all users
                  </p>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings?.security?.requireTwoFactor || false
                      ? "bg-sealia-mint"
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings?.security?.requireTwoFactor || false
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Integrations Settings */}
        {activeTab === "integrations" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Integration Settings
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSaveSettings("integrations")}
                  className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => handleResetSettings("integrations")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="space-y-6 max-w-full overflow-x-hidden">
              {[
                {
                  key: "whatsappEnabled",
                  name: "WhatsApp Integration",
                  icon: MessageCircle,
                  description: "Enable WhatsApp bot functionality",
                },
                {
                  key: "emailEnabled",
                  name: "Email Service",
                  icon: Mail,
                  description: "Enable email notifications and verification",
                },
                {
                  key: "smsEnabled",
                  name: "SMS Service",
                  icon: Phone,
                  description: "Enable SMS notifications",
                },
                {
                  key: "cloudflareEnabled",
                  name: "Cloudflare R2",
                  icon: Cloud,
                  description: "Enable Cloudflare R2 storage",
                },
                {
                  key: "supabaseEnabled",
                  name: "Supabase Database",
                  icon: Database,
                  description: "Enable Supabase database operations",
                },
                {
                  key: "openaiEnabled",
                  name: "OpenAI Integration",
                  icon: Bot,
                  description: "Enable AI-powered features",
                },
              ].map((integration) => (
                <div
                  key={integration.key}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-sealia-mint/20 rounded-lg flex items-center justify-center">
                      <integration.icon className="h-5 w-5 text-sealia-mint" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {integration.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleTestConnection(integration.name)}
                      disabled={testingConnection === integration.name}
                      className="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                    >
                      {testingConnection === integration.name ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b border-gray-700"></div>
                          <span>Testing...</span>
                        </>
                      ) : (
                        <span>Test</span>
                      )}
                    </button>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings?.integrations?.[integration.key] || false
                          ? "bg-sealia-mint"
                          : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings?.integrations?.[integration.key] || false
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Storage Settings */}
        {activeTab === "storage" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Storage Settings
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSaveSettings("storage")}
                  className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => handleResetSettings("storage")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Storage Provider
                </label>
                <select
                  value={settings?.storage?.provider || ''}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      storage: { ...prev.storage, provider: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                >
                  <option value="cloudflare">Cloudflare R2</option>
                  <option value="supabase">Supabase Storage</option>
                  <option value="aws">AWS S3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bucket Name
                </label>
                <input
                  type="text"
                  value={settings?.storage?.bucketName || ''}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      storage: { ...prev.storage, bucketName: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max File Size (MB)
                </label>
                <input
                  type="number"
                  value={settings?.storage?.maxFileSize || ''}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      storage: {
                        ...prev.storage,
                        maxFileSize: parseInt(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retention Days
                </label>
                <input
                  type="number"
                  value={settings?.storage?.retentionDays || ''}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      storage: {
                        ...prev.storage,
                        retentionDays: parseInt(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Notifications Settings */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Notification Settings
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSaveSettings("notifications")}
                  className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => handleResetSettings("notifications")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  key: "emailAlerts",
                  name: "Email Alerts",
                  description: "Send email notifications for system events",
                },
                {
                  key: "systemAlerts",
                  name: "System Alerts",
                  description:
                    "Receive alerts for system maintenance and updates",
                },
                {
                  key: "securityAlerts",
                  name: "Security Alerts",
                  description: "Get notified of security events and breaches",
                },
                {
                  key: "maintenanceAlerts",
                  name: "Maintenance Alerts",
                  description:
                    "Receive notifications about scheduled maintenance",
                },
                {
                  key: "weeklyReports",
                  name: "Weekly Reports",
                  description: "Get weekly platform usage reports",
                },
                {
                  key: "monthlyReports",
                  name: "Monthly Reports",
                  description: "Get monthly platform analytics reports",
                },
              ].map((notification) => (
                <div
                  key={notification.key}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {notification.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {notification.description}
                    </p>
                  </div>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings?.notifications?.[notification.key] || false
                        ? "bg-sealia-mint"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings?.notifications?.[notification.key] || false
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Backup Settings */}
        {activeTab === "backup" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Backup Settings
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSaveSettings("backup")}
                  className="px-4 py-2 bg-sealia-mint text-white rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => handleResetSettings("backup")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backup Frequency
                </label>
                <select
                  value={settings?.backup?.frequency || ''}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      backup: { ...prev.backup, frequency: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retention (days)
                </label>
                <input
                  type="number"
                  value={settings?.backup?.retention || ''}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      backup: {
                        ...prev.backup,
                        retention: parseInt(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backup Location
                </label>
                <select
                  value={settings?.backup?.location || ''}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      backup: { ...prev.backup, location: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                >
                  <option value="cloudflare">Cloudflare R2</option>
                  <option value="aws">AWS S3</option>
                  <option value="local">Local Storage</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Encrypt Backups
                  </label>
                  <p className="text-xs text-gray-500">
                    Encrypt backup files for security
                  </p>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings?.backup?.encryption || false
                      ? "bg-sealia-mint"
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings?.backup?.encryption || false
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SettingsPage;
