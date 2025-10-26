import { Link, useLocation } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Navigation = () => {
  const location = useLocation()
  const { user, signOut } = useAuth()

  const isActive = (path) => location.pathname === path

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-sealia-green rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-white font-poppins">Sealia</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className={`relative font-medium transition-colors group ${
                isActive('/') 
                  ? 'text-sealia-green' 
                  : 'text-gray-300 hover:text-sealia-green'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 h-0.5 bg-sealia-green transition-all duration-300 ${
                isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              to="/about" 
              className={`relative font-medium transition-colors group ${
                isActive('/about') 
                  ? 'text-sealia-green' 
                  : 'text-gray-300 hover:text-sealia-green'
              }`}
            >
              About
              <span className={`absolute bottom-0 left-0 h-0.5 bg-sealia-green transition-all duration-300 ${
                isActive('/about') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              to="/pricing" 
              className={`relative font-medium transition-colors group ${
                isActive('/pricing') 
                  ? 'text-sealia-green' 
                  : 'text-gray-300 hover:text-sealia-green'
              }`}
            >
              Pricing
              <span className={`absolute bottom-0 left-0 h-0.5 bg-sealia-green transition-all duration-300 ${
                isActive('/pricing') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              to="/faq" 
              className={`relative font-medium transition-colors group ${
                isActive('/faq') 
                  ? 'text-sealia-green' 
                  : 'text-gray-300 hover:text-sealia-green'
              }`}
            >
              FAQ
              <span className={`absolute bottom-0 left-0 h-0.5 bg-sealia-green transition-all duration-300 ${
                isActive('/faq') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              to="/contact" 
              className={`relative font-medium transition-colors group ${
                isActive('/contact') 
                  ? 'text-sealia-green' 
                  : 'text-gray-300 hover:text-sealia-green'
              }`}
            >
              Contact
              <span className={`absolute bottom-0 left-0 h-0.5 bg-sealia-green transition-all duration-300 ${
                isActive('/contact') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`relative font-medium transition-colors group ${
                    isActive('/dashboard') 
                      ? 'text-sealia-green' 
                      : 'text-gray-300 hover:text-sealia-green'
                  }`}
                >
                  Dashboard
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-sealia-green transition-all duration-300 ${
                    isActive('/dashboard') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="text-gray-300 hover:text-red-400 transition-colors font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-sealia-green transition-colors font-medium">
                  Login
                </Link>
                <Link to="/register" className="relative px-4 py-2 bg-sealia-green text-black font-semibold rounded-lg overflow-hidden group transition-all duration-300 hover:scale-105 hover:bg-sealia-green/90">
                  <span className="relative z-10">Sign Up</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-button-shine transition-opacity duration-300"></div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
