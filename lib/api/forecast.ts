import type { ForecastData } from "@/lib/types"

// Air quality forecasting using machine learning and atmospheric models
export async function fetchAirQualityForecast(lat: number, lon: number, hours = 48): Promise<ForecastData[]> {
  try {
    const response = await fetch(`/api/forecast?lat=${lat}&lon=${lon}&hours=${hours}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch forecast data")
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching forecast:", error)
    return []
  }
}

// Generate alerts based on forecast data
export async function fetchAlerts(lat: number, lon: number) {
  try {
    const response = await fetch(`/api/alerts?lat=${lat}&lon=${lon}`, {
      next: { revalidate: 900 }, // Cache for 15 minutes
    })

    if (!response.ok) {
      throw new Error("Failed to fetch alerts")
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching alerts:", error)
    return []
  }
}
