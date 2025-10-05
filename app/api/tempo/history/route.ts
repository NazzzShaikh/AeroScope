import { NextResponse } from "next/server"
import type { AirQualityReading } from "@/lib/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = Number.parseFloat(searchParams.get("lat") || "40.7128")
  const lon = Number.parseFloat(searchParams.get("lon") || "-74.0060")
  const hours = Number.parseInt(searchParams.get("hours") || "24")

  // Generate historical data for the past N hours
  const history: AirQualityReading[] = []
  const now = Date.now()

  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now - i * 60 * 60 * 1000)
    const hourOfDay = timestamp.getHours()

    // Simulate diurnal patterns (higher pollution during day)
    const dayFactor = Math.sin((hourOfDay / 24) * Math.PI) * 0.3 + 0.7

    history.push({
      timestamp: timestamp.toISOString(),
      ozone: (35 + Math.random() * 25) * dayFactor,
      no2: (20 + Math.random() * 20) * dayFactor,
      so2: (8 + Math.random() * 8) * dayFactor,
      hcho: (5 + Math.random() * 6) * dayFactor,
      aqi: Math.round((50 + Math.random() * 40) * dayFactor),
      location: { lat, lon, name: "Current Location" },
    })
  }

  return NextResponse.json(history)
}
