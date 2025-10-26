import React, { useState, useEffect } from 'react';
import { Check, Shield, Zap, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import superAdminApiService from '../services/superAdminApiService';

const PricingPlans = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [currencyRates, setCurrencyRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState('GHS');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
    loadCurrencyRates();
  }, []);

  const loadPlans = async () => {
    try {
      const response = await superAdminApiService.getBillingPlans();
      if (response.success && response.data) {
        setPlans(response.data);
      }
    } catch (error) {
      console.error('Error loading plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCurrencyRates = async () => {
    try {
      const response = await superAdminApiService.getCurrencyRates();
      if (response.success && response.data) {
        setCurrencyRates(response.data);
      }
    } catch (error) {
      console.error('Error loading currency rates:', error);
    }
  };

  const convertPrice = (priceUSD, currency) => {
    if (!currencyRates[currency]) return priceUSD;
    return Math.round(priceUSD * currencyRates[currency] * 100) / 100;
  };

  const getPlanIcon = (planName) => {
    switch (planName.toLowerCase()) {
      case 'free':
        return <Shield className="h-8 w-8 text-blue-600" />;
      case 'starter':
        return <Zap className="h-8 w-8 text-yellow-600" />;
      case 'pro':
        return <Crown className="h-8 w-8 text-purple-600" />;
      default:
        return <Shield className="h-8 w-8 text-gray-600" />;
    }
  };

  const getPlanFeatures = (plan) => {
    const features = [];
    
    // Add agreements limit
    if (plan.agreements_limit === -1) {
      features.push('Unlimited agreements');
    } else {
      features.push(`${plan.agreements_limit} agreements per month`);
    }
    
    // Add templates access
    if (plan.templates_access === 'all') {
      features.push('All premium templates');
    } else if (plan.templates_access === 'premium') {
      features.push('Premium templates');
    } else {
      features.push('Basic templates');
    }
    
    // Add team members
    if (plan.team_members_limit === -1) {
      features.push('Unlimited team members');
    } else {
      features.push(`${plan.team_members_limit} team member${plan.team_members_limit > 1 ? 's' : ''}`);
    }
    
    // Add storage
    if (plan.storage_limit === -1) {
      features.push('Unlimited storage');
    } else {
      features.push(`${plan.storage_limit} MB storage`);
    }
    
    // Add witness support
    if (plan.witness_support) {
      if (plan.witness_limit === -1) {
        features.push('✅ Unlimited witnesses');
      } else {
        features.push(`✅ Up to ${plan.witness_limit} witnesses per agreement`);
      }
    }
    
    // Add verification logs
    if (plan.verification_logs) {
      features.push('✅ Verification logs');
    }
    
    // Add compliance dashboard
    if (plan.compliance_dashboard) {
      features.push('✅ Compliance dashboard');
    }
    
    // Add priority support
    if (plan.priority_support) {
      features.push('✅ Priority support');
    }
    
    // Add audit trail
    if (plan.audit_trail) {
      features.push('✅ Full audit trail');
    }
    
    // Add watermark info
    if (plan.watermark) {
      features.push('Watermark applied');
    } else {
      features.push('✅ No watermark');
    }
    
    return features;
  };

  const getPlanLimitations = (plan) => {
    const limitations = [];
    
    // Add limitations for free plan
    if (plan.name.toLowerCase() === 'free') {
      if (!plan.witness_support) {
        limitations.push('❌ Witness support');
      }
      if (!plan.verification_logs) {
        limitations.push('❌ Verification logs');
      }
      if (plan.watermark) {
        limitations.push('Watermark applied');
      }
    }
    
    return limitations;
  };

  const handleSubscribe = async (plan) => {
    try {
      // Check if user is logged in
      if (!user) {
        navigate('/login?redirect=/plans');
        return;
      }

      // Initialize payment with Paystack
      const response = await superAdminApiService.initializePayment({
        planId: plan.id,
        amount: billingCycle === 'yearly' ? plan.yearly_price : plan.monthly_price,
        currency: selectedCurrency,
        billingCycle,
        planName: plan.name,
        email: user.email
      });

      if (response.success && response.data.authorization_url) {
        // Redirect to Paystack payment page
        window.location.href = response.data.authorization_url;
      } else {
        console.error('Payment initialization failed:', response.error);
      }
    } catch (error) {
      console.error('Error initializing payment:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sealia-mint"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Select the perfect plan for your business needs
          </p>
          
          {/* Currency Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 rounded-lg p-1">
              {['GHS', 'USD', 'NGN'].map((currency) => (
                <button
                  key={currency}
                  onClick={() => setSelectedCurrency(currency)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCurrency === currency
                      ? 'bg-sealia-mint text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {currency}
                </button>
              ))}
            </div>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-sealia-mint text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'yearly'
                    ? 'bg-sealia-mint text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">
                  Save 15%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const price = billingCycle === 'yearly' 
              ? convertPrice(plan.yearly_price, selectedCurrency)
              : convertPrice(plan.monthly_price, selectedCurrency);
            const originalPrice = billingCycle === 'yearly' 
              ? convertPrice(plan.monthly_price * 12, selectedCurrency)
              : null;
            const savings = billingCycle === 'yearly' && originalPrice 
              ? Math.round(((originalPrice - price) / originalPrice) * 100)
              : 0;

            return (
              <div
                key={plan.id}
                className={`relative bg-gray-800 rounded-2xl p-8 ${
                  plan.name.toLowerCase() === 'starter' 
                    ? 'ring-2 ring-sealia-mint scale-105' 
                    : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.name.toLowerCase() === 'starter' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-sealia-mint text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    {getPlanIcon(plan.name)}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {plan.description}
                  </p>
                  
                  {/* Pricing */}
                  <div className="mb-4">
                    {plan.name.toLowerCase() === 'free' ? (
                      <div className="text-4xl font-bold text-white">Free</div>
                    ) : (
                      <div>
                        <div className="text-4xl font-bold text-white">
                          {selectedCurrency} {price}
                        </div>
                        <div className="text-gray-400">
                          /{billingCycle === 'yearly' ? 'year' : 'month'}
                        </div>
                        {billingCycle === 'yearly' && originalPrice && (
                          <div className="mt-2">
                            <span className="text-lg text-gray-400 line-through">
                              {selectedCurrency} {originalPrice}
                            </span>
                            <span className="ml-2 text-green-400 font-medium">
                              Save {savings}%
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
                  <ul className="space-y-3">
                    {getPlanFeatures(plan).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Limitations */}
                  {getPlanLimitations(plan).length > 0 && (
                    <div className="mt-6">
                      <h5 className="text-sm font-semibold text-gray-400 mb-2">Limitations</h5>
                      <ul className="space-y-2">
                        {getPlanLimitations(plan).map((limitation, index) => (
                          <li key={index} className="flex items-center">
                            <div className="h-2 w-2 bg-gray-500 rounded-full mr-3 flex-shrink-0" />
                            <span className="text-gray-400 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.name.toLowerCase() === 'free'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-sealia-mint text-white hover:bg-sealia-mint/80'
                  }`}
                >
                  {plan.name.toLowerCase() === 'free' ? 'Get Started Free' : 'Get Started'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">
            All plans include 30-day money-back guarantee
          </p>
          <p className="text-sm text-gray-500">
            Need help choosing? <a href="#" className="text-sealia-mint hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;