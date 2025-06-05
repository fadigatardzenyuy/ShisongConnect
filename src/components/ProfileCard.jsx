import React from 'react';

function ProfileCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-semibold mr-4">JN</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">John Ngono</h3>
          <p className="text-gray-500 text-sm">ID: HC2024001</p>
        </div>
      </div>
      <div className="space-y-2 text-gray-600">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span>john.ngono@email.com</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <span>+237 6XX XXX XXX</span>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>Douala, Cameroon</span>
        </div>
      </div>
      <div className="flex justify-around mt-6 border-t pt-4">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">12</div>
          <div className="text-sm text-gray-500">Appointments</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">8h 45min</div>
          <div className="text-sm text-gray-500">Time Saved</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard; 