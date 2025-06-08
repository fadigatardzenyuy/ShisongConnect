import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useReminder } from '@/context/ReminderContext';
import MedicalReportAnalyzer from '@/services/medicalReportAnalyzer';
import { toast } from 'react-hot-toast';

const MedicalReportUpload = () => {
  const { accessToken } = useReminder();
  const [reportText, setReportText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reminders, setReminders] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      setReportText(text);
    } catch (error) {
      console.error('Error reading file:', error);
      toast.error('Error reading the file. Please try again.');
    }
  };

  const handleManualInput = (event) => {
    setReportText(event.target.value);
  };

  const handleAnalyze = async () => {
    if (!reportText.trim()) {
      toast.error('Please enter or upload a medical report first.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const createdReminders = await MedicalReportAnalyzer.analyzeReport(reportText, accessToken);
      setReminders(createdReminders);
      toast.success(`Successfully created ${createdReminders.length} reminders!`);
    } catch (error) {
      console.error('Error analyzing report:', error);
      toast.error('Error analyzing the report. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Medical Report Analysis</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Medical Report
          </label>
          <Input
            type="file"
            accept=".txt,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Or Paste Report Content
          </label>
          <Textarea
            value={reportText}
            onChange={handleManualInput}
            placeholder="Paste your medical report here..."
            className="h-40"
          />
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !reportText.trim()}
          className="w-full"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Report & Create Reminders'}
        </Button>

        {reminders.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Created Reminders:</h3>
            <div className="space-y-2">
              {reminders.map((reminder, index) => (
                <div key={index} className="border rounded p-3">
                  <h4 className="font-medium">{reminder.title}</h4>
                  <p className="text-sm text-gray-600">{reminder.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(reminder.startTime).toLocaleString()} -
                    {new Date(reminder.endTime).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalReportUpload; 