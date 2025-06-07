import React from 'react';

function NextAppointmentCard() {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-base sm:text-lg font-medium">Next Appointment</span>
      </div>
      <div className="mt-3 space-y-1">
        <div className="text-xl sm:text-2xl font-semibold text-gray-800">Today 2:30 PM</div>
        <div className="text-sm sm:text-base text-gray-600">Dr. Marie Fotso - Cardiology</div>
        <div className="text-sm sm:text-base text-gray-500">Central Hospital Yaoundé</div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100">
        <button className="text-green-600 text-sm sm:text-base font-medium hover:text-green-700 flex items-center">
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default NextAppointmentCard; 