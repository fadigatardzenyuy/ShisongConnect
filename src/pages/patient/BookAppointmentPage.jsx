import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HealthcareProviders from "@/components/booking/HealthcareProviders";
import HeroSection from "@/components/booking/HeroSection";
import ServiceCategories from "@/components/booking/ServiceCategories";
import SpecialtyBrowse from "@/components/booking/SpecialtyBrowse";
import BookingTour from "@/components/Tour/BookingTour";
import HelpAssistant from "@/components/Tour/HelpAssistant";

function BookAppointmentPage() {
  const navigate = useNavigate();
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Check if user has completed the tour before
    const tourCompleted = localStorage.getItem('bookingTourCompleted');
    if (!tourCompleted) {
      setIsFirstTimeUser(true);
      setShowTour(true);
    }
  }, []);

  const handleStartTour = (tourType) => {
    if (tourType === 'booking') {
      setShowTour(true);
    }
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {/* Tour Component */}
      <BookingTour isFirstTimeUser={isFirstTimeUser} run={showTour} />

      {/* Help Assistant */}
      <HelpAssistant onStartTour={handleStartTour} />

      {/* Hero Section */}
      <section className="mb-6 sm:mb-12 hero-section">
        <HeroSection />
      </section>

      {/* Healthcare Providers */}
      <section className="w-full healthcare-providers">
        <HealthcareProviders />
      </section>
    </div>
  );
}

export default BookAppointmentPage; 