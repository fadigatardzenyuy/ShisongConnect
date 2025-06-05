import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function MobileNavbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      {/* Basic mobile navbar structure */}
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">Healthcare Flow</Link>
        {/* Add mobile menu toggle/icons here */}
        <div className="flex items-center">
          {/* Placeholder for user icon/profile link */}
          <Link to="/profile" className="mr-4">Profile</Link>
          <ThemeToggle />
        </div>
      </div>
      {/* Add mobile menu links here (hidden by default) */}
    </nav>
  );
}

export default MobileNavbar; 