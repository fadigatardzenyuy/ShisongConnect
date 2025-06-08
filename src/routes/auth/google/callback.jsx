import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleGoogleCallback } from '@/lib/googleCalendar'

export default function GoogleAuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = () => {
      // Get token from URL hash
      const hash = window.location.hash.substring(1)
      const params = new URLSearchParams(hash)
      const token = params.get('access_token')

      if (token) {
        // Store token and redirect back to reminders
        handleGoogleCallback(token)
        navigate('/patient/reminders', { 
          state: { 
            message: 'Successfully connected to Google Calendar',
            type: 'success'
          }
        })
      } else {
        // Handle error
        navigate('/patient/reminders', { 
          state: { 
            message: 'Failed to connect to Google Calendar',
            type: 'error'
          }
        })
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Connecting to Google Calendar...
        </h2>
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  )
} 