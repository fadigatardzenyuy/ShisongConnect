// components/DigibookForm.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { allSchemas } from "../utils/Validation";
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  Activity,
  Shield,
  CheckCircle,
} from "lucide-react";

// UI and Step Components
import { ProgressBar } from "./ProgressBar";
import { SuccessDisplay } from "./SuccessDisplay";

// Import all 7 step components
import { Step1_Personal } from "./steps/Step1_Personal";
import { Step2_Emergency } from "./steps/Step2_Emergency";
import { Step3_MedicalHistory } from "./steps/Step3_MedicalHistory";
import { Step4_CurrentHealth } from "./steps/Step4_CurrentHealth";
import { Step5_Preferences } from "./steps/Step5_Preferences";
import { Step6_Insurance } from "./steps/Step6_Insurance";
import { Step7_Consent } from "./steps/Step7_Consent";

const TOTAL_STEPS = 7;

// Helper function to split comma-separated strings into a clean array
const stringToArray = (str) => {
  if (!str) return undefined;
  return str
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

export const DigibookForm = ({ userId }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  // Dynamically get the validation schema for the current step
  const currentSchema = useMemo(
    () => allSchemas[currentStep - 1],
    [currentStep]
  );

  const methods = useForm({
    resolver: zodResolver(currentSchema),
    mode: "onChange",
  });

  const { trigger, getValues } = methods;

  const processStep = async () => {
    setIsLoading(true);
    setFormError(null);
    const formData = getValues();
    let updateData = {};

    // Map form data to your storage structure for EACH step
    const data = formData;

    if (currentStep === 1) {
      updateData = {
        full_name: data.full_name,
        date_of_birth: data.date_of_birth,
        gender: data.gender,
        phone_number: data.phone_number,
        home_address: data.home_address,
        next_of_kin: {
          name: data.next_of_kin_name,
          relationship: data.next_of_kin_relationship,
          phone: data.next_of_kin_phone,
        },
      };
    } else if (currentStep === 2) {
      updateData = {
        emergency_contact: {
          name: data.emergency_contact_name,
          phone: data.emergency_contact_phone,
          relationship: data.emergency_contact_relationship,
        },
        blood_type: data.blood_type,
        allergies: stringToArray(data.allergies),
        existing_conditions: stringToArray(data.existing_conditions),
      };
    } else if (currentStep === 3) {
      updateData = {
        medical_history: {
          past_visits: data.past_hospital_visits,
          surgeries: data.surgeries,
          family_history: data.family_medical_history,
        },
      };
    } else if (currentStep === 4) {
      updateData = {
        current_medications_text: data.current_medications,
        primary_doctor: {
          name: data.primary_doctor_name,
          contact: data.primary_doctor_contact,
        },
      };
    } else if (currentStep === 5) {
      updateData = {
        preferred_hospital: data.preferred_hospital,
        preferred_language: data.preferred_language,
        preferred_department: data.preferred_department,
        accessibility_needs: stringToArray(data.accessibility_needs),
      };
    } else if (currentStep === 6) {
      updateData = {
        insurance_provider: data.insurance_provider,
        insurance_policy_number: data.insurance_policy_number,
        insurance_contact_info: data.insurance_contact_info,
      };
    } else if (currentStep === 7) {
      updateData = {
        consent_share_records: data.consent_share_records,
        consent_notifications: data.consent_notifications,
        consent_emergency_access: data.consent_emergency_access,
      };
    }

    try {
      // Get existing data from localStorage or initialize empty object
      const existingData = JSON.parse(
        localStorage.getItem("digibookData") || "{}"
      );

      // Merge new data with existing data
      const updatedData = {
        ...existingData,
        ...updateData,
      };

      // Save to localStorage
      localStorage.setItem("digibookData", JSON.stringify(updatedData));

      // Logic to move to the next step or finish
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // Final step: mark onboarding as complete
        const finalData = {
          ...updatedData,
          onboarding_complete: true,
          completed_at: new Date().toISOString(),
        };
        localStorage.setItem("digibookData", JSON.stringify(finalData));
        setCurrentStep((prev) => prev + 1);
        setTimeout(() => navigate("/Welcome"), 3000);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setFormError("Could not save your information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Triggers validation and then processes the step data
  const handleNext = async () => {
    try {
      const isStepValid = await trigger();
      if (isStepValid) {
        await processStep();
      } else {
        // Get the current step's validation errors
        const errors = methods.formState.errors;
        console.log("Validation errors:", errors);

        // Set a more specific error message
        if (currentStep === 5 && errors.preferred_language) {
          setFormError("Please select your preferred language to continue.");
        } else {
          setFormError("Please fill in all required fields correctly.");
        }
      }
    } catch (error) {
      console.error("Error in handleNext:", error);
      setFormError("An error occurred. Please try again.");
    }
  };

  // Moves to the previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setFormError(null);
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Renders the correct step component based on the current step number
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1_Personal />;
      case 2:
        return <Step2_Emergency />;
      case 3:
        return <Step3_MedicalHistory />;
      case 4:
        return <Step4_CurrentHealth />;
      case 5:
        return <Step5_Preferences />;
      case 6:
        return <Step6_Insurance />;
      case 7:
        return <Step7_Consent />;
      default:
        return <Step1_Personal />;
    }
  };

  // Get step titles for better UX
  const getStepTitle = () => {
    const titles = [
      "Personal Information",
      "Emergency Contacts",
      "Medical History",
      "Current Health Status",
      "Care Preferences",
      "Insurance Information",
      "Consent & Privacy",
    ];
    return titles[currentStep - 1];
  };

  // Get step descriptions
  const getStepDescription = () => {
    const descriptions = [
      "Help us get to know you better",
      "Who should we contact in emergencies?",
      "Tell us about your medical background",
      "Current medications and health status",
      "Your healthcare preferences and needs",
      "Insurance and billing information",
      "Privacy settings and data sharing consent",
    ];
    return descriptions[currentStep - 1];
  };

  // If we are past the last step, show the success message
  if (currentStep > TOTAL_STEPS) {
    return <SuccessDisplay />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating medical icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-20 left-10 w-4 h-4 text-emerald-400/20 animate-bounce" />
        <Activity className="absolute top-40 right-16 w-5 h-5 text-green-400/20 animate-pulse" />
        <Shield className="absolute bottom-40 left-8 w-4 h-4 text-teal-400/20 animate-bounce delay-1000" />
      </div>

      <div className="relative z-10 w-full px-4 py-6 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full border border-emerald-500/30 backdrop-blur-sm mb-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 font-medium text-sm">
              Digital Health Setup
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {getStepTitle()}
          </h1>
          <p className="text-gray-300 text-base mb-6">{getStepDescription()}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-emerald-400 font-semibold">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <span className="text-gray-400 text-sm">
              {Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete
            </span>
          </div>

          <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Form Container */}
        <FormProvider {...methods}>
          <div className="space-y-6">
            {/* Step Content */}
            <div className="min-h-[400px] w-full">{renderStep()}</div>

            {/* Error Display */}
            {formError && (
              <div className="max-w-4xl mx-auto p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-red-300 font-medium">{formError}</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-700/50">
              <button
                onClick={handleBack}
                disabled={currentStep === 1 || isLoading}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700/60 to-slate-700/60 text-white font-medium rounded-xl border border-gray-600/50 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed hover:from-gray-600/60 hover:to-slate-600/60 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={isLoading}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {currentStep === TOTAL_STEPS
                        ? "Finish Setup"
                        : "Continue"}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </FormProvider>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-gray-300 text-sm">Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-gray-300 text-sm">HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
