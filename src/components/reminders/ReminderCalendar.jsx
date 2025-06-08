import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Pill, Calendar as CalendarIcon, Stethoscope } from "lucide-react"
import { cn } from "@/lib/utils"

export function ReminderCalendar({ selectedDate, setSelectedDate, reminders }) {
  const [month, setMonth] = useState(new Date())

  const getRemindersForDate = (date) => {
    return reminders.filter(reminder => {
      const reminderDate = new Date(reminder.date)
      return reminderDate.toDateString() === date.toDateString()
    })
  }

  const getDateModifiers = (date) => {
    const remindersForDate = getRemindersForDate(date)
    const hasHighPriority = remindersForDate.some(r => r.priority === 'high')
    const hasMediumPriority = remindersForDate.some(r => r.priority === 'medium')
    const hasLowPriority = remindersForDate.some(r => r.priority === 'low')

    return {
      hasReminders: remindersForDate.length > 0,
      hasHighPriority,
      hasMediumPriority,
      hasLowPriority,
      reminderCount: remindersForDate.length
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "medication":
        return <Pill className="w-4 h-4 text-green-600" />
      case "appointment":
        return <CalendarIcon className="w-4 h-4 text-blue-600" />
      case "follow-up":
        return <Stethoscope className="w-4 h-4 text-purple-600" />
      default:
        return null
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      case "low":
        return "border-green-500 bg-green-50"
      default:
        return "border-gray-200 bg-white"
    }
  }

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        month={month}
        onMonthChange={setMonth}
        className="rounded-md border"
        modifiers={{
          hasReminders: (date) => getDateModifiers(date).hasReminders,
          hasHighPriority: (date) => getDateModifiers(date).hasHighPriority,
          hasMediumPriority: (date) => getDateModifiers(date).hasMediumPriority,
          hasLowPriority: (date) => getDateModifiers(date).hasLowPriority,
        }}
        modifiersStyles={{
          hasReminders: {
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            borderRadius: '50%'
          },
          hasHighPriority: {
            border: '2px solid #ef4444',
            borderRadius: '50%'
          },
          hasMediumPriority: {
            border: '2px solid #eab308',
            borderRadius: '50%'
          },
          hasLowPriority: {
            border: '2px solid #22c55e',
            borderRadius: '50%'
          }
        }}
      />

      {selectedDate && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              Reminders for {selectedDate.toLocaleDateString()}
            </h3>
            <Badge variant="outline" className="text-sm">
              {getRemindersForDate(selectedDate).length} Reminders
            </Badge>
          </div>
          <div className="space-y-3">
            {getRemindersForDate(selectedDate).length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">
                No reminders scheduled for this date
              </p>
            ) : (
              getRemindersForDate(selectedDate).map((reminder) => (
                <div
                  key={reminder.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border-l-4",
                    getPriorityColor(reminder.priority)
                  )}
                >
                  {getTypeIcon(reminder.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-sm">{reminder.title}</h4>
                      <span className="text-xs text-gray-500">{reminder.time}</span>
                    </div>
                    {reminder.description && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {reminder.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {reminder.frequency}
                      </Badge>
                      {reminder.category && (
                        <Badge variant="outline" className="text-xs">
                          {reminder.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  )
} 