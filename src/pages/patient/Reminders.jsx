// import React from 'react';

// function Reminders() {
//   return (
//     <div>
//       <h1>Reminders</h1>
//       {/* Display reminders here */}
//     </div>
//   );
// }

// export default Reminders; 


import React, { useEffect, useState } from 'react';
 import { Bell, CalendarCheck, MessageSquare } from 'lucide-react';

const FeedbackForm = ({ onSubmit }) => { const [feedback, setFeedback] = useState('');

const handleSubmit = (e) => { e.preventDefault(); if (feedback.trim()) { onSubmit(feedback); setFeedback(''); } };

return ( <form onSubmit={handleSubmit} className="mt-3 space-y-3"> <textarea className="w-full p-2 border rounded text-gray-800" rows="4" placeholder="Describe your experience..." value={feedback} onChange={(e) => setFeedback(e.target.value)} ></textarea> <button
type="submit"
className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
> Submit Feedback </button> </form> ); };

const Reminders = () => { const [upcomingAppointments, setUpcomingAppointments] = useState([]); const [medicationReminders, setMedicationReminders] = useState([]); const [feedbackRequested, setFeedbackRequested] = useState(false); const [submittedFeedback, setSubmittedFeedback] = useState([]);

useEffect(() => { const now = new Date(); const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

// Dummy real-time simulation
setTimeout(() => {
  setUpcomingAppointments([
    {
      id: 1,
      doctor: 'Dr. Smith',
      time: twoHoursLater.toISOString(),
      location: 'Room 12, General Hospital',
    },
  ]);
}, 2000);

setTimeout(() => {
  setMedicationReminders([
    {
      id: 1,
      medicine: 'Amoxicillin',
      time: new Date(now.getTime() + 3 * 60 * 60 * 1000).toISOString(),
      pickupLocation: 'Hospital Pharmacy',
    },
  ]);
}, 3000);

setTimeout(() => {
  setFeedbackRequested(true);
}, 4000);

}, []);

const handleFeedbackSubmit = (feedback) => { setSubmittedFeedback((prev) => [...prev, feedback]); setFeedbackRequested(false); alert('Thank you for your feedback!'); };

return ( <div className="min-h-screen bg-white text-gray-800 p-6 space-y-6"> <h1 className="text-2xl font-semibold border-b pb-2">Patient Notification Center</h1>

<section className="space-y-4">
    <h2 className="text-xl font-medium">Upcoming Appointments</h2>
    {upcomingAppointments.map((appt) => (
      <div
        key={appt.id}
        className="border-l-4 border-green-500 bg-gray-50 p-4 rounded shadow"
      >
        <div className="flex items-center space-x-2">
          <CalendarCheck className="text-green-600" />
          <div>
            <p className="font-semibold">Appointment with {appt.doctor}</p>
            <p className="text-sm text-gray-600">{new Date(appt.time).toLocaleString()}</p>
            <p className="text-sm">Location: {appt.location}</p>
          </div>
        </div>
      </div>
    ))}
  </section>

  <section className="space-y-4">
    <h2 className="text-xl font-medium">Medication Reminders</h2>
    {medicationReminders.map((med) => (
      <div
        key={med.id}
        className="border-l-4 border-green-500 bg-gray-50 p-4 rounded shadow"
      >
        <div className="flex items-center space-x-2">
          <Bell className="text-green-600" />
          <div>
            <p className="font-semibold">{med.medicine}</p>
            <p className="text-sm text-gray-600">Pickup at: {new Date(med.time).toLocaleString()}</p>
            <p className="text-sm">Location: {med.pickupLocation}</p>
          </div>
        </div>
      </div>
    ))}
  </section>

  {feedbackRequested && (
    <section className="space-y-4">
      <h2 className="text-xl font-medium">Check-Up Feedback</h2>
      <div className="border-l-4 border-green-500 bg-gray-50 p-4 rounded shadow">
        <div className="flex items-center space-x-2">
          <MessageSquare className="text-green-600" />
          <p className="font-semibold">
            We value your experience. Please fill out the follow-up feedback form from your last visit.
          </p>
        </div>
        <FeedbackForm onSubmit={handleFeedbackSubmit} />
      </div>
    </section>
  )}

  {submittedFeedback.length > 0 && (
    <section className="space-y-2">
      <h2 className="text-xl font-medium">Submitted Feedback</h2>
      <ul className="list-disc list-inside">
        {submittedFeedback.map((fb, index) => (
          <li key={index} className="text-sm text-gray-700">{fb}</li>
        ))}
      </ul>
    </section>
  )}
</div>

); };

export default Reminders;
