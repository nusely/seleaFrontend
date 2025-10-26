import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Dashboard from '../pages/Dashboard'
import SuperAdminDashboard from '../pages/SuperAdminDashboard'

const RoleBasedDashboard = () => {
  const { user, userProfile, loading } = useAuth()

  // Debug logging (remove in production)
  console.log('RoleBasedDashboard - User:', user)
  console.log('RoleBasedDashboard - UserProfile:', userProfile)
  console.log('RoleBasedDashboard - User role:', userProfile?.role)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sealia-mint"></div>
      </div>
    )
  }

  // Show Super Admin dashboard for super_admin role
  if (userProfile?.role === 'super_admin') {
    console.log('Rendering SuperAdminDashboard')
    // Redirect to overview page for Super Admin
    return <Navigate to="/dashboard/overview" replace />
  }

  // Show regular business owner dashboard for all other roles
  console.log('Rendering regular Dashboard')
  return <Dashboard />
}

export default RoleBasedDashboard
