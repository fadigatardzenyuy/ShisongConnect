import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useReminder } from '@/context/ReminderContext';
import MedicalResultService from '@/services/medicalResultService';
import { toast } from 'react-hot-toast';

const MedicalResultHandler = () => {
  const { accessToken } = useReminder();
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [medicationDescription, setMedicationDescription] = useState('');
  const [isProcessingMedication, setIsProcessingMedication] = useState(false);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const medicalResults = await MedicalResultService.getMedicalResults();
      setResults(medicalResults);
    } catch (error) {
      console.error('Error loading results:', error);
      toast.error('Error loading medical results');
    }
  };

  const handleProcessResult = async (resultId) => {
    setIsProcessing(true);
    try {
      const { result, reminders } = await MedicalResultService.processMedicalResult(resultId, accessToken);
      setSelectedResult(result);
      toast.success(`Created ${reminders.length} reminders from the result`);
      loadResults();
    } catch (error) {
      console.error('Error processing result:', error);
      toast.error('Error processing medical result');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessMedication = async () => {
    if (!medicationDescription.trim()) {
      toast.error('Please enter medication description');
      return;
    }

    setIsProcessingMedication(true);
    try {
      const reminders = await MedicalResultService.processMedicationDescription(
        medicationDescription,
        accessToken
      );
      toast.success(`Created ${reminders.length} reminders for your medication`);
      setMedicationDescription('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error processing medication:', error);
      toast.error('Error processing medication description');
    } finally {
      setIsProcessingMedication(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Medical Results</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Medication</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Describe Your Medication</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="Example: Take Amoxicillin 500mg twice daily for 7 days"
                  value={medicationDescription}
                  onChange={(e) => setMedicationDescription(e.target.value)}
                  className="h-32"
                />
                <Button
                  onClick={handleProcessMedication}
                  disabled={isProcessingMedication || !medicationDescription.trim()}
                  className="w-full"
                >
                  {isProcessingMedication ? 'Processing...' : 'Create Reminders'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.id}
              className={`border rounded-lg p-4 ${result.status === 'unread' ? 'bg-blue-50' : ''
                }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{result.hospitalName}</h3>
                  <p className="text-sm text-gray-600">
                    Received: {new Date(result.receivedAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">{result.content}</p>
                </div>
                {result.status === 'unread' && (
                  <Button
                    onClick={() => handleProcessResult(result.id)}
                    disabled={isProcessing}
                    variant="outline"
                  >
                    {isProcessing ? 'Processing...' : 'Process Result'}
                  </Button>
                )}
              </div>
              {result.reminders && result.reminders.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Created Reminders:</h4>
                  <div className="space-y-2">
                    {result.reminders.map((reminder, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        • {reminder.title} - {reminder.description}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {results.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No medical results received yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalResultHandler; 