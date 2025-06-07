import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateAppointmentPDF = (appointmentData, appointmentCode) => {
    const doc = new jsPDF();

    // Add hospital logo or image
    // doc.addImage(logo, 'PNG', 10, 10, 30, 30);

    // Title
    doc.setFontSize(20);
    doc.text('Appointment Confirmation', 105, 20, { align: 'center' });

    // Appointment Code
    doc.setFontSize(16);
    doc.text(`Code: ${appointmentCode}`, 105, 30, { align: 'center' });

    // Hospital Information
    doc.setFontSize(14);
    doc.text('Hospital Details', 20, 45);
    doc.setFontSize(12);
    doc.text(`Name: ${appointmentData.hospital.name}`, 20, 55);
    doc.text(`Department: ${appointmentData.department}`, 20, 60);

    // Appointment Details
    doc.setFontSize(14);
    doc.text('Appointment Details', 20, 75);
    doc.setFontSize(12);
    doc.text(`Date: ${appointmentData.preferredDate}`, 20, 85);
    doc.text(`Time: ${appointmentData.preferredTime}`, 20, 90);
    doc.text(`Type: ${appointmentData.appointmentType}`, 20, 95);
    if (appointmentData.preferredDoctor) {
        doc.text(`Doctor: Dr. ${appointmentData.preferredDoctor}`, 20, 100);
    }

    // Patient Information
    doc.setFontSize(14);
    doc.text('Patient Information', 20, 115);
    doc.setFontSize(12);
    doc.text(`Name: ${appointmentData.firstName} ${appointmentData.middleName} ${appointmentData.lastName}`, 20, 125);
    doc.text(`Phone: ${appointmentData.phoneNumber}`, 20, 130);
    doc.text(`Email: ${appointmentData.email}`, 20, 135);
    doc.text(`Date of Birth: ${appointmentData.dateOfBirth}`, 20, 140);

    // Medical Information
    doc.setFontSize(14);
    doc.text('Medical Information', 20, 155);
    doc.setFontSize(12);
    doc.text(`Reason: ${appointmentData.reasonForAppointment}`, 20, 165);
    if (appointmentData.currentSymptoms) {
        doc.text(`Symptoms: ${appointmentData.currentSymptoms}`, 20, 170);
    }
    if (appointmentData.medicalHistory) {
        doc.text(`Medical History: ${appointmentData.medicalHistory}`, 20, 175);
    }

    // Payment Information
    doc.setFontSize(14);
    doc.text('Payment Information', 20, 190);
    doc.setFontSize(12);
    doc.text('Consultation Fee: 5,000 FCFA', 20, 200);
    doc.text('Service Charge: 500 FCFA', 20, 205);
    doc.text('Total Amount: 5,500 FCFA', 20, 210);

    // Footer
    doc.setFontSize(10);
    doc.text('Please bring this confirmation and a valid ID to your appointment.', 105, 280, { align: 'center' });
    doc.text('For any questions, please contact the hospital directly.', 105, 285, { align: 'center' });

    // Save the PDF
    doc.save(`appointment-${appointmentCode}.pdf`);
}; 