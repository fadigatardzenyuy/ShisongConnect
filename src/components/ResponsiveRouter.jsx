import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import MobileOnboarding from '../pages/MobileOnboarding';
import Login from '../pages/patient/authentication/Login';
import Signup from '../pages/patient/authentication/Signup';
import Dashboard from '../pages/Dashboard';
import CompleteProfile from '../pages/CompleteProfile';
import BookAppointmentPage from '../pages/patient/BookAppointmentPage';
import Header from './layout/Header';
import HospitalDetails from '../pages/HospitalDetailsPage';

const ResponsiveRouter = () => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const pathsWithHeader = [
    '/dashboard',
    '/book-appointment',
    '/records',
    '/reminders',
    '/profile',
    '/settings',
    '/help',
    // The dynamic route pattern is handled in the showHeader logic
    // '/hospital/:id' 
  ];

  // Check if the current path is in pathsWithHeader or matches the /hospital/:id pattern
  const showHeader = pathsWithHeader.includes(location.pathname) || location.pathname.startsWith('/hospital/');

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
        <Route path="/hospital/:id" element={<HospitalDetails />} />
        {/* Add other routes as needed */}
      </Routes>
    </>
  );
};

export default ResponsiveRouter; 