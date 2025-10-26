import React from 'react'
import { useLocation } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import Analytics from './Analytics'
import Clients from './Clients'
import Team from './Team'
import Calendar from './Calendar'
import WhatsApp from './WhatsApp'
import Settings from './Settings'
import Agreements from './Agreements'
import Templates from './Templates'

const BusinessOwnerDashboard = () => {
  const location = useLocation()
  
  // Extract the page name from the path (e.g., /dashboard/team -> team)
  const pathSegments = location.pathname.split('/')
  const pageName = pathSegments[pathSegments.length - 1]
  
  const renderPage = () => {
    switch (pageName) {
      case 'analytics':
        return <Analytics />
      case 'clients':
        return <Clients />
      case 'team':
        return <Team />
      case 'calendar':
        return <Calendar />
      case 'whatsapp':
        return <WhatsApp />
      case 'settings':
        return <Settings />
      case 'agreements':
        return <Agreements />
      case 'templates':
        return <Templates />
      default:
        return <Analytics /> // Default to analytics
    }
  }

  return (
    <DashboardLayout>
      {renderPage()}
    </DashboardLayout>
  )
}

export default BusinessOwnerDashboard
