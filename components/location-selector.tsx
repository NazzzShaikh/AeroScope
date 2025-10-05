"use client"

import { MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const popularLocations = [
  { name: "New York, NY", lat: 40.7128, lon: -74.006 },
  { name: "Los Angeles, CA", lat: 34.0522, lon: -118.2437 },
  { name: "Chicago, IL", lat: 41.8781, lon: -87.6298 },
  { name: "Houston, TX", lat: 29.7604, lon: -95.3698 },
]

export function LocationSelector() {
  const [location, setLocation] = useState("New York, NY")

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Location</h3>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button size="icon" variant="outline">
            <MapPin className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">Popular locations</span>
          <div className="flex flex-wrap gap-2">
            {popularLocations.map((loc) => (
              <Button
                key={loc.name}
                variant="outline"
                size="sm"
                onClick={() => setLocation(loc.name)}
                className="text-xs"
              >
                {loc.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
