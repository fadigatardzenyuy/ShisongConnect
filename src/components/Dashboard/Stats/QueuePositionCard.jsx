import React from 'react';

function QueuePositionCard() {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-base sm:text-lg font-medium">Queue Position</span>
      </div>
      <div className="mt-3 space-y-1">
        <div className="text-xl sm:text-2xl font-semibold text-gray-800">3rd in line</div>
        <div className="text-sm sm:text-base text-gray-600">Estimated wait time: 15-20 mins</div>
        <div className="text-sm sm:text-base text-gray-500">Central Hospital Yaoundé</div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <button className="text-green-600 text-sm sm:text-base font-medium hover:text-green-700 flex items-center">
            View Queue
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <span className="text-xs sm:text-sm text-gray-500">Updated: 2m ago</span>
        </div>
      </div>
    </div>
  );
}

export default QueuePositionCard; 