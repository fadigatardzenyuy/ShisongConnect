import { useState, useEffect } from "react";
import { MapPin, Clock, Star, Heart, ChevronDown, Filter } from "lucide-react";
import hospitalsData from "../../data/hospitals.json";
import ProviderCard from "./ProviderCard";
import { motion } from 'framer-motion';

export default function HealthcareProviders() {
  const [isLoading, setIsLoading] = useState(true);
  const [hospitalList, setHospitalList] = useState([]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        mass: 0.5
      }
    },
    hover: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHospitalList(hospitalsData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {isLoading ? (
          // Enhanced skeleton loading with fade-in animation
          Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="relative h-40 bg-gray-200 animate-pulse rounded-t-xl"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="flex gap-2 mt-4">
                  <div className="h-10 bg-gray-200 rounded-lg flex-1 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded-lg flex-1 animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          hospitalList.map((hospital, index) => (
            <motion.div
              key={hospital.id}
              variants={itemVariants}
              whileHover="hover"
              custom={index} // Pass index for custom stagger
            >
              <ProviderCard 
                hospital={hospital}
                isLoading={false}
              />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}