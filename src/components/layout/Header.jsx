import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiCalendar, FiFileText, FiBell, FiUser, FiSettings, FiHelpCircle, FiLogOut, FiMapPin, FiChevronDown, FiSearch } from 'react-icons/fi';

const ProfileDropdown = ({ isOpen, onClose }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div 
      ref={dropdownRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute left-0 top-full mt-2 w-72 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transform origin-top-left transition-all duration-200 ease-out z-50"
    >
      {/* User Info Section */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium text-lg">
            JN
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">John Ngono</p>
            <p className="text-xs text-gray-500">john.ngono@example.com</p>
          </div>
        </div>
      </div>

      <div className="py-2" role="menu" aria-orientation="vertical">
        <Link
          to="/profile"
          className="flex items-center px-4 py-3 text-base text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          role="menuitem"
        >
          <FiUser className="h-6 w-6 mr-3 text-gray-400" />
          Your Profile
        </Link>
        <Link
          to="/settings"
          className="flex items-center px-4 py-3 text-base text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          role="menuitem"
        >
          <FiSettings className="h-6 w-6 mr-3 text-gray-400" />
          Settings
        </Link>
        <Link
          to="/help"
          className="flex items-center px-4 py-3 text-base text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          role="menuitem"
        >
          <FiHelpCircle className="h-6 w-6 mr-3 text-gray-400" />
          Help Center
        </Link>
        <div className="border-t border-gray-100 my-1"></div>
        <button
          onClick={() => {
            // Add logout logic here
            console.log('Logout clicked');
          }}
          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-gray-50 transition-colors duration-200"
          role="menuitem"
        >
          <FiLogOut className="h-5 w-5 mr-3 text-red-400" />
          Sign out
        </button>
      </div>
    </motion.div>
  );
};

const Header = () => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Profile Avatar (Left for Mobile) */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:bg-gray-50 transition-colors duration-200 p-1"
            >
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium text-xs">
                JN
              </div>
            </button>
            <AnimatePresence>
              {isProfileOpen && (
                <ProfileDropdown 
                  isOpen={isProfileOpen} 
                  onClose={() => setIsProfileOpen(false)} 
                />
              )}
            </AnimatePresence>
          </div>

          {/* Logo (Center for Mobile, Left for Desktop) */}
          <div className="flex-grow md:flex-grow-0 flex items-center justify-center md:justify-start">
            <Link to="/" className="flex items-center group">
              {/* Logo Icon */}
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white transform transition-transform duration-200 group-hover:scale-105">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              {/* Logo Text */}
              <div className="ml-2 md:ml-3">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">SHICo</span>
                <span className="hidden md:block text-sm text-gray-500">Shisong Connect</span>
              </div>
            </Link>
          </div>

          {/* Settings Button (Right for Mobile) */}
          <div className="flex items-center md:hidden">
            <Link
              to="/settings"
              className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              <FiSettings className="h-6 w-6" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            <Link
              to="/dashboard"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                location.pathname === '/dashboard'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <FiHome className="h-6 w-6" />
              <span className="ml-2">Home</span>
            </Link>
            <Link
              to="/book-appointment"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                location.pathname === '/book-appointment'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <FiCalendar className="h-6 w-6" />
              <span className="ml-2">Book</span>
            </Link>
            <Link
              to="/medical-results"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                location.pathname === '/medical-results'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <FiFileText className="h-6 w-6" />
              <span className="ml-2">Medical Results</span>
            </Link>
            <Link
              to="/reminders"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                location.pathname === '/reminders'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <FiBell className="h-6 w-6" />
              <span className="ml-2">Reminder</span>
            </Link>
          </nav>

          {/* Desktop Right Side Elements */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Location Selector */}
            <div className="flex items-center text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200">
              <FiMapPin className="h-6 w-6 mr-1" />
              <span className="text-base font-medium">Shisong, CM</span>
            </div>

            {/* Notification Bell */}
            <button className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 relative transition-colors duration-200">
              <span className="sr-only">View notifications</span>
              <FiBell className="h-6 w-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* User Profile Dropdown */}
            <div className="ml-4 flex items-center relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:bg-gray-50 transition-colors duration-200 p-2"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium text-xs">
                  JN
                </div>
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <ProfileDropdown 
                    isOpen={isProfileOpen} 
                    onClose={() => setIsProfileOpen(false)} 
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;