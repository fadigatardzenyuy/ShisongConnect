/**
 * Utility functions for handling PDF operations
 */

/**
 * Downloads a PDF file from a given URL
 * @param {string} url - The URL of the PDF file
 * @param {string} filename - The name to save the file as
 */
export const downloadPDF = async (url, filename) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('Error downloading PDF:', error);
        throw error;
    }
};

/**
 * Formats a filename for a medical result PDF
 * @param {string} testName - Name of the medical test
 * @param {Date} date - Date of the test
 * @returns {string} Formatted filename
 */
export const formatPDFFilename = (testName, date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const sanitizedTestName = testName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return `${sanitizedTestName}_${formattedDate}.pdf`;
}; 