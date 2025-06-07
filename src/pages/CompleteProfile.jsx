import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiHeart, FiAlertCircle, FiCreditCard, FiGlobe, FiCamera, FiCheck } from 'react-icons/fi';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    bloodType: '',
    height: '',
    weight: '',
    allergies: '',
    currentMedications: '',
    chronicConditions: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    insuranceInfo: {
      provider: '',
      policyNumber: '',
      groupNumber: ''
    },
    preferredLanguage: '',
    profilePicture: null
  });

  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const steps = [
    { id: 1, title: 'Personal Info', icon: <FiUser />, description: 'Tell us about yourself' },
    { id: 2, title: 'Health Info', icon: <FiHeart />, description: 'Share your health details' },
    { id: 3, title: 'Emergency Contact', icon: <FiAlertCircle />, description: 'Who should we call?' },
    { id: 4, title: 'Insurance', icon: <FiCreditCard />, description: 'Insurance information' },
    { id: 5, title: 'Preferences', icon: <FiGlobe />, description: 'Your preferences' }
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'profilePicture' && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
      setFormData(prev => ({
        ...prev,
        profilePicture: files[0]
      }));
      return;
    }

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Update progress
    const filledFields = Object.values(formData).filter(val => val !== '').length;
    const totalFields = Object.keys(formData).length;
    setProgress((filledFields / totalFields) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => {
      const next = Math.min(prev + 1, steps.length);
      setProgress((next / steps.length) * 100);
      return next;
    });
  };

  const prevStep = () => {
    setCurrentStep(prev => {
      const previous = Math.max(prev - 1, 1);
      setProgress((previous / steps.length) * 100);
      return previous;
    });
  };

  const renderStepIndicator = () => {
    return (
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              currentStep === step.id
                ? 'bg-green-50 border-l-4 border-green-500'
                : currentStep > step.id
                ? 'bg-green-50/50'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => currentStep > step.id && setCurrentStep(step.id)}
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep > step.id 
                ? 'bg-green-500 text-white' 
                : currentStep === step.id 
                ? 'bg-green-500 text-white ring-4 ring-green-100' 
                : 'bg-gray-100 text-gray-500'
            }`}>
              {currentStep > step.id ? (
                <FiCheck className="w-5 h-5" />
              ) : (
                step.icon
              )}
        </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${
                currentStep >= step.id ? 'text-green-700' : 'text-gray-500'
              }`}>
                {step.title}
              </p>
              <p className="text-xs text-gray-500">{step.description}</p>
        </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-green-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-green-700">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  required
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
                  <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="gender" className="block text-sm font-medium text-green-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                <select
                  name="gender"
                  id="gender"
                  required
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-green-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  required
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label htmlFor="address" className="block text-sm font-medium text-green-700">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                <input
                  type="text"
                  name="address"
                  id="address"
                  required
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main St, City, Country"
                />
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="bloodType" className="block text-sm font-medium text-green-700">
                  Blood Type
                </label>
                <div className="relative">
                <select
                  name="bloodType"
                  id="bloodType"
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  value={formData.bloodType}
                  onChange={handleChange}
                >
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="unknown">I don't know</option>
                </select>
                  <FiHeart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="height" className="block text-sm font-medium text-green-700">
                  Height (cm)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="height"
                    id="height"
                    min="100"
                    max="250"
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="175"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400">cm</span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="weight" className="block text-sm font-medium text-green-700">
                  Weight (kg)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    min="30"
                    max="200"
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="70"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400">kg</span>
                </div>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label htmlFor="allergies" className="block text-sm font-medium text-green-700">
                  Allergies
                </label>
                <div className="relative">
                  <textarea
                    name="allergies"
                    id="allergies"
                    rows="2"
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                    placeholder="List any allergies (e.g., penicillin, peanuts)"
                    value={formData.allergies}
                    onChange={handleChange}
                  />
                  <FiAlertCircle className="absolute left-3 top-3 text-green-400" />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label htmlFor="currentMedications" className="block text-sm font-medium text-green-700">
                  Current Medications
                </label>
                <div className="relative">
                <textarea
                  name="currentMedications"
                  id="currentMedications"
                  rows="2"
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  placeholder="List current medications and dosages"
                  value={formData.currentMedications}
                  onChange={handleChange}
                />
                  <FiAlertCircle className="absolute left-3 top-3 text-green-400" />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label htmlFor="chronicConditions" className="block text-sm font-medium text-green-700">
                  Chronic Conditions
                </label>
                <div className="relative">
                <textarea
                  name="chronicConditions"
                  id="chronicConditions"
                  rows="2"
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  placeholder="List any chronic conditions (e.g., diabetes, hypertension)"
                  value={formData.chronicConditions}
                  onChange={handleChange}
                />
                  <FiAlertCircle className="absolute left-3 top-3 text-green-400" />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <div className="p-4 bg-green-50 rounded-lg mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Emergency Contact</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>This information will only be used in case of emergency. Please provide someone we can contact if needed.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="emergencyContact.name" className="block text-sm font-medium text-green-700">
                  Contact Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                <input
                  type="text"
                  name="emergencyContact.name"
                  id="emergencyContact.name"
                  required
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  value={formData.emergencyContact.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                />
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="emergencyContact.relationship" className="block text-sm font-medium text-green-700">
                  Relationship <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                <input
                  type="text"
                  name="emergencyContact.relationship"
                  id="emergencyContact.relationship"
                  required
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  value={formData.emergencyContact.relationship}
                  onChange={handleChange}
                  placeholder="Spouse, Parent, Friend, etc."
                />
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label htmlFor="emergencyContact.phone" className="block text-sm font-medium text-green-700">
                  Contact Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                <input
                  type="tel"
                  name="emergencyContact.phone"
                  id="emergencyContact.phone"
                  required
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  value={formData.emergencyContact.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 987-6543"
                />
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <div className="p-4 bg-green-50 rounded-lg mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiCreditCard className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Insurance Information</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>This information is optional but will help us process any claims more efficiently.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="insuranceInfo.provider" className="block text-sm font-medium text-green-700">
                  Insurance Provider
                </label>
                <div className="relative">
                <input
                  type="text"
                  name="insuranceInfo.provider"
                  id="insuranceInfo.provider"
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  value={formData.insuranceInfo.provider}
                  onChange={handleChange}
                  placeholder="Blue Cross, Aetna, etc."
                />
                  <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="insuranceInfo.policyNumber" className="block text-sm font-medium text-green-700">
                  Policy Number
                </label>
                <div className="relative">
                <input
                  type="text"
                  name="insuranceInfo.policyNumber"
                  id="insuranceInfo.policyNumber"
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  value={formData.insuranceInfo.policyNumber}
                  onChange={handleChange}
                  placeholder="123456789"
                />
                  <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label htmlFor="insuranceInfo.groupNumber" className="block text-sm font-medium text-green-700">
                  Group Number
                </label>
                <div className="relative">
                <input
                  type="text"
                  name="insuranceInfo.groupNumber"
                  id="insuranceInfo.groupNumber"
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  value={formData.insuranceInfo.groupNumber}
                  onChange={handleChange}
                  placeholder="XYZ123"
                />
                  <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="preferredLanguage" className="block text-sm font-medium text-green-700">
                  Preferred Language
                </label>
                <div className="relative">
                <select
                  name="preferredLanguage"
                  id="preferredLanguage"
                    className="w-full px-4 py-3 pl-10 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                >
                  <option value="">Select language</option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="mandarin">Mandarin</option>
                  <option value="hindi">Hindi</option>
                  <option value="arabic">Arabic</option>
                  <option value="other">Other</option>
                </select>
                  <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="profilePicture" className="block text-sm font-medium text-green-700">
                  Profile Picture
                </label>
                <div className="mt-1 flex items-center">
                  {previewImage ? (
                    <div className="flex items-center space-x-4">
                      <img 
                        src={previewImage} 
                        alt="Profile preview" 
                        className="h-16 w-16 rounded-full object-cover border-2 border-green-100"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData(prev => ({ ...prev, profilePicture: null }));
                        }}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2 w-full">
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-green-200 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100 transition duration-200">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FiCamera className="w-8 h-8 mb-4 text-green-400" />
                            <p className="mb-2 text-sm text-green-600">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-green-500">PNG, JPG (MAX. 5MB)</p>
                          </div>
                          <input 
                            id="profilePicture" 
                            name="profilePicture" 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Almost done!</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Review your information and click "Complete Profile" to finish.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Complete Your Health Profile
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Help us personalize your healthcare experience
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Side Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Step {currentStep} of {steps.length}
                </p>
              </div>
        {renderStepIndicator()}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
                >
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Previous
                </motion.button>
              ) : (
                    <div></div>
              )}
              
              {currentStep < steps.length ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                      className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
                >
                  Next
                  <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                      className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
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
                      Complete Profile
                      <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </div>

        <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
            Your information is secure and will only be used to provide you with better healthcare services.
          </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;