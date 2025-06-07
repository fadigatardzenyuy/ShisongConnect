import React, { useState } from 'react';
import { FiArrowRight, FiArrowLeft, FiCheck } from 'react-icons/fi';
import ProgressStepper from './ProgressStepper';
import PatientInfoSection from './PatientInfoSection';
import MedicalInfoSection from './MedicalInfoSection';
import AppointmentSection from './AppointmentSection';
import ReviewSection from './ReviewSection';

const AppointmentBookingForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Patient Information
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    alternatePhone: '',
    email: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',

    // Medical Information
    bloodType: '',
    allergies: '',
    currentMedications: '',
    medicalHistory: '',
    familyMedicalHistory: '',
    lifestyleInfo: '',

    // Appointment Information
    appointmentDate: '',
    appointmentTime: '',
    department: '',
    doctor: '',
    visitReason: '',
    appointmentDuration: '30',
    priorityLevel: 'routine',
    specialRequirements: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setCurrentSection(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentSection(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Implement API call to submit appointment
      console.log('Submitting appointment:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message or redirect
      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return <PatientInfoSection formData={formData} handleChange={handleChange} />;
      case 1:
        return <MedicalInfoSection formData={formData} handleChange={handleChange} />;
      case 2:
        return <AppointmentSection formData={formData} handleChange={handleChange} />;
      case 3:
        return <ReviewSection formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProgressStepper
        currentSection={currentSection}
        isSubmitting={isSubmitting}
      />

      <form onSubmit={handleSubmit} className="mt-8">
        {renderSection()}

        <div className="flex justify-between mt-8">
          {currentSection > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              <FiArrowLeft className="mr-2" />
              Back
            </button>
          )}
          
          {currentSection < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center px-6 py-3 text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors ml-auto"
              disabled={isSubmitting}
            >
              Next
              <FiArrowRight className="ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center px-6 py-3 text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors ml-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Confirm Appointment
                  <FiCheck className="ml-2" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AppointmentBookingForm; 