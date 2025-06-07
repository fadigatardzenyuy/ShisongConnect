import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft, FiCheck, FiCalendar, FiClock, FiUser, FiActivity } from 'react-icons/fi';
import ProgressStepper from '../appointment/AppointmentForm/ProgressStepper';
import PatientInfoSection from '../appointment/AppointmentForm/PatientInfoSection';
import MedicalInfoSection from '../appointment/AppointmentForm/MedicalInfoSection';
import AppointmentSection from '../appointment/AppointmentForm/AppointmentSection';
import ReviewSection from '../appointment/AppointmentForm/ReviewSection';
import hospitals from '../../data/hospitals.json';
import BookingTour from '../../components/Tour/BookingTour';

const AppointmentBookingForm = () => {
  const { hospitalId } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  
  // Simulated user data that would come from auth context or API
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    dateOfBirth: '1990-01-15',
    gender: 'male',
    address: '123 Main St, Cityville',
    insuranceProvider: 'HealthCare Plus',
    policyNumber: 'HC789456123'
  };

  const [formData, setFormData] = useState({
    // Patient Information (pre-filled from user data)
    firstName: userData.firstName,
    middleName: '',
    lastName: userData.lastName,
    dateOfBirth: userData.dateOfBirth,
    gender: userData.gender,
    phoneNumber: userData.phoneNumber,
    alternatePhone: '',
    email: userData.email,
    address: userData.address,
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

  useEffect(() => {
    // Check if user has completed the form tour before
    const formTourCompleted = localStorage.getItem('bookingFormTourCompleted');
    if (!formTourCompleted) {
      setIsFirstTimeUser(true);
    }
  }, []);

  React.useEffect(() => {
    const hospitalData = hospitals.find(h => h.id === parseInt(hospitalId, 10));
    if (hospitalData) {
      setHospital(hospitalData);
      if (hospitalData.services?.length > 0) {
        setFormData(prev => ({
          ...prev,
          department: hospitalData.services[0].toLowerCase()
        }));
      }
    } else {
      navigate('/book-appointment');
    }
  }, [hospitalId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentSection < 3) {
      setCurrentSection(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to payment page with appointment data
      navigate('/appointment/payment', { 
        state: { 
          appointmentData: {
            hospital,
            ...formData,
            totalAmount: 15000, // XAF 15,000
            currency: 'XAF'
          }
        } 
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hospital) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50 flex items-center justify-center p-6"
      >
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FiCheck className="w-12 h-12 text-green-600" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Appointment Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your appointment with {hospital.name} has been scheduled.</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full bg-green-50 rounded-xl p-4 text-green-800"
          >
            <p>You'll receive a confirmation email shortly.</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const sectionIcons = {
    0: <FiUser className="w-6 h-6" />,
    1: <FiActivity className="w-6 h-6" />,
    2: <FiCalendar className="w-6 h-6" />,
    3: <FiCheck className="w-6 h-6" />
  };

  const sectionTitles = {
    0: "Patient Information",
    1: "Medical History",
    2: "Appointment Details",
    3: "Review & Confirm"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50 py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
      {/* Tour Component */}
      <BookingTour isFirstTimeUser={isFirstTimeUser} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center space-x-2"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
              Book Your Visit at {hospital.name}
            </h1>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Left Side - Progress Stepper (Hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-4 sticky top-4">
              <ProgressStepper
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
                isSubmitting={isSubmitting}
              />
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FiClock className="mr-2 w-4 h-4" />
                  <span>Estimated time: 5-10 minutes</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FiCalendar className="mr-2 w-4 h-4" />
                  <span>Instant confirmation</span>
                </div>
                    </div>
                    </div>
                  </div>

          {/* Right Side - Form Content */}
          <div className="lg:col-span-9">
            {/* Mobile Progress Bar */}
            <div className="lg:hidden mb-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 p-2 rounded-md">
                      {sectionIcons[currentSection]}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">{sectionTitles[currentSection]}</h2>
                      <p className="text-sm text-gray-500">
                        Step {currentSection + 1} of 4
                      </p>
                    </div>
                  </div>
                    </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentSection + 1) / 4) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 sm:p-6 text-white">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-md">
                    {sectionIcons[currentSection]}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">{sectionTitles[currentSection]}</h2>
                    <p className="text-green-100 text-sm sm:text-base mt-1">
                      {currentSection === 0 && "Tell us about yourself"}
                      {currentSection === 1 && "Share your medical background"}
                      {currentSection === 2 && "Choose your preferred time"}
                      {currentSection === 3 && "Review your appointment details"}
                    </p>
                  </div>
                </div>
                  </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSection}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                    className="p-4 sm:p-6 md:p-8"
                  >
                    {currentSection === 0 && (
                      <PatientInfoSection formData={formData} handleChange={handleChange} />
                    )}
                    {currentSection === 1 && (
                      <MedicalInfoSection formData={formData} handleChange={handleChange} />
                    )}
                    {currentSection === 2 && (
                      <AppointmentSection formData={formData} handleChange={handleChange} />
                    )}
                    {currentSection === 3 && (
                      <ReviewSection formData={formData} />
                    )}
                  </motion.div>
          </AnimatePresence>

                <div className="px-4 sm:px-6 md:px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            {currentSection > 0 ? (
              <button
                type="button"
                      onClick={handleBack}
                disabled={isSubmitting}
                      className="flex items-center px-4 py-2 text-sm sm:text-base text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
              >
                      <FiArrowLeft className="mr-2 w-4 h-4" />
                      Back
              </button>
            ) : (
              <div></div>
            )}
            
                  {currentSection < 3 ? (
              <button
                type="button"
                      onClick={handleNext}
                disabled={isSubmitting}
                      className="flex items-center px-4 py-2 text-sm sm:text-base text-white bg-gradient-to-r from-green-600 to-green-500 rounded-md hover:from-green-700 hover:to-green-600 transition-colors shadow-sm ml-auto"
              >
                      Next
                      <FiArrowRight className="ml-2 w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                      className="flex items-center px-4 py-2 text-sm sm:text-base text-white bg-gradient-to-r from-green-600 to-green-500 rounded-md hover:from-green-700 hover:to-green-600 transition-colors shadow-sm ml-auto"
              >
                {isSubmitting ? (
                  <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                          Proceed to Payment
                          <FiCheck className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs sm:text-sm text-gray-500">
                Your information is protected and will only be used for this appointment.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AppointmentBookingForm;