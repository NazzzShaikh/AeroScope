export interface PollutantData {
  name: string
  value: number
  unit: string
  status: "good" | "moderate" | "unhealthy" | "hazardous"
  trend: "up" | "down" | "stable"
  change: number
}

export interface AirQualityReading {
  timestamp: string
  ozone: number
  no2: number
  so2: number
  hcho: number
  aqi: number
  location: {
    lat: number
    lon: number
    name: string
  }
}

export interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  windDirection: number
  pressure: number
}

export interface Alert {
  id: string
  type: "warning" | "info" | "success"
  title: string
  message: string
  time: string
  location: string
  severity: "low" | "medium" | "high"
}

export interface ForecastData {
  timestamp: string
  aqi: number
  pollutants: {
    ozone: number
    no2: number
    so2: number
    hcho: number
  }
  confidence: number
}
