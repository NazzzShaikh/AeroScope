"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export function CoordinateFetcher() {
  const [location, setLocation] = useState("")
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchCoordinates = async () => {
    if (!location) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/geocode?address=${encodeURIComponent(location)}`)
      const data = await response.json()
      
      if (data.results && data.results.length > 0) {
        const coords = data.results[0].geometry.location
        setCoordinates({ lat: coords.lat, lng: coords.lng })
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="font-semibold flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        Get Coordinates
      </h3>
      
      <div className="flex gap-2">
        <Input
          placeholder="Enter location (e.g., New York, USA)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchCoordinates()}
        />
        <Button onClick={fetchCoordinates} disabled={loading}>
          {loading ? "..." : "Get"}
        </Button>
      </div>
      
      {coordinates && (
        <div className="bg-muted p-3 rounded">
          <p className="text-sm font-medium">Coordinates:</p>
          <p className="text-sm">Latitude: {coordinates.lat}</p>
          <p className="text-sm">Longitude: {coordinates.lng}</p>
        </div>
      )}
    </div>
  )
}