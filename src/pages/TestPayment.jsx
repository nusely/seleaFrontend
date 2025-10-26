import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import superAdminApiService from '../services/superAdminApiService';

const TestPayment = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const testPayment = async () => {
    try {
      setLoading(true);
      setResult(null);

      const response = await superAdminApiService.initializePayment({
        planId: 'test-plan-id',
        amount: 100,
        currency: 'GHS',
        billingCycle: 'monthly',
        planName: 'Test Plan',
        email: user?.email || 'test@example.com'
      });

      setResult(response);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Test Payment Integration
          </h2>
          <p className="text-gray-300 mb-8">
            Test the Paystack payment integration
          </p>
          
          <button
            onClick={testPayment}
            disabled={loading}
            className="w-full bg-sealia-mint text-white py-3 px-6 rounded-lg font-medium hover:bg-sealia-mint/80 transition-colors disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Payment'}
          </button>

          {result && (
            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Result:</h3>
              <pre className="text-sm text-gray-300 overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPayment;
