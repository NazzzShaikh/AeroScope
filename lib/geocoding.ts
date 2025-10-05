// Alternative geocoding using a free service
export async function getCoordinates(location: string): Promise<{lat: number, lng: number} | null> {
  try {
    // Using Nominatim (OpenStreetMap) - free geocoding service
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`
    )
    const data = await response.json()
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      }
    }
    return null
  } catch (error) {
    console.error('Geocoding failed:', error)
    return null
  }
}