import React, { useState } from 'react';
import { FiBell, FiChevronRight, FiClock, FiChevronLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

const HealthTipsCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const updates = [
    {
      id: 1,
      title: "New Vaccination Drive",
      description: "Free measles vaccination campaign for children under 5 at all regional hospitals this Saturday",
      date: "2 hours ago",
      category: "Program"
    },
    {
      id: 2,
      title: "Malaria Prevention Workshop",
      description: "Join our free community workshop on malaria prevention techniques this rainy season",
      date: "1 day ago",
      category: "Event"
    },
    {
      id: 3,
      title: "Extended Cardiology Hours",
      description: "Cardiology department now open until 8pm every weekday at Central Hospital Yaoundé",
      date: "3 days ago",
      category: "Service Update"
    },
    {
      id: 4,
      title: "New Maternity Wing",
      description: "State-of-the-art maternity wing now open at Douala General Hospital with 24/7 specialist care",
      date: "1 week ago",
      category: "Facility Update"
    },
    {
      id: 5,
      title: "Diabetes Screening Day",
      description: "Free blood sugar tests and consultations available this Friday at all participating clinics",
      date: "2 weeks ago",
      category: "Program"
    }
  ];

  const totalPages = Math.ceil(updates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUpdates = updates.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <div className="p-2 bg-green-50 rounded-lg mr-2">
            <FiBell className="text-green-600" size={20} />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Hospital Updates</h3>
        </div>
        <motion.button 
          whileHover={{ scale: 1.04 }}
          className="bg-green-500 text-white text-sm sm:text-base font-medium flex items-center px-4 py-2 rounded-xl shadow-sm hover:bg-green-600 transition-colors"
        >
          View All <FiChevronRight className="ml-1" size={14} />
        </motion.button>
      </div>

      <div className="flex-1">
        <div className="space-y-4">
          {currentUpdates.map((update, idx) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.015, boxShadow: "0 4px 16px rgba(16, 185, 129, 0.08)" }}
              className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer bg-white hover:border-green-200"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm sm:text-base font-medium px-2 py-1 bg-green-50 text-green-600 rounded-full">
                  {update.category}
                </span>
                <div className="flex items-center text-xs sm:text-sm text-gray-500">
                  <FiClock className="mr-1" size={12} />
                  {update.date}
                </div>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1 text-base sm:text-lg line-clamp-1">{update.title}</h4>
              <p className="text-sm text-gray-500 line-clamp-2">{update.description}</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="mt-3 bg-green-100 text-green-700 text-sm font-medium flex items-center px-3 py-1.5 rounded-lg hover:bg-green-200 transition-colors"
              >
                Read more <FiChevronRight className="ml-1" size={12} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
        <motion.button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center text-sm font-medium px-4 py-2 rounded-xl transition-colors shadow-sm ${
            currentPage === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          <FiChevronLeft className="mr-1" size={14} />
          Previous
        </motion.button>
        <span className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <motion.button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center text-sm font-medium px-4 py-2 rounded-xl transition-colors shadow-sm ${
            currentPage === totalPages 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          Next
          <FiChevronRight className="ml-1" size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default HealthTipsCard;