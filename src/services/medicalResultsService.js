// Mock data for medical results
const mockResults = [
    {
        id: 1,
        testName: 'Complete Blood Count (CBC)',
        date: '2024-03-15',
        hospital: 'City General Hospital',
        status: 'Completed',
        doctor: 'Sarah Johnson',
        priority: 'High',
        category: 'Hematology',
        appointmentDate: '2024-03-14',
        appointmentType: 'Regular Check-up',
        results: {
            hemoglobin: { value: '14.2', unit: 'g/dL', referenceRange: '12.0-15.5', status: 'Normal' },
            whiteBloodCells: { value: '7.5', unit: 'x10³/μL', referenceRange: '4.0-11.0', status: 'Normal' },
            platelets: { value: '250', unit: 'x10³/μL', referenceRange: '150-400', status: 'Normal' },
            hematocrit: { value: '42', unit: '%', referenceRange: '36-46', status: 'Normal' }
        }
    },
    {
        id: 2,
        testName: 'Lipid Panel',
        date: '2024-03-10',
        hospital: 'Metro Medical Center',
        status: 'Completed',
        doctor: 'Michael Chen',
        priority: 'Medium',
        category: 'Cardiology',
        appointmentDate: '2024-03-09',
        appointmentType: 'Follow-up Consultation',
        results: {
            totalCholesterol: { value: '220', unit: 'mg/dL', referenceRange: '<200', status: 'High' },
            hdl: { value: '45', unit: 'mg/dL', referenceRange: '>40', status: 'Normal' },
            ldl: { value: '140', unit: 'mg/dL', referenceRange: '<100', status: 'High' },
            triglycerides: { value: '180', unit: 'mg/dL', referenceRange: '<150', status: 'High' }
        }
    },
    {
        id: 3,
        testName: 'Thyroid Function Test',
        date: '2024-03-05',
        hospital: 'Community Health Clinic',
        status: 'Processing',
        doctor: 'Emily Brown',
        priority: 'Low',
        category: 'Endocrinology',
        appointmentDate: '2024-03-04',
        appointmentType: 'Specialist Consultation',
        results: null
    },
    {
        id: 4,
        testName: 'Comprehensive Metabolic Panel',
        date: '2024-03-01',
        hospital: 'University Medical Center',
        status: 'Failed',
        doctor: 'Robert Wilson',
        priority: 'High',
        category: 'Chemistry',
        appointmentDate: '2024-02-29',
        appointmentType: 'Annual Physical',
        results: null
    }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Service for handling medical results API calls
 */
export const medicalResultsService = {
    /**
     * Fetch all medical results for the current user
     * @returns {Promise<Array>} Array of medical results
     */
    getMedicalResults: async () => {
        try {
            await delay(1000); // Simulate network delay

            // Simulate random errors (5% chance)
            if (Math.random() < 0.05) {
                throw new Error('NETWORK_ERROR');
            }

            // Return a deep copy of the mock results
            return JSON.parse(JSON.stringify(mockResults));
        } catch (error) {
            console.error('Error fetching results:', error);
            throw new Error(error.message === 'NETWORK_ERROR'
                ? 'NETWORK_ERROR'
                : 'Failed to fetch medical results. Please try again later.');
        }
    },

    /**
     * Get a specific medical result by ID
     * @param {string|number} resultId - ID of the medical result
     * @returns {Promise<Object>} Medical result data
     */
    getMedicalResultById: async (resultId) => {
        try {
            await delay(500);
            const result = mockResults.find(r => r.id === parseInt(resultId));

            if (!result) {
                throw new Error('NOT_FOUND');
            }

            // Return a deep copy of the result
            return JSON.parse(JSON.stringify(result));
        } catch (error) {
            console.error('Error fetching result:', error);
            throw new Error(error.message === 'NOT_FOUND'
                ? 'Result not found'
                : 'Failed to fetch result details. Please try again later.');
        }
    },

    /**
     * Get the PDF URL for a specific medical result
     * @param {string|number} resultId - ID of the medical result
     * @returns {Promise<string>} URL of the PDF file
     */
    getMedicalResultPDF: async (resultId) => {
        try {
            await delay(800);

            // Verify the result exists
            const result = mockResults.find(r => r.id === parseInt(resultId));
            if (!result) {
                throw new Error('NOT_FOUND');
            }

            // Simulate PDF generation
            return `https://example.com/reports/${resultId}.pdf`;
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw new Error(error.message === 'NOT_FOUND'
                ? 'Result not found'
                : 'Failed to generate PDF. Please try again later.');
        }
    }
}; 