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
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <FiBell className="text-blue-500 mr-2" size={18} />
          <h3 className="text-base font-medium text-gray-600">Hospital Updates</h3>
        </div>
        <button className="bg-blue-500 text-white text-xs font-medium flex items-center px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors">
          View All <FiChevronRight className="ml-1" size={12} />
        </button>
      </div>

      <div className="flex-1">
        <div className="space-y-3">
          {currentUpdates.map((update) => (
            <motion.div
              key={update.id}
              whileHover={{ scale: 1.01 }}
              className="border border-gray-100 rounded-lg p-3 hover:shadow-md transition-all cursor-pointer bg-white hover:border-blue-100"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                  {update.category}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <FiClock className="mr-1" size={12} />
                  {update.date}
                </div>
              </div>
              <h4 className="font-medium text-gray-600 mb-1 text-sm line-clamp-1">{update.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-2">{update.description}</p>
              <button className="mt-2 bg-blue-500 text-white text-xs font-medium flex items-center px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors">
                Read more <FiChevronRight className="ml-1" size={12} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`flex items-center text-xs font-medium px-3 py-1.5 rounded-md ${
            currentPage === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <FiChevronLeft className="mr-1" size={14} />
          Previous
        </button>
        <span className="text-xs text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center text-xs font-medium px-3 py-1.5 rounded-md ${
            currentPage === totalPages 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next
          <FiChevronRight className="ml-1" size={14} />
        </button>
      </div>
    </div>
  );
}

export default HealthTipsCard;