import React from 'react';
import { FiDroplet, FiAlertTriangle, FiPackage, FiFileText, FiUsers, FiCoffee } from 'react-icons/fi';

const MedicalInfoSection = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {/* Blood Type */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
            Blood Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <FiDroplet className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              required
              className="block w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
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
            </select>
          </div>
        </div>

        {/* Allergies */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
            Allergies
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <FiAlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="block w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="List any allergies"
            />
          </div>
        </div>

        {/* Current Medications */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
            Current Medications
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <FiPackage className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="currentMedications"
              value={formData.currentMedications}
              onChange={handleChange}
              className="block w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="List current medications"
            />
          </div>
        </div>

        {/* Medical History */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
            Medical History
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <FiFileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              className="block w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="List medical history"
            />
          </div>
        </div>

        {/* Family Medical History */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
            Family Medical History
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <FiUsers className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="familyMedicalHistory"
              value={formData.familyMedicalHistory}
              onChange={handleChange}
              className="block w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="List family medical history"
            />
          </div>
        </div>

        {/* Lifestyle Information */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
            Lifestyle Information
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <FiCoffee className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="lifestyleInfo"
              value={formData.lifestyleInfo}
              onChange={handleChange}
              className="block w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter lifestyle information"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalInfoSection; 