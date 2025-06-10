import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './components/ui/toast';
import { TooltipProvider } from './components/ui/tooltip';
import ResponsiveRouter from './components/ResponsiveRouter';
import Login from './pages/patient/authentication/Login';
import Signup from './pages/patient/authentication/Signup';
import CompleteProfile from './pages/CompleteProfile';
import Dashboard from './pages/Dashboard';
import BookAppointmentPage from './pages/patient/BookAppointmentPage';
import AppointmentBookingForm from './components/booking/AppointmentBookingForm';
import AppointmentPreview from './pages/patient/appointments/AppointmentPreview';
import PaymentPage from './components/payment/PaymentPage';
import HospitalDetails from './pages/HospitalDetailsPage';
import MedicalResults from './pages/MedicalResults';
import Reminders from './pages/patient/Reminders';
import Header from './components/layout/Header';
import BottomMobileNav from './components/layout/BottomMobileNav';
import ToastProviderWrapper from './components/ui/toast-provider';

// Create a wrapper component to handle layout
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // List of paths that should not have header and bottom nav
  const excludedPaths = [
    '/login',
    '/signup',
    '/',
    '/forgot-password',
    '/reset-password'
  ];

  const shouldShowLayout = !excludedPaths.includes(currentPath);

  return (
    <div className="min-h-screen bg-background">
      {shouldShowLayout && <Header />}
      <main className={shouldShowLayout ? "pb-16" : ""}>
        {children}
      </main>
      {shouldShowLayout && <BottomMobileNav />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <ToastProviderWrapper>
          <TooltipProvider>
            <Routes>
              {/* Landing page route handled by ResponsiveRouter */}
              <Route path="/" element={<ResponsiveRouter />} />
              
              {/* Authentication routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Patient routes */}
              <Route path="/complete-profile" element={<CompleteProfile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/book-appointment" element={<BookAppointmentPage />} />
              <Route path="/book-appointment/:hospitalId" element={<AppointmentBookingForm />} />
              <Route path="/appointment/preview" element={<AppointmentPreview />} />
              <Route path="/appointment/payment" element={<PaymentPage />} />
              <Route path="/hospital/:id" element={<HospitalDetails />} />
              <Route path="/medical-results" element={<MedicalResults />} />
              <Route path="/reminders" element={<Reminders />} />
            </Routes>
          </TooltipProvider>
        </ToastProviderWrapper>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
