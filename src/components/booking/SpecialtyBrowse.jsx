import React from 'react';

function SpecialtyBrowse() {
  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        {/* Placeholder for Stethoscope Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.504A9 9 0 1112 3v10M2.39 15.59a9 9 0 1114.91-6.4z" />
        </svg>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Browse by Specialty</h2>
      </div>
      <p className="text-gray-600 mb-4">Find the right care for your specific needs</p>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {/* General Medicine */}
        <div className="flex flex-col items-center py-6 px-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center border border-gray-200">
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3S9 6.343 9 8s1.343 3 3 3zm0 0c-1.414 0-2.5-1.086-2.5-2.5S10.586 6 12 6s2.5 1.086 2.5 2.5S13.414 11 12 11zM7 13h10l-1 9H8l-1-9z" />
            </svg>
          </div>
          <p className="text-base font-semibold text-gray-800">General Medicine</p>
          <span className="text-xs text-gray-600">45 providers</span>
        </div>

        {/* Cardiology */}
        <div className="flex flex-col items-center py-6 px-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center border border-gray-200">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <p className="text-base font-semibold text-gray-800">Cardiology</p>
          <span className="text-xs text-gray-600">23 providers</span>
        </div>

        {/* Emergency Care */}
        <div className="flex flex-col items-center py-6 px-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center border border-gray-200">
          <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-base font-semibold text-gray-800">Emergency Care</p>
          <span className="text-xs text-gray-600">12 providers</span>
        </div>

        {/* Pediatrics */}
        <div className="flex flex-col items-center py-6 px-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center border border-gray-200">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0H3z" />
            </svg>
          </div>
          <p className="text-base font-semibold text-gray-800">Pediatrics</p>
          <span className="text-xs text-gray-600">34 providers</span>
        </div>

        {/* Surgery */}
        <div className="flex flex-col items-center py-6 px-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center border border-gray-200">
          <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16h.01" />
            </svg>
          </div>
          <p className="text-base font-semibold text-gray-800">Surgery</p>
          <span className="text-xs text-gray-600">18 providers</span>
        </div>

        {/* Telemedicine */}
        <div className="flex flex-col items-center py-6 px-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center border border-gray-200">
          <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.504A9 9 0 1112 3v10M2.39 15.59a9 9 0 1114.91-6.4z" />
            </svg>
          </div>
          <p className="text-base font-semibold text-gray-800">Telemedicine</p>
          <span className="text-xs text-gray-600">67 providers</span>
        </div>
      </div>
    </div>
  );
}

export default SpecialtyBrowse; 