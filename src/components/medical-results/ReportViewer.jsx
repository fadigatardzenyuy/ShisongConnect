import React from 'react';
import { X, Download, FileText, Activity, MapPin, User, Calendar, Clock, Pill, Stethoscope, ClipboardList, AlertCircle, CheckCircle2 } from 'lucide-react';

const ReportViewer = ({ report, onClose, onDownloadPDF }) => {
  if (!report) return null;

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

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Processing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Helper function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'Processing':
        return <Clock className="h-4 w-4" />;
      case 'Failed':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bleen-forest/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-slide-up rounded-xl shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 border-b border-green-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-bleen-primary to-bleen-accent p-3 rounded-full">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-bleen-forest">Medical Report</h2>
                <p className="text-sm text-gray-500">{report.testName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-green-50 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-bleen-forest" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-50 to-bleen-cream p-4 rounded-xl border border-green-100">
                <h3 className="text-sm font-medium text-bleen-forest mb-3 flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-bleen-primary" />
                  Test Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-bleen-forest">
                    <MapPin className="h-4 w-4 mr-2 text-bleen-primary" />
                    <span className="text-sm">{report.hospital}</span>
                  </div>
                  <div className="flex items-center text-bleen-forest">
                    <User className="h-4 w-4 mr-2 text-bleen-primary" />
                    <span className="text-sm">{report.doctor}</span>
                  </div>
                  <div className="flex items-center text-bleen-forest">
                    <Calendar className="h-4 w-4 mr-2 text-bleen-primary" />
                    <span className="text-sm">Test Date: {formatDate(report.date)}</span>
                  </div>
                  <div className="flex items-center text-bleen-forest">
                    <Clock className="h-4 w-4 mr-2 text-bleen-primary" />
                    <span className="text-sm">Appointment: {formatDate(report.appointmentDate)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-bleen-cream p-4 rounded-xl border border-green-100">
                <h3 className="text-sm font-medium text-bleen-forest mb-3 flex items-center">
                  <Stethoscope className="h-4 w-4 mr-2 text-bleen-primary" />
                  Diagnosis
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/80 p-3 rounded-lg border border-green-100">
                    <p className="text-sm font-medium text-bleen-forest mb-1">Primary Diagnosis</p>
                    <p className="text-sm text-gray-600">{report.diagnosis?.primary || 'Not specified'}</p>
                  </div>
                  {report.diagnosis?.secondary && (
                    <div className="bg-white/80 p-3 rounded-lg border border-green-100">
                      <p className="text-sm font-medium text-bleen-forest mb-1">Secondary Conditions</p>
                      <p className="text-sm text-gray-600">{report.diagnosis.secondary}</p>
                    </div>
                  )}
                  {report.diagnosis?.notes && (
                    <div className="bg-white/80 p-3 rounded-lg border border-green-100">
                      <p className="text-sm font-medium text-bleen-forest mb-1">Clinical Notes</p>
                      <p className="text-sm text-gray-600">{report.diagnosis.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-green-50 to-bleen-cream p-4 rounded-xl border border-green-100">
                <h3 className="text-sm font-medium text-bleen-forest mb-3 flex items-center">
                  <ClipboardList className="h-4 w-4 mr-2 text-bleen-primary" />
                  Test Results
                </h3>
                <div className="space-y-4">
                  {Object.entries(report.results).map(([key, data]) => (
                    <div 
                      key={key} 
                      className="flex items-center justify-between p-3 bg-white/80 rounded-lg border border-green-100"
                    >
                      <div>
                        <p className="text-sm font-medium text-bleen-forest capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-xs text-gray-500">Reference Range: {data.referenceRange}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-bleen-forest">
                          {data.value} {data.unit}
                        </p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          data.status === 'Normal' ? 'bg-bleen-primary/10 text-bleen-primary' :
                          data.status === 'High' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {data.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-br from-green-50 to-bleen-cream p-4 rounded-xl border border-green-100">
                <h3 className="text-sm font-medium text-bleen-forest mb-3 flex items-center">
                  <Pill className="h-4 w-4 mr-2 text-bleen-primary" />
                  Prescribed Medications
                </h3>
                <div className="space-y-3">
                  {report.medications?.map((med, index) => (
                    <div key={index} className="bg-white/80 p-3 rounded-lg border border-green-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-bleen-forest">{med.name}</p>
                          <p className="text-xs text-gray-500">{med.dosage} - {med.frequency}</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-bleen-primary/10 text-bleen-primary">
                          {med.duration}
                        </span>
                      </div>
                      {med.instructions && (
                        <p className="text-xs text-gray-600 mt-2">{med.instructions}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {report.importantNotes && (
                <div className="mt-6 bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-100">
                  <h3 className="text-sm font-medium text-bleen-forest mb-3 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                    Important Notes
                  </h3>
                  <p className="text-sm text-gray-600">{report.importantNotes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 border-t border-green-100 pt-4">
            <button
              onClick={() => onDownloadPDF(report)}
              className="bg-gradient-to-r from-bleen-primary to-bleen-accent text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download Full Report</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportViewer; 