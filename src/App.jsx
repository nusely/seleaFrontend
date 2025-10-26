import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'
import VerifyDocument from './pages/VerifyDocument'
import Login from './pages/Login'
import Register from './pages/Register'
import EnhancedAuth from './pages/EnhancedAuth'
import AuthDemo from './pages/AuthDemo'
import EmailVerification from './pages/EmailVerification'
import ResetPassword from './pages/ResetPassword'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Pricing from './pages/Pricing'
import PricingPlans from './components/PricingPlans'
import PaymentSuccess from './pages/PaymentSuccess'
import ForgotPassword from './pages/ForgotPassword'
import Test from './pages/Test'
import TestPasswordReset from './pages/TestPasswordReset'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import RoleBasedDashboard from './components/RoleBasedDashboard'
import RoleBasedRoute from './components/RoleBasedRoute'
import BusinessOwnerDashboard from './pages/BusinessOwnerDashboard'
import Agreements from './pages/Agreements'
import Templates from './pages/Templates'
import Analytics from './pages/Analytics'
import Team from './pages/Team'
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'
import WhatsApp from './pages/WhatsApp'
import Clients from './pages/Clients'
import SignAgreement from './pages/SignAgreement'
import VerifyAgreement from './pages/VerifyAgreement'
import SuperAdminDashboard from './pages/SuperAdminDashboard'
import OverviewPage from './pages/admin/OverviewPage'
import UsersPage from './pages/admin/UsersPage'
import AgreementsPage from './pages/admin/AgreementsPage'
import WhatsAppPage from './pages/admin/WhatsAppPage'
import BillingPage from './pages/admin/BillingPage'
import AIConfigPage from './pages/admin/AIConfigPage'
import TemplatesPage from './pages/admin/TemplatesPage'
import CompliancePage from './pages/admin/CompliancePage'
import NotificationsPage from './pages/admin/NotificationsPage'
import SettingsPage from './pages/admin/SettingsPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-black">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test />} />
              <Route path="/auth-demo" element={<AuthDemo />} />
              <Route path="/test-password-reset" element={<TestPasswordReset />} />
              <Route path="/login" element={<EnhancedAuth mode="login" />} />
              <Route path="/register" element={<EnhancedAuth mode="signup" />} />
              <Route path="/email-verification" element={<EmailVerification />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/plans" element={<PricingPlans />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/verify/:id" element={<VerifyDocument />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfUse />} />
              {/* Public Signing & Verification Routes */}
              <Route path="/sign/:code" element={<SignAgreement />} />
              <Route path="/verify-agreement/:code" element={<VerifyAgreement />} />
              {/* Redirect direct access to dashboard pages */}
              <Route path="/analytics" element={<Navigate to="/dashboard/analytics" replace />} />
              <Route path="/clients" element={<Navigate to="/dashboard/clients" replace />} />
              <Route path="/team" element={<Navigate to="/dashboard/team" replace />} />
              <Route path="/calendar" element={<Navigate to="/dashboard/calendar" replace />} />
              <Route path="/whatsapp" element={<Navigate to="/dashboard/whatsapp" replace />} />
              <Route path="/settings" element={<Navigate to="/dashboard/settings" replace />} />
              {/* Protected Dashboard Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><RoleBasedDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/overview" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/agreements" element={<ProtectedRoute><Agreements /></ProtectedRoute>} />
              <Route path="/dashboard/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
              <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
              <Route path="/verify" element={<ProtectedRoute><VerifyDocument /></ProtectedRoute>} />
              {/* Role-based Dashboard Routes */}
              <Route path="/dashboard/analytics" element={<ProtectedRoute><RoleBasedRoute path="/dashboard/analytics" /></ProtectedRoute>} />
              <Route path="/dashboard/clients" element={<ProtectedRoute><RoleBasedRoute path="/dashboard/clients" /></ProtectedRoute>} />
              <Route path="/dashboard/team" element={<ProtectedRoute><RoleBasedRoute path="/dashboard/team" /></ProtectedRoute>} />
              <Route path="/dashboard/calendar" element={<ProtectedRoute><RoleBasedRoute path="/dashboard/calendar" /></ProtectedRoute>} />
              <Route path="/dashboard/whatsapp" element={<ProtectedRoute><RoleBasedRoute path="/dashboard/whatsapp" /></ProtectedRoute>} />
              <Route path="/dashboard/settings" element={<ProtectedRoute><RoleBasedRoute path="/dashboard/settings" /></ProtectedRoute>} />
              {/* Super Admin Routes - These will be handled by SuperAdminDashboard */}
              <Route path="/dashboard/overview/*" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/users/*" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/admin-agreements/*" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/admin-whatsapp/*" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/billing/*" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/ai/*" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/admin-templates/*" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/compliance/*" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/notifications/*" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/admin-analytics/*" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/admin-settings/*" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
            </Routes>
            <BackToTop />
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App