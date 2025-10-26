import { supabase } from '../config/supabase.js'

// Supabase-based API service that uses Supabase auth tokens
export class SupabaseApiClient {
  constructor(baseURL = 'http://localhost:5000/api') {
    this.baseURL = baseURL
  }

  async getToken() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      return session?.access_token || null
    } catch (error) {
      console.error('Error getting token:', error)
      return null
    }
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json'
    }
  }

  async request(endpoint, options = {}) {
    const token = await this.getToken()
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`
    
    const config = {
      headers: {
        ...this.getHeaders(),
        ...(token && { Authorization: `Bearer ${token}` })
      },
      ...options
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' })
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }
}

// Create default Supabase API client instance
export const supabaseApiClient = new SupabaseApiClient()

// Business Dashboard Service using Supabase
export const businessDashboardService = {
  async getOverview() {
    return supabaseApiClient.get('/business-dashboard/overview')
  },
  
  async getAgreements(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `/business-dashboard/agreements?${queryString}` : '/business-dashboard/agreements'
    return supabaseApiClient.get(url)
  },
  
  async getTemplates() {
    return supabaseApiClient.get('/business-dashboard/templates')
  },
  
  async getAnalytics() {
    return supabaseApiClient.get('/business-dashboard/analytics')
  },
  
  async getNotifications() {
    return supabaseApiClient.get('/business-dashboard/notifications')
  },
  
  async markNotificationRead(notificationId) {
    return supabaseApiClient.put(`/business-dashboard/notifications/${notificationId}/read`)
  },
  
  async getSettings() {
    return supabaseApiClient.get('/business-dashboard/settings')
  },
  
  async updateSettings(settings) {
    return supabaseApiClient.put('/business-dashboard/settings', settings)
  }
}

// Templates Service using Supabase
export const templatesService = {
  async getUserTemplates() {
    return supabaseApiClient.get('/templates/user-templates')
  },
  
  async getAllTemplates() {
    return supabaseApiClient.get('/templates')
  },
  
  async getTemplate(id) {
    return supabaseApiClient.get(`/templates/${id}`)
  },
  
  async createTemplate(templateData) {
    return supabaseApiClient.post('/templates', templateData)
  },
  
  async updateTemplate(id, templateData) {
    return supabaseApiClient.put(`/templates/${id}`, templateData)
  },
  
  async deleteTemplate(id) {
    return supabaseApiClient.delete(`/templates/${id}`)
  }
}

// Agreements Service using Supabase
export const agreementsService = {
  async getAgreements() {
    return supabaseApiClient.get('/agreements')
  },
  
  async getAgreement(id) {
    return supabaseApiClient.get(`/agreements/${id}`)
  },
  
  async createAgreement(agreementData) {
    return supabaseApiClient.post('/agreements', agreementData)
  },
  
  async updateAgreement(id, agreementData) {
    return supabaseApiClient.put(`/agreements/${id}`, agreementData)
  },
  
  async deleteAgreement(id) {
    return supabaseApiClient.delete(`/agreements/${id}`)
  }
}

// Profile Service using Supabase
export const profileService = {
  async getProfile() {
    return supabaseApiClient.get('/users/profile')
  },
  
  async updateProfile(profileData) {
    return supabaseApiClient.put('/users/profile', profileData)
  }
}

// Analytics Service using Supabase
export const analyticsService = {
  async getAnalytics() {
    return supabaseApiClient.get('/analytics')
  },
  
  async getAdminAnalytics() {
    return supabaseApiClient.get('/analytics/admin')
  }
}

// Clients Service using Supabase
export const clientsService = {
  async getClients() {
    return supabaseApiClient.get('/clients')
  },
  
  async getClient(id) {
    return supabaseApiClient.get(`/clients/${id}`)
  },
  
  async createClient(clientData) {
    return supabaseApiClient.post('/clients', clientData)
  },
  
  async updateClient(id, clientData) {
    return supabaseApiClient.put(`/clients/${id}`, clientData)
  },
  
  async deleteClient(id) {
    return supabaseApiClient.delete(`/clients/${id}`)
  },
  
  async getClientAgreements(id) {
    return supabaseApiClient.get(`/clients/${id}/agreements`)
  }
}

// Team Service using Supabase
export const teamService = {
  async getTeamMembers() {
    return supabaseApiClient.get('/team')
  },
  
  async inviteTeamMember(inviteData) {
    return supabaseApiClient.post('/team/invite', inviteData)
  },
  
  async updateTeamMemberRole(id, role) {
    return supabaseApiClient.put(`/team/${id}/role`, { role })
  },
  
  async updateTeamMemberStatus(id, status) {
    return supabaseApiClient.put(`/team/${id}/status`, { status })
  },
  
  async removeTeamMember(id) {
    return supabaseApiClient.delete(`/team/${id}`)
  }
}

// Auth Service using Supabase (for compatibility)
export const authService = {
  async login(email, password) {
    // This is handled by Supabase auth directly, but keeping for compatibility
    throw new Error('Use Supabase auth directly instead of this service')
  },
  
  async register(userData) {
    // This is handled by Supabase auth directly, but keeping for compatibility
    throw new Error('Use Supabase auth directly instead of this service')
  },
  
  async logout() {
    // This is handled by Supabase auth directly, but keeping for compatibility
    throw new Error('Use Supabase auth directly instead of this service')
  }
}

// Admin Service using Supabase
export const adminService = {
  async getStats() {
    return supabaseApiClient.get('/admin/stats')
  },
  
  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `/admin/users?${queryString}` : '/admin/users'
    return supabaseApiClient.get(url)
  },
  
  async getAgreements(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `/admin/agreements?${queryString}` : '/admin/agreements'
    return supabaseApiClient.get(url)
  },
  
  async updateUserRole(id, role) {
    return supabaseApiClient.put(`/admin/users/${id}/role`, { role })
  },
  
  async deleteUser(id) {
    return supabaseApiClient.delete(`/admin/users/${id}`)
  }
}
