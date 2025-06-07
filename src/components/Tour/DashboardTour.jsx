import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

const DashboardTour = ({ run, onFinish }) => {
  const tourRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Clean up any existing tour
    if (tourRef.current) {
      tourRef.current.complete();
      tourRef.current = null;
    }

    // Remove any existing tour styles
    const existingStyle = document.getElementById('shepherd-tour-styles');
    if (existingStyle) {
      existingStyle.remove();
    }

    if (!run) return;

    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        classes: 'shadow-lg rounded-xl border-2 border-green-600',
        scrollTo: true,
        arrow: FINGER_ARROW,
        canClickTarget: false,
        popperOptions: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 24],
              },
            },
          ],
        },
      },
      useModalOverlay: true,
    });

    // Add custom styles for the tour
    const style = document.createElement('style');
    style.id = 'shepherd-tour-styles';
    style.textContent = `
      .shepherd-content {
        background-color: white !important;
        border: 2px solid #16A34A !important;
      }
      .shepherd-text {
        color: #166534 !important;
      }
      .shepherd-button {
        background-color: #16A34A !important;
        color: white !important;
        border: none !important;
        padding: 0.5rem 1rem !important;
        border-radius: 0.5rem !important;
        font-weight: 500 !important;
      }
      .shepherd-button:not(:disabled):hover {
        background-color: #15803D !important;
      }
      .shepherd-button.shepherd-button-secondary {
        background-color: transparent !important;
        color: #16A34A !important;
      }
      .shepherd-button.shepherd-button-secondary:hover {
        background-color: #F0FDF4 !important;
      }
    `;
    document.head.appendChild(style);

    // Welcome Banner Step
    tour.addStep({
      id: 'welcome-banner',
      text: `<h3 class='text-lg font-semibold text-gray-800 mb-2'>Welcome to SHICo!</h3><p class='text-gray-600'>This is your personalized healthcare dashboard. Let's explore the main features.</p>`,
      attachTo: { element: '.welcome-banner', on: 'bottom' },
      buttons: [
        {
          text: 'Next',
          action: tour.next,
          classes: 'shepherd-button',
        },
        {
          text: 'Skip',
          action: tour.complete,
          classes: 'shepherd-button shepherd-button-secondary',
        },
      ],
    });

    // Quick Actions Step
    tour.addStep({
      id: 'quick-actions',
      text: `<h3 class='text-lg font-semibold text-gray-800 mb-2'>Quick Actions</h3><p class='text-gray-600'>Access essential healthcare services instantly. View your health stats and care plan here. Let's move to your appointments next.</p>`,
      attachTo: { element: '.quick-actions', on: 'right' },
      buttons: [
        {
          text: 'Back',
          action: tour.back,
          classes: 'shepherd-button shepherd-button-secondary',
        },
        {
          text: 'Next',
          action: tour.next,
          classes: 'shepherd-button',
        },
      ],
    });

    // Appointments Step
    tour.addStep({
      id: 'appointments',
      text: `<h3 class='text-lg font-semibold text-gray-800 mb-2'>My Appointments</h3><p class='text-gray-600'>View and manage all your upcoming appointments. You can book new appointments or check your schedule here.</p>`,
      attachTo: { element: '.appointments', on: 'left' },
      buttons: [
        {
          text: 'Back',
          action: tour.back,
          classes: 'shepherd-button shepherd-button-secondary',
        },
        {
          text: 'Next',
          action: tour.next,
          classes: 'shepherd-button',
        },
      ],
    });

    // Health Tips Step
    tour.addStep({
      id: 'health-tips',
      text: `<h3 class='text-lg font-semibold text-gray-800 mb-2'>Health Tips</h3><p class='text-gray-600'>Get personalized health recommendations and wellness tips. You've completed the tour!</p>`,
      attachTo: { element: '.health-tips', on: 'left' },
      buttons: [
        {
          text: 'Back',
          action: tour.back,
          classes: 'shepherd-button shepherd-button-secondary',
        },
        {
          text: 'Finish',
          action: () => {
            tour.complete();
            if (onFinish) onFinish();
          },
          classes: 'shepherd-button',
        },
      ],
    });

    // Start the tour
    tour.start();
    tourRef.current = tour;

    return () => {
      if (tourRef.current) {
        tourRef.current.complete();
        tourRef.current = null;
      }
      const styleElement = document.getElementById('shepherd-tour-styles');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [run, onFinish, navigate]);

  return null;
};

export default DashboardTour; 