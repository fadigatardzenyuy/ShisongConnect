import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const FINGER_ARROW = `
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_1_2)">
      <path d="M20 10C20 7.79086 21.7909 6 24 6C26.2091 6 28 7.79086 28 10V28C28 30.2091 26.2091 32 24 32C21.7909 32 20 30.2091 20 28V10Z" fill="#16A34A"/>
      <circle cx="24" cy="34" r="3" fill="#16A34A"/>
    </g>
    <defs>
      <filter id="filter0_d_1_2" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="2"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.09 0 0 0 0 0.56 0 0 0 0 0.26 0 0 0 0.2 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2" result="shape"/>
      </filter>
    </defs>
  </svg>
`;

const HospitalDetailsTour = ({ run }) => {
  const tourRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!run) return;

    // Clean up any existing tour and styles
    const existingTour = document.querySelector('.shepherd-enabled');
    if (existingTour) {
      existingTour.remove();
    }
    const existingStyles = document.getElementById('shepherd-tour-styles');
    if (existingStyles) {
      existingStyles.remove();
    }

    // Create a unique style element
    const style = document.createElement('style');
    style.id = 'shepherd-tour-styles';
    style.textContent = `
      .shepherd-button {
        background-color: #16A34A !important;
        border: none !important;
        color: white !important;
        padding: 8px 16px !important;
        border-radius: 8px !important;
        font-weight: 500 !important;
        transition: all 0.3s ease !important;
      }
      .shepherd-button:hover {
        background-color: #15803D !important;
        transform: translateY(-1px) !important;
      }
      .shepherd-text {
        color: #052E16 !important;
        font-size: 1rem !important;
        line-height: 1.5 !important;
      }
      .shepherd-header {
        background-color: #F0FDF4 !important;
        padding: 1rem !important;
        border-bottom: 2px solid #16A34A !important;
      }
      .shepherd-title {
        color: #16A34A !important;
        font-weight: 600 !important;
        font-size: 1.25rem !important;
      }
      .shepherd-content {
        border-radius: 12px !important;
        padding: 0 !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
      }
      .shepherd-footer {
        padding: 1rem !important;
        border-top: 1px solid #E5E7EB !important;
      }
      .highlight-button {
        animation: pulse 2s infinite;
        position: relative;
        z-index: 1000;
      }
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(22, 163, 74, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(22, 163, 74, 0);
        }
      }
    `;
    document.head.appendChild(style);

    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shepherd-theme-custom',
        scrollTo: { behavior: 'smooth', block: 'center' },
        cancelIcon: {
          enabled: true
        }
      }
    });

    // Hero Section Step
    tour.addStep({
      id: 'hero-section',
      title: 'Hospital Overview',
      text: 'Welcome to the hospital details page. Here you can find all the information about this healthcare facility.',
      attachTo: {
        element: '.hero-section',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Skip',
          action: tour.complete
        },
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    // Get Directions Step (in hero section)
    tour.addStep({
      id: 'directions',
      title: 'Get Directions',
      text: 'Click here to get directions to the hospital using Google Maps.',
      attachTo: {
        element: '.hero-section .directions-btn',
        on: 'left'
      },
      buttons: [
        {
          text: 'Back',
          action: tour.back
        },
        {
          text: 'Next',
          action: tour.next
        }
      ],
      beforeShowPromise: function() {
        const button = document.querySelector('.hero-section .directions-btn');
        if (button) {
          // Store original styles
          const originalStyles = {
            position: button.style.position,
            top: button.style.top,
            right: button.style.right,
            zIndex: button.style.zIndex
          };

          // Add highlight class while maintaining position
          button.classList.add('highlight-button');
          button.style.position = 'absolute';
          button.style.top = '2rem';
          button.style.right = '2rem';
          button.style.zIndex = '1000';

          // Store original styles for cleanup
          button.dataset.originalStyles = JSON.stringify(originalStyles);
        }
      },
      beforeHidePromise: function() {
        const button = document.querySelector('.hero-section .directions-btn');
        if (button) {
          // Remove highlight class
          button.classList.remove('highlight-button');
          
          // Restore original styles
          const originalStyles = JSON.parse(button.dataset.originalStyles || '{}');
          button.style.position = originalStyles.position || '';
          button.style.top = originalStyles.top || '';
          button.style.right = originalStyles.right || '';
          button.style.zIndex = originalStyles.zIndex || '10';
          
          // Clean up stored styles
          delete button.dataset.originalStyles;
        }
      }
    });

    // Call Now Step
    tour.addStep({
      id: 'call-now',
      title: 'Contact Hospital',
      text: 'Need to speak with someone? Click here to call the hospital directly.',
      attachTo: {
        element: '.call-now-btn',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Back',
          action: tour.back
        },
        {
          text: 'Next',
          action: tour.next
        }
      ],
      beforeShowPromise: function() {
        const button = document.querySelector('.call-now-btn');
        if (button) {
          // Store original styles
          const originalStyles = {
            position: button.style.position,
            zIndex: button.style.zIndex
          };

          // Add highlight class while maintaining position
          button.classList.add('highlight-button');
          button.style.position = 'relative';
          button.style.zIndex = '1000';

          // Store original styles for cleanup
          button.dataset.originalStyles = JSON.stringify(originalStyles);
        }
      },
      beforeHidePromise: function() {
        const button = document.querySelector('.call-now-btn');
        if (button) {
          // Remove highlight class
          button.classList.remove('highlight-button');
          
          // Restore original styles
          const originalStyles = JSON.parse(button.dataset.originalStyles || '{}');
          button.style.position = originalStyles.position || '';
          button.style.zIndex = originalStyles.zIndex || '';
          
          // Clean up stored styles
          delete button.dataset.originalStyles;
        }
      }
    });

    // Emergency Contact Step
    tour.addStep({
      id: 'emergency',
      title: 'Emergency Contact',
      text: 'For urgent medical assistance, use this emergency contact button.',
      attachTo: {
        element: '.emergency-card',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Back',
          action: tour.back
        },
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    // Location Step
    tour.addStep({
      id: 'location',
      title: 'View Location',
      text: 'Click here to view the hospital\'s location on Google Maps.',
      attachTo: {
        element: '.location-card',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Back',
          action: tour.back
        },
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    // Book Appointment Step (Last Step)
    tour.addStep({
      id: 'book-appointment',
      title: 'Book Your Appointment',
      text: 'Ready to book? Click here to start your appointment booking process.',
      attachTo: {
        element: '.book-appointment-btn',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Back',
          action: tour.back
        },
        {
          text: 'Book Now',
          action: () => {
            tour.complete();
            navigate(`/book-appointment/${id}`);
          }
        }
      ],
      beforeShowPromise: function() {
        const button = document.querySelector('.book-appointment-btn');
        if (button) {
          // Store original styles
          const originalStyles = {
            position: button.style.position,
            zIndex: button.style.zIndex
          };

          // Add highlight class while maintaining position
          button.classList.add('highlight-button');
          button.style.position = 'relative';
          button.style.zIndex = '1000';

          // Store original styles for cleanup
          button.dataset.originalStyles = JSON.stringify(originalStyles);
        }
      },
      beforeHidePromise: function() {
        const button = document.querySelector('.book-appointment-btn');
        if (button) {
          // Remove highlight class
          button.classList.remove('highlight-button');
          
          // Restore original styles
          const originalStyles = JSON.parse(button.dataset.originalStyles || '{}');
          button.style.position = originalStyles.position || '';
          button.style.zIndex = originalStyles.zIndex || '';
          
          // Clean up stored styles
          delete button.dataset.originalStyles;
        }
      }
    });

    tour.start();
    tourRef.current = tour;

    return () => {
      tour.complete();
      style.remove();
    };
  }, [run, id, navigate]);

  return null;
};

export default HospitalDetailsTour; 