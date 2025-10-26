import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Shield,
  Crown,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Users,
  FileText,
  MessageCircle,
  CreditCard,
  Bot,
  File,
  Lock,
  Bell,
  TrendingUp,
  Settings,
} from "lucide-react";

const SuperAdminLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const handleTabClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false); // Close mobile menu on navigation
  };

  const getCurrentSectionName = () => {
    const currentItem = menuItems.find(
      (item) => location.pathname === item.path
    );
    return currentItem ? currentItem.name : "Overview";
  };

  const menuItems = [
    {
      id: "overview",
      name: "Overview",
      icon: BarChart3,
      path: "/dashboard/overview",
    },
    { id: "users", name: "Users", icon: Users, path: "/dashboard/users" },
    {
      id: "agreements",
      name: "Agreements",
      icon: FileText,
      path: "/dashboard/admin-agreements",
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: MessageCircle,
      path: "/dashboard/admin-whatsapp",
    },
    {
      id: "billing",
      name: "Billing",
      icon: CreditCard,
      path: "/dashboard/billing",
    },
    { id: "ai", name: "AI Config", icon: Bot, path: "/dashboard/ai" },
    {
      id: "templates",
      name: "Templates",
      icon: File,
      path: "/dashboard/admin-templates",
    },
    {
      id: "compliance",
      name: "Compliance",
      icon: Lock,
      path: "/dashboard/compliance",
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: Bell,
      path: "/dashboard/notifications",
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: TrendingUp,
      path: "/dashboard/admin-analytics",
    },
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
      path: "/dashboard/admin-settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        ${sidebarCollapsed ? "w-16" : "w-64"} 
        bg-white border-r border-gray-200 
        transition-all duration-300 
        flex-shrink-0
        ${
          mobileMenuOpen
            ? "fixed inset-y-0 left-0 z-50"
            : "hidden lg:flex flex-col"
        }
      `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 flex-shrink-0">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sealia-green rounded-xl flex items-center justify-center">
                <Shield className="h-5 w-5 text-black" />
              </div>
              <span className="text-xl font-bold text-gray-900">Sealia</span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 bg-sealia-green rounded-xl flex items-center justify-center mx-auto">
              <Shield className="h-5 w-5 text-black" />
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.path)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  sidebarCollapsed ? "justify-center" : "justify-start"
                } ${
                  location.pathname === item.path
                    ? "bg-sealia-mint/10 text-sealia-mint border-r-2 border-sealia-mint"
                    : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Crown className="h-4 w-4 text-yellow-600" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Super Admin
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Platform Management
                </p>
              </div>
            )}
            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  <span>
                    Welcome to Sealia Super Admin
                    {user?.first_name ? `, ${user.first_name}` : ""}!
                  </span>
                </h1>
                <p className="text-sm text-gray-600">
                  {getCurrentSectionName()} • Platform management and oversight
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>System Online</span>
              </div>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
