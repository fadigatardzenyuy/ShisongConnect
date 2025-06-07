import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, Calendar, Shield, Heart, Smartphone, Clock } from 'lucide-react';

const onboardingSteps = [
  {
    title: "Welcome to SHICo",
    description: "Your trusted healthcare platform in Cameroon connecting patients with top hospitals and medical facilities",
    icon: Heart,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    bgImage: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    overlay: "bg-green-900/70"
  },
  {
    title: "Book Hospital Appointments",
    description: "Reserve your spot at leading hospitals across Cameroon with instant confirmation and flexible scheduling",
    icon: Calendar,
    gradient: "from-green-600 via-green-500 to-emerald-500",
    bgImage: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
    overlay: "bg-green-900/70"
  },
  {
    title: "Secure & Reliable",
    description: "HIPAA-compliant platform with encrypted communications and secure payment processing for hospital bookings",
    icon: Shield,
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    bgImage: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1200&q=80",
    overlay: "bg-green-900/70"
  },
  {
    title: "24/7 Hospital Access",
    description: "Find and book appointments at hospitals anytime with real-time availability and emergency services",
    icon: Clock,
    gradient: "from-teal-500 via-green-500 to-emerald-500",
    bgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    overlay: "bg-green-900/70"
  }
];

const MobileOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const nextStep = () => {
    setDirection(1);
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setDirection(-1);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    navigate('/signup');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const currentStepData = onboardingSteps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url(${currentStepData.bgImage})`,
          transform: `scale(${isVisible ? 1.05 : 1.1})` 
        }}
      >
        {/* Overlay */}
        <div className={`absolute inset-0 ${currentStepData.overlay} transition-all duration-1000`}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-emerald-500/25 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-teal-500/30 rounded-full blur-md animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-4 pt-12 sm:p-6 sm:pt-16">
        <div className="text-sm font-medium text-white/90 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
          {currentStep + 1} of {onboardingSteps.length}
        </div>
        <button
          onClick={skipOnboarding}
          className="px-3 py-1.5 text-white/90 hover:text-white text-sm font-medium transition-all duration-200 hover:bg-white/20 rounded-full backdrop-blur-sm bg-black/20"
        >
          Skip
        </button>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 px-4 sm:px-6 mb-8">
        <div className="w-full bg-white/20 rounded-full h-1 backdrop-blur-sm">
          <div 
            className={`h-1 bg-gradient-to-r ${currentStepData.gradient} rounded-full transition-all duration-700 ease-out shadow-lg`}
            style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-md mx-auto w-full">
        <div 
          className={`transition-all duration-700 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: `${currentStep * 100}ms` }}
        >
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${currentStepData.gradient} p-5 shadow-2xl transform transition-all duration-500 hover:scale-105 backdrop-blur-sm bg-white/10`}>
              <IconComponent className="w-full h-full text-white drop-shadow-lg" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4 leading-tight drop-shadow-2xl">
            {currentStepData.title}
          </h1>

          {/* Description */}
          <p className="text-white/90 text-center text-base sm:text-lg leading-relaxed mb-12 px-2 drop-shadow-lg">
            {currentStepData.description}
          </p>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="relative z-10 flex justify-center gap-2 mb-8">
        {onboardingSteps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`transition-all duration-300 rounded-full backdrop-blur-sm ${
              index === currentStep 
                ? 'w-6 h-2 bg-white shadow-lg'
                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="relative z-10 p-4 sm:p-6 space-y-3 max-w-md mx-auto w-full">
        {currentStep === onboardingSteps.length - 1 ? (
          <>
            <button
              onClick={handleSignUp}
              className="w-full py-3 px-4 bg-white text-gray-800 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
            >
              Get Started
            </button>
            <button
              onClick={handleSignIn}
              className="w-full py-3 px-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-base border border-white/30 hover:bg-white/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              I already have an account
            </button>
          </>
        ) : (
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="flex-1 py-3 px-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-base border border-white/30 hover:bg-white/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <button
              onClick={nextStep}
              className={`${currentStep === 0 ? 'w-full' : 'flex-1'} py-3 px-4 bg-white text-gray-800 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 backdrop-blur-sm`}
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Safe Area */}
      <div className="h-4 sm:h-6"></div>
    </div>
  );
};

export default MobileOnboarding;