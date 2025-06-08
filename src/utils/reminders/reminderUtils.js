import { Bell, CalendarIcon, Clock, Pill, Stethoscope } from "lucide-react"

export const getReminderIcon = (type) => {
    switch (type) {
        case "medication":
            return Pill
        case "appointment":
            return CalendarIcon
        case "health":
            return Stethoscope
        case "lifestyle":
            return Bell
        default:
            return Bell
    }
}

export const getPriorityColor = (priority) => {
    switch (priority) {
        case "high":
            return "bg-red-100 text-red-700 border-red-200"
        case "medium":
            return "bg-blue-100 text-blue-700 border-blue-200"
        case "low":
            return "bg-gray-100 text-gray-700 border-gray-200"
        default:
            return "bg-gray-100 text-gray-700 border-gray-200"
    }
}

export const getTypeColor = (type) => {
    switch (type) {
        case "medication":
            return "bg-blue-100 text-blue-700"
        case "appointment":
            return "bg-green-100 text-green-700"
        case "health":
            return "bg-purple-100 text-purple-700"
        case "lifestyle":
            return "bg-orange-100 text-orange-700"
        default:
            return "bg-gray-100 text-gray-700"
    }
}

export const calculateNextDueDate = (frequency, currentDate = new Date()) => {
    const date = new Date(currentDate)

    switch (frequency.toLowerCase()) {
        case "daily":
            date.setDate(date.getDate() + 1)
            break
        case "weekly":
            date.setDate(date.getDate() + 7)
            break
        case "monthly":
            date.setMonth(date.getMonth() + 1)
            break
        case "yearly":
            date.setFullYear(date.getFullYear() + 1)
            break
        default:
            // For one-time reminders, return the same date
            break
    }

    return date
}

export const formatReminderTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export const formatReminderDate = (date) => {
    return new Date(date).toLocaleDateString([], {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

export const isOverdue = (dueDate) => {
    const now = new Date()
    const due = new Date(dueDate)
    return due < now
}

export const getReminderStatus = (reminder) => {
    if (reminder.completed) return "completed"
    if (isOverdue(reminder.nextDue)) return "overdue"
    return "upcoming"
} 