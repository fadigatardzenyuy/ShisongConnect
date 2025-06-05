import React from 'react';
import { FiCalendar, FiFileText, FiBell, FiChevronRight, FiClock, FiMapPin, FiMessageSquare, FiDownload, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const QuickActionsCard = () => {
  const quickActions = [
    {
      id: 1,
      title: "My Queue Status",
      description: "Check your waiting position",
      icon: <FiClock size={18} />,
      bgColor: "bg-indigo-600",
      hoverColor: "hover:bg-indigo-700",
      textColor: "text-white",
      isPrimary: true
    },
    {
      id: 2,
      title: "Book Visit",
      description: "Schedule your appointment",
      icon: <FiCalendar size={18} />,
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
      textColor: "text-gray-800"
    },
    {
      id: 3,
      title: "My Records",
      description: "View your medical history",
      icon: <FiFileText size={18} />,
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
      textColor: "text-gray-800"
    },
    {
      id: 4,
      title: "Department Hours",
      description: "Check opening times",
      icon: <FiClock size={18} />,
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
      textColor: "text-gray-800"
    },
    {
      id: 5,
      title: "Get Help",
      description: "Contact support team",
      icon: <FiMessageSquare size={18} />,
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
      textColor: "text-gray-800"
    },
    {
      id: 6,
      title: "My Reports",
      description: "Download your documents",
      icon: <FiDownload size={18} />,
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
      textColor: "text-gray-800"
    }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-800">Quick Actions</h3>
        <span className="text-sm text-gray-500">6 actions available</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {quickActions.map((action) => (
          <motion.button
            key={action.id}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-between w-full px-3 py-2.5 ${action.bgColor} ${action.hoverColor} ${action.textColor} rounded-md transition-colors duration-150`}
          >
            <div className="flex items-center">
              <span className={`mr-3 ${action.isPrimary ? 'text-white' : 'text-gray-600'}`}>
                {action.icon}
              </span>
              <div className="text-left">
                <div className="font-medium text-sm">{action.title}</div>
                <div className={`text-xs ${action.isPrimary ? 'text-indigo-100' : 'text-gray-500'}`}>
                  {action.description}
                </div>
              </div>
            </div>
            <FiChevronRight size={16} className={action.isPrimary ? 'text-indigo-200' : 'text-gray-400'} />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;