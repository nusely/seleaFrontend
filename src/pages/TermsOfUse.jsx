import React, { useState, useEffect } from 'react'
import { FileText, ChevronRight } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const TermsOfUse = () => {
  const [activeSection, setActiveSection] = useState('acceptance')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'service', title: 'Service Description' },
    { id: 'eligibility', title: 'Eligibility' },
    { id: 'responsibilities', title: 'User Responsibilities' },
    { id: 'compliance', title: 'Data Protection and Compliance' },
    { id: 'security', title: 'Security Commitment' },
    { id: 'ai-features', title: 'AI-Powered Features' },
    { id: 'signatures', title: 'Digital Signatures and Verification' },
    { id: 'ip', title: 'Intellectual Property' },
    { id: 'liability', title: 'Limitation of Liability' },
    { id: 'modifications', title: 'Service Modifications' },
    { id: 'termination', title: 'Termination' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'compliance-audit', title: 'Compliance and Audit' },
    { id: 'contact', title: 'Contact Information' }
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
                <FileText className="h-6 w-6 text-black" />
              </div>
              <span className="text-sealia-green font-semibold text-lg">Terms & Conditions</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-sealia-green bg-clip-text text-transparent">
                Terms of Use
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-4">
              Effective Date: {new Date().toLocaleDateString()}
            </p>
            <div className="text-gray-400 space-y-1 text-sm">
              <p>Company: Cimons Technologies</p>
              <p>Product: Sealia – Secure Agreement and Document Verification Platform</p>
              <p>Contact: support@cimonstech.com | +233 [insert number]</p>
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
              {/* Section 1: Acceptance of Terms */}
              <section id="acceptance" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  By accessing or using Sealia, whether through WhatsApp, web dashboard, or any connected service, you agree to comply with and be bound by these Terms of Use.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you do not agree with these terms, please discontinue use immediately.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  These Terms apply to all users, including business owners, clients, and third parties interacting with Sealia's verification services.
                </p>
              </section>

              {/* Section 2: Service Description */}
              <section id="service" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">2. Service Description</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Sealia, a product of Cimons Technologies, provides secure digital tools for:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Contract creation and signing via WhatsApp or web interface</li>
                  <li>AI-assisted contract refinement</li>
                  <li>Biometric and passcode-based digital signing</li>
                  <li>Document verification using cryptographic signatures and verification IDs</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Sealia is designed for individuals, businesses, and organizations across Africa seeking trusted, verifiable digital agreements.
                </p>
              </section>

              {/* Section 3: Eligibility */}
              <section id="eligibility" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">3. Eligibility</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You must be at least 18 years old and have the legal capacity to enter into binding contracts.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  By using Sealia, you confirm that all information you provide is accurate and complete.
                </p>
              </section>

              {/* Section 4: User Responsibilities */}
              <section id="responsibilities" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">4. User Responsibilities</h2>
                <p className="text-gray-300 leading-relaxed mb-4">Users agree to:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Use Sealia only for lawful and legitimate business purposes.</li>
                  <li>Protect their login credentials, authentication tokens, and passcodes.</li>
                  <li>Not impersonate another person or misrepresent identity.</li>
                  <li>Ensure that data shared (e.g., contract details, signatures) belongs to authorized parties.</li>
                  <li>Comply with applicable data protection and digital signature laws in their jurisdiction.</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Cimons Technologies reserves the right to suspend or terminate accounts found to be in violation of these Terms.
                </p>
              </section>

              {/* Section 5: Data Protection and Compliance */}
              <section id="compliance" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">5. Data Protection and Compliance</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Sealia operates under the Data Protection Act, 2012 (Act 843) of Ghana and the African Union Convention on Cyber Security and Personal Data Protection (Malabo Convention).
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">Cimons Technologies commits to:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Collecting only necessary information for verification and security purposes.</li>
                  <li>Encrypting all data in transit and at rest.</li>
                  <li>Storing data in compliance with legal retention and confidentiality requirements.</li>
                  <li>Not sharing user data with unauthorized third parties.</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  For full details, see our Privacy Policy.
                </p>
              </section>

              {/* Section 6: Security Commitment */}
              <section id="security" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">6. Security Commitment</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Security is central to Sealia's mission.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">We implement multiple layers of protection, including:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>End-to-end encryption of WhatsApp communications</li>
                  <li>HTTPS-secured web sessions</li>
                  <li>Biometric and passcode verification for digital signatures</li>
                  <li>IP, timestamp, and geolocation tracking for contract audit trails</li>
                  <li>Regular vulnerability scans and penetration testing</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  However, users acknowledge that no digital platform can guarantee absolute security. Cimons Technologies shall not be held liable for breaches caused by user negligence, third-party compromise, or force majeure.
                </p>
              </section>

              {/* Section 7: AI-Powered Features */}
              <section id="ai-features" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">7. AI-Powered Features</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Sealia uses AI to assist users in contract drafting, refinement, and follow-ups.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">By using these features, you agree that:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>AI outputs are suggestions, not legal advice.</li>
                  <li>You retain full responsibility for reviewing and approving AI-generated content.</li>
                  <li>Sensitive or confidential information should be shared with discretion.</li>
                  <li>Cimons Technologies is not responsible for any legal consequences resulting from unchecked AI-generated contracts.</li>
                </ul>
              </section>

              {/* Section 8: Digital Signatures and Verification */}
              <section id="signatures" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">8. Digital Signatures and Verification</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  All digital signatures executed via Sealia (fingerprint, Face ID, passcode, or typed consent) are recorded with:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Timestamp and IP location</li>
                  <li>User identity and verification ID</li>
                  <li>Encrypted signature data</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mb-4">
                  These digital agreements hold evidentiary value under applicable electronic transactions laws in Ghana and other African jurisdictions.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Cimons Technologies does not guarantee acceptance of such signatures in countries or institutions where electronic signatures are not yet legally recognized.
                </p>
              </section>

              {/* Section 9: Intellectual Property */}
              <section id="ip" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">9. Intellectual Property</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  All content, software, design, and trademarks associated with Sealia are the property of Cimons Technologies.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Users are granted a limited, non-transferable license to use Sealia for its intended purpose.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Unauthorized use, duplication, or modification of Sealia's systems or materials is strictly prohibited.
                </p>
              </section>

              {/* Section 10: Limitation of Liability */}
              <section id="liability" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  To the maximum extent permitted by law, Cimons Technologies shall not be liable for:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Any indirect, incidental, or consequential damages</li>
                  <li>Data loss or corruption due to user error or third-party failure</li>
                  <li>Disputes arising from contract interpretation or enforcement between parties</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Cimons Technologies' total liability shall not exceed the total fees paid by the user in the 12 months preceding the incident.
                </p>
              </section>

              {/* Section 11: Service Modifications */}
              <section id="modifications" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">11. Service Modifications</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We reserve the right to modify, suspend, or discontinue any feature of Sealia at any time.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Users will be notified of major changes through email, WhatsApp, or the Sealia dashboard.
                </p>
              </section>

              {/* Section 12: Termination */}
              <section id="termination" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">12. Termination</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Cimons Technologies may terminate or restrict access if you:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Violate these Terms or our Privacy Policy</li>
                  <li>Engage in fraudulent or illegal activity</li>
                  <li>Compromise platform security</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Upon termination, stored contracts and verification records may remain accessible to comply with legal retention requirements.
                </p>
              </section>

              {/* Section 13: Governing Law */}
              <section id="governing-law" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">13. Governing Law</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  These Terms are governed by the laws of the Republic of Ghana.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Any disputes shall be resolved under the jurisdiction of Ghanaian courts or, where applicable, through alternative dispute resolution.
                </p>
              </section>

              {/* Section 14: Compliance and Audit */}
              <section id="compliance-audit" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">14. Compliance and Audit</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Cimons Technologies maintains internal compliance programs aligned with:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>The Malabo Convention (African Union)</li>
                  <li>Ghana Data Protection Act (Act 843)</li>
                  <li>ISO/IEC 27001 security principles (Information Security Management)</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  We may undergo periodic audits to ensure ongoing compliance and data integrity.
                </p>
              </section>

              {/* Section 15: Contact Information */}
              <section id="contact" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">15. Contact Information</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  For questions, complaints, or compliance requests:
                </p>
                <div className="bg-gray-800 rounded-lg p-6 space-y-2">
                  <p className="text-gray-300"><strong>Email:</strong> support@cimonstech.com</p>
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

export default TermsOfUse
