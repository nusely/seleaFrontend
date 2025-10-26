import { useState } from 'react'
import { ChevronDown, ChevronUp, Shield, MessageCircle, Bot, Fingerprint, ShieldCheck } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { useEffect } from 'react'

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set())
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

    const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "What is Sealia?",
          a: "Sealia is a secure platform that lets you create and verify digital agreements directly from WhatsApp — no extra apps or document editors required."
        },
        {
          q: "Do I need to download another app?",
          a: "No. Sealia works inside WhatsApp through an intelligent chatbot. You'll only need to sign up once at Sealia.app to manage your account and templates."
        },
        {
          q: "How do I get started with Sealia?",
          a: "Simply register for a free account, connect your WhatsApp, and you can start creating secure agreements immediately. Our setup process takes less than 2 minutes."
        }
      ]
    },
    {
      category: "Security & Verification",
      questions: [
        {
          q: "Is Sealia legally binding?",
          a: "Yes. Each agreement includes verified identity data such as name, phone number, email, and timestamp, combined with optional biometric or password confirmation, creating a verifiable digital record."
        },
        {
          q: "How does Sealia verify signatures?",
          a: "When a client agrees, Sealia checks for one or more of the following: Fingerprint or Face ID confirmation (if device supports it), Password or PIN confirmation, Device and location verification. All this data is securely logged and linked to the agreement."
        },
        {
          q: "Can agreements be tampered with after signing?",
          a: "No. Once an agreement is signed, it becomes tamper-proof. Any attempt to modify the document will be detected and the verification will fail. Each document has a unique verification ID for authenticity checks."
        },
        {
          q: "How do I verify if a document is authentic?",
          a: "Every signed document gets a unique verification ID. Anyone can visit sealia.app/verify/[ID] to confirm the document's authenticity, see who signed it, when, and from where."
        }
      ]
    },
    {
      category: "WhatsApp Integration",
      questions: [
        {
          q: "How does the WhatsApp integration work?",
          a: "Sealia uses WhatsApp's official API to send agreement notifications and receive confirmations. You can create, send, and sign agreements without leaving your WhatsApp chat."
        },
        {
          q: "Can I use Sealia with my existing WhatsApp Business account?",
          a: "Yes! Sealia works seamlessly with both personal and business WhatsApp accounts. It's designed to integrate with your existing business communication workflow."
        }
      ]
    },
    {
      category: "Business Use",
      questions: [
        {
          q: "Can Sealia be used by small businesses or freelancers?",
          a: "Absolutely. Sealia was built for freelancers, photographers, designers, and small businesses that use WhatsApp to manage clients and need fast, trustworthy agreements."
        },
        {
          q: "Can I customize my contract templates?",
          a: "Yes. You can upload or create your own templates directly in your Sealia dashboard. Later, just type @/contract on WhatsApp to pull it into your chat."
        },
        {
          q: "What happens after an agreement is signed?",
          a: "A signed PDF copy is generated automatically and sent to both parties via WhatsApp and email. You can also download or verify it anytime from your dashboard."
        }
      ]
    },
    {
      category: "Data & Privacy",
      questions: [
        {
          q: "Is my data safe?",
          a: "Yes. All information is encrypted and stored using Supabase + Cloudflare R2 infrastructure, with access only through verified user accounts."
        },
        {
          q: "Which countries and regions do you support?",
          a: "Sealia is designed to work globally. We support agreements in over 50 countries and comply with local electronic signature laws including eIDAS (EU), ESIGN Act (US), and similar regulations worldwide."
        },
        {
          q: "How long are signed documents stored?",
          a: "All signed agreements are stored securely for a minimum of 7 years, meeting most legal requirements for document retention. You can download copies at any time."
        }
      ]
    }
  ]

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
              <span className="text-sealia-green font-semibold text-lg">Frequently Asked Questions</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-sealia-green bg-clip-text text-transparent">
                FAQ
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about Sealia's secure agreement platform.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-8 text-sealia-green">{section.category}</h2>
              <div className="space-y-4">
                {section.questions.map((item, index) => {
                  const globalIndex = `${sectionIndex}-${index}`
                  const isOpen = openItems.has(globalIndex)
                  
                  return (
                    <div key={index} className="border border-gray-800 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left bg-gray-800/50 hover:bg-gray-700/50 transition-colors flex items-center justify-between"
                      >
                        <span className="font-semibold text-white">{item.q}</span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-sealia-green" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 py-4 bg-gray-900/50">
                          <p className="text-gray-300 leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-sealia-deep to-sealia-green rounded-3xl p-12">
            <h2 className="text-3xl font-bold mb-4 text-black">
              Still have questions?
            </h2>
            <p className="text-lg mb-8 text-black/80">
              Our support team is here to help you get started with Sealia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="bg-black text-white font-bold py-3 px-8 rounded-xl hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp Support</span>
              </a>
              <a href="mailto:support@sealia.app" className="border-2 border-black text-black font-bold py-3 px-8 rounded-xl hover:bg-black hover:text-white transition-colors">
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default FAQ