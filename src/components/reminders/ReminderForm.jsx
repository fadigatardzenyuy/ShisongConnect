import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X, Save, Bell } from "lucide-react"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

const REMINDER_TEMPLATES = {
  "daily-medication": {
    title: "Daily Medication",
    description: "Take your daily medication",
    type: "medication",
    frequency: "daily",
    priority: "high",
  },
  "weekly-checkup": {
    title: "Weekly Checkup",
    description: "Weekly health checkup appointment",
    type: "appointment",
    frequency: "weekly",
    priority: "medium",
  },
  "monthly-followup": {
    title: "Monthly Follow-up",
    description: "Monthly follow-up with doctor",
    type: "follow-up",
    frequency: "monthly",
    priority: "medium",
  },
}

const REMINDER_CATEGORIES = [
  "General",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Other",
]

export function ReminderForm({ showAddForm, setShowAddForm, newReminder, setNewReminder, handleAddReminder }) {
  const [isSavingTemplate, setIsSavingTemplate] = useState(false)
  const [templateName, setTemplateName] = useState("")
  const [notificationPreferences, setNotificationPreferences] = useState({
    sms: false,
    whatsapp: false,
    email: false
  })

  const applyTemplate = (template) => {
    setNewReminder({
      ...newReminder,
      ...template,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
    })
  }

  const saveAsTemplate = () => {
    setIsSavingTemplate(true)
  }

  const handleSaveTemplate = () => {
    setIsSavingTemplate(false)
    setTemplateName("")
  }

  return (
    <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newReminder.title}
              onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
              placeholder="Enter reminder title"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={newReminder.type}
              onValueChange={(value) => setNewReminder({ ...newReminder, type: value })}
            >
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medication">Medication</SelectItem>
                <SelectItem value="appointment">Appointment</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={newReminder.description}
            onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
            placeholder="Enter reminder description"
            className="w-full min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={newReminder.date}
              onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={newReminder.time}
              onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
              className="w-full"
            />
          </div>
        </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select
              value={newReminder.frequency}
              onValueChange={(value) => setNewReminder({ ...newReminder, frequency: value })}
            >
              <SelectTrigger id="frequency" className="w-full">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="once">Once</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={newReminder.priority}
              onValueChange={(value) => setNewReminder({ ...newReminder, priority: value })}
            >
              <SelectTrigger id="priority" className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={newReminder.category || "General"}
            onValueChange={(value) => setNewReminder({ ...newReminder, category: value })}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {REMINDER_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      {/* Notification Preferences Section */}
      <div className="space-y-4 border-t pt-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Notification Preferences</Label>
          <Bell className="w-5 h-5 text-gray-500" />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-notification" className="flex items-center gap-2">
              <Checkbox
                id="sms-notification"
                checked={notificationPreferences.sms}
                onCheckedChange={(checked) => 
                  setNotificationPreferences({ ...notificationPreferences, sms: checked })
                }
              />
              SMS Notification
            </Label>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="whatsapp-notification" className="flex items-center gap-2">
              <Checkbox
                id="whatsapp-notification"
                checked={notificationPreferences.whatsapp}
                onCheckedChange={(checked) => 
                  setNotificationPreferences({ ...notificationPreferences, whatsapp: checked })
                }
              />
              WhatsApp Notification
            </Label>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="email-notification" className="flex items-center gap-2">
              <Checkbox
                id="email-notification"
                checked={notificationPreferences.email}
                onCheckedChange={(checked) => 
                  setNotificationPreferences({ ...notificationPreferences, email: checked })
                }
              />
              Email Notification
            </Label>
          </div>
        </div>
      </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
          onClick={() => setShowAddForm(false)}
          className="flex items-center gap-2"
              >
          <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button
          onClick={() => handleAddReminder({ ...newReminder, notificationPreferences })}
          className="flex items-center gap-2"
              >
          <Save className="w-4 h-4" />
          Save Reminder
              </Button>
            </div>
    </div>
  );
} 