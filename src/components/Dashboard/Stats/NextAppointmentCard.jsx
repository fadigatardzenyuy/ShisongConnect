import React from 'react';

function NextAppointmentCard() {
  return (
    <div className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-xs font-medium">NEXT APPOINTMENT</span>
      </div>
      <div className="mt-2">
        <div className="text-base font-semibold text-gray-800">Today 2:30 PM</div>
        <div className="text-xs text-gray-600">Dr. Marie Fotso - Cardiology</div>
        <div className="text-xs text-gray-500">Central Hospital Yaoundé</div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-100">
        <button className="text-indigo-600 text-xs font-medium hover:text-indigo-700 flex items-center">
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default NextAppointmentCard; 