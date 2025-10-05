import type { AirQualityReading } from "@/lib/types"

// Pandora Network and OpenAQ ground sensor integration
export async function fetchGroundSensorData(lat: number, lon: number): Promise<AirQualityReading[]> {
  try {
    // Integrate with Pandora and OpenAQ APIs for ground-based validation
    const response = await fetch(`/api/ground-sensors?lat=${lat}&lon=${lon}`, {
      next: { revalidate: 900 }, // Cache for 15 minutes
    })

    if (!response.ok) {
      throw new Error("Failed to fetch ground sensor data")
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching ground sensor data:", error)
    return []
  }
}

// Fetch OpenAQ data specifically
export async function fetchOpenAQData(lat: number, lon: number, radius = 25): Promise<any[]> {
  try {
    // OpenAQ API provides global air quality data
    const response = await fetch(
      `https://api.openaq.org/v2/measurements?coordinates=${lat},${lon}&radius=${radius * 1000}&limit=100`,
      {
        next: { revalidate: 900 },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch OpenAQ data")
    }

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error("[v0] Error fetching OpenAQ data:", error)
    return []
  }
}
