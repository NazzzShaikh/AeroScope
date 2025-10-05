import type { AirQualityReading } from "@/lib/types"

// NASA TEMPO API integration
// TEMPO provides hourly measurements of key pollutants over North America
export async function fetchTEMPOData(lat: number, lon: number): Promise<AirQualityReading | null> {
  try {
    // In production, this would call the actual NASA TEMPO API
    // For demo purposes, we'll simulate the data structure
    const response = await fetch(`/api/tempo?lat=${lat}&lon=${lon}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch TEMPO data")
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching TEMPO data:", error)
    return null
  }
}

// Fetch historical TEMPO data for trend analysis
export async function fetchTEMPOHistory(lat: number, lon: number, hours = 24): Promise<AirQualityReading[]> {
  try {
    const response = await fetch(`/api/tempo/history?lat=${lat}&lon=${lon}&hours=${hours}`, {
      next: { revalidate: 1800 }, // Cache for 30 minutes
    })

    if (!response.ok) {
      throw new Error("Failed to fetch TEMPO history")
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching TEMPO history:", error)
    return []
  }
}
