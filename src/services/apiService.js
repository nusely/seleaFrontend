import { apiClient, API_ENDPOINTS } from '../config/api.js'

// Authentication Service
export const authService = {
  async login(email, password) {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password })
  },

  async register(userData) {
    return apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData)
  },

  async logout() {
    const result = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
    apiClient.clearToken()
    return result
  },

  async forgotPassword(email) {
    return apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
  },

  async resetPassword(token, password) {
    return apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password })
  },

  async verifyEmail(token) {
    return apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token })
  },

  async resendVerification(email) {
    return apiClient.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, { email })
  }
}

// Agreements Service
export const agreementService = {
  async getAgreements() {
    return apiClient.get(API_ENDPOINTS.AGREEMENTS.LIST)
  },

  async getAgreement(id) {
    return apiClient.get(API_ENDPOINTS.AGREEMENTS.GET(id))
  },

  async createAgreement(agreementData) {
    return apiClient.post(API_ENDPOINTS.AGREEMENTS.CREATE, agreementData)
  },

  async updateAgreement(id, agreementData) {
    return apiClient.put(API_ENDPOINTS.AGREEMENTS.UPDATE(id), agreementData)
  },

  async deleteAgreement(id) {
    return apiClient.delete(API_ENDPOINTS.AGREEMENTS.DELETE(id))
  },

  async signAgreement(id, signatureData) {
    return apiClient.post(API_ENDPOINTS.AGREEMENTS.SIGN(id), signatureData)
  },

  async verifyAgreement(id) {
    return apiClient.get(API_ENDPOINTS.AGREEMENTS.VERIFY(id))
  }
}

// Templates Service
export const templateService = {
  async getTemplates() {
    return apiClient.get(API_ENDPOINTS.TEMPLATES.LIST)
  },

  async getUserTemplates(userId) {
    return apiClient.get(API_ENDPOINTS.TEMPLATES.USER(userId))
  },

  async getPublicTemplates(sector) {
    return apiClient.get(API_ENDPOINTS.TEMPLATES.PUBLIC(sector))
  },

  async getTemplate(id) {
    return apiClient.get(API_ENDPOINTS.TEMPLATES.GET(id))
  },

  async createTemplate(templateData) {
    return apiClient.post(API_ENDPOINTS.TEMPLATES.CREATE, templateData)
  },

  async updateTemplate(id, templateData) {
    return apiClient.put(API_ENDPOINTS.TEMPLATES.UPDATE(id), templateData)
  },

  async deleteTemplate(id) {
    return apiClient.delete(API_ENDPOINTS.TEMPLATES.DELETE(id))
  },

  async useTemplate(id) {
    return apiClient.post(API_ENDPOINTS.TEMPLATES.USE(id))
  },

  async getSectors() {
    return apiClient.get(API_ENDPOINTS.TEMPLATES.SECTORS)
  }
}

// Biometric Service
export const biometricService = {
  async getDeviceCapabilities(deviceInfo) {
    return apiClient.post(API_ENDPOINTS.BIOMETRIC.DEVICE_CAPABILITIES, deviceInfo)
  },

  async startWebAuthnRegistration(userId, agreementId, userInfo) {
    return apiClient.post(API_ENDPOINTS.BIOMETRIC.WEBAUTHN_REGISTER_BEGIN, {
      userId,
      agreementId,
      ...userInfo
    })
  },

  async completeWebAuthnRegistration(credential, challenge, deviceInfo, locationInfo) {
    return apiClient.post(API_ENDPOINTS.BIOMETRIC.WEBAUTHN_REGISTER_COMPLETE, {
      credential,
      challenge,
      deviceInfo,
      locationInfo
    })
  },

  async startWebAuthnAuthentication(agreementId) {
    return apiClient.post(API_ENDPOINTS.BIOMETRIC.WEBAUTHN_AUTHENTICATE_BEGIN, {
      agreementId
    })
  },

  async completeWebAuthnAuthentication(credential, challenge, deviceInfo, locationInfo) {
    return apiClient.post(API_ENDPOINTS.BIOMETRIC.WEBAUTHN_AUTHENTICATE_COMPLETE, {
      credential,
      challenge,
      deviceInfo,
      locationInfo
    })
  },

  async createPasscode(agreementId, passcode, deviceInfo, locationInfo, securityQuestions) {
    return apiClient.post(API_ENDPOINTS.BIOMETRIC.PASSCODE_CREATE, {
      agreementId,
      passcode,
      deviceInfo,
      locationInfo,
      securityQuestions
    })
  },

  async verifyPasscode(agreementId, passcode, deviceInfo, locationInfo, securityAnswers, biometricData) {
    return apiClient.post(API_ENDPOINTS.BIOMETRIC.PASSCODE_VERIFY, {
      agreementId,
      passcode,
      deviceInfo,
      locationInfo,
      securityAnswers,
      biometricData
    })
  }
}

