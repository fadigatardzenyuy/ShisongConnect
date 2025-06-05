import React from 'react';
import { Link } from 'react-router-dom';

const MobileOnboarding = () => {
  return (
    <div className="relative h-screen w-full flex flex-col justify-between items-center overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" // Replace with your own image if needed
        alt="Doctor and patient"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col flex-1 w-full justify-between h-full">
        {/* Brand */}
        <div className="pt-12 flex justify-center">
          <span className="text-white text-3xl font-bold tracking-wide drop-shadow-lg">SHICO</span>
        </div>

        {/* Main Text */}
        <div className="flex-1 flex flex-col justify-center items-center px-6">
          <h1 className="text-white text-3xl font-bold text-center mb-4 drop-shadow-lg">
            Need a Doctor?
            <br />
            Book now without queuing.
          </h1>
          <div className="flex justify-center mb-8">
            <span className="text-2xl">👨‍⚕️👩‍⚕️🧑‍⚕️</span>
          </div>
          <div className="w-full space-y-4">
            <button className="w-full py-4 bg-[#306ce9] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#2557c0] transition-colors">
              Continue Booking
            </button>
            <button className="w-full py-4 bg-white bg-opacity-90 text-[#1a1f36] rounded-xl font-semibold text-lg shadow hover:bg-opacity-100 transition-colors">
              Get Started
            </button>
          </div>
        </div>

        {/* Sign In Prompt */}
        <div className="pb-8 flex justify-center">
          <span className="text-white text-sm">
            Already have an account?{' '}
            <Link to="/login" className="underline font-medium text-[#306ce9]">Sign In</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileOnboarding; 