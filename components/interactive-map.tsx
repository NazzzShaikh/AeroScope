"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Layers } from "lucide-react"

const pollutants = [
  { name: "Ozone (O₃)", level: 85, color: "bg-orange-500", unit: "ppb" },
  { name: "NO₂", level: 42, color: "bg-red-500", unit: "ppb" },
  { name: "SO₂", level: 15, color: "bg-yellow-500", unit: "ppb" },
  { name: "PM2.5", level: 28, color: "bg-purple-500", unit: "μg/m³" },
]

export function InteractiveMap() {
  const [selectedPollutant, setSelectedPollutant] = useState("Ozone (O₃)")

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {pollutants.map((pollutant) => (
          <Button
            key={pollutant.name}
            variant={selectedPollutant === pollutant.name ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPollutant(pollutant.name)}
            className="gap-2"
          >
            <div className={`w-3 h-3 rounded-full ${pollutant.color}`} />
            {pollutant.name}
          </Button>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Layers className="h-5 w-5" />
            {selectedPollutant} Levels
          </h3>
          <Badge variant="outline">Live Data</Badge>
        </div>
        
        <div className="bg-muted rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20" />
          <div className="relative z-10 text-center space-y-4">
            <MapPin className="h-12 w-12 mx-auto text-primary" />
            <div>
              <h4 className="text-xl font-semibold">Interactive Map View</h4>
              <p className="text-muted-foreground">
                Showing {selectedPollutant} concentrations across regions
              </p>
            </div>
          </div>
          
          {/* Sample data points */}
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
          <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-orange-500 rounded-full animate-pulse" />
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {pollutants.map((pollutant) => (
            <div key={pollutant.name} className="text-center p-3 bg-muted/50 rounded-lg">
              <div className={`w-4 h-4 rounded-full ${pollutant.color} mx-auto mb-2`} />
              <div className="text-sm font-medium">{pollutant.name}</div>
              <div className="text-xs text-muted-foreground">
                {pollutant.level} {pollutant.unit}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}