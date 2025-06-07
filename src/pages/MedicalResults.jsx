import React, { useState, useEffect } from 'react';
import { Activity, FileText, CheckCircle, AlertCircle, Clock, RefreshCw, Search, Filter, X } from 'lucide-react';
import { medicalResultsService } from '../services/medicalResultsService';
import { downloadPDF } from '../utils/pdfUtils';
import StatsCard from '../components/medical-results/StatsCard';
import SearchFilters from '../components/medical-results/SearchFilters';
import ResultCard from '../components/medical-results/ResultCard';
import ReportViewer from '../components/medical-results/ReportViewer';

const MedicalResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    dateRange: 'all',
    priority: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    processing: 0,
    critical: 0
  });

  useEffect(() => {
    fetchResults();
  }, []);

  useEffect(() => {
    // Update stats whenever results change
    const newStats = {
      total: results.length,
      completed: results.filter(r => r.status === 'Completed').length,
      processing: results.filter(r => r.status === 'Processing').length,
      critical: results.filter(r => r.priority === 'High').length
    };
    setStats(newStats);
  }, [results]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await medicalResultsService.getMedicalResults();
      setResults(data);
    } catch (err) {
      console.error('Error fetching results:', err);
      setError(err.message === 'NETWORK_ERROR' 
        ? 'Network connection error. Please check your internet connection and try again.'
        : 'Failed to fetch medical results. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchResults();
  };

  const handleViewReport = async (result) => {
    try {
      const detailedResult = await medicalResultsService.getMedicalResultById(result.id);
      setSelectedReport(detailedResult);
      setIsViewerOpen(true);
    } catch (err) {
      console.error('Error fetching report details:', err);
      setError('Failed to load report details. Please try again.');
    }
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedReport(null);
  };

  const handleDownloadPDF = async (result) => {
    try {
      const pdfUrl = await medicalResultsService.getMedicalResultPDF(result.id);
      await downloadPDF(pdfUrl, result.testName);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      setError('Failed to download PDF. Please try again.');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Processing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Processing':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'border-red-500';
      case 'Medium':
        return 'border-yellow-500';
      case 'Low':
        return 'border-green-500';
      default:
        return 'border-gray-300';
    }
  };

  const getResultStatus = (status) => {
    switch (status) {
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Low':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredResults = results.filter(result => {
    const matchesSearch = 
      result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.doctor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status === 'all' || result.status === filters.status;
    const matchesCategory = filters.category === 'all' || result.category === filters.category;
    const matchesPriority = filters.priority === 'all' || result.priority === filters.priority;

    // Date range filtering
    let matchesDate = true;
    if (filters.dateRange !== 'all') {
      const today = new Date();
      const resultDate = new Date(result.date);
      const diffTime = Math.abs(today - resultDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      switch (filters.dateRange) {
        case 'today':
          matchesDate = diffDays === 0;
          break;
        case 'week':
          matchesDate = diffDays <= 7;
          break;
        case 'month':
          matchesDate = diffDays <= 30;
          break;
        default:
          matchesDate = true;
      }
    }

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority && matchesDate;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bleen-cream to-green-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p className="text-bleen-forest animate-pulse">Loading your medical results...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bleen-cream to-green-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
              <div className="icon-teal mx-auto mb-4">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-semibold text-bleen-forest mb-2">Oops! Something went wrong</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={fetchResults}
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Try Again</span>
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh Page</span>
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                If the problem persists, please contact support at{' '}
                <a href="mailto:support@example.com" className="text-bleen-primary hover:underline">
                  support@example.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bleen-cream to-green-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <StatsCard
            icon={FileText}
            title="Total Tests"
            value={stats.total}
            className="icon-green"
          />
          <StatsCard
            icon={CheckCircle}
            title="Completed"
            value={stats.completed}
            className="icon-emerald"
          />
          <StatsCard
            icon={Clock}
            title="Processing"
            value={stats.processing}
            className="icon-teal"
          />
          <StatsCard
            icon={AlertCircle}
            title="Critical"
            value={stats.critical}
            className="icon-green"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tests, hospitals, doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleen-primary focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 relative">
              <button
                onClick={() => setShowFilters(false)}
                className="absolute right-0 top-0 p-2 text-gray-500 hover:text-gray-700 sm:hidden"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleen-primary"
                >
                  <option value="all">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Processing">Processing</option>
                  <option value="Failed">Failed</option>
                </select>

                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleen-primary"
                >
                  <option value="all">All Categories</option>
                  <option value="Blood Test">Blood Test</option>
                  <option value="Imaging">Imaging</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                </select>

                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleen-primary"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>

                <select
                  value={filters.priority}
                  onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleen-primary"
                >
                  <option value="all">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 sm:space-y-6">
          {filteredResults.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-white rounded-xl shadow-lg">
              <Search className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-500 px-4">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          ) : (
            filteredResults.map((result) => (
              <ResultCard
                key={result.id}
                result={result}
                onViewReport={handleViewReport}
                onDownloadPDF={handleDownloadPDF}
                getStatusIcon={getStatusIcon}
                getStatusColor={getStatusColor}
                getPriorityColor={getPriorityColor}
              />
            ))
          )}
        </div>
      </div>

      {selectedReport && (
        <ReportViewer
          report={selectedReport}
          onClose={handleCloseViewer}
          onDownloadPDF={handleDownloadPDF}
        />
      )}
    </div>
  );
};

export default MedicalResults;