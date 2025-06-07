import React from 'react';
import { Search, MapPin, Clock, Stethoscope, Ambulance, Pill, Microscope, Brain, HeartPulse } from "lucide-react";
import { motion } from 'framer-motion';
import heroBackground from '../../assets/bamenda.jpg';

export default function HeroSection() {
  const services = [
    { name: 'Cardiology', icon: <HeartPulse className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Pharmacy', icon: <Pill className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Neurology', icon: <Brain className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Laboratory', icon: <Microscope className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Emergency', icon: <Ambulance className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'General', icon: <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5" /> }
  ];

  return (
    <div className="w-full flex justify-center px-2 sm:px-4 pt-2 sm:pt-3 pb-6 sm:pb-10">
      <div className="relative w-full max-w-[1920px] overflow-hidden rounded-2xl sm:rounded-3xl">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 rounded-2xl sm:rounded-3xl"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/80 rounded-2xl sm:rounded-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 py-6 sm:py-8">
          <div className="text-center mb-4 sm:mb-6">
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Your Healthcare Provider
            </motion.h1>
            <motion.p 
              className="text-sm sm:text-base text-green-50 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Book appointments with top-rated doctors and healthcare facilities in your area
            </motion.p>
          </div>

          {/* Search Section */}
          <motion.div 
            className="max-w-4xl mx-auto mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-2 sm:p-3">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {/* Location Input */}
                <div className="flex-1 flex items-center bg-white/80 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mr-2 sm:mr-3" />
                  <input
                    type="text"
                    placeholder="Enter your location"
                    className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-gray-700 placeholder-gray-500"
                  />
                </div>

                {/* Search Input */}
                <div className="flex-1 flex items-center bg-white/80 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mr-2 sm:mr-3" />
                  <input
                    type="text"
                    placeholder="Search for doctors, specialties, or services"
                    className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-gray-700 placeholder-gray-500"
                  />
                </div>

                {/* Search Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-green-600 text-white rounded-xl px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  Search
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Quick Service Buttons */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {services.map((service, index) => (
                <motion.button
                  key={service.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 sm:gap-2 bg-white/90 backdrop-blur-sm text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-white/20 hover:bg-white transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {service.icon}
                  {service.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            className="mt-4 sm:mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm sm:text-base text-green-50">
              <div className="flex items-center">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                <span>24/7 Availability</span>
              </div>
              <div className="flex items-center">
                <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                <span>Expert Doctors</span>
              </div>
              <div className="flex items-center">
                <Ambulance className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                <span>Emergency Care</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}