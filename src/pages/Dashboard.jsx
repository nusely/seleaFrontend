import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Shield,
  MessageCircle,
  FileText,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Eye,
  Download,
  Settings,
  Bot,
  TrendingUp,
  Users,
  Calendar,
  AlertCircle,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { businessDashboardService } from "../services/supabaseApiService";

const Dashboard = () => {
  const { user, userProfile } = useAuth();
  const [whatsappConnected, setWhatsappConnected] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const elementsRef = useRef({});

  // Dashboard data state
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalAgreements: 0,
      signedAgreements: 0,
      pendingAgreements: 0,
      totalTemplates: 0,
      agreementsThisMonth: 0,
      agreementsThisWeek: 0,
      agreementsToday: 0,
    },
    whatsappStatus: {
      connected: false,
      phoneNumber: null,
      activeSessions: 0,
      lastActivity: null,
      totalMessagesSent: 0,
    },
    recentAgreements: [],
    popularTemplates: [],
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  // Load dashboard data
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await businessDashboardService.getOverview();
      if (response.overview) {
        setDashboardData(response.overview);
        setWhatsappConnected(
          response.overview.whatsappStatus?.connected || false
        );
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      // Fallback to mock data for development
      const mockData = {
        stats: {
          totalAgreements: 3,
          signedAgreements: 2,
          pendingAgreements: 1,
          totalTemplates: 4,
          agreementsThisMonth: 2,
          agreementsThisWeek: 1,
          agreementsToday: 0,
        },
        whatsappStatus: {
          connected: true,
          phoneNumber: "+233500000000",
          activeSessions: 1,
          lastActivity: new Date().toISOString(),
          totalMessagesSent: 15,
        },
        recentAgreements: [
          {
            id: 1,
            title: "Photography Service Contract",
            signer_name: "John Doe",
            signer_email: "john@example.com",
            status: "signed",
            verification_id: "SEALIA-001",
            created_at: "2024-01-20T10:00:00Z",
            signed_at: "2024-01-21T14:30:00Z",
            expires_at: "2024-02-20T10:00:00Z",
          },
        ],
        popularTemplates: [
          {
            id: 1,
            name: "Photography Contract",
            total_uses: 15,
            last_used_at: "2024-01-20",
          },
          {
            id: 2,
            name: "Freelance Project",
            total_uses: 8,
            last_used_at: "2024-01-14",
          },
        ],
        recentActivity: [],
      };
      setDashboardData(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      Object.keys(elementsRef.current).forEach((key) => {
        const element = elementsRef.current[key];
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          setVisibleElements((prev) => {
            const newSet = new Set(prev);
            if (isVisible) {
              newSet.add(key);
            }
            return newSet;
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use dashboard data
  const stats = dashboardData.stats;
  const recentAgreements = dashboardData.recentAgreements.slice(0, 4); // Show only the 4 most recent
  const templates = dashboardData.popularTemplates;


  return (
    <DashboardLayout>
      {/* Simple Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-sealia-forest mb-2">
          Welcome to your Dashboard
          {userProfile?.first_name ? `, ${userProfile.first_name}` : ""}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your agreements.
        </p>

      </div>

      {/* WhatsApp Connection Status */}
      <div
        ref={(el) => (elementsRef.current["connection"] = el)}
        className={`bg-white rounded-2xl p-6 border border-sealia-mint/30 mb-8 transition-all duration-700 ${
          visibleElements.has("connection")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                whatsappConnected ? "bg-sealia-mint" : "bg-gray-200"
              }`}
            >
              <MessageCircle
                className={`h-6 w-6 ${
                  whatsappConnected ? "text-sealia-forest" : "text-gray-400"
                }`}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sealia-forest">
                WhatsApp Business
              </h3>
              <p className="text-gray-600">
                {whatsappConnected ? "Connected ✅" : "Not Connected ❌"}
              </p>
            </div>
          </div>
          {!whatsappConnected && (
            <button className="px-4 py-2 bg-sealia-mint text-sealia-forest font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors">
              Connect WhatsApp
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          ref={(el) => (elementsRef.current["stat1"] = el)}
          className={`bg-white rounded-2xl p-6 border border-sealia-mint/20 shadow-lg transition-all duration-700 ${
            visibleElements.has("stat1")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-sealia-mint/20 rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-sealia-forest" />
            </div>
            <span className="text-2xl font-bold text-sealia-forest">
              {stats.totalAgreements}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-sealia-forest mb-1">
            Total Agreements
          </h3>
          <p className="text-gray-600 text-sm">All time</p>
        </div>

        <div
          ref={(el) => (elementsRef.current["stat2"] = el)}
          className={`bg-white rounded-2xl p-6 border border-sealia-mint/20 shadow-lg transition-all duration-700 delay-100 ${
            visibleElements.has("stat2")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-sealia-mint/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-sealia-forest" />
            </div>
            <span className="text-2xl font-bold text-sealia-forest">
              {stats.signedAgreements}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-sealia-forest mb-1">
            Signed
          </h3>
          <p className="text-gray-600 text-sm">Completed agreements</p>
        </div>

        <div
          ref={(el) => (elementsRef.current["stat3"] = el)}
          className={`bg-white rounded-2xl p-6 border border-sealia-mint/20 shadow-lg transition-all duration-700 delay-200 ${
            visibleElements.has("stat3")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-sealia-mint/20 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-sealia-forest" />
            </div>
            <span className="text-2xl font-bold text-sealia-forest">
              {stats.pendingAgreements}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-sealia-forest mb-1">
            Pending
          </h3>
          <p className="text-gray-600 text-sm">Awaiting signature</p>
        </div>

        <div
          ref={(el) => (elementsRef.current["stat4"] = el)}
          className={`bg-white rounded-2xl p-6 border border-sealia-mint/20 shadow-lg transition-all duration-700 delay-300 ${
            visibleElements.has("stat4")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-sealia-mint/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-sealia-forest" />
            </div>
            <span className="text-2xl font-bold text-sealia-forest">
              {stats.agreementsThisMonth}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-sealia-forest mb-1">
            This Month
          </h3>
          <p className="text-gray-600 text-sm">New agreements</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Recent Agreements */}
        <div className="lg:col-span-2">
          <div
            ref={(el) => (elementsRef.current["agreements"] = el)}
            className={`bg-white rounded-3xl p-8 border border-sealia-mint/20 shadow-lg transition-all duration-700 ${
              visibleElements.has("agreements")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-sealia-forest">
                Recent Agreements
              </h2>
              {recentAgreements.length > 0 && (
                <Link
                  to="/agreements"
                  className="text-sealia-forest hover:text-sealia-forest/80 transition-colors font-medium"
                >
                  View All
                </Link>
              )}
            </div>

            {recentAgreements.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-sealia-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-sealia-forest" />
                </div>
                <h3 className="text-lg font-semibold text-sealia-forest mb-2">
                  No Agreements Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first agreement to get started with Sealia.
                </p>
                <Link
                  to="/create"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-sealia-mint text-sealia-forest font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Your First Agreement</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentAgreements.map((agreement, index) => (
                  <div
                    key={agreement.id}
                    className={`p-4 border border-sealia-mint/20 rounded-xl hover:bg-sealia-mint/5 transition-all duration-300 ${
                      index === 0 ? "bg-sealia-mint/10" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sealia-forest mb-1">
                          {agreement.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          Client: {agreement.signer_name}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(
                                agreement.created_at
                              ).toLocaleDateString()}
                            </span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Shield className="h-4 w-4" />
                            <span>{agreement.verification_id}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            agreement.status === "signed"
                              ? "bg-sealia-mint text-sealia-forest"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {agreement.status === "signed" ? "Signed" : "Pending"}
                        </span>
                        <button className="p-2 hover:bg-sealia-mint/20 rounded-lg transition-colors">
                          <Eye className="h-4 w-4 text-sealia-forest" />
                        </button>
                        <button className="p-2 hover:bg-sealia-mint/20 rounded-lg transition-colors">
                          <Download className="h-4 w-4 text-sealia-forest" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Templates & Quick Actions */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div
            ref={(el) => (elementsRef.current["actions"] = el)}
            className={`bg-white rounded-3xl p-6 border border-sealia-mint/20 shadow-lg transition-all duration-700 ${
              visibleElements.has("actions")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-xl font-bold text-sealia-forest mb-6">
              Quick Actions
            </h3>
            <div className="space-y-4">
              <Link
                to="/create"
                className="flex items-center space-x-3 p-4 bg-sealia-mint/20 rounded-xl hover:bg-sealia-mint/30 transition-colors group"
              >
                <div className="w-10 h-10 bg-sealia-mint rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="h-5 w-5 text-sealia-forest" />
                </div>
                <div>
                  <h4 className="font-semibold text-sealia-forest">
                    Create Agreement
                  </h4>
                  <p className="text-gray-600 text-sm">Start a new contract</p>
                </div>
              </Link>

              <Link
                to="/dashboard/templates"
                className="flex items-center space-x-3 p-4 bg-sealia-mint/20 rounded-xl hover:bg-sealia-mint/30 transition-colors group"
              >
                <div className="w-10 h-10 bg-sealia-mint rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="h-5 w-5 text-sealia-forest" />
                </div>
                <div>
                  <h4 className="font-semibold text-sealia-forest">
                    Templates
                  </h4>
                  <p className="text-gray-600 text-sm">Manage your templates</p>
                </div>
              </Link>

              <Link
                to="/verify"
                className="flex items-center space-x-3 p-4 bg-sealia-mint/20 rounded-xl hover:bg-sealia-mint/30 transition-colors group"
              >
                <div className="w-10 h-10 bg-sealia-mint rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5 text-sealia-forest" />
                </div>
                <div>
                  <h4 className="font-semibold text-sealia-forest">
                    Verify Document
                  </h4>
                  <p className="text-gray-600 text-sm">Check authenticity</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Popular Templates */}
          <div
            ref={(el) => (elementsRef.current["templates"] = el)}
            className={`bg-white rounded-3xl p-6 border border-sealia-mint/20 shadow-lg transition-all duration-700 ${
              visibleElements.has("templates")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-xl font-bold text-sealia-forest mb-6">
              Popular Templates
            </h3>
            {templates.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-sealia-mint/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-6 w-6 text-sealia-forest" />
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  No templates created yet
                </p>
                <Link
                  to="/templates"
                  className="text-sealia-forest hover:text-sealia-forest/80 transition-colors font-medium text-sm"
                >
                  Create Your First Template
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {templates.slice(0, 3).map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-3 bg-sealia-mint/10 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-sealia-forest">
                        {template.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {template.total_uses} uses
                      </p>
                    </div>
                    <button className="text-sealia-forest hover:text-sealia-forest/80 transition-colors">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <Link
                  to="/templates"
                  className="block text-center text-sealia-forest hover:text-sealia-forest/80 transition-colors font-medium py-2"
                >
                  View All Templates
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
