import React from 'react';

const TourOverlay = ({ currentStep, totalSteps, content, onNext, onSkip }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl max-w-md w-full mx-auto relative shadow-2xl animate-fade-in">
        <div className="absolute top-4 right-4">
          <button
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm sm:text-base"
          >
            Skip Tour
          </button>
        </div>
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Welcome to SHICo!</h3>
          <p className="text-base sm:text-lg text-gray-600">{content}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {totalSteps}
          </div>
          <button
            onClick={onNext}
            className="w-full sm:w-auto bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base font-medium"
          >
            {currentStep === totalSteps - 1 ? 'Finish Tour' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourOverlay; 