// Evidence Service
export const evidenceService = {
  async captureScreenshot(agreementId, screenshotData, conversationData, deviceInfo, locationInfo) {
    return apiClient.post(API_ENDPOINTS.EVIDENCE.SCREENSHOT, {
      agreementId,
      screenshotData,
      conversationData,
      deviceInfo,
      locationInfo
    })
  },

  async captureConversation(agreementId, conversationText, whatsappMessageId, senderPhone, messageContent, messageTimestamp, deviceInfo, locationInfo) {
    return apiClient.post(API_ENDPOINTS.EVIDENCE.CONVERSATION, {
      agreementId,
      conversationText,
      whatsappMessageId,
      senderPhone,
      messageContent,
      messageTimestamp,
      deviceInfo,
      locationInfo
    })
  },

  async captureDeviceFingerprint(agreementId, deviceInfo, locationInfo, securityAnalysis) {
    return apiClient.post(API_ENDPOINTS.EVIDENCE.DEVICE_FINGERPRINT, {
      agreementId,
      deviceInfo,
      locationInfo,
      securityAnalysis
    })
  },

  async getAgreementEvidence(agreementId) {
    return apiClient.get(API_ENDPOINTS.EVIDENCE.GET_AGREEMENT(agreementId))
  },

  async downloadEvidence(evidenceId) {
    return apiClient.get(API_ENDPOINTS.EVIDENCE.DOWNLOAD(evidenceId))
  }
}

// Cleanup Service
export const cleanupService = {
  async getCleanupStatus(userId) {
    return apiClient.get(API_ENDPOINTS.CLEANUP.STATUS(userId))
  },

  async downloadEvidence(agreementId) {
    return apiClient.get(API_ENDPOINTS.CLEANUP.DOWNLOAD(agreementId))
  },

  async extendRetention(agreementId, extensionDays) {
    return apiClient.post(API_ENDPOINTS.CLEANUP.EXTEND(agreementId), { extensionDays })
  },

  async triggerCleanup(agreementId = null) {
    return apiClient.post(API_ENDPOINTS.CLEANUP.TRIGGER, { agreementId })
  },

  async getSystemStatus() {
    return apiClient.get(API_ENDPOINTS.CLEANUP.SYSTEM_STATUS)
  }
}

// Security Service
export const securityService = {
  async createEnhancedPasscode(agreementId, passcode, deviceInfo, locationInfo, securityQuestions) {
    return apiClient.post(API_ENDPOINTS.SECURITY.PASSCODE_CREATE, {
      agreementId,
      passcode,
      deviceInfo,
      locationInfo,
      securityQuestions
    })
  },

  async verifyEnhancedPasscode(agreementId, passcode, deviceInfo, locationInfo, securityAnswers, biometricData) {
    return apiClient.post(API_ENDPOINTS.SECURITY.PASSCODE_VERIFY, {
      agreementId,
      passcode,
      deviceInfo,
      locationInfo,
      securityAnswers,
      biometricData
    })
  },

  async createSecurityQuestions(agreementId, questions) {
    return apiClient.post(API_ENDPOINTS.SECURITY.QUESTIONS_CREATE, {
      agreementId,
      questions
    })
  },

  async verifySecurityQuestions(agreementId, answers) {
    return apiClient.post(API_ENDPOINTS.SECURITY.QUESTIONS_VERIFY, {
      agreementId,
      answers
    })
  },

  async getSecurityStatus(agreementId) {
    return apiClient.get(API_ENDPOINTS.SECURITY.STATUS(agreementId))
  }
}

// WhatsApp Service
export const whatsappService = {
  async sendMessage(to, message) {
    return apiClient.post(API_ENDPOINTS.WHATSAPP.SEND, { to, message })
  },
  
  async sendVerificationCode(phoneNumber) {
    return apiClient.post(API_ENDPOINTS.WHATSAPP.SEND_VERIFICATION, { phoneNumber })
  },
  
  async verifyCode(phoneNumber, code, userId) {
    return apiClient.post(API_ENDPOINTS.WHATSAPP.VERIFY_CODE, { phoneNumber, code, userId })
  }
}

