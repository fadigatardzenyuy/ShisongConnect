import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import MobileOnboarding from '../pages/MobileOnboarding';
import Login from '../pages/patient/authentication/Login';
import Signup from '../pages/patient/authentication/Signup';
import Dashboard from '../pages/Dashboard';
import CompleteProfile from '../pages/CompleteProfile';

const ResponsiveRouter = () => {
  const [isMobile, setIsMobile] = useState(false);

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
    <Routes>
      <Route 
        path="/" 
        element={isMobile ? <MobileOnboarding /> : <LandingPage />} 
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Add other routes as needed */}
    </Routes>
  );
};

export default ResponsiveRouter; 