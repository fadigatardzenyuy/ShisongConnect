import React from 'react';

function QueuePositionCard() {
  return (
    <div className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="text-xs font-medium">QUEUE POSITION</span>
      </div>
      <div className="mt-2">
        <div className="text-base font-semibold text-gray-800">3rd in line</div>
        <div className="text-xs text-gray-600">Estimated wait time: 15-20 mins</div>
        <div className="text-xs text-gray-500">Central Hospital Yaoundé</div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <button className="text-indigo-600 text-xs font-medium hover:text-indigo-700 flex items-center">
            View Queue
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <span className="text-xs text-gray-500">Updated: 2m ago</span>
        </div>
      </div>
    </div>
  );
}

export default QueuePositionCard; 