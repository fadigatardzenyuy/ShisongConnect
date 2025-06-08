import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import reminderService from '@/services/reminderService';
import { useReminder } from '@/context/ReminderContext';
import MedicalReportUpload from './MedicalReportUpload';
import MedicalResultHandler from './MedicalResultHandler';

const Reminder = ({ defaultTab = 'calendar' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken } = useReminder();
  const [reminders, setReminders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    type: 'appointment',
    frequency: 'once',
  });

  // Handle tab changes
  const handleTabChange = (value) => {
    switch (value) {
      case 'calendar':
        navigate('/reminders/calendar');
        break;
      case 'results':
        navigate('/reminders/results');
        break;
      case 'report':
        navigate('/reminders/upload');
        break;
      default:
        navigate('/reminders');
    }
  };

  // Determine active tab from location
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/calendar')) return 'calendar';
    if (path.includes('/results')) return 'results';
    if (path.includes('/upload')) return 'report';
    return defaultTab;
  };

  useEffect(() => {
    fetchReminders();
  }, [selectedDate]);

  const fetchReminders = async () => {
    try {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const auth = await reminderService.initializeGoogleCalendar(accessToken);
      const events = await reminderService.getReminders(auth, startOfDay.toISOString(), endOfDay.toISOString());
      setReminders(events);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  const handleCreateReminder = async () => {
    try {
      const auth = await reminderService.initializeGoogleCalendar(accessToken);
      await reminderService.createReminder(auth, newReminder);
      setIsDialogOpen(false);
      fetchReminders();
      resetForm();
    } catch (error) {
      console.error('Error creating reminder:', error);
    }
  };

  const resetForm = () => {
    setNewReminder({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      type: 'appointment',
      frequency: 'once',
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="results">Medical Results</TabsTrigger>
          <TabsTrigger value="report">Upload Report</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Reminders for {selectedDate.toLocaleDateString()}</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>Add Reminder</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Reminder</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Title"
                        value={newReminder.title}
                        onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                      />
                      <Textarea
                        placeholder="Description"
                        value={newReminder.description}
                        onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="datetime-local"
                          value={newReminder.startTime}
                          onChange={(e) => setNewReminder({ ...newReminder, startTime: e.target.value })}
                        />
                        <Input
                          type="datetime-local"
                          value={newReminder.endTime}
                          onChange={(e) => setNewReminder({ ...newReminder, endTime: e.target.value })}
                        />
                      </div>
                      <Select
                        value={newReminder.type}
                        onValueChange={(value) => setNewReminder({ ...newReminder, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="appointment">Appointment</SelectItem>
                          <SelectItem value="medication">Medication</SelectItem>
                          <SelectItem value="follow-up">Follow-up</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={newReminder.frequency}
                        onValueChange={(value) => setNewReminder({ ...newReminder, frequency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="once">Once</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handleCreateReminder} className="w-full">
                        Create Reminder
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {reminders.map((reminder) => (
                  <div key={reminder.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold">{reminder.summary}</h3>
                    <p className="text-gray-600">{reminder.description}</p>
                    <div className="text-sm text-gray-500">
                      {new Date(reminder.start.dateTime).toLocaleTimeString()} -
                      {new Date(reminder.end.dateTime).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="results">
          <MedicalResultHandler />
        </TabsContent>

        <TabsContent value="report">
          <MedicalReportUpload />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reminder; 