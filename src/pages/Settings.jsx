import React, { useState, useEffect } from 'react'
import { 
  Settings as SettingsIcon,
  User, 
  Bell, 
  Key, 
  Save,
  CheckCircle,
  AlertCircle,
  Upload,
  Camera,
  MapPin,
  Building,
  Fingerprint,
  Shield,
  Smartphone
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { profileService } from '../services/supabaseApiService.js'
import { useAuth } from '../contexts/AuthContext'

const Settings = () => {
  const { userProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [profilePicture, setProfilePicture] = useState(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState(null)

  // Profile settings - initialize with user data
  const [profile, setProfile] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    company: userProfile?.business_name || '',
    phone: userProfile?.phone || '',
    address: '',
    city: userProfile?.city || '',
    state: userProfile?.state || '',
    country: userProfile?.country || '',
    postalCode: '',
    timezone: userProfile?.timezone || 'UTC',
    language: userProfile?.language || 'en'
  })

  // Update profile when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setProfile({
        name: userProfile.name || '',
        email: userProfile.email || '',
        company: userProfile.business_name || '',
        phone: userProfile.phone || '',
        address: '',
        city: userProfile.city || '',
        state: userProfile.state || '',
        country: userProfile.country || '',
        postalCode: '',
        timezone: userProfile.timezone || 'UTC',
        language: userProfile.language || 'en'
      })
    }
  }, [userProfile])

  // Verification method settings
  const [verificationMethod, setVerificationMethod] = useState('fingerprint')

  // Password settings
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    agreementSigned: true,
    agreementExpired: true,
    newClient: true,
    marketing: false
  })

  // Load settings from API
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Load profile from API
        const profileResponse = await profileService.getProfile()
        if (profileResponse.profile) {
          setProfile(profileResponse.profile)
          if (profileResponse.profile.profile_picture_url) {
            setProfilePicturePreview(profileResponse.profile.profile_picture_url)
          }
        }
      } catch (error) {
        console.error('Error loading settings:', error)
        // Fallback to localStorage
        const savedProfile = localStorage.getItem('sealia-profile-settings')
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile))
        }
      }
    }

    loadSettings()
  }, [])

  // Save settings to localStorage
  const saveSettings = (settings, type) => {
    try {
      localStorage.setItem(`sealia-${type}-settings`, JSON.stringify(settings))
      toast.success('Settings saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    }
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size must be less than 5MB')
        return
      }
      
      setProfilePicture(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      // Upload profile picture if changed
      if (profilePicture) {
        const pictureResponse = await profileService.uploadProfilePicture(profilePicture)
        if (pictureResponse.pictureUrl) {
          profile.profile_picture_url = pictureResponse.pictureUrl
        }
      }
      
      // Update profile via API
      const response = await profileService.updateProfile(profile)
      
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error saving profile:', error)
      toast.error('Failed to save profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (!password.currentPassword) {
      toast.error('Please enter your current password')
      return
    }
    if (password.newPassword !== password.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (password.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    
    // Password complexity validation
    const hasNumber = /\d/.test(password.newPassword)
    const hasUppercase = /[A-Z]/.test(password.newPassword)
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password.newPassword)
    
    if (!hasNumber || !hasUppercase || !hasSymbol) {
      toast.error('Password must contain at least one number, one uppercase letter, and one symbol')
      return
    }
    
    setLoading(true)
    try {
      // TODO: Call backend API to change password
      // await apiClient.post('/api/auth/change-password', {
      //   currentPassword: password.currentPassword,
      //   newPassword: password.newPassword
      // })
      
      toast.success('Password changed successfully!')
      setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      console.error('Error changing password:', error)
      toast.error('Failed to change password. Please check your current password.')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNotifications = () => {
    setLoading(true)
    setTimeout(() => {
      saveSettings(notifications, 'notification')
      setLoading(false)
    }, 1000)
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'verification', name: 'Verification', icon: Fingerprint },
    { id: 'password', name: 'Password', icon: Key },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ]

  return (
    <>
      <Toaster position="top-right" />
      
      <div className="space-y-6">
      {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>
      </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
        <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
            <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
              <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-sealia-mint text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{tab.name}</span>
              </button>
                  )
                })}
            </nav>
          </div>
        </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="flex items-center space-x-2 px-4 py-2 bg-sealia-mint text-white font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" />
                      <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>

                  {/* Profile Picture Upload */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      {profilePicturePreview ? (
                        <img 
                          src={profilePicturePreview} 
                          alt="Profile" 
                          className="w-24 h-24 rounded-full object-cover border-4 border-sealia-mint"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-sealia-mint/20 flex items-center justify-center border-4 border-sealia-mint">
                          <User className="h-12 w-12 text-sealia-forest" />
                        </div>
                      )}
                      <label htmlFor="profile-picture" className="absolute bottom-0 right-0 w-8 h-8 bg-sealia-mint rounded-full flex items-center justify-center cursor-pointer hover:bg-sealia-mint/80 transition-colors">
                        <Camera className="h-4 w-4 text-white" />
                  </label>
                  <input
                        id="profile-picture"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                  />
                </div>
                <div>
                      <h3 className="font-medium text-gray-900">Profile Picture</h3>
                      <p className="text-sm text-gray-600">Upload a profile picture (max 5MB)</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                        value={profile.company}
                        onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                  />
                </div>
                <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                        placeholder="Street address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={profile.city}
                        onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                      <input
                        type="text"
                        value={profile.state}
                        onChange={(e) => setProfile(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                  />
                </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        value={profile.country}
                        onChange={(e) => setProfile(prev => ({ ...prev, country: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      />
              </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                      <input
                        type="text"
                        value={profile.postalCode}
                        onChange={(e) => setProfile(prev => ({ ...prev, postalCode: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select
                        value={profile.timezone}
                        onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      >
                        <option value="UTC-12">UTC-12</option>
                        <option value="UTC-11">UTC-11</option>
                        <option value="UTC-10">UTC-10</option>
                        <option value="UTC-9">UTC-9</option>
                        <option value="UTC-8">UTC-8</option>
                        <option value="UTC-7">UTC-7</option>
                        <option value="UTC-6">UTC-6</option>
                        <option value="UTC-5">UTC-5</option>
                        <option value="UTC-4">UTC-4</option>
                        <option value="UTC-3">UTC-3</option>
                        <option value="UTC-2">UTC-2</option>
                        <option value="UTC-1">UTC-1</option>
                        <option value="UTC">UTC</option>
                        <option value="UTC+1">UTC+1</option>
                        <option value="UTC+2">UTC+2</option>
                        <option value="UTC+3">UTC+3</option>
                        <option value="UTC+4">UTC+4</option>
                        <option value="UTC+5">UTC+5</option>
                        <option value="UTC+6">UTC+6</option>
                        <option value="UTC+7">UTC+7</option>
                        <option value="UTC+8">UTC+8</option>
                        <option value="UTC+9">UTC+9</option>
                        <option value="UTC+10">UTC+10</option>
                        <option value="UTC+11">UTC+11</option>
                        <option value="UTC+12">UTC+12</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        value={profile.language}
                        onChange={(e) => setProfile(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                        <option value="pt">Portuguese</option>
                        <option value="zh">Chinese</option>
                        <option value="ja">Japanese</option>
                        <option value="ko">Korean</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Verification Method Settings */}
              {activeTab === 'verification' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Document Signing Method</h2>
                    <button
                      onClick={() => {
                        // TODO: Save verification method to database
                        localStorage.setItem('user_verification_method', verificationMethod)
                        toast.success('Verification method updated!')
                      }}
                      disabled={loading}
                      className="flex items-center space-x-2 px-4 py-2 bg-sealia-mint text-white font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-600 mb-6">
                      Choose how you want to sign documents. This method will be used when you sign agreements as a business owner.
                    </p>

                    <div className="space-y-4">
                      {[
                        {
                          id: 'fingerprint',
                          name: 'Fingerprint',
                          description: 'Use your device fingerprint sensor for quick and secure signing',
                          icon: Fingerprint,
                          features: ['Fastest signing', 'Highest security', 'Device-based']
                        },
                        {
                          id: 'face-id',
                          name: 'Face ID',
                          description: 'Use facial recognition for convenient and secure document signing',
                          icon: Smartphone,
                          features: ['Hands-free signing', 'Advanced security', 'Biometric authentication']
                        },
                        {
                          id: 'password',
                          name: 'Password Only',
                          description: 'Use a secure password for document signing (less secure)',
                          icon: Shield,
                          features: ['Simple setup', 'Universal compatibility', 'Password-based']
                        }
                      ].map((option) => {
                        const Icon = option.icon
                        return (
                          <div
                            key={option.id}
                            onClick={() => setVerificationMethod(option.id)}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                              verificationMethod === option.id
                                ? 'border-sealia-mint bg-sealia-mint/10'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start space-x-4">
                              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                verificationMethod === option.id ? 'bg-sealia-mint/20' : 'bg-gray-100'
                              }`}>
                                <Icon className={`w-6 h-6 ${
                                  verificationMethod === option.id ? 'text-sealia-mint' : 'text-gray-400'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{option.name}</h3>
                                <p className="text-gray-600 mb-2">{option.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {option.features.map((feature, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                                    >
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  verificationMethod === option.id
                                    ? 'border-sealia-mint bg-sealia-mint'
                                    : 'border-gray-300'
                                }`}>
                                  {verificationMethod === option.id && (
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Password Settings */}
              {activeTab === 'password' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
                    <button
                      onClick={handleChangePassword}
                      disabled={loading}
                      className="flex items-center space-x-2 px-4 py-2 bg-sealia-mint text-white font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" />
                      <span>{loading ? 'Saving...' : 'Change Password'}</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <input
                        type="password"
                        value={password.currentPassword}
                        onChange={(e) => setPassword(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        value={password.newPassword}
                        onChange={(e) => setPassword(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        value={password.confirmPassword}
                        onChange={(e) => setPassword(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sealia-mint focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                <button
                      onClick={handleSaveNotifications}
                      disabled={loading}
                      className="flex items-center space-x-2 px-4 py-2 bg-sealia-mint text-white font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                      <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Receive email notifications for important events</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.emailNotifications}
                          onChange={(e) => setNotifications(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sealia-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sealia-mint"></div>
                      </label>
                  </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Agreement Signed</h3>
                        <p className="text-sm text-gray-600">Get notified when an agreement is signed</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.agreementSigned}
                          onChange={(e) => setNotifications(prev => ({ ...prev, agreementSigned: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sealia-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sealia-mint"></div>
                      </label>
                  </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Agreement Expired</h3>
                        <p className="text-sm text-gray-600">Get notified when an agreement expires</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.agreementExpired}
                          onChange={(e) => setNotifications(prev => ({ ...prev, agreementExpired: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sealia-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sealia-mint"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                        <h3 className="font-medium text-gray-900">New Client</h3>
                        <p className="text-sm text-gray-600">Get notified when a new client is added</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.newClient}
                          onChange={(e) => setNotifications(prev => ({ ...prev, newClient: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sealia-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sealia-mint"></div>
                      </label>
                        </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                        <h3 className="font-medium text-gray-900">Marketing Emails</h3>
                        <p className="text-sm text-gray-600">Receive marketing and promotional emails</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.marketing}
                          onChange={(e) => setNotifications(prev => ({ ...prev, marketing: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sealia-mint/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sealia-mint"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
                </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings