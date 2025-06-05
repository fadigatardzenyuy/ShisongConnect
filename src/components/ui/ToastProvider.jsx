import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          // Default options for all toasts
          duration: 4000,
          style: {
            background: '#fff',
            color: '#1a1f36',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '0.5rem',
            padding: '1rem',
          },
          // Success toast style
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
            style: {
              borderLeft: '4px solid #10B981',
            },
          },
          // Error toast style
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
            style: {
              borderLeft: '4px solid #EF4444',
            },
          },
          // Loading toast style
          loading: {
            iconTheme: {
              primary: '#306ce9',
              secondary: '#fff',
            },
            style: {
              borderLeft: '4px solid #306ce9',
            },
          },
        }}
      />
    </>
  );
};

export default ToastProvider; 