import { NextResponse } from "next/server"
import type { WeatherData } from "@/lib/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = Number.parseFloat(searchParams.get("lat") || "40.7128")
  const lon = Number.parseFloat(searchParams.get("lon") || "-74.0060")

  // Mock weather data
  // In production, integrate with OpenWeatherMap, NOAA, or similar
  const mockWeather: WeatherData = {
    temperature: 22 + Math.random() * 8,
    humidity: 50 + Math.random() * 30,
    windSpeed: 5 + Math.random() * 10,
    windDirection: Math.random() * 360,
    pressure: 1013 + Math.random() * 20 - 10,
  }

  return NextResponse.json(mockWeather)
}
