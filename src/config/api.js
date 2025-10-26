// API Configuration for Sealia Frontend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
    VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
    RESEND_VERIFICATION: `${API_BASE_URL}/auth/resend-verification`
  },
  
  // Agreements
  AGREEMENTS: {
    LIST: `${API_BASE_URL}/agreements`,
    CREATE: `${API_BASE_URL}/agreements`,
    GET: (id) => `${API_BASE_URL}/agreements/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/agreements/${id}`,
    DELETE: (id) => `${API_BASE_URL}/agreements/${id}`,
    SIGN: (id) => `${API_BASE_URL}/agreements/${id}/sign`,
    VERIFY: (id) => `${API_BASE_URL}/agreements/${id}/verify`
  },
  
  // Templates
  TEMPLATES: {
    LIST: `${API_BASE_URL}/templates`,
    USER: (userId) => `${API_BASE_URL}/templates/user/${userId}`,
    USER_TEMPLATES: `${API_BASE_URL}/templates/user-templates`,
    ALL_TEMPLATES: `${API_BASE_URL}/templates/all`,
    PUBLIC: (sector) => `${API_BASE_URL}/templates/public/${sector}`,
    CREATE: `${API_BASE_URL}/templates`,
    GET: (id) => `${API_BASE_URL}/templates/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/templates/${id}`,
    DELETE: (id) => `${API_BASE_URL}/templates/${id}`,
    USE: (id) => `${API_BASE_URL}/templates/${id}/use`,
    SECTORS: `${API_BASE_URL}/templates/sectors/list`,
    AGREEMENT_TYPES: `${API_BASE_URL}/templates/agreement-types`,
    USER_SECTORS: `${API_BASE_URL}/templates/user-sectors`
  },
  
  // Signatures
  SIGNATURES: {
    CREATE: `${API_BASE_URL}/signatures`,
    GET: (id) => `${API_BASE_URL}/signatures/${id}`,
    VERIFY: (id) => `${API_BASE_URL}/signatures/${id}/verify`
  },
  
  // WhatsApp
  WHATSAPP: {
    WEBHOOK: `${API_BASE_URL}/whatsapp/webhook`,
    VERIFY: `${API_BASE_URL}/whatsapp/verify`,
    SEND: `${API_BASE_URL}/whatsapp/send`,
    SEND_VERIFICATION: `${API_BASE_URL}/whatsapp/send-verification`,
    VERIFY_CODE: `${API_BASE_URL}/whatsapp/verify-code`
  },
  
  // Profile
  PROFILE: {
    GET: `${API_BASE_URL}/profile`,
    UPDATE: `${API_BASE_URL}/profile`,
    PICTURE: `${API_BASE_URL}/profile/picture`
  },
  
  // Admin (Super Admin only)
  ADMIN: {
    STATS: `${API_BASE_URL}/admin/stats`,
    USERS: `${API_BASE_URL}/admin/users`,
    AGREEMENTS: `${API_BASE_URL}/admin/agreements`,
    UPDATE_USER_ROLE: (id) => `${API_BASE_URL}/admin/users/${id}/role`,
    DELETE_USER: (id) => `${API_BASE_URL}/admin/users/${id}`
  },
  
  // Analytics
  ANALYTICS: {
    GET: `${API_BASE_URL}/analytics`,
    ADMIN: `${API_BASE_URL}/analytics/admin`
  },
  
  // Clients
  CLIENTS: {
    LIST: `${API_BASE_URL}/clients`,
    CREATE: `${API_BASE_URL}/clients`,
    UPDATE: (id) => `${API_BASE_URL}/clients/${id}`,
    DELETE: (id) => `${API_BASE_URL}/clients/${id}`,
    AGREEMENTS: (id) => `${API_BASE_URL}/clients/${id}/agreements`
  },
  
  // Team
  TEAM: {
    LIST: `${API_BASE_URL}/team`,
    INVITE: `${API_BASE_URL}/team/invite`,
    UPDATE_ROLE: (id) => `${API_BASE_URL}/team/${id}/role`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/team/${id}/status`,
    REMOVE: (id) => `${API_BASE_URL}/team/${id}`
  },
  
  // Business Dashboard
  BUSINESS_DASHBOARD: {
    OVERVIEW: `${API_BASE_URL}/business-dashboard/overview`,
    AGREEMENTS: `${API_BASE_URL}/business-dashboard/agreements`,
    TEMPLATES: `${API_BASE_URL}/business-dashboard/templates`,
    ANALYTICS: `${API_BASE_URL}/business-dashboard/analytics`,
    NOTIFICATIONS: `${API_BASE_URL}/business-dashboard/notifications`,
    MARK_NOTIFICATION_READ: (id) => `${API_BASE_URL}/business-dashboard/notifications/${id}/read`,
    SETTINGS: `${API_BASE_URL}/business-dashboard/settings`
  },
  
  // Templates
  TEMPLATES: {
    LIST: `${API_BASE_URL}/templates`,
    GET: (id) => `${API_BASE_URL}/templates/${id}`,
    CREATE: `${API_BASE_URL}/templates`,
    UPDATE: (id) => `${API_BASE_URL}/templates/${id}`,
    DELETE: (id) => `${API_BASE_URL}/templates/${id}`,
    USE: (id) => `${API_BASE_URL}/templates/${id}/use`,
    SECTORS: `${API_BASE_URL}/templates/sectors`,
    AGREEMENT_TYPES: `${API_BASE_URL}/templates/agreement-types`,
    USER_SECTORS: `${API_BASE_URL}/templates/user-sectors`
  },
  
  // PDF Generation
  PDF: {
    GENERATE: `${API_BASE_URL}/pdf/generate`,
    PREVIEW: (id) => `${API_BASE_URL}/pdf/preview/${id}`,
    VERIFY: (id) => `${API_BASE_URL}/pdf/verify/${id}`,
    TEMPLATE_PREVIEW: `${API_BASE_URL}/pdf/template-preview`
  },
  
  // Biometric Authentication
  BIOMETRIC: {
    WEBAUTHN_REGISTER_BEGIN: `${API_BASE_URL}/biometric/webauthn/register/begin`,
    WEBAUTHN_REGISTER_COMPLETE: `${API_BASE_URL}/biometric/webauthn/register/complete`,
    WEBAUTHN_AUTHENTICATE_BEGIN: `${API_BASE_URL}/biometric/webauthn/authenticate/begin`,
    WEBAUTHN_AUTHENTICATE_COMPLETE: `${API_BASE_URL}/biometric/webauthn/authenticate/complete`,
    PASSCODE_CREATE: `${API_BASE_URL}/biometric/passcode/create`,
    PASSCODE_VERIFY: `${API_BASE_URL}/biometric/passcode/verify`,
    DEVICE_CAPABILITIES: `${API_BASE_URL}/biometric/device/capabilities`
  },
  
  // Evidence
  EVIDENCE: {
    SCREENSHOT: `${API_BASE_URL}/evidence/screenshot`,
    CONVERSATION: `${API_BASE_URL}/evidence/conversation`,
    DEVICE_FINGERPRINT: `${API_BASE_URL}/evidence/device-fingerprint`,
    GET_AGREEMENT: (id) => `${API_BASE_URL}/evidence/agreement/${id}`,
    DOWNLOAD: (id) => `${API_BASE_URL}/evidence/download/${id}`
  },
  
  // Cleanup
  CLEANUP: {
    STATUS: (userId) => `${API_BASE_URL}/cleanup/status/${userId}`,
    DOWNLOAD: (agreementId) => `${API_BASE_URL}/cleanup/download/${agreementId}`,
    EXTEND: (agreementId) => `${API_BASE_URL}/cleanup/extend/${agreementId}`,
    TRIGGER: `${API_BASE_URL}/cleanup/trigger`,
    SYSTEM_STATUS: `${API_BASE_URL}/cleanup/system/status`
  },
  
  // Security
  SECURITY: {
    PASSCODE_CREATE: `${API_BASE_URL}/security/passcode/create`,
    PASSCODE_VERIFY: `${API_BASE_URL}/security/passcode/verify`,
    QUESTIONS_CREATE: `${API_BASE_URL}/security/questions/create`,
    QUESTIONS_VERIFY: `${API_BASE_URL}/security/questions/verify`,
    STATUS: (agreementId) => `${API_BASE_URL}/security/status/${agreementId}`
  },
  
  // Health
  HEALTH: `${API_BASE_URL}/health`,

  // Business Owner Signing
  BUSINESS_OWNER_SIGNING: {
    VERIFICATION_METHOD: `${API_BASE_URL}/business-owner-signing/verification-method`,
    UPDATE_VERIFICATION_METHOD: `${API_BASE_URL}/business-owner-signing/verification-method`,
    SIGN_AGREEMENT: `${API_BASE_URL}/business-owner-signing/sign-agreement`,
    SIGNING_HISTORY: `${API_BASE_URL}/business-owner-signing/signing-history`
  }
}

// API Helper Functions
export class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL
    this.token = localStorage.getItem('auth_token')
  }

  setToken(token) {
    this.token = token
    localStorage.setItem('auth_token', token)
  }

  clearToken() {
    this.token = null
    localStorage.removeItem('auth_token')
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    }
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }
    
    return headers
  }

  async request(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`
    
    const config = {
      headers: this.getHeaders(),
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

// Create default API client instance
export const apiClient = new ApiClient()

// Export individual endpoint functions for convenience
export const {
  AUTH,
  AGREEMENTS,
  TEMPLATES,
  SIGNATURES,
  WHATSAPP,
  PROFILE,
  ADMIN,
  BIOMETRIC,
  EVIDENCE,
  CLEANUP,
  SECURITY,
  HEALTH
} = API_ENDPOINTS

export default API_ENDPOINTS
