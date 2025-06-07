import React from 'react';
import { FiUser, FiActivity, FiCalendar, FiCheck } from 'react-icons/fi';

const sections = [
  { title: "Patient Info", icon: FiUser },
  { title: "Medical Info", icon: FiActivity },
  { title: "Appointment", icon: FiCalendar },
  { title: "Review", icon: FiCheck }
];

const ProgressStepper = ({ currentSection, setCurrentSection, isSubmitting }) => {
  return (
    <div className="space-y-6">
      <div className="relative">
        {/* Progress Bar */}
        <div className="absolute top-5 left-4 w-0.5 h-full bg-gray-200">
          <div 
            className="absolute top-0 left-0 w-full bg-green-500 transition-all duration-300"
            style={{ height: `${(currentSection / (sections.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const isActive = index === currentSection;
            const isCompleted = index < currentSection;
            const Icon = section.icon;

            return (
              <button
                key={index}
                onClick={() => !isSubmitting && setCurrentSection(index)}
                disabled={isSubmitting}
                className={`relative flex items-center w-full group transition-all duration-300 ${
                  isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
              >
                {/* Step Circle */}
                <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                  isActive 
                    ? 'border-green-500 bg-green-500 text-white scale-110' 
                    : isCompleted 
                    ? 'border-green-500 bg-green-500 text-white' 
                    : 'border-gray-300 bg-white text-gray-400 group-hover:border-green-400'
                }`}>
                  {isCompleted ? (
                    <FiCheck className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                {/* Step Content */}
                <div className={`ml-4 transition-all duration-300 ${
                  isActive ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'
                }`}>
                  <div className="text-sm font-medium">
                    {section.title}
                  </div>
                  <div className="text-xs mt-0.5">
                    {index === 0 && "Personal details"}
                    {index === 1 && "Health information"}
                    {index === 2 && "Schedule & preferences"}
                    {index === 3 && "Final confirmation"}
                  </div>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Status */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>Progress</span>
          <span className="font-medium text-green-600">
            {Math.round((currentSection / (sections.length - 1)) * 100)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${(currentSection / (sections.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper; 