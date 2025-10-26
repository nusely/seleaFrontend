import { Link } from 'react-router-dom'
import { Shield, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-sealia-green rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-black" />
              </div>
              <span className="text-2xl font-bold text-white font-poppins">Sealia</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Verified by Trust. Right in WhatsApp.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-sealia-green rounded-lg flex items-center justify-center hover:bg-sealia-green/90 transition-colors">
                <MessageCircle className="h-5 w-5 text-black" />
              </a>
              <a href="mailto:support@sealia.app" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Mail className="h-5 w-5 text-gray-400" />
              </a>
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <h3 className="font-bold text-white mb-6">Product</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/about" className="hover:text-sealia-green transition-colors">About</Link></li>
              <li><Link to="/faq" className="hover:text-sealia-green transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-sealia-green transition-colors">Contact</Link></li>
              <li><Link to="/pricing" className="hover:text-sealia-green transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h3 className="font-bold text-white mb-6">Support</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-sealia-green transition-colors">Help Center</a></li>
              <li><a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="hover:text-sealia-green transition-colors">WhatsApp Support</a></li>
              <li><a href="#" className="hover:text-sealia-green transition-colors">Live Chat</a></li>
              <li><a href="mailto:support@sealia.app" className="hover:text-sealia-green transition-colors">Email Support</a></li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-white mb-6">Legal</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/privacy" className="hover:text-sealia-green transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-sealia-green transition-colors">Terms of Service</Link></li>
              <li><Link to="/terms#security" className="hover:text-sealia-green transition-colors">Security</Link></li>
              <li><Link to="/terms#compliance-audit" className="hover:text-sealia-green transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              &copy; 2024 Sealia. All rights reserved. Verified by Trust.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
