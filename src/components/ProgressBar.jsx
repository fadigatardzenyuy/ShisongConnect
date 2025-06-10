import React from "react";
import {
  CheckCircle,
  Heart,
  Activity,
  Shield,
  Zap,
  Sparkles,
} from "lucide-react";
export const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  const stepNames = [
    "Personal",
    "Emergency",
    "History",
    "Health",
    "Preferences",
    "Insurance",
    "Consent",
  ];

  return (
    <div className="mb-8 px-4">
      {/* Background container with glassmorphism */}
      <div className="bg-gradient-to-r from-gray-800/50 to-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          {stepNames.slice(0, totalSteps).map((name, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const isLast = stepNumber === totalSteps;

            return (
              <React.Fragment key={stepNumber}>
                <div className="flex flex-col items-center relative">
                  {/* Step circle with gradient and glow effects */}
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold transition-all duration-500 shadow-lg relative overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-br from-emerald-500 to-green-600 scale-110 shadow-emerald-500/50"
                          : isCompleted
                          ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/30"
                          : "bg-gradient-to-br from-gray-600 to-gray-700 shadow-gray-500/20"
                      }`}
                    >
                      {/* Animated background for active step */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 animate-pulse rounded-2xl"></div>
                      )}

                      {/* Step content */}
                      <div className="relative z-10">
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <span className="text-sm font-bold">
                            {stepNumber}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Glow effect for active step */}
                    {isActive && (
                      <div className="absolute inset-0 bg-emerald-400/30 rounded-2xl blur-lg animate-pulse -z-10"></div>
                    )}
                  </div>

                  {/* Step name */}
                  <p
                    className={`mt-3 text-xs text-center font-semibold transition-colors duration-300 ${
                      isActive
                        ? "text-emerald-400"
                        : isCompleted
                        ? "text-green-400"
                        : "text-gray-400"
                    }`}
                  >
                    {name}
                  </p>

                  {/* Active step indicator dot */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  )}
                </div>

                {/* Connection line */}
                {!isLast && (
                  <div className="flex-1 mx-4 relative">
                    <div
                      className={`h-0.5 transition-all duration-500 ${
                        isCompleted
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/30"
                          : "bg-gray-600"
                      }`}
                    ></div>

                    {/* Animated progress line */}
                    {stepNumber === currentStep - 1 && (
                      <div
                        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 animate-pulse shadow-lg shadow-emerald-500/50"
                        style={{ width: "100%" }}
                      ></div>
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Progress percentage */}
        <div className="text-center">
          <div className="text-white font-semibold mb-2">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-gray-400 text-sm">
            {Math.round(progress)}% Complete
          </div>
        </div>
      </div>
    </div>
  );
};
