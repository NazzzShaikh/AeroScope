"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Bell } from "lucide-react"

export function AlertButton() {
  const [isSending, setIsSending] = useState(false)

  const sendTestAlert = async () => {
    setIsSending(true)
    
    try {
      const response = await fetch('/api/alerts/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alertData: {
            location: "New York, NY",
            aqi: 156,
            pollutant: "PM2.5",
            level: "Unhealthy",
            message: "Air quality is unhealthy for sensitive groups. Consider limiting outdoor activities."
          }
        })
      })

      if (response.ok) {
        alert('Alert email sent successfully!')
      } else {
        alert('Failed to send alert email')
      }
    } catch (error) {
      alert('Error sending alert')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Button 
      onClick={sendTestAlert} 
      disabled={isSending}
      className="gap-2"
      variant="outline"
    >
      {isSending ? (
        <>
          <Mail className="h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Bell className="h-4 w-4" />
          Send Test Alert
        </>
      )}
    </Button>
  )
}