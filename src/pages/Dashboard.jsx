import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import WelcomeBanner from '../components/layout/WelcomeBanner';
import QuickActionsCard from '../components/Dashboard/QuickActions/QuickActionsCard';
import MyAppointmentsCard from '../components/Dashboard/Appointments/MyAppointmentsCard';
import HealthTipsCard from '../components/Dashboard/HealthTips/HealthTipsCard';
import TourOverlay from '../components/Tour/TourOverlay';
import HelpAssistant from '../components/Tour/HelpAssistant';

function Dashboard() {
  const [showTour, setShowTour] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState(null);
  const [showHelpAssistant, setShowHelpAssistant] = useState(false);

  const tourSteps = [
    {
      target: '.welcome-banner',
      content: 'Welcome to SHICo! Your personalized healthcare dashboard where managing your health is made simple and efficient.',
      position: 'bottom'
    },
    {
      target: '.quick-actions',
      content: 'Access essential healthcare services instantly. Schedule appointments, view prescriptions, and get emergency assistance with just one click.',
      position: 'right'
    },
    {
      target: '.appointments',
      content: 'Stay on top of your healthcare schedule. View, manage, and track all your upcoming medical appointments in one place.',
      position: 'left'
    },
    {
      target: '.health-tips',
      content: 'Receive personalized health insights and recommendations to help you maintain a healthy lifestyle.',
      position: 'left'
    }
  ];

  const helpTopics = [
    {
      question: "How do I schedule an appointment?",
      answer: "Click on the 'Schedule Appointment' button in the Quick Actions section. Select your preferred doctor, date, and time slot."
    },
    {
      question: "How can I view my prescriptions?",
      answer: "Go to the Quick Actions section and click on 'View Prescriptions'. You'll see all your current and past prescriptions."
    },
    {
      question: "What are health tips?",
      answer: "Health tips are personalized recommendations based on your medical history and current health status. They help you maintain a healthy lifestyle."
    },
    {
      question: "How do I update my profile?",
      answer: "Click on your profile picture in the top right corner and select 'Edit Profile' to update your personal information."
    }
  ];

  const scrollToElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightedElement(selector);
    }
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      scrollToElement(tourSteps[nextStep].target);
    } else {
      setShowTour(false);
      setHighlightedElement(null);
    }
  };

  const handleSkip = () => {
    setShowTour(false);
    setHighlightedElement(null);
  };

  const handleStartTour = () => {
    setShowTour(true);
    setCurrentStep(0);
    setShowHelpAssistant(false);
    scrollToElement(tourSteps[0].target);
  };

  useEffect(() => {
    if (showTour) {
      scrollToElement(tourSteps[0].target);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-6 max-w-[1400px] mx-auto">
        <Header />
        
        <div className={`welcome-banner transition-all duration-300 mt-8 mb-8 ${highlightedElement ? (highlightedElement === '.welcome-banner' ? 'relative z-10 animate-float' : 'opacity-40') : ''}`}>
          <WelcomeBanner />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Quick Actions and Appointments */}
          <div className="flex flex-col gap-8">
            <div className={`quick-actions transition-all duration-300 bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 ${highlightedElement ? (highlightedElement === '.quick-actions' ? 'relative z-10 animate-float' : 'opacity-40') : ''}`}>
              <QuickActionsCard />
            </div>
            <div className={`appointments transition-all duration-300 bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 ${highlightedElement ? (highlightedElement === '.appointments' ? 'relative z-10 animate-float' : 'opacity-40') : ''}`}>
              <MyAppointmentsCard />
            </div>
          </div>

          {/* Right Column - Health Tips (Full Height) */}
          <div className="h-full">
            <div className={`health-tips transition-all duration-300 bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 h-full ${highlightedElement ? (highlightedElement === '.health-tips' ? 'relative z-10 animate-float' : 'opacity-40') : ''}`}>
              <HealthTipsCard />
            </div>
          </div>
        </div>

        {/* Tour Overlay */}
        {showTour && (
          <TourOverlay
            currentStep={currentStep}
            totalSteps={tourSteps.length}
            content={tourSteps[currentStep].content}
            onNext={handleNext}
            onSkip={handleSkip}
          />
        )}

        {/* Help Assistant */}
        {showHelpAssistant && (
          <HelpAssistant
            onStartTour={handleStartTour}
            onClose={() => setShowHelpAssistant(false)}
          />
        )}

        {/* Help Assistant Button */}
        {!showHelpAssistant && (
          <button
            onClick={() => setShowHelpAssistant(true)}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-5 rounded-full shadow-xl hover:bg-blue-700 transition-all transform hover:scale-110 z-40 animate-bounce-slow"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default Dashboard; 