// Profile Service
export const profileService = {
  async getProfile() {
    return apiClient.get(API_ENDPOINTS.PROFILE.GET)
  },
  
  async updateProfile(profileData) {
    return apiClient.put(API_ENDPOINTS.PROFILE.UPDATE, profileData)
  },
  
  async uploadProfilePicture(file) {
    const formData = new FormData()
    formData.append('profilePicture', file)
    
    return fetch(API_ENDPOINTS.PROFILE.PICTURE, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: formData
    }).then(res => res.json())
  }
}

export const adminService = {
  async getStats() {
    return apiClient.get(API_ENDPOINTS.ADMIN.STATS)
  },
  
  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${API_ENDPOINTS.ADMIN.USERS}?${queryString}` : API_ENDPOINTS.ADMIN.USERS
    return apiClient.get(url)
  },
  
  async getAgreements(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${API_ENDPOINTS.ADMIN.AGREEMENTS}?${queryString}` : API_ENDPOINTS.ADMIN.AGREEMENTS
    return apiClient.get(url)
  },
  
  async updateUserRole(userId, role) {
    return apiClient.put(API_ENDPOINTS.ADMIN.UPDATE_USER_ROLE(userId), { role })
  },
  
  async deleteUser(userId) {
    return apiClient.delete(API_ENDPOINTS.ADMIN.DELETE_USER(userId))
  }
}

// Analytics Service
export const analyticsService = {
  async getAnalytics(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${API_ENDPOINTS.ANALYTICS.GET}?${queryString}` : API_ENDPOINTS.ANALYTICS.GET
    return apiClient.get(url)
  },
  
  async getAdminAnalytics(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${API_ENDPOINTS.ANALYTICS.ADMIN}?${queryString}` : API_ENDPOINTS.ANALYTICS.ADMIN
    return apiClient.get(url)
  }
}

