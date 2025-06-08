// Google Calendar API configuration
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const SCOPES = 'https://www.googleapis.com/auth/calendar'

// Check if user is authenticated with Google
export const checkGoogleAuth = async () => {
  try {
    const token = localStorage.getItem('googleAuthToken')
    if (!token) return false

    // Verify token with Google
    const response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.ok
  } catch (error) {
    console.error('Error checking Google auth:', error)
    return false
  }
}

// Initiate Google OAuth flow
export const initiateGoogleAuth = async () => {
  const redirectUri = `${window.location.origin}/auth/google/callback`
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=token&scope=${SCOPES}&access_type=offline&prompt=consent`
  window.location.href = authUrl
}

// Handle Google OAuth callback
export const handleGoogleCallback = (token) => {
  localStorage.setItem('googleAuthToken', token)
}

// Sync reminders with Google Calendar
export const syncWithGoogleCalendar = async (reminders) => {
  try {
    const token = localStorage.getItem('googleAuthToken')
    if (!token) {
      throw new Error('Not authenticated with Google')
    }

    // Filter reminders that need to be synced
    const remindersToSync = reminders.filter(reminder => !reminder.googleCalendarEventId)

    // Create events in Google Calendar
    const syncPromises = remindersToSync.map(async (reminder) => {
      const event = {
        summary: reminder.title,
        description: reminder.description,
        start: {
          dateTime: new Date(`${reminder.date}T${reminder.time}`).toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: new Date(`${reminder.date}T${reminder.time}`).toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 1 day before
            { method: 'popup', minutes: 60 }, // 1 hour before
          ],
        },
      }

      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })

      if (!response.ok) {
        throw new Error('Failed to create Google Calendar event')
      }

      const data = await response.json()
      return {
        reminderId: reminder.id,
        eventId: data.id,
      }
    })

    const results = await Promise.all(syncPromises)

    // Update reminders with Google Calendar event IDs
    const updatedReminders = reminders.map(reminder => {
      const result = results.find(r => r.reminderId === reminder.id)
      if (result) {
        return {
          ...reminder,
          googleCalendarEventId: result.eventId,
        }
      }
      return reminder
    })

    return {
      success: true,
      reminders: updatedReminders,
    }
  } catch (error) {
    console.error('Error syncing with Google Calendar:', error)
    return {
      success: false,
      message: error.message,
    }
  }
}

// Delete event from Google Calendar
export const deleteGoogleCalendarEvent = async (eventId) => {
  try {
    const token = localStorage.getItem('googleAuthToken')
    if (!token) {
      throw new Error('Not authenticated with Google')
    }

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to delete Google Calendar event')
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error deleting Google Calendar event:', error)
    return {
      success: false,
      message: error.message,
    }
  }
}

// Update event in Google Calendar
export const updateGoogleCalendarEvent = async (eventId, reminder) => {
  try {
    const token = localStorage.getItem('googleAuthToken')
    if (!token) {
      throw new Error('Not authenticated with Google')
    }

    const event = {
      summary: reminder.title,
      description: reminder.description,
      start: {
        dateTime: new Date(`${reminder.date}T${reminder.time}`).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: new Date(`${reminder.date}T${reminder.time}`).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 60 }, // 1 hour before
        ],
      },
    }

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })

    if (!response.ok) {
      throw new Error('Failed to update Google Calendar event')
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error updating Google Calendar event:', error)
    return {
      success: false,
      message: error.message,
    }
  }
} 