const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

class SuperAdminApiService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api/super-admin`
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('supabase.auth.token')
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  // Overview Dashboard
  async getOverview() {
    try {
      const response = await fetch(`${this.baseURL}/overview`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching overview:', error)
      throw error
    }
  }

  // Users Management
  async getUsers(params = {}) {
    try {
      // Add cache-busting parameter
      params._t = Date.now()
      const queryParams = new URLSearchParams(params)
      const response = await fetch(`${this.baseURL}/users?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  async getUserDetails(userId) {
    try {
      const response = await fetch(`${this.baseURL}/users/${userId}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching user details:', error)
      throw error
    }
  }

  async updateUser(userId, userData) {
    try {
      const response = await fetch(`${this.baseURL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  async deleteUser(userId) {
    try {
      const response = await fetch(`${this.baseURL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }

  async verifyUser(userId) {
    try {
      const response = await fetch(`${this.baseURL}/users/${userId}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error verifying user:', error)
      throw error
    }
  }

  async suspendUser(userId) {
    try {
      const response = await fetch(`${this.baseURL}/users/${userId}/suspend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error suspending user:', error)
      throw error
    }
  }

  async exportUsers(params = {}) {
    try {
      const queryParams = new URLSearchParams(params)
      const response = await fetch(`${this.baseURL}/users/export?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.text()
    } catch (error) {
      console.error('Error exporting users:', error)
      throw error
    }
  }

  // Agreements Management
  async getAgreements(params = {}) {
    try {
      const queryParams = new URLSearchParams(params)
      const response = await fetch(`${this.baseURL}/agreements?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching agreements:', error)
      throw error
    }
  }

  async forceVerifyAgreement(agreementId) {
    try {
      const response = await fetch(`${this.baseURL}/agreements/${agreementId}/force-verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error force verifying agreement:', error)
      throw error
    }
  }

  async revokeAgreement(agreementId) {
    try {
      const response = await fetch(`${this.baseURL}/agreements/${agreementId}/revoke`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error revoking agreement:', error)
      throw error
    }
  }

  async exportAgreements(params = {}) {
    try {
      const queryParams = new URLSearchParams(params)
      const response = await fetch(`${this.baseURL}/agreements/export?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.text()
    } catch (error) {
      console.error('Error exporting agreements:', error)
      throw error
    }
  }

  // WhatsApp Management
  async getWhatsAppData() {
    try {
      const response = await fetch(`${this.baseURL}/whatsapp`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching WhatsApp data:', error)
      throw error
    }
  }

  async getWhatsAppSessions(params = {}) {
    try {
      const queryParams = new URLSearchParams(params)
      const response = await fetch(`${this.baseURL}/whatsapp/sessions?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching WhatsApp sessions:', error)
      throw error
    }
  }

  async getWhatsAppStats() {
    try {
      const response = await fetch(`${this.baseURL}/whatsapp/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching WhatsApp stats:', error)
      throw error
    }
  }

  async exportWhatsAppSessions(params = {}) {
    try {
      const queryParams = new URLSearchParams(params)
      const response = await fetch(`${this.baseURL}/whatsapp/sessions/export?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.text()
    } catch (error) {
      console.error('Error exporting WhatsApp sessions:', error)
      throw error
    }
  }

  // Template Management
  async getTemplates(params = {}) {
    try {
      const queryParams = new URLSearchParams(params)
      const response = await fetch(`${this.baseURL}/templates?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching templates:', error)
      throw error
    }
  }

  async getTemplateStats() {
    try {
      const response = await fetch(`${this.baseURL}/templates/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching template stats:', error)
      throw error
    }
  }

  async createTemplate(templateData) {
    try {
      const response = await fetch(`${this.baseURL}/templates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(templateData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating template:', error)
      throw error
    }
  }

  async updateTemplate(templateId, templateData) {
    try {
      const response = await fetch(`${this.baseURL}/templates/${templateId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(templateData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating template:', error)
      throw error
    }
  }

  async deleteTemplate(templateId) {
    try {
      const response = await fetch(`${this.baseURL}/templates/${templateId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error deleting template:', error)
      throw error
    }
  }

  async getTemplateVersions(templateId) {
    try {
      const response = await fetch(`${this.baseURL}/templates/${templateId}/versions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching template versions:', error)
      throw error
    }
  }

  async exportTemplates(params = {}) {
    try {
      const queryParams = new URLSearchParams(params)
      const response = await fetch(`${this.baseURL}/templates/export?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.text()
    } catch (error) {
      console.error('Error exporting templates:', error)
      throw error
    }
  }

  // Billing & Subscriptions
  async getBillingData() {
    try {
      const response = await fetch(`${this.baseURL}/billing`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching billing data:', error)
      throw error
    }
  }

  async getBillingPlans() {
    try {
      const response = await fetch(`${this.baseURL}/billing/plans`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
      return await response.json()
    } catch (error) { console.error('Error fetching billing plans:', error); throw error }
  }

  async createBillingPlan(planData) {
    try {
      const response = await fetch(`${this.baseURL}/billing/plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(planData)
      })
      if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
      return await response.json()
    } catch (error) { console.error('Error creating billing plan:', error); throw error }
  }

  async updateBillingPlan(planId, planData) {
    try {
      const response = await fetch(`${this.baseURL}/billing/plans/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(planData)
      })
      if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
      return await response.json()
    } catch (error) { console.error('Error updating billing plan:', error); throw error }
  }

  async deleteBillingPlan(planId) {
    try {
      const response = await fetch(`${this.baseURL}/billing/plans/${planId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
      return await response.json()
    } catch (error) { console.error('Error deleting billing plan:', error); throw error }
  }

  async getTransactions(params = {}) {
    try {
      const queryParams = new URLSearchParams(params)
      const response = await fetch(`${this.baseURL}/billing/transactions?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
      return await response.json()
    } catch (error) { console.error('Error fetching transactions:', error); throw error }
  }

  async exportTransactions(params = {}) {
    try {
      const queryParams = new URLSearchParams(params)
      const response = await fetch(`${this.baseURL}/billing/transactions/export?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
      return await response.text()
    } catch (error) { console.error('Error exporting transactions:', error); throw error }
  }

  // AI Configuration
  async getAIConfig() {
    try {
      const response = await fetch(`${this.baseURL}/ai-config`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching AI config:', error)
      throw error
    }
  }

  async updateAIConfig(configId, configData) {
    try {
      const response = await fetch(`${this.baseURL}/ai-config/${configId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(configData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating AI config:', error)
      throw error
    }
  }

  async testAIConfig(testData) {
    try {
      const response = await fetch(`${this.baseURL}/ai-config/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error testing AI config:', error)
      throw error
    }
  }

  async getAIUsage() {
    try {
      const response = await fetch(`${this.baseURL}/ai-config/usage`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching AI usage:', error)
      throw error
    }
  }

  // Currency Rates
  async getCurrencyRates() {
    try {
      const response = await fetch(`${this.baseURL}/currency-rates`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching currency rates:', error)
      throw error
    }
  }

  // Templates Management
  async getTemplates(params = {}) {
    try {
      const queryParams = new URLSearchParams(params)
      const response = await fetch(`${this.baseURL}/templates?${queryParams}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching templates:', error)
      throw error
    }
  }

  async createTemplate(templateData) {
    try {
      const response = await fetch(`${this.baseURL}/templates`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(templateData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating template:', error)
      throw error
    }
  }

  async updateTemplate(templateId, templateData) {
    try {
      const response = await fetch(`${this.baseURL}/templates/${templateId}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(templateData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating template:', error)
      throw error
    }
  }

  async deleteTemplate(templateId) {
    try {
      const response = await fetch(`${this.baseURL}/templates/${templateId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error deleting template:', error)
      throw error
    }
  }

  // Compliance & Security
  async getComplianceData(params = {}) {
    try {
      const queryParams = new URLSearchParams()
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit)
      if (params.search) queryParams.append('search', params.search)
      if (params.action_filter) queryParams.append('action_filter', params.action_filter)
      if (params.date_filter) queryParams.append('date_filter', params.date_filter)

      const response = await fetch(`${this.baseURL}/compliance?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching compliance data:', error)
      throw error
    }
  }

  async exportComplianceReport(params = {}) {
    try {
      const queryParams = new URLSearchParams()
      if (params.format) queryParams.append('format', params.format)
      if (params.date_range) queryParams.append('date_range', params.date_range)

      const response = await fetch(`${this.baseURL}/compliance/export?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      if (params.format === 'csv') {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `compliance-report-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        return { success: true, message: 'Report downloaded successfully' }
      }

      return await response.json()
    } catch (error) {
      console.error('Error exporting compliance report:', error)
      throw error
    }
  }

  async updateRetentionPolicy(data) {
    try {
      const response = await fetch(`${this.baseURL}/compliance/retention-policy`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating retention policy:', error)
      throw error
    }
  }

  async runDataCleanup() {
    try {
      const response = await fetch(`${this.baseURL}/compliance/run-cleanup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error running data cleanup:', error)
      throw error
    }
  }

  // Notifications
  async getNotifications(params = {}) {
    try {
      const queryParams = new URLSearchParams()
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit)
      if (params.type) queryParams.append('type', params.type)
      if (params.search) queryParams.append('search', params.search)
      if (params.priority) queryParams.append('priority', params.priority)
      if (params.unread_only) queryParams.append('unread_only', params.unread_only)

      const response = await fetch(`${this.baseURL}/notifications?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching notifications:', error)
      throw error
    }
  }

  async markNotificationAsRead(notificationId) {
    try {
      const response = await fetch(`${this.baseURL}/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error marking notification as read:', error)
      throw error
    }
  }

  async markAllNotificationsAsRead() {
    try {
      const response = await fetch(`${this.baseURL}/notifications/mark-all-read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      throw error
    }
  }

  async createNotification(data) {
    try {
      const response = await fetch(`${this.baseURL}/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating notification:', error)
      throw error
    }
  }

  async deleteNotification(notificationId) {
    try {
      const response = await fetch(`${this.baseURL}/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error deleting notification:', error)
      throw error
    }
  }

  async getNotificationSettings() {
    try {
      const response = await fetch(`${this.baseURL}/notifications/settings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching notification settings:', error)
      throw error
    }
  }

  async updateNotificationSettings(data) {
    try {
      const response = await fetch(`${this.baseURL}/notifications/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating notification settings:', error)
      throw error
    }
  }

  async sendNotification(notificationData) {
    try {
      const response = await fetch(`${this.baseURL}/notifications`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(notificationData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error sending notification:', error)
      throw error
    }
  }

  // Analytics
  async getAnalytics(params = {}) {
    try {
      const queryParams = new URLSearchParams(params)
      const response = await fetch(`${this.baseURL}/analytics?${queryParams}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching analytics:', error)
      throw error
    }
  }

  // Settings
  async getSettings() {
    try {
      const response = await fetch(`${this.baseURL}/settings`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching settings:', error)
      throw error
    }
  }

  async updateSettings(category, settings) {
    try {
      const response = await fetch(`${this.baseURL}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category, settings })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating settings:', error)
      throw error
    }
  }

  async testConnection(service) {
    try {
      const response = await fetch(`${this.baseURL}/settings/test-connection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ service })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error testing connection:', error)
      throw error
    }
  }

  async initiateBackup() {
    try {
      const response = await fetch(`${this.baseURL}/settings/backup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error initiating backup:', error)
      throw error
    }
  }

  async getBackupStatus(backupId) {
    try {
      const response = await fetch(`${this.baseURL}/settings/backup-status/${backupId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching backup status:', error)
      throw error
    }
  }

  // Payment methods
  async initializePayment(paymentData) {
    try {
      const response = await fetch(`${this.baseURL}/paystack/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error initializing payment:', error)
      throw error
    }
  }

  async verifyPayment(paymentData) {
    try {
      const response = await fetch(`${this.baseURL}/paystack/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error verifying payment:', error)
      throw error
    }
  }

  // Cleanup orphaned auth users
  async cleanupOrphanedAuthUsers() {
    try {
      const response = await fetch(`${this.baseURL}/cleanup-orphaned-auth-users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error cleaning up orphaned auth users:', error)
      throw error
    }
  }
}

// Create and export a singleton instance
const superAdminApiService = new SuperAdminApiService()
export default superAdminApiService


