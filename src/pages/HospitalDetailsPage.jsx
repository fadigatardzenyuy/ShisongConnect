import { MapPin, Phone, Mail, Clock, ArrowRight, Calendar, Stethoscope, Ambulance, Users, Star, HeartPulse, Pill, Microscope, Brain, ChevronRight, Shield, Award, CheckCircle2 } from "lucide-react";
import { useParams, useNavigate } from 'react-router-dom';
import hospitals from '../data/hospitals.json';
import React, { useState, useEffect } from 'react';
import bamendaPlaceholder from '../assets/bamenda.jpg';
import { motion } from 'framer-motion';
import HospitalDetailsTour from '../components/Tour/HospitalDetailsTour';
import HelpAssistant from '../components/Tour/HelpAssistant';

export default function HospitalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showTour, setShowTour] = useState(false);
  const hospitalId = parseInt(id, 10);
  const hospital = hospitals.find(h => h.id === hospitalId);

  useEffect(() => {
    // Check if this is the user's first visit to the hospital details page
    const hasSeenTour = localStorage.getItem('hospitalDetailsTourCompleted');
    if (!hasSeenTour) {
      setShowTour(true);
    }
  }, []);

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hospital Not Found</h2>
          <p className="text-gray-600 mb-6">The hospital you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const handleBookAppointment = () => {
    navigate(`/book-appointment/${hospitalId}`);
  };

  // Service icons mapping with enhanced colors
  const serviceIcons = {
    cardiology: <HeartPulse className="w-5 h-5 text-rose-600" />,
    pharmacy: <Pill className="w-5 h-5 text-blue-600" />,
    neurology: <Brain className="w-5 h-5 text-purple-600" />,
    laboratory: <Microscope className="w-5 h-5 text-amber-600" />,
    emergency: <Ambulance className="w-4 h-4 text-red-600" />,
    default: <Stethoscope className="w-5 h-5 text-green-600" />
  };

  const getServiceIcon = (service) => {
    const lowerService = service.toLowerCase();
    for (const [key, icon] of Object.entries(serviceIcons)) {
      if (lowerService.includes(key)) return icon;
    }
    return serviceIcons.default;
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'appointments', label: 'Appointments' }
  ];

  const handleStartTour = (tourType) => {
    if (tourType === 'booking') {
      navigate('/book-appointment');
    } else {
      setShowTour(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HospitalDetailsTour run={showTour} />
      <HelpAssistant onStartTour={handleStartTour} />
      
      {/* Hero Section with Enhanced Design */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] hero-section">
        <div className="absolute inset-0">
          <img 
            src={hospital.image || bamendaPlaceholder} 
          alt={`${hospital.name} facility`} 
            className="w-full h-full object-cover"
          onError={(e) => {
              e.target.src = bamendaPlaceholder;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/30" />
          {/* Direction Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`https://www.google.com/maps?q=${hospital.contact.location.lat},${hospital.contact.location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-2 sm:px-5 sm:py-3 rounded-xl flex items-center gap-2 sm:gap-2.5 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 text-sm sm:text-base font-medium z-10 directions-btn"
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            <span className="hidden sm:inline">Get Directions</span>
            <span className="sm:hidden">Directions</span>
          </motion.a>
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8 sm:pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 mt-12 sm:mt-0">
              <span className="inline-flex items-center bg-green-600/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" />
                {hospital.rating} ({hospital.reviews?.toLocaleString() || 0} reviews)
              </span>
              <span className="inline-flex items-center bg-harmony-sage/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {hospital.contact.hours.includes('24') ? 'Open 24/7' : 'Open Now'}
              </span>
              <span className="inline-flex items-center bg-harmony-moss/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Accredited Facility
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">{hospital.name}</h1>
            <p className="text-base sm:text-lg md:text-xl text-green-50 max-w-3xl mb-4 sm:mb-6">{hospital.about.split('. ')[0]}.</p>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookAppointment}
                className="group flex items-center gap-2 bg-green-600 text-green-50 font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:bg-green-700 text-sm sm:text-base book-appointment-btn"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${hospital.contact.phone}`} 
                className="group flex items-center gap-2 bg-harmony-sage/10 backdrop-blur-sm text-green-50 font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-all hover:bg-harmony-sage/20 text-sm sm:text-base call-now-btn"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Call Now</span>
              </motion.a>
          </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 lg:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 tabs">
              <div className="flex overflow-x-auto scrollbar-hide">
                {tabs.map(tab => (
        <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[120px] px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium transition-all duration-300 relative whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-green-600 font-semibold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-green-600 rounded-full" />
                    )}
        </button>
                ))}
              </div>
      </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About {hospital.name}</h2>
                  <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              {hospital.about}
            </p>
            
                  {/* Key Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-gradient-to-br from-harmony-sage to-harmony-moss p-6 rounded-xl border border-harmony-sage shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white/90 p-3 rounded-lg shadow-md">
                          <Stethoscope className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Expert Care</h3>
                </div>
                <p className="text-gray-700">Our board-certified specialists provide personalized treatment plans.</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-gradient-to-br from-harmony-moss to-harmony-leaf p-6 rounded-xl border border-harmony-moss shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white/90 p-3 rounded-lg shadow-md">
                    <Ambulance className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Emergency Services</h3>
                </div>
                <p className="text-gray-700">24/7 emergency care with rapid response times.</p>
                    </motion.div>
            </div>

                  {/* Achievements */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-white p-6 rounded-xl border border-gray-100 text-center hover:border-harmony-sage transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                      <div className="w-16 h-16 bg-harmony-sage rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                        <Award className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-2">Accredited</h4>
                      <p className="text-sm text-gray-600">JCI Certified</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-white p-6 rounded-xl border border-gray-100 text-center hover:border-harmony-moss transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                      <div className="w-16 h-16 bg-harmony-moss rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                        <Users className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-2">Expert Team</h4>
                      <p className="text-sm text-gray-600">50+ Specialists</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-white p-6 rounded-xl border border-gray-100 text-center hover:border-harmony-leaf transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                      <div className="w-16 h-16 bg-harmony-leaf rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-2">Success Rate</h4>
                      <p className="text-sm text-gray-600">98% Patient Satisfaction</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'services' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hospital.services.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:border-harmony-sage transition-all duration-300 shadow-md hover:shadow-xl group"
                      >
                        <div className="mt-1 bg-harmony-sage/10 p-3 rounded-lg group-hover:bg-harmony-sage/20 transition-colors">
                        {getServiceIcon(service)}
                      </div>
                      <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors text-lg mb-1">{service}</h4>
                        <p className="text-sm text-gray-600">Comprehensive diagnostic and treatment options</p>
                      </div>
                      </motion.div>
                  ))}
                </div>
                </motion.div>
            )}

              {activeTab === 'doctors' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Specialists</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {hospital.doctors?.map((doctor, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:border-harmony-sage transition-all duration-300 shadow-md hover:shadow-xl group"
                      >
                        <div className="w-16 h-16 rounded-full bg-harmony-sage flex items-center justify-center group-hover:bg-harmony-moss transition-colors shadow-inner">
                          <Users className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors text-lg mb-1">{doctor.name}</h4>
                        <p className="text-gray-600">{doctor.specialty}</p>
                      </div>
                      </motion.div>
                  ))}
                </div>
                </motion.div>
            )}

              {activeTab === 'appointments' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointment Information</h2>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                      <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-harmony-sage to-harmony-moss p-8 rounded-xl w-full md:w-1/2 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="bg-white/90 p-4 rounded-lg shadow-md">
                            <Clock className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Hours of Operation</h3>
                  </div>
                        <ul className="space-y-4 text-gray-700">
                          <li className="flex justify-between items-center bg-white/80 p-3 rounded-lg">
                      <span>Emergency Care</span>
                            <span className="font-medium bg-harmony-sage text-green-700 px-3 py-1 rounded-full">24/7</span>
                    </li>
                          <li className="flex justify-between items-center bg-white/80 p-3 rounded-lg">
                      <span>Outpatient Services</span>
                      <span className="font-medium">Mon-Fri: 8AM-6PM</span>
                    </li>
                          <li className="flex justify-between items-center bg-white/80 p-3 rounded-lg">
                      <span>Specialty Clinics</span>
                      <span className="font-medium">By appointment</span>
                    </li>
                  </ul>
                      </motion.div>
                
                      <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-harmony-moss to-harmony-leaf p-8 rounded-xl w-full md:w-1/2 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="bg-white/90 p-4 rounded-lg shadow-md">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">What to Bring</h3>
                  </div>
                        <ul className="space-y-4 text-gray-700">
                          <li className="flex items-start gap-3 bg-white/80 p-3 rounded-lg">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Government-issued ID</span>
                    </li>
                          <li className="flex items-start gap-3 bg-white/80 p-3 rounded-lg">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Insurance card (if applicable)</span>
                    </li>
                          <li className="flex items-start gap-3 bg-white/80 p-3 rounded-lg">
                            <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>List of current medications</span>
                    </li>
                  </ul>
                      </motion.div>
                </div>
              </div>
                </motion.div>
              )}
            </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 sm:space-y-8">
          {/* Contact Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 contact-card"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Contact Us</h2>
            
              <div className="space-y-4 sm:space-y-6">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="group bg-harmony-sage/5 hover:bg-harmony-sage/10 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                    <div className="bg-harmony-sage p-2.5 sm:p-3 rounded-lg shadow-md group-hover:bg-harmony-moss transition-colors">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Phone</p>
                      <p className="font-medium text-gray-900 text-base sm:text-lg break-all">{hospital.contact.phone}</p>
                </div>
              </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="group bg-harmony-sage/5 hover:bg-harmony-sage/10 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                    <div className="bg-harmony-moss p-2.5 sm:p-3 rounded-lg shadow-md group-hover:bg-harmony-leaf transition-colors">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-medium text-gray-900 text-base sm:text-lg break-all">{hospital.contact.email}</p>
                </div>
              </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="group bg-harmony-sage/5 hover:bg-harmony-sage/10 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                    <div className="bg-harmony-leaf p-2.5 sm:p-3 rounded-lg shadow-md group-hover:bg-harmony-sage transition-colors">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Address</p>
                      <p className="font-medium text-gray-900 text-base sm:text-lg break-all">{hospital.contact.address}</p>
                </div>
                </div>
                </motion.div>
              </div>
            </motion.div>

          {/* Emergency Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-destructive/10 border border-destructive/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 emergency-card"
            >
            <div className="flex items-start">
                <div className="bg-destructive/20 p-3 sm:p-4 rounded-lg mr-3 sm:mr-4 flex-shrink-0 shadow-md">
                  <Ambulance className="w-6 h-6 sm:w-8 sm:h-8 text-destructive" />
              </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2">Emergency Contact</h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">For immediate medical assistance</p>
                <a 
                  href={`tel:${hospital.contact.phone}`} 
                    className="inline-flex items-center justify-center bg-destructive hover:bg-destructive/90 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-colors shadow-md hover:shadow-lg text-xs sm:text-sm"
                >
                  Call Emergency: {hospital.contact.phone}
                </a>
              </div>
              </div>
            </motion.div>
            </div>
          </div>

        {/* Location Card - Full Width */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 mt-6 sm:mt-8 location-card"
        >
          <div className="h-48 sm:h-64 bg-harmony-sage/10 flex flex-col items-center justify-center gap-2 sm:gap-3 p-4 sm:p-6 md:p-8">
            <MapPin className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-green-600" />
            <span className="text-gray-900 font-medium text-lg sm:text-xl">Location Map</span>
            <p className="text-gray-500 text-center text-sm sm:text-base max-w-2xl">{hospital.contact.address}</p>
            </div>
          <div className="p-4 sm:p-6 border-t border-gray-100">
            <a 
              href={`https://www.google.com/maps?q=${hospital.contact.location.lat},${hospital.contact.location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-md mx-auto bg-harmony-sage/10 hover:bg-harmony-sage/20 text-gray-900 font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl flex items-center justify-center transition-colors shadow-md hover:shadow-lg gap-2 sm:gap-3 text-sm sm:text-base"
            >
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                View on Map
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}