import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import SuperAdminDashboard from '../pages/SuperAdminDashboard'
import BusinessOwnerDashboard from '../pages/BusinessOwnerDashboard'

const RoleBasedRoute = ({ children, path }) => {
  const { user, userProfile, loading } = useAuth()

  // Debug logging
  console.log('🔍 RoleBasedRoute:', { path, user: user?.email, userProfile: userProfile?.role, loading })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sealia-mint"></div>
      </div>
    )
  }

  // If user is super admin, redirect to admin pages
  if (userProfile?.role === 'super_admin' || user?.role === 'super_admin') {
    // Map business owner routes to admin routes
    const routeMap = {
      '/dashboard/analytics': '/dashboard/admin-analytics',
      '/dashboard/clients': '/dashboard/users',
      '/dashboard/team': '/dashboard/users',
      '/dashboard/whatsapp': '/dashboard/admin-whatsapp',
      '/dashboard/settings': '/dashboard/admin-settings'
    }
    
    const adminRoute = routeMap[path]
    if (adminRoute) {
      console.log(`🔄 Super Admin: Redirecting ${path} to ${adminRoute}`)
      return <Navigate to={adminRoute} replace />
    }
    
    // For other routes, show SuperAdminDashboard
    console.log(`🔄 Super Admin: Showing SuperAdminDashboard for ${path}`)
    return <SuperAdminDashboard />
  }

  // For business owners, show the business owner dashboard
  return <BusinessOwnerDashboard />
}

export default RoleBasedRoute
