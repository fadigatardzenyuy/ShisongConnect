import React from 'react';

const TourOverlay = ({ currentStep, totalSteps, content, onNext, onSkip }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl max-w-md mx-4 relative shadow-2xl animate-fade-in">
        <div className="absolute top-4 right-4">
          <button
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Skip Tour
          </button>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Welcome to SHICo!</h3>
          <p className="text-lg text-gray-600">{content}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {totalSteps}
          </div>
          <button
            onClick={onNext}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentStep === totalSteps - 1 ? 'Finish Tour' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourOverlay; 