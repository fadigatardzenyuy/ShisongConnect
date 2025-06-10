import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import MobileOnboarding from '../pages/MobileOnboarding';

const ResponsiveRouter = () => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

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

  // Only render landing page with mobile/desktop variants
  return isMobile ? <MobileOnboarding /> : <LandingPage />;
};

export default ResponsiveRouter; 