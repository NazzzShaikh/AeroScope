import { NextResponse } from "next/server"
import type { AirQualityReading } from "@/lib/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = Number.parseFloat(searchParams.get("lat") || "40.7128")
  const lon = Number.parseFloat(searchParams.get("lon") || "-74.0060")

  // Mock ground sensor data from Pandora network and OpenAQ
  const mockSensors: AirQualityReading[] = [
    {
      timestamp: new Date().toISOString(),
      ozone: 42 + Math.random() * 15,
      no2: 26 + Math.random() * 12,
      so2: 11 + Math.random() * 6,
      hcho: 8 + Math.random() * 4,
      aqi: 65,
      location: { lat: lat + 0.01, lon: lon + 0.01, name: "Sensor Station A" },
    },
    {
      timestamp: new Date().toISOString(),
      ozone: 48 + Math.random() * 15,
      no2: 24 + Math.random() * 12,
      so2: 9 + Math.random() * 6,
      hcho: 7 + Math.random() * 4,
      aqi: 70,
      location: { lat: lat - 0.01, lon: lon - 0.01, name: "Sensor Station B" },
    },
  ]

  return NextResponse.json(mockSensors)
}
