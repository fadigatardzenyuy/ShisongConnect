import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowRight, FiUser } from 'react-icons/fi';
import Typewriter from 'typewriter-effect';

const WelcomeBanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-2xl overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white bg-opacity-10"
          style={{
            width: Math.random() * 20 + 10,
            height: Math.random() * 20 + 10,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 40],
            x: [0, (Math.random() - 0.5) * 30],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
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
              opacity: [0, 0.4, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 border-2 border-white rounded-2xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        {/* Header with typewriter effect */}
        <div className="mb-4">
          <p className="text-indigo-200 font-medium mb-1">Good morning</p>
          <h1 className="text-3xl font-bold text-white">
            Welcome, <span className="text-yellow-300">Michael</span>
          </h1>
          <div className="h-8 text-indigo-100 text-base mt-1">
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
          </div>
        </div>

        {/* Stats cards with pop animation */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <motion.div
            whileHover={{ y: -2 }}
            className="bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-xl"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <FiCalendar className="text-white text-lg" />
              </div>
              <div>
                <p className="text-indigo-200 text-xs">Next Appointment</p>
                <p className="text-white text-sm font-medium">Today, 2:30 PM</p>
                <p className="text-indigo-200 text-xs">Dr. Marie Fotso - Cardiology</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            className="bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-xl"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-500 rounded-lg">
                <FiUser className="text-white text-lg" />
              </div>
              <div>
                <p className="text-indigo-200 text-xs">Queue Position</p>
                <p className="text-white text-sm font-medium">3rd in line</p>
                <p className="text-indigo-200 text-xs">Est. wait: 15-20 mins</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated CTA button */}
        <motion.button
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 8px 20px rgba(255, 255, 255, 0.1)"
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-xl font-semibold shadow-lg text-sm"
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