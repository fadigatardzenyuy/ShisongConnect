import React, { useState } from 'react';
import { FiX, FiHelpCircle, FiChevronDown, FiChevronUp, FiPlay, FiCalendar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HelpAssistant = ({ onStartTour, onClose }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setExpandedIndex(null); // Reset expanded FAQ when closing
    }
  };

  const startBookingTour = () => {
    setIsOpen(false); // Close the help panel
    navigate('/book-appointment'); // Navigate directly to booking page
    // Small delay to ensure navigation completes
    setTimeout(() => {
      onStartTour('booking'); // Start the booking tour
    }, 100);
  };

  const helpTopics = [
    {
      question: "How do I schedule an appointment?",
      answer: "Navigate to the 'Appointments' section from the main menu. Select 'New Appointment', choose your preferred healthcare provider, available time slot, and confirm your booking. You'll receive a confirmation notification."
    },
    {
      question: "How can I view my prescriptions?",
      answer: "Your digital prescriptions are available in the 'Medical Records' section. Click on 'Prescriptions' to view current and historical medications, including dosage instructions and refill status."
    },
    {
      question: "What are health recommendations?",
      answer: "Our system provides personalized health recommendations based on your medical history, current conditions, and wellness goals. These evidence-based suggestions appear in your dashboard and are updated regularly."
    },
    {
      question: "How do I update my personal information?",
      answer: "Access your account settings by clicking your profile icon. Select 'Personal Information' to update contact details, emergency contacts, insurance information, and health preferences."
    },
    {
      question: "Is my health data secure?",
      answer: "We employ enterprise-grade security including end-to-end encryption, regular audits, and strict compliance with healthcare privacy regulations. Your data is never shared without your explicit consent."
    }
  ];

  return (
    <>
      {/* Floating Help Button */}
      <motion.button
        onClick={handleToggle}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-xl hover:bg-green-700 transition-all z-40 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Help assistant"
      >
        <AnimatePresence>
          {!isOpen ? (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 180 }}
              key="help"
            >
              <FiHelpCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotate: 180 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: -180 }}
              key="close"
            >
              <FiX className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Help Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-20 sm:top-24 bottom-24 sm:bottom-24 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-96 bg-white rounded-xl shadow-2xl overflow-hidden z-40 flex flex-col"
          >
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 sm:p-6 text-white flex-shrink-0">
              <div className="flex justify-between items-center">
                <h3 className="text-lg sm:text-xl font-semibold">Healthcare Assistant</h3>
                <button
                  onClick={handleToggle}
                  className="text-white hover:text-green-100 transition-colors"
                  aria-label="Close help"
                >
                  <FiX className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
              <p className="mt-2 text-green-100 text-sm">
                How can we assist you today?
              </p>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-grow">
              <div className="space-y-3">
                <button
                  onClick={onStartTour}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 sm:py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base font-medium"
                >
                  <FiPlay className="h-4 w-4" />
                  <span>Start Platform Tour</span>
                </button>

                <button
                  onClick={startBookingTour}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 sm:py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base font-medium"
                >
                  <FiCalendar className="h-4 w-4" />
                  <span>Start Booking Process Tour</span>
                </button>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-800 mb-4 text-base sm:text-lg">Frequently Asked Questions</h4>
                <div className="space-y-3">
                  {helpTopics.map((topic, index) => (
                    <div 
                      key={index} 
                      className="border border-gray-200 rounded-lg overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                        aria-expanded={expandedIndex === index}
                        aria-controls={`faq-${index}`}
                      >
                        <h5 className="font-medium text-gray-800 text-sm sm:text-base leading-snug">{topic.question}</h5>
                        {expandedIndex === index ? (
                          <FiChevronUp className="text-gray-500 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        ) : (
                          <FiChevronDown className="text-gray-500 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedIndex === index && (
                          <motion.div
                            id={`faq-${index}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-3 sm:p-4 pt-2 text-sm text-gray-600 bg-white leading-relaxed">
                              {topic.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 sm:px-6 py-3 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Need more help? <button className="text-green-600 hover:text-green-800 font-medium">Contact Support</button>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HelpAssistant;