import React, { useState, useEffect } from 'react'
import { Shield, ChevronRight } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('introduction')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'data-collection', title: 'Data We Collect' },
    { id: 'purpose', title: 'Purpose of Collection' },
    { id: 'legal-basis', title: 'Legal Basis for Processing' },
    { id: 'retention', title: 'Data Minimization and Retention' },
    { id: 'security', title: 'Data Security' },
    { id: 'sharing', title: 'Data Sharing and Transfers' },
    { id: 'user-rights', title: 'User Rights' },
    { id: 'choices', title: 'Your Choices and Controls' },
    { id: 'ai-processing', title: 'AI Processing and Automation' },
    { id: 'third-party', title: 'Third-Party Integrations' },
    { id: 'updates', title: 'Updates to this Policy' },
    { id: 'contact', title: 'Contact Us' }
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sealia-deep via-black to-sealia-green">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
        </div>

        {/* Floating Elements */}
        <div 
          className="absolute top-20 left-10 w-20 h-20 bg-sealia-green/20 rounded-full blur-xl"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute top-40 right-20 w-32 h-32 bg-sealia-deep/20 rounded-full blur-2xl"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-sealia-green rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-black" />
              </div>
              <span className="text-sealia-green font-semibold text-lg">Privacy & Data Protection</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-sealia-green bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-4">
              Effective Date: {new Date().toLocaleDateString()}
            </p>
            <div className="text-gray-400 space-y-1 text-sm">
              <p>Company: Cimons Technologies</p>
              <p>Product: Sealia – Secure Agreement and Document Verification Platform</p>
              <p>Contact: privacy@cimonstech.com | +233 [insert number]</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-gray-900 rounded-xl shadow-lg p-6 sticky top-8 border border-gray-800">
              <h2 className="text-lg font-semibold text-white mb-4">Contents</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-sealia-mint text-black'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <span className="text-sm font-medium">{section.title}</span>
                    {activeSection === section.id && <ChevronRight className="h-4 w-4" />}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-gray-900 rounded-xl shadow-lg p-8 lg:p-12 border border-gray-800">
              {/* Section 1: Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Welcome to Sealia, a product of Cimons Technologies.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your personal data when you use Sealia's services — including our WhatsApp Smart Contract Bot, web dashboard, and verification tools.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  By using Sealia, you agree to the collection and use of information in accordance with this Policy.
                </p>
              </section>

              {/* Section 2: Data We Collect */}
              <section id="data-collection" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">2. Data We Collect</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We collect only the data necessary for secure contract creation, verification, and compliance.
                </p>
                <p className="text-gray-300 leading-relaxed mb-2 font-semibold">Personal Data we may collect:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Full name, phone number, and email address</li>
                  <li>Business or client details (e.g., company name, location)</li>
                  <li>Contract details (e.g., service description, amount, dates)</li>
                  <li>Biometric data (fingerprint, Face ID) — only if you consent and your device supports it</li>
                  <li>Metadata such as IP address, device information, and timestamp for verification logs</li>
                </ul>
              </section>

              {/* Section 3: Purpose of Collection */}
              <section id="purpose" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">3. Purpose of Collection</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We collect and process data only for legitimate and specific purposes, including:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Creating and managing contracts between businesses and clients</li>
                  <li>Authenticating signatures using biometrics or passcodes</li>
                  <li>Generating and verifying secure digital agreements</li>
                  <li>Preventing fraud and ensuring document integrity</li>
                  <li>Improving Sealia's user experience and system security</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  We do not sell or share your personal data with unauthorized third parties.
                </p>
              </section>

              {/* Section 4: Legal Basis for Processing */}
              <section id="legal-basis" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">4. Legal Basis for Processing</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Sealia processes your data based on:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Consent:</strong> You agree when using our services or submitting information.</li>
                  <li><strong>Contractual necessity:</strong> To prepare or execute agreements you request.</li>
                  <li><strong>Legitimate interest:</strong> To prevent fraud and enhance platform security.</li>
                  <li><strong>Legal obligations:</strong> To comply with data protection laws and government requests when required.</li>
                </ul>
              </section>

              {/* Section 5: Data Minimization and Retention */}
              <section id="retention" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">5. Data Minimization and Retention</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We collect only what is strictly necessary and store it securely.
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Contract data is retained for verification purposes for as long as legally required or until you request deletion.</li>
                  <li>Access logs and metadata are retained for audit and security tracking.</li>
                  <li>You may request data deletion at any time (see Section 9).</li>
                </ul>
              </section>

              {/* Section 6: Data Security */}
              <section id="security" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Cimons Technologies implements robust security measures, including:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>End-to-end encryption for WhatsApp communications</li>
                  <li>Secure HTTPS connections for all web traffic</li>
                  <li>Encrypted cloud storage (Cloudflare R2 with restricted access)</li>
                  <li>Role-based access controls via Supabase</li>
                  <li>Regular system audits and penetration testing</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  All personal data is processed in compliance with the Malabo Convention and Ghana's Data Protection Act (Act 843).
                </p>
              </section>

              {/* Section 7: Data Sharing and Transfers */}
              <section id="sharing" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">7. Data Sharing and Transfers</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Your data is processed primarily in Ghana.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  If Sealia partners with international services (e.g., for AI refinement or document processing), transfers are done under secure, compliant frameworks with data protection agreements in place.
                </p>
              </section>

              {/* Section 8: User Rights */}
              <section id="user-rights" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">8. User Rights</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Under the Data Protection Act, 2012 (Act 843) and the Malabo Convention, you have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Access your personal data</li>
                  <li>Request correction of inaccuracies</li>
                  <li>Withdraw consent at any time</li>
                  <li>Request deletion ("right to be forgotten")</li>
                  <li>Object to processing in certain cases</li>
                  <li>Receive a copy of your data in a portable format</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Contact us at privacy@cimonstech.com to exercise these rights.
                </p>
              </section>

              {/* Section 9: Your Choices and Controls */}
              <section id="choices" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">9. Your Choices and Controls</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You can control your privacy settings through your Sealia account or directly within WhatsApp.
                </p>
                <p className="text-gray-300 leading-relaxed mb-2">You may:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Disable AI follow-ups</li>
                  <li>Request manual deletion of contracts</li>
                  <li>Opt out of non-essential data collection</li>
                </ul>
              </section>

              {/* Section 10: AI Processing and Automation */}
              <section id="ai-processing" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">10. AI Processing and Automation</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Sealia uses artificial intelligence responsibly to refine contract text and support secure communication.
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>AI processes only contract-related data for text clarity.</li>
                  <li>No sensitive or biometric data is processed by AI.</li>
                  <li>All AI activity is logged for transparency.</li>
                </ul>
              </section>

              {/* Section 11: Third-Party Integrations */}
              <section id="third-party" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">11. Third-Party Integrations</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Sealia integrates with trusted services, including:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>WhatsApp Cloud API (Meta Platforms, Inc.)</li>
                  <li>Supabase (Database, Auth, Storage)</li>
                  <li>Cloudflare R2 (Document Storage)</li>
                  <li>OpenAI API (AI refinement)</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Each third party is vetted for compliance with global data protection standards.
                </p>
              </section>

              {/* Section 12: Updates to this Policy */}
              <section id="updates" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">12. Updates to this Policy</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We may update this Privacy Policy periodically.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  When we do, we'll notify users through the platform or via email.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  The updated version will always include a revised "Effective Date."
                </p>
              </section>

              {/* Section 13: Contact Us */}
              <section id="contact" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you have any questions or concerns about this Privacy Policy or your personal data, please contact us:
                </p>
                <div className="bg-gray-800 rounded-lg p-6 space-y-2">
                  <p className="text-gray-300"><strong>Email:</strong> privacy@cimonstech.com</p>
                  <p className="text-gray-300"><strong>Address:</strong> Cimons Technologies, Accra, Ghana</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default PrivacyPolicy
