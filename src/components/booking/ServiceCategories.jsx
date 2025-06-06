import React from 'react';

function ServiceCategories() {
  return (
    <div className="mt-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Browse by Service</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Emergency Care */}
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center border border-gray-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-base font-medium text-gray-800">Emergency Care</p>
          <span className="text-xs font-semibold text-red-600">Urgent</span>
        </div>

        {/* Video Consultation */}
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center border border-gray-200">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-7 0v2m4-2v2m4-2v2M3 14s.001-.617 0-2c0-1.105.895-2 2-2h1c1.105 0 2-.895 2-2s-.895-2-2-2H5c-1.105 0-2 .895-2 2v6c0 1.105.895 2 2 2h2c1.105 0 2 .895 2 2s-.895 2-2 2H5c-1.105 0-2-.895-2-2v-2z" />
            </svg>
          </div>
          <p className="text-base font-medium text-gray-800">Video Consultation</p>
        </div>

        {/* Lab Tests */}
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center border border-gray-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 16h.01" />
            </svg>
          </div>
          <p className="text-base font-medium text-gray-800">Lab Tests</p>
        </div>

        {/* Prescription Refill */}
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center border border-gray-200">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-base font-medium text-gray-800">Prescription Refill</p>
        </div>
      </div>
    </div>
  );
}

export default ServiceCategories; 