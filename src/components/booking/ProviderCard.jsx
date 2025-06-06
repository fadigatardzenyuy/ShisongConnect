import React from 'react';
import { MapPin, Clock, Star, Heart, Stethoscope, Ambulance, Pill, Microscope, Brain, HeartPulse } from "lucide-react";
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

  // Service icons mapping
  const serviceIcons = {
    cardiology: <HeartPulse className="w-4 h-4 text-rose-600" />,
    pharmacy: <Pill className="w-4 h-4 text-blue-600" />,
    neurology: <Brain className="w-4 h-4 text-purple-600" />,
    laboratory: <Microscope className="w-4 h-4 text-amber-600" />,
    emergency: <Ambulance className="w-4 h-4 text-red-600" />,
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
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* Skeleton Loading Animation */}
        <div className="relative bg-gray-200 h-32 flex items-center justify-center rounded-t-xl">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="flex gap-2 mt-4">
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
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer h-full flex flex-col"
    >
      {/* Card Header with Image */}
      <motion.div 
        className="relative h-40 bg-gradient-to-br from-blue-50 to-gray-100"
        animate={{
          background: isHovered 
            ? ['linear-gradient(to bottom right, #f0f9ff, #e0f2fe)']
            : ['linear-gradient(to bottom right, #f8fafc, #f1f5f9)']
        }}
        transition={{ duration: 0.3 }}
      >
        {hospital?.image ? (
          <img 
            src={hospital.image} 
            alt={hospital.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src={bamendaPlaceholder} 
            alt={`${hospital?.name || 'Hospital'} placeholder image`} 
            className="w-full h-full object-cover opacity-70"
          />
        )}

        {/* Availability Badge */}
        <motion.span 
          className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center z-10"
          whileHover={{ scale: 1.05 }}
        >
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {hospital?.contact?.hours?.includes('24') ? 'Open 24/7' : 'Open Now'}
        </motion.span>
        
        {/* Heart Icon for Favorites */}
        <motion.button 
          className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-sm z-10"
          onClick={handleFavoriteClick}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            className={`w-4 h-4 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
            initial={{ scale: 1 }}
            animate={isFavorite ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
        
        {/* Subtle background animation */}
        <motion.div 
          className="absolute inset-0 bg-blue-400 opacity-0"
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Card Content */}
      <motion.div 
        className="p-4 flex-1 flex flex-col"
        animate={{ 
          backgroundColor: isHovered ? '#f8fafc' : '#ffffff' 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-3">
          <motion.h3 
            className="font-semibold text-gray-900 text-lg leading-tight"
            animate={{ color: isHovered ? '#3b82f6' : '#111827' }}
            transition={{ duration: 0.2 }}
          >
            {hospital?.name || 'Hospital Name'}
          </motion.h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <MapPin className="w-4 h-4 mr-1.5 text-gray-500" />
            {hospital?.contact?.address || 'Location not specified'}
          </div>
        </div>

        {/* Rating and Hours */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex mr-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(hospital?.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({hospital?.reviews?.toLocaleString() || 0} reviews)
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1.5 text-gray-500" />
            {hospital?.contact?.hours || 'Hours not specified'}
          </div>
        </div>

        {/* Services */}
        {hospital?.services && hospital.services.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-500 mb-2">Top Services</h4>
            <div className="flex flex-wrap gap-2">
              {hospital.services.slice(0, 4).map((service, index) => (
                <motion.span
                  key={index}
                  className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getServiceIcon(service)}
                  <span>{service.split(' ')[0]}</span>
                </motion.span>
              ))}
              {hospital.services.length > 4 && (
                <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">
                  +{hospital.services.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex gap-2">
            <motion.button 
              className="flex-1 px-3 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium"
              whileHover={{ 
                backgroundColor: '#f3f4f6',
                borderColor: '#d1d5db'
              }}
              whileTap={{ scale: 0.98 }}
            >
              View Details
            </motion.button>
            
            {/* Call Now Link */}
            <motion.a 
              href={`tel:${hospital?.contact?.phone}`} 
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1"
              whileHover={{ 
                backgroundColor: '#2563eb',
                scale: 1.02 
              }}
              whileTap={{ scale: 0.98 }}
            >
              Call Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProviderCard;