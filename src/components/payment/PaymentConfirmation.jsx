import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiCalendar, FiClock, FiMapPin, FiUser, FiCreditCard, FiDownload, FiArrowRight, FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { generateAppointmentPDF } from '../../utils/pdfGenerator';

const PaymentConfirmation = ({ appointmentData }) => {
  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
      const paymentData = {
        amount: 15000,
        method: 'Mobile Money',
        phoneNumber: appointmentData.phoneNumber,
        transactionId: `TRX${Date.now()}`,
        date: new Date().toLocaleDateString()
      };

      await generateAppointmentPDF(appointmentData, paymentData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto p-6"
    >
      {/* Success Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <FiCheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
        <p className="text-gray-600">Your appointment has been confirmed</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Left Column - Appointment Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FiCalendar className="w-5 h-5 text-green-600 mr-2" />
            Appointment Details
          </h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-900">Date & Time</p>
              <p className="text-base text-gray-600">
                {appointmentData.appointmentDate} at {appointmentData.appointmentTime}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Duration</p>
              <p className="text-base text-gray-600">{appointmentData.appointmentDuration} minutes</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Location</p>
              <p className="text-base text-gray-600">{appointmentData.hospital.name}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Patient & Payment Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FiUser className="w-5 h-5 text-green-600 mr-2" />
            Patient Information
          </h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-900">Full Name</p>
              <p className="text-base text-gray-600">
                {appointmentData.firstName} {appointmentData.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Contact</p>
              <p className="text-base text-gray-600">{appointmentData.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Email</p>
              <p className="text-base text-gray-600">{appointmentData.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-green-50 rounded-xl p-6 mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiCreditCard className="w-5 h-5 text-green-600 mr-2" />
          Payment Summary
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Amount Paid</p>
            <p className="text-xl font-bold text-green-600">XAF 15,000</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Payment Method</p>
            <p className="text-base text-gray-600">Mobile Money</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={handleDownload}
          className="w-full bg-white text-green-600 border border-green-600 py-3 px-4 rounded-xl hover:bg-green-50 transition-colors flex items-center justify-center"
        >
          <FiDownload className="w-5 h-5 mr-2" />
          Download Receipt
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center"
        >
          Go to Dashboard
          <FiArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>

      {/* Email Confirmation */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
          <FiMail className="w-5 h-5 mr-2" />
          <p className="text-sm">
            A confirmation email has been sent to {appointmentData.email}
          </p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Please arrive 15 minutes before your appointment time. Bring your ID and any relevant medical records.
        </p>
      </div>
    </motion.div>
  );
};

export default PaymentConfirmation; 