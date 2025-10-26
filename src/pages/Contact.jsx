import { useState } from "react";
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useEffect } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    toast.success("Message sent successfully!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

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
              transform: `translateY(${scrollY * 0.5}px)`,
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
                <MessageCircle className="h-6 w-6 text-black" />
              </div>
              <span className="text-sealia-green font-semibold text-lg">
                Get in Touch
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-sealia-green bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Have questions about Sealia? We're here to help you get started.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-sealia-green focus:border-sealia-green transition-colors"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-sealia-green focus:border-sealia-green transition-colors"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-sealia-green focus:border-sealia-green transition-colors"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-sealia-green focus:border-sealia-green transition-colors"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-sealia-green text-black font-bold py-3 px-6 rounded-lg hover:bg-sealia-green/90 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-sealia-green rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-gray-400">support@sealia.app</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-sealia-green rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-sealia-green rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Address</p>
                    <p className="text-gray-400">San Francisco, CA 94105</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-sealia-green rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Business Hours</p>
                    <p className="text-gray-400">Mon-Fri: 9AM-6PM PST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Find Us</h2>
              <div className="bg-gray-800 rounded-2xl h-48 md:h-64 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sealia-green/20 to-sealia-deep/20"></div>
                <div className="relative z-10 text-center">
                  <MapPin className="h-12 w-12 text-sealia-green mx-auto mb-4" />
                  <h3 className="font-bold text-white mb-2">
                    San Francisco Office
                  </h3>
                  <p className="text-gray-400 text-sm">
                    123 Market Street, Suite 400
                  </p>
                  <p className="text-gray-400 text-sm">
                    San Francisco, CA 94105
                  </p>
                  <button className="mt-4 bg-sealia-green text-black px-4 py-2 rounded-lg font-semibold hover:bg-sealia-green/90 transition-colors">
                    Get Directions
                  </button>
                </div>
                {/* Interactive map markers */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-sealia-green rounded-full"></div>
                    <span className="text-xs text-gray-300">Sealia HQ</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-300">You are here</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Quick Support</h2>
              <p className="text-gray-400 mb-6">
                Need immediate assistance? Connect with us on WhatsApp or
                through live chat.
              </p>
              <div className="flex flex-col space-y-4">
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sealia-green text-black font-bold py-3 px-6 rounded-lg hover:bg-sealia-green/90 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp Chat</span>
                </a>
                <button className="border-2 border-sealia-green text-sealia-green font-bold py-3 px-6 rounded-lg hover:bg-sealia-green hover:text-black transition-colors flex items-center justify-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Live Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
