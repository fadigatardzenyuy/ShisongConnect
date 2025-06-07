import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSmartphone, FiLock, FiCheck, FiDownload, FiFileText } from 'react-icons/fi';
import { generateAppointmentPDF } from '../../utils/pdfGenerator';

const PaymentForm = ({ method, onSubmit, onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate phone number format
      if (!validatePhoneNumber(phoneNumber)) {
        throw new Error('Invalid phone number format');
      }

      // Simulate API call to initiate payment
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPaymentInitiated(true);
      
      // Simulate payment completion and getting appointment details
      setTimeout(() => {
        setPaymentComplete(true);
        setAppointmentDetails({
          queueNumber: `Q${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          patientId: `PID${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`,
          appointmentDate: new Date().toLocaleDateString(),
          paymentId: `PAY${Date.now().toString().slice(-6)}`,
          department: 'General Medicine',
          doctor: 'Dr. John Smith',
          visitReason: 'Regular Checkup'
        });
      }, 3000);

      onSubmit({
        method,
        phoneNumber,
        amount: 15000,
        currency: 'XAF',
        transactionId: `TRX${Date.now()}`
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!appointmentDetails) return;
    
    setIsDownloading(true);
    try {
      const paymentData = {
        amount: 15000,
        method: method === 'orange' ? 'Orange Money' : 'MTN Mobile Money',
        phoneNumber,
        transactionId: `TRX${Date.now()}`,
        date: new Date().toLocaleDateString()
      };

      await generateAppointmentPDF(appointmentDetails, paymentData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const validatePhoneNumber = (number) => {
    const orangeRegex = /^(?:\+237|237)?[69][0-9]{8}$/;
    const mtnRegex = /^(?:\+237|237)?[67][0-9]{8}$/;
    return method === 'orange' ? orangeRegex.test(number) : mtnRegex.test(number);
  };

  const getMethodDetails = () => {
    return method === 'orange' 
      ? {
          name: 'Orange Money',
          prefix: '+237 6',
          placeholder: 'Enter your Orange Money number'
        }
      : {
          name: 'MTN Mobile Money',
          prefix: '+237 6',
          placeholder: 'Enter your MTN Mobile Money number'
        };
  };

  const methodDetails = getMethodDetails();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          {methodDetails.name} Payment
        </h3>
      </div>

      {!paymentInitiated ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Money Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSmartphone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={methodDetails.placeholder}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Format: {methodDetails.prefix}XXXXXXXX
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Click to Pay XAF 15,000
                <FiCheck className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </form>
      ) : !paymentComplete ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSmartphone className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-green-800 mb-2">
              Check Your Phone
            </h4>
            <p className="text-green-700 mb-4">
              A payment request has been sent to your {methodDetails.name} account.
              Please check your phone and confirm the payment.
            </p>
            <div className="bg-white p-4 rounded-md border border-green-200">
              <p className="text-sm text-gray-600">
                Amount: <span className="font-semibold">XAF 15,000</span>
              </p>
              <p className="text-sm text-gray-600">
                To: <span className="font-semibold">{phoneNumber}</span>
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <FiLock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-yellow-800">
                  Please confirm the payment on your phone to complete the transaction.
                  Your appointment will be confirmed once the payment is successful.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-green-800 mb-2">
              Payment Successful!
            </h4>
            
            <div className="bg-white p-6 rounded-lg border border-green-200 mb-4">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-gray-600">Patient ID</p>
                  <p className="text-lg font-semibold text-gray-900">{appointmentDetails.patientId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Queue Number</p>
                  <p className="text-lg font-semibold text-gray-900">{appointmentDetails.queueNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Appointment Date</p>
                  <p className="text-lg font-semibold text-gray-900">{appointmentDetails.appointmentDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment ID</p>
                  <p className="text-lg font-semibold text-gray-900">{appointmentDetails.paymentId}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <FiDownload className="mr-2 w-4 h-4" />
                  Download Receipt
                </>
              )}
            </button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <FiFileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-800">
                  Please keep your Patient ID and Queue Number safe. You'll need them when you arrive at the hospital.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PaymentForm; 