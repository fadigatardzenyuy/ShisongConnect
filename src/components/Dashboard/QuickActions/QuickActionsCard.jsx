import React from 'react';
import { FiCalendar, FiFileText, FiBell, FiChevronRight, FiClock, FiMapPin, FiMessageSquare, FiDownload, FiHeart, FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';

const QuickActionsCard = () => {
  const quickActions = [
    {
      id: 1,
      title: "My Queue Status",
      description: "Check your waiting position",
      icon: <FiClock size={24} />,
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      textColor: "text-white",
      isPrimary: true
    },
    {
      id: 2,
      title: "Book Visit",
      description: "Schedule your appointment",
      icon: <FiCalendar size={24} />,
      bgColor: "bg-white",
      hoverColor: "hover:bg-gray-50",
      textColor: "text-gray-800",
      borderColor: "border-gray-100"
    },
    {
      id: 3,
      title: "My Records",
      description: "View your medical history",
      icon: <FiFileText size={24} />,
      bgColor: "bg-white",
      hoverColor: "hover:bg-gray-50",
      textColor: "text-gray-800",
      borderColor: "border-gray-100"
    },
    {
      id: 4,
      title: "Department Hours",
      description: "Check opening times",
      icon: <FiClock size={24} />,
      bgColor: "bg-white",
      hoverColor: "hover:bg-gray-50",
      textColor: "text-gray-800",
      borderColor: "border-gray-100"
    },
    {
      id: 5,
      title: "Get Help",
      description: "Contact support team",
      icon: <FiMessageSquare size={24} />,
      bgColor: "bg-white",
      hoverColor: "hover:bg-gray-50",
      textColor: "text-gray-800",
      borderColor: "border-gray-100"
    },
    {
      id: 6,
      title: "My Reports",
      description: "Download your documents",
      icon: <FiDownload size={24} />,
      bgColor: "bg-white",
      hoverColor: "hover:bg-gray-50",
      textColor: "text-gray-800",
      borderColor: "border-gray-100"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Quick Actions</h3>
          <p className="text-sm sm:text-base text-gray-500 mt-0.5">Access your most used features</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-green-50 text-green-600 text-xs sm:text-sm font-medium rounded-full">
            6 actions
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              y: -2,
              boxShadow: action.isPrimary 
                ? "0 4px 12px rgba(34, 197, 94, 0.2)"
                : "0 4px 12px rgba(0, 0, 0, 0.05)"
            }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-between w-full px-4 py-3.5 ${
              action.bgColor
            } ${
              action.hoverColor
            } ${
              action.textColor
            } rounded-xl transition-all duration-200 ${
              !action.isPrimary ? 'border ' + action.borderColor : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                action.isPrimary 
                  ? 'bg-green-400 bg-opacity-20' 
                  : 'bg-gray-50'
              }`}>
                <span className={action.isPrimary ? 'text-white' : 'text-gray-600'}>
                  {action.icon}
                </span>
              </div>
              <div className="text-left">
                <div className="font-medium text-base sm:text-lg">{action.title}</div>
                <div className={`text-xs sm:text-sm ${
                  action.isPrimary ? 'text-green-100' : 'text-gray-500'
                }`}>
                  {action.description}
                </div>
              </div>
            </div>
            <FiChevronRight 
              size={20} 
              className={`${
                action.isPrimary ? 'text-green-200' : 'text-gray-400'
              } transition-transform duration-200 group-hover:translate-x-1`} 
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActionsCard;