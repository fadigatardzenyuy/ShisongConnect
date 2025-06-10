import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastProvider } from "./components/ui/toast";
import { TooltipProvider } from "./components/ui/tooltip";
import ResponsiveRouter from "./components/ResponsiveRouter";
import Login from "./pages/patient/authentication/Login";
import Signup from "./pages/patient/authentication/Signup";
import CompleteProfile from "./pages/CompleteProfile";
import Dashboard from "./pages/Dashboard";
import BookAppointmentPage from "./pages/patient/BookAppointmentPage";
import AppointmentBookingForm from "./components/booking/AppointmentBookingForm";
import AppointmentPreview from "./pages/patient/appointments/AppointmentPreview";
import PaymentPage from "./components/payment/PaymentPage";
import HospitalDetails from "./pages/HospitalDetailsPage";
import MedicalResults from "./pages/MedicalResults";
import Reminders from "./pages/patient/Reminders";
import Header from "./components/layout/Navbar";
import BottomMobileNav from "./components/layout/BottomMobileNav";
import ToastProviderWrapper from "./components/ui/toast-provider";
import Signin from "./pages/patient/signi";
import { ClerkProvider } from "@clerk/clerk-react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import DigiBookPage from "./pages/DigiBookPage";
import { SuccessDisplay } from "./components/SuccessDisplay";

// Create a wrapper component to handle layout
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // List of paths that should not have header and bottom nav
  const excludedPaths = [
    "/login",
    "/signup",
    "/",
    "/forgot-password",
    "/reset-password",
  ];

  const shouldShowLayout = !excludedPaths.includes(currentPath);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
function App() {
  return (
    <Router>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <LayoutWrapper>
          <Routes>
            {/* Landing page route handled by ResponsiveRouter */}
            <Route path="/" element={<ResponsiveRouter />} />
            <Route path="/onboarding" element={<DigiBookPage />} />
            <Route path="/Welcome" element={<SuccessDisplay />} />

            {/* Authentication routes */}
            <Route path="/login" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />

            {/* Patient routes */}
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/book-appointment" element={<BookAppointmentPage />} />
            <Route
              path="/book-appointment/:hospitalId"
              element={<AppointmentBookingForm />}
            />
            <Route
              path="/appointment/preview"
              element={<AppointmentPreview />}
            />
            <Route path="/appointment/payment" element={<PaymentPage />} />
            <Route path="/hospital/:id" element={<HospitalDetails />} />
            <Route path="/medical-results" element={<MedicalResults />} />
            <Route path="/reminders" element={<Reminders />} />
          </Routes>
        </LayoutWrapper>
      </ClerkProvider>
    </Router>
  );
}

export default App;
