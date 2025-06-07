import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';

const bgImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      type: 'spring',
      stiffness: 60,
    },
  }),
};

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden">
      {/* Background Image */}
      <img
        src={bgImage}
        alt="Hospital background"
        className="fixed inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-10" />

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Column - Hero */}
            <motion.div
              className="space-y-8"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={1}
            >
              <div className="space-y-4">
                <span className="px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-medium">
                  Shisong Connect (SHICO)
                </span>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                  Your Health Journey,{' '}
                  <span className="text-white">Simplified</span>
                </h1>
                <p className="text-lg text-white/90 max-w-xl font-normal">
                  Experience seamless healthcare management with our patient-centric platform. 
                  Your health, your way.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button className="btn-primary w-full sm:w-auto">Create Account</Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button className="btn-secondary w-full sm:w-auto">Sign In</Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-white/30"></div>
                  ))}
                </div>
                <p className="text-sm text-white/80">
                  <span className="font-semibold text-white">10,000+</span> patients already joined
                </p>
              </div>
            </motion.div>

            {/* Right Column - Features */}
            <motion.div
              className="relative space-y-6"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={2}
            >
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-sm border border-white/20 hover:shadow-md hover:border-white/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Smart Scheduling</h3>
                    <p className="text-white/80">
                      Book appointments instantly with real-time availability
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-sm border border-white/20 hover:shadow-md hover:border-white/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Digital Health Records</h3>
                    <p className="text-white/80">
                      Secure access to your complete medical history
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-sm border border-white/20 hover:shadow-md hover:border-white/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Intelligent Reminders</h3>
                    <p className="text-white/80">
                      Personalized notifications for appointments and medications
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20 border-t border-white/10 py-4 w-full bg-gradient-to-t from-black/80 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-sm text-white/70">
            Trusted by leading healthcare providers
          </p>
          <div className="flex items-center gap-8">
            <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 