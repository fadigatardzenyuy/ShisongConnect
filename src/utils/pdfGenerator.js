import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';

// Base64 encoded SHICo logo (a simple green cross with text)
const SHICO_LOGO = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48c3R5bGU+LmNyb3Nze2ZpbGw6IzE2QTM0QTt9LnRleHR7ZmlsbDojMDUyRTE2O2ZvbnQtZmFtaWx5OkFyaWFsO2ZvbnQtd2VpZ2h0OmJvbGQ7fTwvc3R5bGU+PHBhdGggY2xhc3M9ImNyb3NzIiBkPSJNODAgNDBoNDB2NDBoNDB2NDBIMTIwdjQwSDgwVjEyMEg0MFY4MEg4MFY0MHoiLz48dGV4dCB4PSIxMDAiIHk9IjE4MCIgY2xhc3M9InRleHQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjRweCI+U0hJQ08gSG9zcGl0YWw8L3RleHQ+PC9zdmc+';

export const generateAppointmentPDF = async (appointmentData, paymentData) => {
    const doc = new jsPDF();

    // Add hospital logo
    try {
        doc.addImage(SHICO_LOGO, 'PNG', 20, 10, 30, 30);
    } catch (error) {
        console.log('Error adding logo, using text instead');
        // Fallback to text if logo fails
        doc.setFontSize(24);
        doc.setTextColor(22, 197, 94); // Green color
        doc.text('SHICo Hospital', 105, 25, { align: 'center' });
    }

    // Add header
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Appointment Confirmation', 105, 45, { align: 'center' });

    // Add appointment details
    doc.setFontSize(12);
    doc.text('Appointment Details:', 20, 60);

    const appointmentTableData = [
        ['Patient ID', appointmentData.patientId],
        ['Queue Number', appointmentData.queueNumber],
        ['Appointment Date', appointmentData.appointmentDate],
        ['Department', appointmentData.department],
        ['Doctor', appointmentData.doctor],
        ['Visit Reason', appointmentData.visitReason]
    ];

    autoTable(doc, {
        startY: 65,
        head: [['Field', 'Value']],
        body: appointmentTableData,
        theme: 'grid',
        headStyles: { fillColor: [22, 197, 94] },
        styles: { fontSize: 10 },
        columnStyles: {
            0: { cellWidth: 60 },
            1: { cellWidth: 100 }
        }
    });

    // Add payment details
    doc.text('Payment Details:', 20, doc.lastAutoTable.finalY + 15);

    const paymentTableData = [
        ['Amount', `XAF ${paymentData.amount.toLocaleString()}`],
        ['Payment Method', paymentData.method],
        ['Phone Number', paymentData.phoneNumber],
        ['Transaction ID', paymentData.transactionId],
        ['Payment Date', new Date().toLocaleDateString()],
        ['Status', 'Completed']
    ];

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 20,
        head: [['Field', 'Value']],
        body: paymentTableData,
        theme: 'grid',
        headStyles: { fillColor: [22, 197, 94] },
        styles: { fontSize: 10 },
        columnStyles: {
            0: { cellWidth: 60 },
            1: { cellWidth: 100 }
        }
    });

    // Add QR Code
    const qrData = JSON.stringify({
        patientId: appointmentData.patientId,
        queueNumber: appointmentData.queueNumber,
        appointmentDate: appointmentData.appointmentDate,
        transactionId: paymentData.transactionId
    });

    try {
        const qrCodeDataUrl = await QRCode.toDataURL(qrData);
        doc.addImage(qrCodeDataUrl, 'PNG', 20, doc.lastAutoTable.finalY + 20, 40, 40);
        doc.text('Scan to verify appointment', 40, doc.lastAutoTable.finalY + 65);
    } catch (error) {
        console.error('Error generating QR code:', error);
    }

    // Add footer
    const footerY = doc.lastAutoTable.finalY + 80;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for choosing SHICo Hospital', 105, footerY, { align: 'center' });
    doc.text('Please keep this receipt for your records', 105, footerY + 7, { align: 'center' });
    doc.text('For any queries, contact: support@shico.com', 105, footerY + 14, { align: 'center' });

    // Force download using data URI
    const pdfDataUri = doc.output('datauristring');
    const downloadLink = document.createElement('a');
    downloadLink.href = pdfDataUri;
    downloadLink.download = `appointment-confirmation-${appointmentData.patientId}.pdf`;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    return doc;
};

const loadImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}; 