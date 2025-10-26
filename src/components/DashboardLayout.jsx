import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Shield,
  Home,
  FileText,
  CheckCircle,
  Settings,
  MessageCircle,
  Bell,
  User,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Users,
  Calendar,
  Search,
  Filter,
} from "lucide-react";

const DashboardLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();

  // Debug logging
  useEffect(() => {
    console.log("🔍 DashboardLayout - User:", user);
    console.log("🔍 DashboardLayout - UserProfile:", userProfile);
    console.log("🔍 DashboardLayout - User email:", user?.email);
    console.log("🔍 DashboardLayout - UserProfile name:", userProfile?.name);
    console.log(
      "🔍 DashboardLayout - UserProfile first_name:",
      userProfile?.first_name
    );
    console.log("🔍 DashboardLayout - UserProfile email:", userProfile?.email);
  }, [user, userProfile]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: Home,
      current: location.pathname === "/dashboard",
    },
    {
      name: "Agreements",
      href: "/dashboard/agreements",
      icon: FileText,
      current: location.pathname.startsWith("/dashboard/agreements"),
    },
    {
      name: "Templates",
      href: "/dashboard/templates",
      icon: FileText,
      current: location.pathname.startsWith("/dashboard/templates"),
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      current: location.pathname.startsWith("/analytics"),
    },
    {
      name: "Clients",
      href: "/clients",
      icon: Users,
      current: location.pathname.startsWith("/clients"),
    },
    {
      name: "Team",
      href: "/team",
      icon: Users,
      current: location.pathname.startsWith("/team"),
    },
    {
      name: "WhatsApp",
      href: "/whatsapp",
      icon: MessageCircle,
      current: location.pathname.startsWith("/whatsapp"),
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      current: location.pathname.startsWith("/settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-sealia-mint text-sealia-forest rounded-lg shadow-lg"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        } ${sidebarCollapsed ? "lg:w-16" : "lg:w-64"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sealia-mint rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-sealia-forest" />
              </div>
              <span className="text-lg font-bold text-sealia-forest">
                Sealia
              </span>
            </div>
          )}

          {sidebarCollapsed && (
            <div className="w-8 h-8 bg-sealia-mint rounded-lg flex items-center justify-center mx-auto">
              <Shield className="h-5 w-5 text-sealia-forest" />
            </div>
          )}

          {/* Collapse button - desktop only */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:block p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors group ${
                  item.current
                    ? "bg-sealia-mint text-sealia-forest"
                    : "text-gray-700 hover:bg-gray-100 hover:text-sealia-forest"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    sidebarCollapsed ? "mx-auto" : "mr-3"
                  } flex-shrink-0`}
                />
                {!sidebarCollapsed && (
                  <span className="truncate">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-sealia-mint rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-sealia-forest" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userProfile?.name ||
                    userProfile?.first_name ||
                    user?.email ||
                    "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {userProfile?.email || user?.email || "user@example.com"}
                </p>
                {/* Debug info - remove in production */}
                <p className="text-xs text-red-500 truncate">
                  Debug: {userProfile ? "Profile loaded" : "No profile"} |{" "}
                  {user ? "User loaded" : "No user"} |{" "}
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>

          {!sidebarCollapsed && (
            <button
              onClick={handleSignOut}
              className="mt-3 w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:pl-16" : "lg:pl-64"
        }`}
      >
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-gray-900">
                  {navigationItems.find((item) => item.current)?.name ||
                    "Dashboard"}
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="hidden md:block relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search agreements..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-sealia-forest transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* WhatsApp Status */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    WhatsApp Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="w-full">{children}</div>
        </main>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
