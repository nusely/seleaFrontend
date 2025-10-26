import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import superAdminApiService from '../services/superAdminApiService';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      const reference = searchParams.get('reference');
      const trxref = searchParams.get('trxref');
      const success = searchParams.get('success');
      
      console.log('Payment callback parameters:', { reference, trxref, success });
      
      // If success parameter is false, payment was cancelled or failed
      if (success === 'false') {
        setVerificationResult({ 
          success: false, 
          error: 'Payment was cancelled or failed. Please try again.' 
        });
        setVerifying(false);
        return;
      }
      
      if (!reference && !trxref) {
        // Check if this is a manual navigation (no payment reference)
        const planData = searchParams.get('plan');
        if (planData) {
          try {
            const plan = JSON.parse(decodeURIComponent(planData));
            setVerificationResult({ 
              success: false, 
              error: 'Payment verification required. Please complete your payment to activate your subscription.',
              planData: plan
            });
          } catch (e) {
            setVerificationResult({ success: false, error: 'Invalid payment data' });
          }
        } else {
          setVerificationResult({ success: false, error: 'No payment reference found' });
        }
        setVerifying(false);
        return;
      }

      const response = await superAdminApiService.verifyPayment({
        reference: reference || trxref
      });

      if (response.success) {
        setVerificationResult({ 
          success: true, 
          data: response.data,
          message: 'Payment verified successfully! Your subscription is now active.' 
        });
      } else {
        setVerificationResult({ 
          success: false, 
          error: response.error || 'Payment verification failed' 
        });
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setVerificationResult({ 
        success: false, 
        error: 'An error occurred while verifying your payment' 
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sealia-mint mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Verifying Payment...</h2>
          <p className="text-gray-400">Please wait while we verify your payment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {verificationResult?.success ? (
            <>
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-300 mb-6">
                {verificationResult.message}
              </p>
              
              {verificationResult.data && (
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Subscription Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Plan:</span>
                      <span className="text-white">{verificationResult.data.planName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white">{verificationResult.data.currency} {verificationResult.data.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400">Active</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mx-auto h-16 w-16 text-red-500 mb-4">
                <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Payment Failed
              </h2>
              <p className="text-gray-300 mb-6">
                {verificationResult?.error || 'Your payment could not be verified'}
              </p>
            </>
          )}
          
          <div className="space-y-4">
            <button
              onClick={handleContinue}
              className="w-full bg-sealia-mint text-white py-3 px-6 rounded-lg font-medium hover:bg-sealia-mint/80 transition-colors flex items-center justify-center"
            >
              {verificationResult?.success ? 'Go to Dashboard' : 'Try Again'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            
            {!verificationResult?.success && (
              <div className="space-y-3">
                {verificationResult?.planData && (
                  <button
                    onClick={() => {
                      // Retry payment with stored plan data
                      const planData = verificationResult.planData;
                      navigate(`/register?plan=${encodeURIComponent(JSON.stringify(planData))}`);
                    }}
                    className="w-full bg-sealia-mint text-white py-3 px-6 rounded-lg font-medium hover:bg-sealia-mint/80 transition-colors"
                  >
                    Retry Payment
                  </button>
                )}
                <button
                  onClick={() => navigate('/pricing')}
                  className="w-full bg-gray-700 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  Back to Pricing
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
