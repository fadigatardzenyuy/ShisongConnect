import React from 'react';
import { useState, useEffect } from "react";
import { MapPin, Clock, Star, Heart, ChevronDown, Filter } from "lucide-react";
import hospitalsData from "../../data/hospitals.json";
import ProviderCard from "./ProviderCard";
import { motion } from 'framer-motion';

export default function HealthcareProviders() {
  const [isLoading, setIsLoading] = useState(true);
  const [hospitalList, setHospitalList] = useState([]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
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
    <div className="w-full">
     

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {isLoading ? (
          // Enhanced skeleton loading with fade-in animation
          Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="relative h-48 bg-gray-200 animate-pulse rounded-t-xl"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="flex gap-3 mt-4">
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
              className="w-full"
            >
              <ProviderCard hospital={hospital} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}