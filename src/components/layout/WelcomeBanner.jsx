import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowRight, FiUser, FiHeart, FiActivity } from 'react-icons/fi';
import Typewriter from 'typewriter-effect';

const WelcomeBanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-xl overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      {/* Animated floating elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white bg-opacity-10"
          style={{
            width: Math.random() * 24 + 12,
            height: Math.random() * 24 + 12,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 30],
            x: [0, (Math.random() - 0.5) * 20],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Pulsing border glow */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [1, 1.01, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 border-2 border-white rounded-2xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        {/* Header with typewriter effect */}
        <div className="mb-6">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-green-100 font-medium mb-1"
          >
            Good morning
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white"
          >
            Welcome, <span className="text-yellow-200">Michael</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="h-8 text-green-100 text-base mt-1"
          >
            <Typewriter
              options={{
                strings: [
                  "Your health journey starts here",
                  "Book appointments in seconds",
                  "We're here to care for you"
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
                cursor: "▍"
              }}
            />
          </motion.div>
        </div>

        {/* Stats cards with pop animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <motion.div
            whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
            className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-xl border border-white border-opacity-10"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-400 rounded-lg">
                <FiCalendar className="text-white text-lg" />
              </div>
              <div>
                <p className="text-green-100 text-xs font-medium">Next Appointment</p>
                <p className="text-white text-sm font-semibold">Today, 2:30 PM</p>
                <p className="text-green-100 text-xs">Dr. Marie Fotso - Cardiology</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
            className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-xl border border-white border-opacity-10"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-400 rounded-lg">
                <FiUser className="text-white text-lg" />
              </div>
              <div>
                <p className="text-green-100 text-xs font-medium">Queue Position</p>
                <p className="text-white text-sm font-semibold">3rd in line</p>
                <p className="text-green-100 text-xs">Est. wait: 15-20 mins</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors duration-200"
          >
            <FiActivity className="text-lg" />
            View Health Stats
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors duration-200"
          >
            <FiHeart className="text-lg" />
            Care Plan
          </motion.button>
        </div>

        {/* Main CTA button */}
        <motion.button
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)"
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 bg-white text-green-600 px-4 py-3 rounded-xl font-semibold shadow-lg text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Book Appointment
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <FiArrowRight />
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;