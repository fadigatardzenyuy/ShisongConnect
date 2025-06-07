import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Smartphone, Download, CheckCircle } from 'lucide-react';

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointmentData } = location.state || {};
  const [selectedProvider, setSelectedProvider] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [appointmentCode, setAppointmentCode] = useState('');

  const mobileMoneyProviders = [
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      icon: '/mtn-momo.png',
      color: 'bg-yellow-500'
    },
    {
      id: 'orange',
      name: 'Orange Money',
      icon: '/orange-money.png',
      color: 'bg-orange-500'
    },
    {
      id: 'express',
      name: 'Express Union',
      icon: '/express-union.png',
      color: 'bg-blue-500'
    }
  ];

  const handlePayment = async () => {
    if (!selectedProvider || !phoneNumber) return;

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Generate a random appointment code
      const code = `APT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setAppointmentCode(code);
    }, 2000);
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation and download
    console.log('Downloading PDF...');
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-6"
      >
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">Your appointment has been confirmed.</p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-500 mb-2">Your Appointment Code</p>
            <p className="text-2xl font-bold text-blue-600">{appointmentCode}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleDownloadPDF}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Appointment Details
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h1>

        <div className="space-y-6">
          {/* Payment Summary */}
          <section className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Appointment Summary</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Consultation Fee</span>
                <span className="font-medium">5,000 FCFA</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Service Charge</span>
                <span className="font-medium">500 FCFA</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Total Amount</span>
                <span className="font-bold text-blue-600">5,500 FCFA</span>
              </div>
            </div>
          </section>

          {/* Mobile Money Providers */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mobileMoneyProviders.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedProvider === provider.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${provider.color} flex items-center justify-center`}>
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-800">{provider.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Phone Number Input */}
          {selectedProvider && (
            <section>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter {mobileMoneyProviders.find(p => p.id === selectedProvider)?.name} Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g., 237 6XX XXX XXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </section>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back
            </button>
            <button
              onClick={handlePayment}
              disabled={!selectedProvider || !phoneNumber || isProcessing}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                (!selectedProvider || !phoneNumber || isProcessing)
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-700'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PaymentPage; 