import React from 'react';

function TimeSavedDetailsCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Time Saved</h3>
      <p className="text-gray-600 mb-4">Thanks to HealthFlow</p>
      <div className="space-y-4">
        {/* Central Hospital Yaoundé */}
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <div className="font-semibold text-gray-800">Central Hospital Yaoundé</div>
            <div className="text-sm text-gray-500">With app: 45 min</div>
          </div>
          <div className="text-right">
            <div className="text-indigo-600 font-semibold">-1h 45min</div>
            <div className="text-sm text-gray-500">Without: 2h 30min</div>
          </div>
        </div>
        {/* Pasteur Clinic */}
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <div className="font-semibold text-gray-800">Pasteur Clinic</div>
            <div className="text-sm text-gray-500">With app: 15 min</div>
          </div>
          <div className="text-right">
            <div className="text-indigo-600 font-semibold">-1h 05min</div>
            <div className="text-sm text-gray-500">Without: 1h 20min</div>
          </div>
        </div>
        {/* Laquintinie Hospital */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-800">Laquintinie Hospital</div>
            <div className="text-sm text-gray-500">With app: 1h 10min</div>
          </div>
          <div className="text-right">
            <div className="text-indigo-600 font-semibold">-2h 05min</div>
            <div className="text-sm text-gray-500">Without: 3h 15min</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeSavedDetailsCard; 