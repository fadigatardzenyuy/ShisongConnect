import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import MobileOnboarding from '../pages/MobileOnboarding';
import Login from '../pages/patient/authentication/Login';
import Signup from '../pages/patient/authentication/Signup';
import Dashboard from '../pages/Dashboard';
import CompleteProfile from '../pages/CompleteProfile';
import BookAppointmentPage from '../pages/patient/BookAppointmentPage';
import AppointmentBookingForm from '../components/booking/AppointmentBookingForm';
import AppointmentPreview from '../pages/patient/appointments/AppointmentPreview';
import PaymentPage from '../components/payment/PaymentPage';
import Header from './layout/Header';
import HospitalDetails from '../pages/HospitalDetailsPage';
import BottomMobileNav from './layout/BottomMobileNav';
import MedicalResults from '../pages/MedicalResults';

const ResponsiveRouter = () => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const pathsWithHeader = [
    '/dashboard',
    '/book-appointment',
    '/book-appointment/:hospitalId',
    '/appointment/preview',
    '/appointment/payment',
    '/records',
    '/reminders',
    '/profile',
    '/settings',
    '/help',
    '/hospital/:id',
    '/medical-results'
  ];

  // Check if the current path matches any of the pathsWithHeader patterns
  const showHeader = pathsWithHeader.some(path => {
    // Convert path pattern to regex
    const pattern = path.replace(/:[^/]+/g, '[^/]+');
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(location.pathname);
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {showHeader && <Header />}
      <div className={isMobile && showHeader ? 'pb-14' : ''}>
      <Routes>
        <Route 
          path="/" 
          element={isMobile ? <MobileOnboarding /> : <LandingPage />} 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/book-appointment/:hospitalId" element={<AppointmentBookingForm />} />
        <Route path="/appointment/preview" element={<AppointmentPreview />} />
        <Route path="/appointment/payment" element={<PaymentPage />} />
        <Route path="/hospital/:id" element={<HospitalDetails />} />
        <Route path="/medical-results" element={<MedicalResults />} />
        {/* Add other routes as needed */}
      </Routes>
      </div>
      {isMobile && showHeader && <BottomMobileNav />}
    </>
  );
};

export default ResponsiveRouter; 