// Calculate Air Quality Index from pollutant concentrations
export function calculateAQI(pollutants: {
  ozone?: number // ppb
  no2?: number // ppb
  so2?: number // ppb
  pm25?: number // μg/m³
  pm10?: number // μg/m³
}): number {
  const aqiValues: number[] = []

  // Ozone (8-hour average) - ppb to AQI
  if (pollutants.ozone !== undefined) {
    aqiValues.push(calculateOzoneAQI(pollutants.ozone))
  }

  // NO2 (1-hour average) - ppb to AQI
  if (pollutants.no2 !== undefined) {
    aqiValues.push(calculateNO2AQI(pollutants.no2))
  }

  // SO2 (1-hour average) - ppb to AQI
  if (pollutants.so2 !== undefined) {
    aqiValues.push(calculateSO2AQI(pollutants.so2))
  }

  // Return the highest AQI value (worst pollutant determines overall AQI)
  return aqiValues.length > 0 ? Math.max(...aqiValues) : 0
}

function calculateOzoneAQI(ppb: number): number {
  // EPA AQI breakpoints for ozone (ppb)
  const breakpoints = [
    { low: 0, high: 54, aqiLow: 0, aqiHigh: 50 },
    { low: 55, high: 70, aqiLow: 51, aqiHigh: 100 },
    { low: 71, high: 85, aqiLow: 101, aqiHigh: 150 },
    { low: 86, high: 105, aqiLow: 151, aqiHigh: 200 },
    { low: 106, high: 200, aqiLow: 201, aqiHigh: 300 },
  ]

  return calculateAQIFromBreakpoints(ppb, breakpoints)
}

function calculateNO2AQI(ppb: number): number {
  // Simplified NO2 AQI calculation
  const breakpoints = [
    { low: 0, high: 53, aqiLow: 0, aqiHigh: 50 },
    { low: 54, high: 100, aqiLow: 51, aqiHigh: 100 },
    { low: 101, high: 360, aqiLow: 101, aqiHigh: 150 },
    { low: 361, high: 649, aqiLow: 151, aqiHigh: 200 },
  ]

  return calculateAQIFromBreakpoints(ppb, breakpoints)
}

function calculateSO2AQI(ppb: number): number {
  // Simplified SO2 AQI calculation
  const breakpoints = [
    { low: 0, high: 35, aqiLow: 0, aqiHigh: 50 },
    { low: 36, high: 75, aqiLow: 51, aqiHigh: 100 },
    { low: 76, high: 185, aqiLow: 101, aqiHigh: 150 },
    { low: 186, high: 304, aqiLow: 151, aqiHigh: 200 },
  ]

  return calculateAQIFromBreakpoints(ppb, breakpoints)
}

function calculateAQIFromBreakpoints(
  concentration: number,
  breakpoints: Array<{ low: number; high: number; aqiLow: number; aqiHigh: number }>,
): number {
  for (const bp of breakpoints) {
    if (concentration >= bp.low && concentration <= bp.high) {
      const aqi = ((bp.aqiHigh - bp.aqiLow) / (bp.high - bp.low)) * (concentration - bp.low) + bp.aqiLow
      return Math.round(aqi)
    }
  }

  // If concentration exceeds all breakpoints, return highest AQI
  return breakpoints[breakpoints.length - 1].aqiHigh
}

export function getAQIStatus(aqi: number): "good" | "moderate" | "unhealthy" | "hazardous" {
  if (aqi <= 50) return "good"
  if (aqi <= 100) return "moderate"
  if (aqi <= 150) return "unhealthy"
  return "hazardous"
}

export function getAQILabel(aqi: number): string {
  if (aqi <= 50) return "Good"
  if (aqi <= 100) return "Moderate"
  if (aqi <= 150) return "Unhealthy for Sensitive Groups"
  if (aqi <= 200) return "Unhealthy"
  if (aqi <= 300) return "Very Unhealthy"
  return "Hazardous"
}

export function getAQIColor(aqi: number): string {
  if (aqi <= 50) return "hsl(var(--chart-2))"
  if (aqi <= 100) return "hsl(var(--chart-5))"
  if (aqi <= 150) return "hsl(var(--chart-3))"
  return "hsl(var(--destructive))"
}
