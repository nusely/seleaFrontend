// Clear all authentication data
export const clearAllAuthData = () => {
  // Clear localStorage
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user_data')
  localStorage.removeItem('supabase.auth.token')
  
  // Clear sessionStorage
  sessionStorage.clear()
  
  // Clear any other auth-related data
  localStorage.removeItem('sealia-agreements')
  localStorage.removeItem('sealia-templates')
  localStorage.removeItem('sealia-clients')
  
  console.log('🧹 All authentication data cleared!')
  
  // Reload the page to start fresh
  window.location.reload()
}

// Add to window for easy access in console
if (typeof window !== 'undefined') {
  window.clearAuth = clearAllAuthData
}


