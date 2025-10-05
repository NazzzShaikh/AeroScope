import { NextResponse } from "next/server"
import type { Alert } from "@/lib/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = Number.parseFloat(searchParams.get("lat") || "40.7128")
  const lon = Number.parseFloat(searchParams.get("lon") || "-74.0060")

  // Generate alerts based on current and forecasted conditions
  const alerts: Alert[] = []

  // Simulate various alert conditions
  const currentHour = new Date().getHours()

  if (currentHour >= 12 && currentHour <= 16) {
    alerts.push({
      id: "alert-1",
      type: "warning",
      title: "Elevated Ozone Levels Expected",
      message: "Ozone concentrations may reach moderate levels this afternoon due to high temperatures and sunlight.",
      time: "10 minutes ago",
      location: "Downtown Area",
      severity: "medium",
    })
  }

  alerts.push({
    id: "alert-2",
    type: "info",
    title: "Air Quality Improving",
    message: "Wind patterns from the northwest bringing cleaner air. Expect gradual improvement over next 6 hours.",
    time: "1 hour ago",
    location: "City-wide",
    severity: "low",
  })

  if (Math.random() > 0.5) {
    alerts.push({
      id: "alert-3",
      type: "success",
      title: "Good Air Quality Maintained",
      message: "All pollutants remain within healthy ranges. Great conditions for outdoor activities.",
      time: "2 hours ago",
      location: "Suburban Areas",
      severity: "low",
    })
  }

  // Check for wildfire smoke or dust events
  if (Math.random() > 0.8) {
    alerts.push({
      id: "alert-4",
      type: "warning",
      title: "Wildfire Smoke Detected",
      message:
        "Satellite data shows smoke plumes from distant wildfires. Sensitive groups should limit outdoor exposure.",
      time: "30 minutes ago",
      location: "Northern Regions",
      severity: "high",
    })
  }

  return NextResponse.json(alerts)
}
