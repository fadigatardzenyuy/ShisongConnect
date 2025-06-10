import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Navbar";
import WelcomeBanner from "../components/layout/WelcomeBanner";
import QuickActionsCard from "../components/Dashboard/QuickActions/QuickActionsCard";
import MyAppointmentsCard from "../components/Dashboard/Appointments/MyAppointmentsCard";
import HealthTipsCard from "../components/Dashboard/HealthTips/HealthTipsCard";
import DashboardTour from "../components/Tour/DashboardTour";
import HelpAssistant from "../components/Tour/HelpAssistant";

function Dashboard() {
  const navigate = useNavigate();
  const [showTour, setShowTour] = useState(false);
  const [showBookingPrompt, setShowBookingPrompt] = useState(false);
  const [showHelpAssistant, setShowHelpAssistant] = useState(false);
  const [tourKey, setTourKey] = useState(0);

  useEffect(() => {
    // Clear any existing tour state
    localStorage.removeItem("dashboardTourCompleted");
    // Force a new tour instance
    setTourKey((prev) => prev + 1);
    // Show the tour
    setShowTour(true);
  }, []);

  const handleTourFinish = () => {
    setShowTour(false);
    // Show the booking prompt modal after tour completion
    setShowBookingPrompt(true);
    localStorage.setItem("dashboardTourCompleted", "true");
  };

  const handleStartBooking = () => {
    setShowBookingPrompt(false);
    navigate("/book-appointment");
  };

  const handleSkipBooking = () => {
    setShowBookingPrompt(false);
  };

  const handleStartTour = () => {
    // Clear any existing tour state
    localStorage.removeItem("dashboardTourCompleted");
    // Force a new tour instance
    setTourKey((prev) => prev + 1);
    // Show the tour
    setShowTour(true);
    setShowHelpAssistant(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-2 sm:px-4 md:px-6 max-w-[1400px] mx-auto">
        <div className="welcome-banner transition-all duration-300 mt-4 mb-4 sm:mt-6 sm:mb-6">
          <WelcomeBanner />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left Column - Quick Actions and Appointments */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="quick-actions transition-all duration-300 bg-white rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 w-full">
              <QuickActionsCard />
            </div>
            <div className="appointments transition-all duration-300 bg-white rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 w-full">
              <MyAppointmentsCard />
            </div>
          </div>

          {/* Right Column - Health Tips (Full Height) */}
          <div className="h-full w-full mt-4 lg:mt-0">
            <div className="health-tips transition-all duration-300 bg-white rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 h-full w-full">
              <HealthTipsCard />
            </div>
          </div>
        </div>

        {/* Dashboard Tour */}
        <DashboardTour
          key={tourKey}
          run={showTour}
          onFinish={handleTourFinish}
        />

        {/* Booking Prompt Modal */}
        {showBookingPrompt && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 sm:p-8 rounded-xl max-w-md w-full mx-auto relative shadow-2xl animate-fade-in">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Ready to Book Your First Appointment?
                </h3>
                <p className="text-gray-600 mb-6">
                  Would you like to schedule your first appointment now? We'll
                  guide you through the process step by step.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleStartBooking}
                    className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Yes, Book Now
                  </button>
                  <button
                    onClick={handleSkipBooking}
                    className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
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
            className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 bg-green-600 text-white p-4 sm:p-5 rounded-full shadow-xl hover:bg-green-700 transition-all transform hover:scale-110 z-40 animate-bounce-slow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 sm:h-8 sm:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
