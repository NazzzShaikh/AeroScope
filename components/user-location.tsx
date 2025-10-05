"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import Cookies from "js-cookie"
import { verifyToken } from "@/lib/auth"

export function UserLocation() {
  const [userLocation, setUserLocation] = useState<{
    location: string
    latitude: number
    longitude: number
  } | null>(null)

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      // In a real app, you'd fetch user data from API
      // For now, we'll show sample coordinates
      setUserLocation({
        location: "Current Location",
        latitude: 40.7128,
        longitude: -74.0060
      })
    }
  }, [])

  if (!userLocation) return null

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <MapPin className="h-5 w-5 text-primary" />
        <div>
          <h3 className="font-semibold">Your Location</h3>
          <p className="text-sm text-muted-foreground">{userLocation.location}</p>
          <p className="text-xs text-muted-foreground">
            {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
          </p>
        </div>
      </div>
    </Card>
  )
}