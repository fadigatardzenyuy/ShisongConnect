import React from 'react';
import { Activity, MapPin, User, Calendar, Eye, Download, Clock, AlertCircle, ChevronRight } from 'lucide-react';

const ResultCard = ({ result, onViewReport, onDownloadPDF, getStatusIcon, getStatusColor, getPriorityColor }) => {
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'High':
        return 'Critical';
      case 'Medium':
        return 'Important';
      case 'Low':
        return 'Routine';
      default:
        return priority;
    }
  };

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date not available';
    }
  };

  return (
    <div className={`medical-card border-l-4 ${getPriorityColor(result.priority)} animate-slide-up hover:translate-y-[-4px] transition-all duration-300`}>
      <div className="p-3 sm:p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-3">
          <div className="flex items-center space-x-3">
            <div className="icon-green">
              <Activity className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-bleen-forest">{result.testName}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-gray-500">{result.category}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-bleen-primary/10 text-bleen-primary">
                  {getPriorityLabel(result.priority)}
                </span>
              </div>
            </div>
          </div>
          <div className={`flex items-center space-x-2 px-2 sm:px-3 py-1 rounded-full border ${getStatusColor(result.status)}`}>
            {getStatusIcon(result.status)}
            <span className="text-xs sm:text-sm font-medium">{result.status}</span>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-bleen-primary flex-shrink-0" />
            <span className="truncate">{result.hospital}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <User className="h-3 w-3 sm:h-4 sm:w-4 text-bleen-primary flex-shrink-0" />
            <span className="truncate">Dr. {result.doctor}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-bleen-primary flex-shrink-0" />
            <span>{formatDate(result.date)}</span>
          </div>
        </div>

        {/* Additional Info */}
        {result.diagnosis && (
          <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-bleen-cream/50 rounded-lg border border-green-100">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-bleen-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-bleen-forest mb-1">Primary Diagnosis</p>
                <p className="text-xs sm:text-sm text-gray-600">{result.diagnosis.primary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span>Last updated: {formatDate(result.lastUpdated || result.date)}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={() => onViewReport(result)}
              disabled={result.status === 'Processing'}
              className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>View Details</span>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            <button
              onClick={() => onDownloadPDF(result)}
              disabled={result.status === 'Processing'}
              className="btn-secondary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard; 