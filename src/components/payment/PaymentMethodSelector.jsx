import React from 'react';
import { motion } from 'framer-motion';
import { FiSmartphone } from 'react-icons/fi';

const PaymentMethodSelector = ({ onSelect }) => {
  const paymentMethods = [
    {
      id: 'orange',
      name: 'Orange Money',
      icon: '/images/orange-money.png',
      color: 'bg-orange-500',
      description: 'Pay securely with Orange Money'
    },
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      icon: '/images/mtn-momo.png',
      color: 'bg-yellow-500',
      description: 'Pay securely with MTN Mobile Money'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <motion.button
            key={method.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(method.id)}
            className={`relative p-4 rounded-lg border-2 border-gray-200 hover:border-${method.color} transition-colors bg-white`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center`}>
                <FiSmartphone className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">{method.name}</h4>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Your payment information is encrypted and secure. We never store your mobile money details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector; 