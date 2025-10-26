// Force refresh utility to clear all auth data and reload
export const forceRefresh = () => {
  // Clear all localStorage
  localStorage.clear()
  
  // Clear all sessionStorage
  sessionStorage.clear()
  
  // Force reload the page
  window.location.reload()
}

// Clear auth data only
export const clearAuthData = () => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user_data')
  localStorage.removeItem('sb-rlozykcakmbrnfjfjqhe-auth-token')
  
  // Clear Supabase session
  if (window.supabase) {
    window.supabase.auth.signOut()
  }
  
  // Reload page
  window.location.reload()
}


