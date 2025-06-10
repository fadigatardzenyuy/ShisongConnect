import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveRouter from './components/ResponsiveRouter';
import { ToastProvider } from './components/ui/toast';
import { TooltipProvider } from './components/ui/tooltip';
import Login from './pages/patient/authentication/Login';
import Signup from './pages/patient/authentication/Signup';
import Dashboard from './pages/Dashboard';
import CompleteProfile from './pages/CompleteProfile';
import BookAppointmentPage from './pages/patient/BookAppointmentPage';
import AppointmentBookingForm from './components/booking/AppointmentBookingForm';
import AppointmentPreview from './pages/patient/appointments/AppointmentPreview';
import PaymentPage from './components/payment/PaymentPage';
import HospitalDetails from './pages/HospitalDetailsPage';
import MedicalResults from './pages/MedicalResults';
import Reminders from './pages/patient/Reminders';

function App() {
  return (
    <Router>
      <ToastProvider>
        <TooltipProvider>
          <Routes>
            {/* Landing page route handled by ResponsiveRouter */}
            <Route path="/" element={<ResponsiveRouter />} />
            
            {/* Other routes */}
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
            <Route path="/reminders" element={<Reminders />} />
          </Routes>
        </TooltipProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
