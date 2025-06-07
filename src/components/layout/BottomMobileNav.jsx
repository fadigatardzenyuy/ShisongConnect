import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiCalendar, FiFileText, FiBell } from 'react-icons/fi';

const BottomMobileNav = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/dashboard',
      icon: <FiHome size={24} />,
      label: 'Home',
    },
    {
      path: '/book-appointment',
      icon: <FiCalendar size={24} />,
      label: 'Book',
    },
    {
      path: '/medical-results',
      icon: <FiFileText size={24} />,
      label: 'Medical Results',
    },
    {
      path: '/reminders',
      icon: <FiBell size={24} />,
      label: 'Reminder',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 shadow-sm z-40">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center text-sm font-medium transition-colors duration-200 group relative py-1"
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${
                  isActive ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'
                }`}
              >
                {React.cloneElement(item.icon, { size: 20 })}
              </motion.div>
              <span className={`text-xs ${isActive ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
                {item.label}
              </span>
               {isActive && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-10 bg-green-600 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomMobileNav; 