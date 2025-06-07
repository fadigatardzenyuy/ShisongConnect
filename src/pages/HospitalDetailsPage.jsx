import { MapPin, Phone, Mail, Clock, ArrowRight, Calendar, Stethoscope, Ambulance, Users, Star, HeartPulse, Pill, Microscope, Brain } from "lucide-react";
import { useParams, useNavigate } from 'react-router-dom';
import hospitals from '../data/hospitals.json';
import React from 'react';
import bamendaPlaceholder from '../assets/bamenda.jpg'; // Import the local image

export default function HospitalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hospitalId = parseInt(id, 10);
  const hospital = hospitals.find(h => h.id === hospitalId);

  if (!hospital) {
    return <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center text-red-600">Hospital not found</div>;
  }

  const handleBookAppointment = () => {
    navigate(`/book-appointment/${hospitalId}`);
  };

  // Service icons mapping
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

  // Placeholder image URL - now using the imported local image
  const placeholderImage = bamendaPlaceholder;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero Section */}
      <div className="relative h-80 md:h-[450px] rounded-3xl overflow-hidden mb-8 shadow-xl">
        <img 
          src={hospital.image || placeholderImage} 
          alt={`${hospital.name} facility`} 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = placeholderImage; // Ensure onError uses the same placeholder
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent flex items-end p-8">
          <div className="text-white w-full">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center bg-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 mr-1" fill="currentColor" />
                {hospital.rating} ({hospital.reviews?.toLocaleString() || 0} reviews)
              </span>
              <span className="inline-flex items-center bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                <Clock className="w-4 h-4 mr-1" />
                {hospital.contact.hours.includes('24') ? 'Open 24/7' : 'Open Now'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{hospital.name}</h1>
            <p className="text-xl text-gray-300 max-w-3xl">{hospital.about.split('. ')[0]}.</p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <button 
          onClick={handleBookAppointment}
          className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-600"
        >
          <Calendar className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span>Book Appointment</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
        
        {/* Get Directions Link */}
        <a 
          href={`https://www.google.com/maps?q=${hospital.contact.location.lat},${hospital.contact.location.lng}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-800 font-medium py-4 px-6 rounded-xl transition-all shadow-sm hover:shadow-md hover:bg-gray-50"
        >
          <MapPin className="w-5 h-5 text-blue-600 transition-transform group-hover:scale-110" />
          <span>Get Directions</span>
        </a>

        {/* Call Now Link */}
        <a 
          href={`tel:${hospital.contact.phone}`} 
          className="group flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-800 font-medium py-4 px-6 rounded-xl transition-all shadow-sm hover:shadow-md hover:bg-gray-50"
        >
          <Phone className="w-5 h-5 text-green-600 transition-transform group-hover:scale-110" />
          <span>Call Now</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About {hospital.name}</h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              {hospital.about}
            </p>
            
            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-100">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Expert Care</h3>
                </div>
                <p className="text-gray-700">Our board-certified specialists provide personalized treatment plans.</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-100">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Ambulance className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Emergency Services</h3>
                </div>
                <p className="text-gray-700">24/7 emergency care with rapid response times.</p>
              </div>
            </div>

            {/* Services Section */}
            {hospital.services && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Our Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hospital.services.map((service, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="mt-1">
                        {getServiceIcon(service)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{service}</h4>
                        <p className="text-sm text-gray-600">Comprehensive diagnostic and treatment options</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Doctors Section */}
            {hospital.doctors && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-5">Our Specialists</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hospital.doctors.map((doctor, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{doctor.name}</h4>
                        <p className="text-gray-600">{doctor.specialty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Appointment Info */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Appointment Information</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-blue-50 p-4 rounded-xl w-full md:w-1/2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Hours of Operation</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between">
                      <span>Emergency Care</span>
                      <span className="font-medium">24/7</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Outpatient Services</span>
                      <span className="font-medium">Mon-Fri: 8AM-6PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Specialty Clinics</span>
                      <span className="font-medium">By appointment</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-xl w-full md:w-1/2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">What to Bring</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Government-issued ID</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Insurance card (if applicable)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>List of current medications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Contact Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Contact Us</h2>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="bg-blue-100 p-2.5 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{hospital.contact.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="bg-green-100 p-2.5 rounded-lg">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{hospital.contact.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="bg-amber-100 p-2.5 rounded-lg">
                  <MapPin className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-900">{hospital.contact.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Card */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
            <div className="flex items-start">
              <div className="bg-red-100 p-2 rounded-lg mr-3 flex-shrink-0">
                <Ambulance className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Emergency Contact</h3>
                <p className="text-gray-600 text-sm mb-2">For immediate medical assistance</p>
                <a 
                  href={`tel:${hospital.contact.phone}`} 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors shadow-sm mt-2"
                >
                  Call Emergency: {hospital.contact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-48 bg-gray-100 flex flex-col items-center justify-center gap-2 p-4">
              <MapPin className="w-10 h-10 text-blue-600" />
              <span className="text-gray-700 font-medium">Location Map</span>
              <p className="text-gray-500 text-center text-sm">{hospital.contact.address}</p>
            </div>
            <div className="p-4 border-t border-gray-100">
              <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center transition-colors shadow-sm gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                View on Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}