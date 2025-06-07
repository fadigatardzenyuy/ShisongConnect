import React from 'react';
import { 
  FiCalendar, 
  FiMapPin, 
  FiPhone, 
  FiChevronRight,
  FiClock,
  FiPlus,
  FiAlertCircle
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const MyAppointmentsCard = () => {
  const appointments = [
    {
      id: 1,
      initials: "MF",
      bgColor: "bg-green-500",
      name: "Dr. Marie Fotso",
      specialty: "Cardiology",
      hospital: "Central Hospital Yaoundé",
      date: "Today 2:30 PM",
      position: "Position 3",
      status: "Confirmed",
      statusColor: "text-green-600",
      waitTime: "Wait: 45 min",
      isUrgent: true
    },
    {
      id: 2,
      initials: "PM",
      bgColor: "bg-green-600",
      name: "Dr. Paul Mbarga",
      specialty: "General Medicine",
      hospital: "Pasteur Clinic Douala",
      date: "Tomorrow 9:00 AM",
      position: "Position 1",
      status: "Confirmed",
      statusColor: "text-green-600",
      waitTime: "Wait: 15 min",
      isUrgent: false
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center">
            <div className="p-2 bg-green-50 rounded-lg mr-3">
              <FiCalendar className="text-green-600" size={24} />
            </div>
            My Appointments
          </h3>
          <p className="text-base sm:text-lg text-gray-500 mt-1">Manage your upcoming visits</p>
        </div>
        <motion.a 
          href="#"
          whileHover={{ x: 2 }}
          className="text-green-600 hover:text-green-700 text-base sm:text-lg font-medium flex items-center transition-colors"
        >
          View All <FiChevronRight className="ml-1" size={20} />
        </motion.a>
      </div>
      
      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <motion.div 
            key={appointment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              y: -2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
            }}
            className="flex flex-col sm:flex-row items-start sm:items-stretch p-4 rounded-xl border border-gray-100 hover:border-green-100 transition-all gap-3 sm:gap-0"
          >
            <div className={`w-10 h-10 ${appointment.bgColor} rounded-xl flex items-center justify-center text-white text-sm font-semibold mr-0 sm:mr-4 mt-1 sm:mt-1 mb-2 sm:mb-0`}>
              {appointment.initials}
            </div>
            <div className="flex-grow w-full">
              <div className="flex flex-wrap items-center gap-2">
                <div className="font-medium text-lg sm:text-xl text-gray-800">
                  {appointment.name}
                </div>
                {appointment.isUrgent && (
                  <span className="px-2 py-0.5 bg-red-50 text-red-600 text-sm font-medium rounded-full flex items-center">
                    <FiAlertCircle className="mr-1" size={14} />
                    Urgent
                  </span>
                )}
              </div>
              <div className="text-base sm:text-lg text-gray-500 mt-0.5">{appointment.specialty}</div>
              <div className="text-base sm:text-lg text-gray-600 mt-1">{appointment.hospital}</div>
              <div className="flex flex-wrap items-center mt-2 text-base sm:text-lg text-gray-500 gap-y-1">
                <div className="flex items-center mr-4">
                  <div className="p-1 bg-gray-50 rounded mr-1.5">
                    <FiClock size={16} className="text-gray-600" />
                  </div>
                  {appointment.date}
                </div>
                <div className="flex items-center">
                  <div className="p-1 bg-gray-50 rounded mr-1.5">
                    <FiMapPin size={16} className="text-gray-600" />
                  </div>
                  {appointment.position}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-full sm:w-auto mt-3 sm:mt-0 sm:ml-4">
              <span className={`text-sm sm:text-base font-medium px-2 py-1 rounded-full w-fit ${
                appointment.statusColor === 'text-green-600' 
                  ? 'bg-green-50 text-green-600' 
                  : 'bg-gray-50 text-gray-600'
              }`}>
                {appointment.status}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 mt-2">
                {appointment.waitTime}
              </span>
              <div className="flex flex-col sm:flex-row gap-2 mt-3 w-full">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="text-white bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-lg text-sm sm:text-base font-medium flex items-center justify-center transition-colors w-full sm:w-auto"
                >
                  <FiPhone className="mr-1.5" size={16} /> Call
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-700 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg text-sm sm:text-base font-medium flex items-center justify-center transition-colors w-full sm:w-auto"
                >
                  <FiMapPin className="mr-1.5" size={16} /> Directions
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-base sm:text-lg font-medium flex items-center justify-center transition-colors shadow-sm"
      >
        <FiPlus className="mr-2" size={20} />
        Book New Appointment
      </motion.button>
    </motion.div>
  );
};

export default MyAppointmentsCard;