import React from 'react';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const StatsCard = ({ icon: Icon, title, value, className }) => {
  return (
    <div className="glass-card group hover:scale-105 transition-all duration-300 animate-fade-in">
      <div className="flex items-center">
        <div className={`${className} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-600 group-hover:text-bleen-forest transition-colors duration-300">{title}</p>
          <p className="text-2xl font-bold text-bleen-forest group-hover:scale-105 transition-transform duration-300">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard; 