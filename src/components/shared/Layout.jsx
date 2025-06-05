import React from 'react';
import MobileNavbar from './MobileNavbar';

function Layout({ children }) {
  return (
    <div>
      <MobileNavbar />
      <main className="container mx-auto p-4">
        {children}
      </main>
      {/* Optional: Add a footer here */}
    </div>
  );
}

export default Layout; 