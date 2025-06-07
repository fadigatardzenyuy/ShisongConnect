import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, Stethoscope, Building } from 'lucide-react';

function AppointmentPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const appointmentData = location.state?.appointmentData;

  // If no appointment data is available, redirect to booking page
  React.useEffect(() => {
    if (!appointmentData) {
      navigate('/book-appointment');
    }
  }, [appointmentData, navigate]);

  const handleProceedToPayment = () => {
    navigate('/appointment/payment', { state: { appointmentData } });
  };

  const handleEditAppointment = () => {
    navigate(-1);
  };

  // Show loading state while checking data
  if (!appointmentData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Appointment Preview</h1>
        
        <div className="space-y-6">
          {/* Hospital Information */}
          <section className="border-b pb-6">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-700">Hospital Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Hospital Name</p>
                <p className="font-medium text-gray-900">{appointmentData.hospital?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium text-gray-900">{appointmentData.department}</p>
              </div>
            </div>
          </section>

          {/* Appointment Details */}
          <section className="border-b pb-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-700">Appointment Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-gray-900">{appointmentData.preferredDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium text-gray-900">{appointmentData.preferredTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium text-gray-900">{appointmentData.appointmentType}</p>
              </div>
              {appointmentData.preferredDoctor && (
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium text-gray-900">Dr. {appointmentData.preferredDoctor}</p>
                </div>
              )}
            </div>
          </section>

          {/* Patient Information */}
          <section className="border-b pb-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-700">Patient Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-900">
                  {appointmentData.firstName} {appointmentData.middleName} {appointmentData.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Number</p>
                <p className="font-medium text-gray-900">{appointmentData.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{appointmentData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium text-gray-900">{appointmentData.dateOfBirth}</p>
              </div>
            </div>
          </section>

          {/* Medical Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Stethoscope className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-700">Medical Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Reason for Appointment</p>
                <p className="font-medium text-gray-900">{appointmentData.reasonForAppointment}</p>
              </div>
              {appointmentData.currentSymptoms && (
                <div>
                  <p className="text-sm text-gray-500">Current Symptoms</p>
                  <p className="font-medium text-gray-900">{appointmentData.currentSymptoms}</p>
                </div>
              )}
              {appointmentData.medicalHistory && (
                <div>
                  <p className="text-sm text-gray-500">Medical History</p>
                  <p className="font-medium text-gray-900">{appointmentData.medicalHistory}</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={handleEditAppointment}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Appointment
          </button>
          <button
            onClick={handleProceedToPayment}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default AppointmentPreview; 