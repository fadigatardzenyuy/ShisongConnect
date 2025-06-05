import React from 'react';
import { 
  FiCalendar, 
  FiMapPin, 
  FiPhone, 
  FiChevronRight,
  FiClock,
  FiPlus
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const MyAppointmentsCard = () => {
  const appointments = [
    {
      id: 1,
      initials: "MF",
      bgColor: "bg-blue-600",
      name: "Dr. Marie Fotso",
      specialty: "Cardiology",
      hospital: "Central Hospital Yaoundé",
      date: "Today 2:30 PM",
      position: "Position 3",
      status: "Confirmed",
      statusColor: "text-green-600",
      waitTime: "Wait: 45 min"
    },
    {
      id: 2,
      initials: "PM",
      bgColor: "bg-purple-600",
      name: "Dr. Paul Mbarga",
      specialty: "General Medicine",
      hospital: "Pasteur Clinic Douala",
      date: "Tomorrow 9:00 AM",
      position: "Position 1",
      status: "Confirmed",
      statusColor: "text-green-600",
      waitTime: "Wait: 15 min"
    }
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <FiCalendar className="mr-2 text-blue-600" size={18} />
          My Appointments
        </h3>
        <motion.a 
          href="#"
          whileHover={{ x: 2 }}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
        >
          View All <FiChevronRight className="ml-1" size={16} />
        </motion.a>
      </div>
      
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <motion.div 
            key={appointment.id}
            whileHover={{ y: -2 }}
            className="flex items-start p-3 rounded-lg border border-gray-100 hover:shadow-xs transition-all"
          >
            <div className={`w-9 h-9 ${appointment.bgColor} rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 mt-1`}>
              {appointment.initials}
            </div>
            
            <div className="flex-grow">
              <div className="font-medium text-gray-800">
                {appointment.name} 
                <span className="text-sm text-gray-500 font-normal ml-2">
                  {appointment.specialty}
                </span>
              </div>
              <div className="text-sm text-gray-600 mt-1">{appointment.hospital}</div>
              
              <div className="flex flex-wrap items-center mt-2 text-sm text-gray-500 gap-y-1">
                <div className="flex items-center mr-4">
                  <FiClock className="mr-1" size={14} />
                  {appointment.date}
                </div>
                <div className="flex items-center">
                  <FiMapPin className="mr-1" size={14} />
                  {appointment.position}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end ml-2">
              <span className={`text-xs font-medium ${appointment.statusColor}`}>
                {appointment.status}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                {appointment.waitTime}
              </span>
              
              <div className="flex space-x-3 mt-3">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded-md text-xs font-medium flex items-center transition-colors"
                >
                  <FiPhone className="mr-1" size={14} /> Call
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-700 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-md text-xs font-medium flex items-center transition-colors"
                >
                  <FiMapPin className="mr-1" size={14} /> Directions
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center justify-center transition-colors"
      >
        <FiPlus className="mr-2" size={16} />
        Book New Appointment
      </motion.button>
    </div>
  );
};

export default MyAppointmentsCard;