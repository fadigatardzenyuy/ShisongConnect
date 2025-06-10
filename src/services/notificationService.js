// Initialize Twilio client
const accountSid = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
const authToken = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = import.meta.env.VITE_TWILIO_PHONE_NUMBER;
const twilioWhatsAppNumber = import.meta.env.VITE_TWILIO_WHATSAPP_NUMBER;

let client = null;

// Initialize Twilio client dynamically
const initializeTwilio = async () => {
  if (!client) {
    const twilio = await import('twilio');
    client = twilio.default(accountSid, authToken);
  }
  return client;
};

class NotificationService {
  // Send SMS notification
  async sendSMS(to, message) {
    try {
      const twilioClient = await initializeTwilio();
      const response = await twilioClient.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: to
      });
      return { success: true, messageId: response.sid };
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }

  // Send WhatsApp notification
  async sendWhatsApp(to, message) {
    try {
      const twilioClient = await initializeTwilio();
      const response = await twilioClient.messages.create({
        body: message,
        from: `whatsapp:${twilioWhatsAppNumber}`,
        to: `whatsapp:${to}`
      });
      return { success: true, messageId: response.sid };
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  }

  // Format reminder message
  formatReminderMessage(reminder) {
    const { title, description, type, date, time } = reminder;
    const formattedDate = new Date(date).toLocaleDateString();
    const formattedTime = new Date(time).toLocaleTimeString();

    return `🔔 Reminder: ${title}\n\n` +
           `📝 Description: ${description}\n` +
           `📅 Date: ${formattedDate}\n` +
           `⏰ Time: ${formattedTime}\n` +
           `🏥 Type: ${type}\n\n` +
           `Please don't forget to attend to this important reminder.`;
  }

  // Send reminder notifications
  async sendReminderNotifications(reminder, patientContact) {
    const message = this.formatReminderMessage(reminder);
    const notifications = [];

    // Send SMS if phone number is available
    if (patientContact.phone) {
      try {
        const smsResult = await this.sendSMS(patientContact.phone, message);
        notifications.push({
          type: 'sms',
          success: true,
          messageId: smsResult.messageId
        });
      } catch (error) {
        notifications.push({
          type: 'sms',
          success: false,
          error: error.message
        });
      }
    }

    // Send WhatsApp if WhatsApp number is available
    if (patientContact.whatsapp) {
      try {
        const whatsappResult = await this.sendWhatsApp(patientContact.whatsapp, message);
        notifications.push({
          type: 'whatsapp',
          success: true,
          messageId: whatsappResult.messageId
        });
      } catch (error) {
        notifications.push({
          type: 'whatsapp',
          success: false,
          error: error.message
        });
      }
    }

    return notifications;
  }
}

export default new NotificationService(); 