// import React from 'react';

// function MedicalRecords() {
//   return (
//     <div>
//       <h1>Medical Records</h1>
//       {/* Display medical records here */}
//     </div>
//   );
// }

// export default MedicalRecords; 


import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import useMedicalRecord from './useMedicalRecord';

const MedicalRecords = ({ patientId }) => {
  const { record, loading } = useMedicalRecord(patientId);
  const printRef = useRef();

  const handleDownloadPDF = () => {
    html2pdf().from(printRef.current).save(`(${record.full_name}_medical_record.pdf)`);
  };

  if (loading) return <p className="text-center py-10">Loading medical record...</p>;
  if (!record) return <p className="text-center text-red-600">No medical record found.</p>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto mt-8" ref={printRef}>
      <h1 className="text-3xl font-bold text-green-600 mb-4">Medical Record</h1>

      {/* Patient Info */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <p><span className="font-semibold">Name:</span> {record.full_name}</p>
          <p><span className="font-semibold">Date of Birth:</span> {record.dob}</p>
          <p><span className="font-semibold">Gender:</span> {record.gender}</p>
        </div>
        <div>
          <p><span className="font-semibold">Blood Type:</span> {record.blood_type}</p>
          <p><span className="font-semibold">Phone:</span> {record.phone}</p>
          <p><span className="font-semibold">Email:</span> {record.email}</p>
        </div>
      </div>

      {/* Medical History */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-2">Medical History</h2>
        <ul className="list-disc pl-5 text-gray-800 space-y-1">
          {record.medical_history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Medications */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-2">Medications</h2>
        <ul className="list-disc pl-5 text-gray-800 space-y-1">
          {record.medications.map((med, index) => (
            <li key={index}>{med}</li>
          ))}
        </ul>
      </div>

      {/* Lab Results */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-2">Lab Results</h2>
        {record.lab_results.length > 0 ? (
          <table className="w-full table-auto text-left border">
            <thead className="bg-green-100">
              <tr>
                <th className="p-2 border">Test</th>
                <th className="p-2 border">Result</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {record.lab_results.map((lab, index) => (
                <tr key={index}>
                  <td className="p-2 border">{lab.test_name}</td>
                  <td className="p-2 border">{lab.result}</td>
                  <td className="p-2 border">{lab.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No lab results available.</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4 pt-4">
        <button
          onClick={() => window.print()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Print Record
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default MedicalRecords;
