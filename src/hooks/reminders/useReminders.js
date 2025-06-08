import { useState } from "react"

const initialReminders = [
    {
        id: 1,
        title: "Take Morning Medication",
        description: "Lisinopril 10mg for blood pressure",
        type: "medication",
        time: "08:00",
        frequency: "Daily",
        nextDue: "2024-03-16T08:00:00",
        status: "active",
        priority: "high",
        completed: false,
    },
    {
        id: 2,
        title: "Cardiology Appointment",
        description: "Follow-up with Dr. Marie Fotso",
        type: "appointment",
        time: "14:30",
        frequency: "One-time",
        nextDue: "2024-03-16T14:30:00",
        status: "active",
        priority: "high",
        completed: false,
    },
    {
        id: 3,
        title: "Blood Pressure Check",
        description: "Weekly blood pressure monitoring",
        type: "health",
        time: "09:00",
        frequency: "Weekly",
        nextDue: "2024-03-18T09:00:00",
        status: "active",
        priority: "medium",
        completed: false,
    },
    {
        id: 4,
        title: "Exercise Routine",
        description: "30 minutes of walking",
        type: "lifestyle",
        time: "17:00",
        frequency: "Daily",
        nextDue: "2024-03-16T17:00:00",
        status: "active",
        priority: "medium",
        completed: true,
    },
    {
        id: 5,
        title: "Annual Physical Exam",
        description: "Schedule annual checkup",
        type: "appointment",
        time: "10:00",
        frequency: "Yearly",
        nextDue: "2024-06-15T10:00:00",
        status: "active",
        priority: "low",
        completed: false,
    },
]

export function useReminders() {
    const [reminders, setReminders] = useState(initialReminders)
    const [showAddForm, setShowAddForm] = useState(false)
    const [selectedDate, setSelectedDate] = useState()
    const [newReminder, setNewReminder] = useState({
        title: "",
        description: "",
        type: "medication",
        time: "",
        frequency: "daily",
        priority: "medium",
    })

    const addReminder = () => {
        const reminder = {
            id: reminders.length + 1,
            ...newReminder,
            status: "active",
            completed: false,
            nextDue: new Date().toISOString(), // This should be calculated based on frequency
        }
        setReminders([...reminders, reminder])
        setShowAddForm(false)
        setNewReminder({
            title: "",
            description: "",
            type: "medication",
            time: "",
            frequency: "daily",
            priority: "medium",
        })
    }

    const toggleReminderComplete = (id) => {
        setReminders(
            reminders.map((reminder) =>
                reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
            )
        )
    }

    const deleteReminder = (id) => {
        setReminders(reminders.filter((reminder) => reminder.id !== id))
    }

    const updateReminder = (id, updatedData) => {
        setReminders(
            reminders.map((reminder) =>
                reminder.id === id ? { ...reminder, ...updatedData } : reminder
            )
        )
    }

    const getUpcomingReminders = () => {
        return reminders
            .filter((reminder) => !reminder.completed)
            .sort((a, b) => new Date(a.nextDue).getTime() - new Date(b.nextDue).getTime())
            .slice(0, 5)
    }

    const getRemindersByDate = (date) => {
        return reminders.filter((reminder) => {
            const reminderDate = new Date(reminder.nextDue).toDateString()
            return date.toDateString() === reminderDate
        })
    }

    const getStats = () => {
        return {
            active: reminders.filter((r) => !r.completed).length,
            completed: reminders.filter((r) => r.completed).length,
            highPriority: reminders.filter((r) => r.priority === "high" && !r.completed).length,
        }
    }

    return {
        reminders,
        showAddForm,
        setShowAddForm,
        selectedDate,
        setSelectedDate,
        newReminder,
        setNewReminder,
        addReminder,
        toggleReminderComplete,
        deleteReminder,
        updateReminder,
        getUpcomingReminders,
        getRemindersByDate,
        getStats,
    }
} 