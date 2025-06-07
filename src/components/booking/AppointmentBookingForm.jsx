import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import hospitals from '../../data/hospitals.json';
import { FiChevronRight, FiChevronLeft, FiCheck, FiUser, FiCalendar, FiClock, FiInfo, FiPlus, FiMinus } from 'react-icons/fi';

function AppointmentBookingForm() {
  const { hospitalId } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
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

    // Medical Information (partially pre-filled)
    reasonForAppointment: '',
    currentSymptoms: '',
    medicalHistory: '',
    currentMedications: '',
    insuranceProvider: userData.insuranceProvider,
    policyNumber: userData.policyNumber,
    groupNumber: '',

    // Appointment Details
    preferredDate: '',
    preferredTime: '',
    appointmentType: '',
    preferredDoctor: '',
    department: '',

    // Additional Information
    previousVisits: '',
    referralInfo: '',
    preferredLanguage: 'english',
    specialRequirements: ''
  });

  const sections = [
    { title: "Patient Info", icon: <FiUser /> },
    { title: "Medical Info", icon: <FiPlus /> },
    { title: "Appointment", icon: <FiCalendar /> },
    { title: "Review", icon: <FiCheck /> }
  ];

  useEffect(() => {
    const hospitalData = hospitals.find(h => h.id === parseInt(hospitalId, 10));
    if (hospitalData) {
      setHospital(hospitalData);
      // Set default department if hospital has services
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

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate directly to payment page with form data
    navigate('/appointment/payment', { state: { appointmentData: { hospital, ...formData } } });
  };

  if (!hospital) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto p-6 min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
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
            className="w-full bg-blue-50 rounded-lg p-4 text-blue-800"
          >
            <p>You'll receive a confirmation email shortly.</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-gray-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500"
          >
            Book Your Visit
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-xl text-gray-600"
          >
            at <span className="font-semibold text-blue-600">{hospital.name}</span>
          </motion.p>
        </div>

        {/* Progress Stepper - Compact Version */}
        <div className="mb-12 px-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 -z-10 transition-all duration-500 ease-out"
              style={{ width: `${(currentSection / (sections.length - 1)) * 100}%` }}
            ></div>
            
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                disabled={isSubmitting}
                className={`flex flex-col items-center group ${index <= currentSection ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                  index < currentSection ? 'bg-green-100 text-green-600 border-2 border-green-500' :
                  index === currentSection ? 'bg-blue-100 border-2 border-blue-500' : 
                  'bg-gray-100 border-2 border-gray-300'
                }`}>
                  {index < currentSection ? <FiCheck className="w-5 h-5" /> : section.icon}
                </div>
                <span className={`text-xs font-medium transition-all ${
                  index === currentSection ? 'text-blue-600 font-semibold' : ''
                }`}>
                  {section.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          {/* Patient Information Section */}
          <AnimatePresence mode="wait">
            {currentSection === 0 && (
              <motion.section
                key="patient-info"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex items-start mb-8">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600 mr-4">
                    <FiUser className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Your Information</h2>
                    <p className="text-gray-500">We've pre-filled some details from your profile</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name*</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                      <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name*</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth*</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender*</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number*</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
                      <input
                        type="tel"
                        name="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Residential Address*</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="font-medium text-blue-800 mb-4 flex items-center">
                      <FiInfo className="mr-2" /> Emergency Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name*</label>
                        <input
                          type="text"
                          name="emergencyContactName"
                          value={formData.emergencyContactName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number*</label>
                        <input
                          type="tel"
                          name="emergencyContactPhone"
                          value={formData.emergencyContactPhone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Relationship*</label>
                        <input
                          type="text"
                          name="emergencyContactRelation"
                          value={formData.emergencyContactRelation}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Medical Information Section */}
            {currentSection === 1 && (
              <motion.section
                key="medical-info"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex items-start mb-8">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600 mr-4">
                    <FiPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Medical Information</h2>
                    <p className="text-gray-500">Help us understand your medical needs</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Appointment*</label>
                    <textarea
                      name="reasonForAppointment"
                      value={formData.reasonForAppointment}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="What brings you in today?"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Symptoms</label>
                      <div className="relative">
                        <textarea
                          name="currentSymptoms"
                          value={formData.currentSymptoms}
                          onChange={handleChange}
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          placeholder="What symptoms are you experiencing?"
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded">
                          {formData.currentSymptoms.length}/500
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
                      <textarea
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Chronic conditions, allergies, surgeries, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                    <textarea
                      name="currentMedications"
                      value={formData.currentMedications}
                      onChange={handleChange}
                      rows="2"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Include dosage if possible"
                    />
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="font-medium text-blue-800 mb-4">Insurance Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                        <input
                          type="text"
                          name="insuranceProvider"
                          value={formData.insuranceProvider}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Policy Number</label>
                        <input
                          type="text"
                          name="policyNumber"
                          value={formData.policyNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Group Number</label>
                        <input
                          type="text"
                          name="groupNumber"
                          value={formData.groupNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Appointment Details Section */}
            {currentSection === 2 && (
              <motion.section
                key="appointment-details"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex items-start mb-8">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600 mr-4">
                    <FiCalendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Appointment Details</h2>
                    <p className="text-gray-500">Select your preferred date, time and doctor</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Preferred Time</label>
                      <input
                        type="time"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                        min="08:00"
                        max="18:00"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type*</label>
                      <select
                        name="appointmentType"
                        value={formData.appointmentType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="consultation">Consultation</option>
                        <option value="follow-up">Follow-up</option>
                        <option value="test">Test/Procedure</option>
                        <option value="emergency">Emergency</option>
                        <option value="vaccination">Vaccination</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department*</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      >
                        {hospital.services?.map((service) => (
                          <option key={service} value={service.toLowerCase()}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Preferred Doctor (optional)</label>
                    <select
                      name="preferredDoctor"
                      value={formData.preferredDoctor}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="">Any Available Doctor</option>
                      {hospital.doctors?.map((doctor) => (
                        <option key={doctor.name} value={doctor.name}>
                          Dr. {doctor.name} - {doctor.specialty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="font-medium text-blue-800 mb-4">Available Time Slots</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '04:45 PM'].map(time => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData({...formData, preferredTime: time})}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            formData.preferredTime === time ? 
                            'bg-blue-600 text-white shadow-md' : 
                            'bg-white border border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                    <h3 className="font-medium text-yellow-800 mb-2">Special Requirements</h3>
                    <textarea
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      rows="2"
                      className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition bg-white"
                      placeholder="e.g., wheelchair access, interpreter needed, dietary restrictions"
                    />
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-between">
            {currentSection > 0 ? (
              <button
                type="button"
                onClick={prevSection}
                disabled={isSubmitting}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50 flex items-center"
              >
                <FiChevronLeft className="mr-2" /> Back
              </button>
            ) : (
              <div></div>
            )}
            
            {currentSection < sections.length - 1 ? (
              <button
                type="button"
                onClick={nextSection}
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50 flex items-center ml-auto"
              >
                Continue <FiChevronRight className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-xl hover:from-green-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition disabled:opacity-50 flex items-center ml-auto shadow-md"
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
                    Proceed to Payment <FiChevronRight className="ml-2" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your information is protected and will only be used for this appointment.</p>
        </div>
      </motion.div>
    </div>
  );
}

export default AppointmentBookingForm;