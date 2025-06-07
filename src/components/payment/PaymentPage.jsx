import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCreditCard, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentForm from './PaymentForm';
import PaymentConfirmation from './PaymentConfirmation';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, processing, success, failed
  const [error, setError] = useState(null);

  // Get appointment data from location state
  const appointmentData = location.state?.appointmentData;

  if (!appointmentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Invalid Payment Session</h2>
          <p className="text-gray-600 mb-4">No appointment data found. Please book an appointment first.</p>
          <button
            onClick={() => navigate('/book-appointment')}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Book Appointment
          </button>
        </div>
      </div>
    );
  }

  const handlePaymentMethodSelect = (method) => {
    setSelectedMethod(method);
    setError(null);
  };

  const handlePaymentSubmit = async (paymentDetails) => {
    setPaymentStatus('processing');
    try {
      // Simulate API call to payment gateway
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful payment
      setPaymentStatus('success');
      
      // In real implementation, you would:
      // 1. Call your backend API
      // 2. Handle the payment gateway response
      // 3. Update the appointment status
      // 4. Send confirmation email
    } catch (err) {
      setPaymentStatus('failed');
      setError('Payment failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Complete Your Payment
          </h1>
          <p className="mt-2 text-gray-600">
            Secure payment for your appointment at {appointmentData.hospital.name}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Appointment Summary</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {appointmentData.department} - {appointmentData.appointmentDate}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-xl font-bold text-green-600">XAF 15,000</p>
              </div>
            </div>
          </div>

          {paymentStatus === 'pending' && (
            <div className="p-6">
              {!selectedMethod ? (
                <PaymentMethodSelector onSelect={handlePaymentMethodSelect} />
              ) : (
                <PaymentForm
                  method={selectedMethod}
                  onSubmit={handlePaymentSubmit}
                  onBack={() => setSelectedMethod(null)}
                />
              )}
            </div>
          )}

          {paymentStatus === 'processing' && (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Processing your payment...</p>
            </div>
          )}

          {paymentStatus === 'success' && (
            <PaymentConfirmation appointmentData={appointmentData} />
          )}

          {paymentStatus === 'failed' && (
            <div className="p-6 text-center">
              <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Failed</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => setPaymentStatus('pending')}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage; 