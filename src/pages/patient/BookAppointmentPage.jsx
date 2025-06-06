import HealthcareProviders from "@/components/booking/HealthcareProviders";
import HeroSection from "@/components/booking/HeroSection";
import ServiceCategories from "@/components/booking/ServiceCategories";
import SpecialtyBrowse from "@/components/booking/SpecialtyBrowse";
import React from "react";

function BookAppointmentPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <HeroSection />
      </section>

      {/* Healthcare Providers */}
      <section>
        <HealthcareProviders />
      </section>
    </div>
  );
}

export default BookAppointmentPage; 