// Clients Service
export const clientsService = {
  async getClients(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${API_ENDPOINTS.CLIENTS.LIST}?${queryString}` : API_ENDPOINTS.CLIENTS.LIST
    return apiClient.get(url)
  },
  
  async createClient(clientData) {
    return apiClient.post(API_ENDPOINTS.CLIENTS.CREATE, clientData)
  },
  
  async updateClient(id, clientData) {
    return apiClient.put(API_ENDPOINTS.CLIENTS.UPDATE(id), clientData)
  },
  
  async deleteClient(id) {
    return apiClient.delete(API_ENDPOINTS.CLIENTS.DELETE(id))
  },
  
  async getClientAgreements(id) {
    return apiClient.get(API_ENDPOINTS.CLIENTS.AGREEMENTS(id))
  }
}

// Team Service
export const teamService = {
  async getTeamMembers() {
    return apiClient.get(API_ENDPOINTS.TEAM.LIST)
  },
  
  async inviteMember(memberData) {
    return apiClient.post(API_ENDPOINTS.TEAM.INVITE, memberData)
  },
  
  async updateMemberRole(id, role, permissions) {
    return apiClient.put(API_ENDPOINTS.TEAM.UPDATE_ROLE(id), { role, permissions })
  },
  
  async updateMemberStatus(id, status) {
    return apiClient.put(API_ENDPOINTS.TEAM.UPDATE_STATUS(id), { status })
  },
  
  async removeMember(id) {
    return apiClient.delete(API_ENDPOINTS.TEAM.REMOVE(id))
  }
}

// Business Dashboard Service
export const businessDashboardService = {
  async getOverview() {
    return apiClient.get(API_ENDPOINTS.BUSINESS_DASHBOARD.OVERVIEW)
  },
  
  async getAgreements(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${API_ENDPOINTS.BUSINESS_DASHBOARD.AGREEMENTS}?${queryString}` : API_ENDPOINTS.BUSINESS_DASHBOARD.AGREEMENTS
    return apiClient.get(url)
  },
  
  async getTemplates(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${API_ENDPOINTS.BUSINESS_DASHBOARD.TEMPLATES}?${queryString}` : API_ENDPOINTS.BUSINESS_DASHBOARD.TEMPLATES
    return apiClient.get(url)
  },
  
  async getAnalytics(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${API_ENDPOINTS.BUSINESS_DASHBOARD.ANALYTICS}?${queryString}` : API_ENDPOINTS.BUSINESS_DASHBOARD.ANALYTICS
    return apiClient.get(url)
  },
  
  async getNotifications(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${API_ENDPOINTS.BUSINESS_DASHBOARD.NOTIFICATIONS}?${queryString}` : API_ENDPOINTS.BUSINESS_DASHBOARD.NOTIFICATIONS
    return apiClient.get(url)
  },
  
  async markNotificationRead(id) {
    return apiClient.put(API_ENDPOINTS.BUSINESS_DASHBOARD.MARK_NOTIFICATION_READ(id))
  },
  
  async getSettings() {
    return apiClient.get(API_ENDPOINTS.BUSINESS_DASHBOARD.SETTINGS)
  },
  
  async updateSettings(settings) {
    return apiClient.put(API_ENDPOINTS.BUSINESS_DASHBOARD.SETTINGS, settings)
  }
}

// Templates Service
export const templatesService = {
  async getTemplates(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${API_ENDPOINTS.TEMPLATES.LIST}?${queryString}` : API_ENDPOINTS.TEMPLATES.LIST
    return apiClient.get(url)
  },
  
  async getTemplate(id) {
    return apiClient.get(API_ENDPOINTS.TEMPLATES.GET(id))
  },
  
  async createTemplate(templateData) {
    return apiClient.post(API_ENDPOINTS.TEMPLATES.CREATE, templateData)
  },
  
  async updateTemplate(id, templateData) {
    return apiClient.put(API_ENDPOINTS.TEMPLATES.UPDATE(id), templateData)
  },
  
  async deleteTemplate(id) {
    return apiClient.delete(API_ENDPOINTS.TEMPLATES.DELETE(id))
  },
  
  async useTemplate(id, agreementId = null) {
    return apiClient.post(API_ENDPOINTS.TEMPLATES.USE(id), { agreement_id: agreementId })
  },
  
  async getSectors() {
    return apiClient.get(API_ENDPOINTS.TEMPLATES.SECTORS)
  },
  
  async getAgreementTypes(sectorId = null) {
    const queryString = sectorId ? `?sector_id=${sectorId}` : ''
    return apiClient.get(`${API_ENDPOINTS.TEMPLATES.AGREEMENT_TYPES}${queryString}`)
  },
  
  async getUserSectors() {
    return apiClient.get(API_ENDPOINTS.TEMPLATES.USER_SECTORS)
  },
  
  async setUserSectors(sectorIds) {
    return apiClient.post(API_ENDPOINTS.TEMPLATES.USER_SECTORS, { sector_ids: sectorIds })
  },
  
  // User-specific template methods
  async getUserTemplates() {
    // For now, use a hardcoded endpoint to bypass the issue
    const endpoint = 'http://localhost:5000/api/templates/user-templates'
    return apiClient.get(endpoint)
  },
  
  async getAllTemplates() {
    // For now, use a hardcoded endpoint to bypass the issue
    const endpoint = 'http://localhost:5000/api/templates/all'
    return apiClient.get(endpoint)
  }
}

// PDF Generation Service
export const pdfService = {
  async generatePDF(agreementId, smartFieldValues = {}, options = {}) {
    return apiClient.post(API_ENDPOINTS.PDF.GENERATE, {
      agreement_id: agreementId,
      smart_field_values: smartFieldValues,
      include_witness: options.includeWitness || false,
      witness_info: options.witnessInfo || null
    })
  },
  
  async previewPDF(agreementId) {
    return apiClient.get(API_ENDPOINTS.PDF.PREVIEW(agreementId))
  },
  
  async verifyPDF(verificationId) {
    return apiClient.get(API_ENDPOINTS.PDF.VERIFY(verificationId))
  },
  
  async previewTemplate(templateId, smartFieldValues = {}, clientInfo = {}) {
    return apiClient.post(API_ENDPOINTS.PDF.TEMPLATE_PREVIEW, {
      template_id: templateId,
      smart_field_values: smartFieldValues,
      client_info: clientInfo
    })
  }
}

// Health Service
export const healthService = {
  async checkHealth() {
    return apiClient.get(API_ENDPOINTS.HEALTH)
  }
}

// Export all services
export default {
  auth: authService,
  agreements: agreementService,
  templates: templateService,
  templatesNew: templatesService,
  pdf: pdfService,
  biometric: biometricService,
  evidence: evidenceService,
  cleanup: cleanupService,
  security: securityService,
  whatsapp: whatsappService,
  profile: profileService,
  admin: adminService,
  analytics: analyticsService,
  clients: clientsService,
  team: teamService,
  businessDashboard: businessDashboardService,
  health: healthService
}
