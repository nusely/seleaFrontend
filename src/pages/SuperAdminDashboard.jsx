import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import SuperAdminLayout from '../components/SuperAdminLayout'
import OverviewPage from './admin/OverviewPage'
import UsersPage from './admin/UsersPage'
import AgreementsPage from './admin/AgreementsPage'
import WhatsAppPage from './admin/WhatsAppPage'
import BillingPage from './admin/BillingPage'
import AIConfigPage from './admin/AIConfigPage'
import TemplatesPage from './admin/TemplatesPage'
import CompliancePage from './admin/CompliancePage'
import NotificationsPage from './admin/NotificationsPage'
import AnalyticsPage from './admin/AnalyticsPage'
import SettingsPage from './admin/SettingsPage'

const SuperAdminDashboard = () => {
  const { user } = useAuth()
  const location = useLocation()
  
  // Extract the page name from the path (e.g., /dashboard/overview -> overview)
  const pathSegments = location.pathname.split('/')
  const pageName = pathSegments[pathSegments.length - 1]
  
  const renderPage = () => {
    switch (pageName) {
      case 'overview':
        return <OverviewPage />
      case 'users':
        return <UsersPage />
      case 'admin-agreements':
        return <AgreementsPage />
      case 'admin-whatsapp':
        return <WhatsAppPage />
      case 'billing':
        return <BillingPage />
      case 'ai':
        return <AIConfigPage />
      case 'admin-templates':
        return <TemplatesPage />
      case 'compliance':
        return <CompliancePage />
      case 'notifications':
        return <NotificationsPage />
      case 'admin-analytics':
        return <AnalyticsPage />
      case 'admin-settings':
        return <SettingsPage />
      default:
        return <OverviewPage /> // Default to overview
    }
  }

  return (
    <SuperAdminLayout>
      {renderPage()}
    </SuperAdminLayout>
  )
}

export default SuperAdminDashboard