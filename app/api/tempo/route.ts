import { NextResponse } from "next/server"
import type { AirQualityReading } from "@/lib/types"

// Mock NASA TEMPO API endpoint
// In production, this would integrate with actual NASA EarthData APIs
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = Number.parseFloat(searchParams.get("lat") || "40.7128")
  const lon = Number.parseFloat(searchParams.get("lon") || "-74.0060")

  // Simulate TEMPO satellite data
  // Real implementation would fetch from NASA's TEMPO data portal
  const mockData: AirQualityReading = {
    timestamp: new Date().toISOString(),
    ozone: 45 + Math.random() * 20,
    no2: 25 + Math.random() * 15,
    so2: 10 + Math.random() * 8,
    hcho: 7 + Math.random() * 5,
    aqi: 68,
    location: {
      lat,
      lon,
      name: "Current Location",
    },
  }

  return NextResponse.json(mockData)
}
