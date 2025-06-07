import React from 'react';
import { MapPin, Clock, Star, Heart, Stethoscope, Ambulance, Pill, Microscope, Brain, HeartPulse, Phone } from "lucide-react";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import bamendaPlaceholder from '../../assets/bamenda.jpg';

function ProviderCard({ hospital, isLoading, variants }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleCardClick = () => {
    if (!isLoading && hospital?.id) {
      navigate(`/hospital/${hospital.id}`);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Service icons mapping with green theme
  const serviceIcons = {
    cardiology: <HeartPulse className="w-4 h-4 text-green-600" />,
    pharmacy: <Pill className="w-4 h-4 text-green-600" />,
    neurology: <Brain className="w-4 h-4 text-green-600" />,
    laboratory: <Microscope className="w-4 h-4 text-green-600" />,
    emergency: <Ambulance className="w-4 h-4 text-green-600" />,
    default: <Stethoscope className="w-4 h-4 text-green-600" />
  };

  const getServiceIcon = (service) => {
    const lowerService = service.toLowerCase();
    for (const [key, icon] of Object.entries(serviceIcons)) {
      if (lowerService.includes(key)) return icon;
    }
    return serviceIcons.default;
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full"
      >
        <div className="relative h-48 bg-gray-200 flex items-center justify-center rounded-t-xl">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        </div>
        <div className="p-5">
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="flex gap-3 mt-4">
              <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
              <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer h-full flex flex-col transform transition-all duration-300 hover:shadow-xl"
    >
      {/* Card Header with Image */}
      <motion.div 
        className="relative h-48 bg-gradient-to-br from-gray-50 to-white"
        animate={{
          background: isHovered 
            ? ['linear-gradient(to bottom right, #f8fafc, #f1f5f9)']
            : ['linear-gradient(to bottom right, #ffffff, #f8fafc)']
        }}
        transition={{ duration: 0.3 }}
      >
        {hospital?.image ? (
          <motion.img 
            src={hospital.image} 
            alt={hospital.name} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <motion.img 
            src={bamendaPlaceholder} 
            alt={`${hospital?.name || 'Hospital'} placeholder image`} 
            className="w-full h-full object-cover opacity-80"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Availability Badge */}
        <motion.span 
          className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center z-10 shadow-md"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {hospital?.contact?.hours?.includes('24') ? 'Open 24/7' : 'Open Now'}
        </motion.span>
        
        {/* Heart Icon for Favorites */}
        <motion.button 
          className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-50"
          onClick={handleFavoriteClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            className={`w-4 h-4 transition-colors duration-300 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
            initial={{ scale: 1 }}
            animate={isFavorite ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>

      {/* Card Content */}
      <motion.div 
        className="p-5 flex-1 flex flex-col"
        animate={{ 
          backgroundColor: isHovered ? '#f8fafc' : '#ffffff' 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-4">
          <motion.h3 
            className="font-semibold text-gray-900 text-lg leading-tight"
            animate={{ color: isHovered ? '#111827' : '#111827' }}
            transition={{ duration: 0.2 }}
          >
            {hospital?.name || 'Hospital Name'}
          </motion.h3>
          <motion.div 
            className="flex items-center text-sm text-gray-700 mt-2"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <MapPin className="w-4 h-4 mr-1.5 text-gray-600" />
            {hospital?.contact?.address || 'Location not specified'}
          </motion.div>
        </div>

        {/* Rating and Hours */}
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex mr-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(hospital?.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-700">
              ({hospital?.reviews?.toLocaleString() || 0} reviews)
            </span>
          </motion.div>
          <motion.div 
            className="flex items-center text-sm text-gray-700"
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Clock className="w-4 h-4 mr-1.5 text-gray-600" />
            {hospital?.contact?.hours || 'Hours not specified'}
          </motion.div>
        </div>

        {/* Services */}
        {hospital?.services && hospital.services.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-600 mb-2">Top Services</h4>
            <div className="flex flex-wrap gap-2">
              {hospital.services.slice(0, 4).map((service, index) => (
                <motion.span
                  key={index}
                  className="flex items-center gap-1.5 bg-gray-50 text-gray-700 text-xs px-3 py-1.5 rounded-full border border-gray-200"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: '#f3f4f6',
                    borderColor: '#d1d5db'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getServiceIcon(service)}
                  <span>{service.split(' ')[0]}</span>
                </motion.span>
              ))}
              {hospital.services.length > 4 && (
                <motion.span 
                  className="bg-gray-50 text-gray-700 text-xs px-3 py-1.5 rounded-full border border-gray-200"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: '#f3f4f6',
                    borderColor: '#d1d5db'
                  }}
                >
                  +{hospital.services.length - 4} more
                </motion.span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex gap-3">
            <motion.button 
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
              whileHover={{ 
                backgroundColor: '#f3f4f6',
                borderColor: '#d1d5db',
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
            >
              View Details
            </motion.button>
            
            {/* Call Now Link */}
            <motion.a 
              href={`tel:${hospital?.contact?.phone}`} 
              className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-700"
              whileHover={{ 
                backgroundColor: '#16a34a',
                scale: 1.02 
              }}
              whileTap={{ scale: 0.98 }}
            >
              Call Now
              <Phone className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProviderCard;