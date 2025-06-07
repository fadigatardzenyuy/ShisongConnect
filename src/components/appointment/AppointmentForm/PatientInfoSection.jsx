import React from 'react';
import { FiUser, FiPhone, FiMail, FiMapPin, FiAlertCircle } from 'react-icons/fi';

const PatientInfoSection = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {/* First Name */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
            First Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <FiUser className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="block w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter first name"
            />
          </div>
        </div>

        {/* Middle Name */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
            Middle Name
          </label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className="block w-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter middle name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="block w-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter last name"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="block w-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="block w-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <FiPhone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="block w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {/* Alternate Phone */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
            Alternate Phone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <FiPhone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="alternatePhone"
              value={formData.alternatePhone}
              onChange={handleChange}
              className="block w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter alternate phone"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <FiMail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter email address"
            />
          </div>
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
            Residential Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 sm:left-4 flex items-start pointer-events-none">
              <FiMapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="2"
              className="block w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your address"
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact Section */}
      <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-100">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
          <FiAlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900">Emergency Contact</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
              Contact Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleChange}
              required
              className="block w-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter contact name"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
              Contact Phone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <FiPhone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                required
                className="block w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter contact phone"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">
              Relationship <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="emergencyContactRelation"
              value={formData.emergencyContactRelation}
              onChange={handleChange}
              required
              className="block w-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter relationship"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoSection; 