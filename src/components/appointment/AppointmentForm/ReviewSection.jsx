import React from 'react';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const ReviewSection = ({ formData }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start mb-8">
        <div className="bg-green-100 p-3 rounded-xl text-green-600 mr-4">
          <FiCheckCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Review Your Appointment</h2>
          <p className="text-gray-500">Please review all information before confirming</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{`${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}`}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">{formatDate(formData.dateOfBirth)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium capitalize">{formData.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Blood Type</p>
              <p className="font-medium">{formData.bloodType}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">{formData.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{formData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{formData.address}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Date & Time</p>
              <p className="font-medium">{`${formatDate(formData.appointmentDate)} at ${formatTime(formData.appointmentTime)}`}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium capitalize">{formData.department}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Doctor</p>
              <p className="font-medium">{formData.doctor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{`${formData.appointmentDuration} minutes`}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Information</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Current Medications</p>
              <p className="font-medium">{formData.currentMedications || 'None'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Allergies</p>
              <p className="font-medium">{formData.allergies || 'None'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Reason for Visit</p>
              <p className="font-medium">{formData.visitReason}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100">
        <div className="flex items-start">
          <FiAlertCircle className="w-5 h-5 text-yellow-600 mt-1 mr-3" />
          <div>
            <h3 className="font-medium text-yellow-800 mb-2">Important Information</h3>
            <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
              <li>Please arrive 15 minutes before your scheduled appointment time</li>
              <li>Bring your ID and insurance card (if applicable)</li>
              <li>Bring any relevant medical records or test results</li>
              <li>Wear a mask and follow all COVID-19 safety protocols</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection; 