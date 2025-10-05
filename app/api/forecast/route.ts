import { NextResponse } from "next/server"
import type { ForecastData } from "@/lib/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = Number.parseFloat(searchParams.get("lat") || "40.7128")
  const lon = Number.parseFloat(searchParams.get("lon") || "-74.0060")
  const hours = Number.parseInt(searchParams.get("hours") || "48")

  // Generate forecast data
  // In production, this would use ML models trained on historical data
  // combining TEMPO satellite data, weather patterns, and atmospheric models
  const forecast: ForecastData[] = []
  const now = Date.now()

  for (let i = 1; i <= hours; i++) {
    const timestamp = new Date(now + i * 60 * 60 * 1000)
    const hourOfDay = timestamp.getHours()

    // Simulate diurnal patterns and weather influence
    const dayFactor = Math.sin((hourOfDay / 24) * Math.PI) * 0.4 + 0.7
    const randomVariation = 0.9 + Math.random() * 0.2

    // Add some trend (improving or worsening conditions)
    const trendFactor = 1 - i * 0.005

    const baseAQI = 65
    const predictedAQI = Math.round(baseAQI * dayFactor * randomVariation * trendFactor)

    // Confidence decreases with time
    const confidence = Math.max(0.5, 0.95 - i * 0.01)

    forecast.push({
      timestamp: timestamp.toISOString(),
      aqi: Math.max(0, Math.min(300, predictedAQI)),
      pollutants: {
        ozone: (40 + Math.random() * 20) * dayFactor * trendFactor,
        no2: (25 + Math.random() * 15) * dayFactor * trendFactor,
        so2: (10 + Math.random() * 8) * dayFactor * trendFactor,
        hcho: (7 + Math.random() * 5) * dayFactor * trendFactor,
      },
      confidence: Math.round(confidence * 100) / 100,
    })
  }

  return NextResponse.json(forecast)
}
