import React, { useState } from 'react';
import { motion } from 'framer-motion';
import heroBackground from '../../assets/bamenda.jpg';

function HeroSection() {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-16 px-4 mx-4 rounded-2xl"
      style={{ 
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-cyan-600/80 rounded-2xl z-0"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base font-medium mb-2 text-cyan-100"
          >
            Find & Book Hospital Services
          </motion.h3>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold mb-5 leading-tight"
          >
            Top <span className="text-cyan-200">Hospitals</span> in Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-100">
              Area
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-white/90 max-w-xl mx-auto"
          >
            Book appointments and find specialized care quickly
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <div className={`flex w-full max-w-xl bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${isFocused ? 'ring-2 ring-cyan-300' : ''}`}>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search hospitals..."
              className="flex-grow px-5 py-3 text-gray-800 placeholder-gray-400 focus:outline-none text-base rounded-l-2xl"
            />
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium flex items-center gap-2 rounded-r-2xl"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">Search</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-5 flex justify-center gap-2 flex-wrap"
        >
          {['Emergency', 'Cardiology', 'Pediatrics', 'Oncology'].map((service) => (
            <motion.button
              key={service}
              whileHover={{ y: -1 }}
              className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition-colors"
            >
              {service}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default HeroSection;