import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X, Save } from "lucide-react"
import { useState } from "react"

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
    // Here you would typically save the template to a database or local storage
    // For now, we'll just show a success message
    setIsSavingTemplate(false)
    setTemplateName("")
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900">Add New Reminder</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowAddForm(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Templates Section */}
      <div className="mb-6">
        <Label className="mb-2 block">Quick Templates</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {Object.entries(REMINDER_TEMPLATES).map(([key, template]) => (
            <Button
              key={key}
              variant="outline"
              className="justify-start"
              onClick={() => applyTemplate(template)}
            >
              {template.title}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="flex justify-between gap-3 pt-4">
          <Button
            variant="outline"
            onClick={saveAsTemplate}
            className="w-full md:w-auto"
          >
            <Save className="w-4 h-4 mr-2" />
            Save as Template
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAddForm(false)}
              className="w-full md:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddReminder}
              className="w-full md:w-auto bg-green-600 text-white hover:bg-green-700"
            >
              Add Reminder
            </Button>
          </div>
        </div>
      </div>

      {/* Save Template Dialog */}
      {isSavingTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Save as Template</h3>
            <Input
              placeholder="Template name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsSavingTemplate(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveTemplate}
                disabled={!templateName}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 