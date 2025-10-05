import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const dbPath = path.join(process.cwd(), 'database', 'aeroscope.db')
const schemaPath = path.join(process.cwd(), 'database', 'schema.sql')

let db: Database.Database

export function getDatabase() {
  if (!db) {
    // Ensure database directory exists
    const dbDir = path.dirname(dbPath)
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }

    db = new Database(dbPath)
    
    // Initialize database if it's new
    if (!fs.existsSync(dbPath) || db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().length === 0) {
      const schema = fs.readFileSync(schemaPath, 'utf8')
      db.exec(schema)
    }
  }
  return db
}

// Air Quality Operations
export const airQualityQueries = {
  insert: (data: {
    location_id: number
    timestamp: string
    aqi?: number
    ozone?: number
    no2?: number
    so2?: number
    hcho?: number
    pm25?: number
    pm10?: number
  }) => {
    const db = getDatabase()
    return db.prepare(`
      INSERT INTO air_quality_readings 
      (location_id, timestamp, aqi, ozone, no2, so2, hcho, pm25, pm10)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      data.location_id,
      data.timestamp,
      data.aqi,
      data.ozone,
      data.no2,
      data.so2,
      data.hcho,
      data.pm25,
      data.pm10
    )
  },

  getLatest: (locationId: number) => {
    const db = getDatabase()
    return db.prepare(`
      SELECT * FROM air_quality_readings 
      WHERE location_id = ? 
      ORDER BY timestamp DESC 
      LIMIT 1
    `).get(locationId)
  },

  getByTimeRange: (locationId: number, startTime: string, endTime: string) => {
    const db = getDatabase()
    return db.prepare(`
      SELECT * FROM air_quality_readings 
      WHERE location_id = ? AND timestamp BETWEEN ? AND ?
      ORDER BY timestamp ASC
    `).all(locationId, startTime, endTime)
  }
}

// User Operations
export const userQueries = {
  insert: (data: {
    name: string
    email: string
    username: string
    password: string
    location: string
    latitude: number
    longitude: number
  }) => {
    const db = getDatabase()
    return db.prepare(`
      INSERT INTO users (name, email, username, password, location, latitude, longitude)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(data.name, data.email, data.username, data.password, data.location, data.latitude, data.longitude)
  },

  getByEmail: (email: string) => {
    const db = getDatabase()
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  },

  getByUsername: (username: string) => {
    const db = getDatabase()
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username)
  },


}

// Location Operations
export const locationQueries = {
  getAll: () => {
    const db = getDatabase()
    return db.prepare('SELECT * FROM locations').all()
  },

  getById: (id: number) => {
    const db = getDatabase()
    return db.prepare('SELECT * FROM locations WHERE id = ?').get(id)
  },

  insert: (data: {
    name: string
    latitude: number
    longitude: number
    country?: string
    state?: string
    city?: string
  }) => {
    const db = getDatabase()
    return db.prepare(`
      INSERT INTO locations (name, latitude, longitude, country, state, city)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(data.name, data.latitude, data.longitude, data.country, data.state, data.city)
  }
}

// Alert Operations
export const alertQueries = {
  insert: (data: {
    alert_id: string
    location_id: number
    type: 'warning' | 'info' | 'success'
    severity: 'low' | 'medium' | 'high'
    title: string
    message: string
    timestamp: string
  }) => {
    const db = getDatabase()
    return db.prepare(`
      INSERT INTO alerts (alert_id, location_id, type, severity, title, message, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      data.alert_id,
      data.location_id,
      data.type,
      data.severity,
      data.title,
      data.message,
      data.timestamp
    )
  },

  getActive: (locationId?: number) => {
    const db = getDatabase()
    if (locationId) {
      return db.prepare(`
        SELECT a.*, l.name as location_name 
        FROM alerts a 
        JOIN locations l ON a.location_id = l.id 
        WHERE a.location_id = ? AND a.is_active = 1 
        ORDER BY a.timestamp DESC
      `).all(locationId)
    }
    return db.prepare(`
      SELECT a.*, l.name as location_name 
      FROM alerts a 
      JOIN locations l ON a.location_id = l.id 
      WHERE a.is_active = 1 
      ORDER BY a.timestamp DESC
    `).all()
  }
}

// Forecast Operations
export const forecastQueries = {
  insert: (data: {
    location_id: number
    forecast_timestamp: string
    aqi?: number
    ozone?: number
    no2?: number
    so2?: number
    hcho?: number
    confidence?: number
  }) => {
    const db = getDatabase()
    return db.prepare(`
      INSERT INTO forecast_data 
      (location_id, forecast_timestamp, aqi, ozone, no2, so2, hcho, confidence)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      data.location_id,
      data.forecast_timestamp,
      data.aqi,
      data.ozone,
      data.no2,
      data.so2,
      data.hcho,
      data.confidence
    )
  },

  getForecast: (locationId: number, hours: number = 24) => {
    const db = getDatabase()
    return db.prepare(`
      SELECT * FROM forecast_data 
      WHERE location_id = ? 
      AND forecast_timestamp > datetime('now') 
      AND forecast_timestamp <= datetime('now', '+${hours} hours')
      ORDER BY forecast_timestamp ASC
    `).all(locationId)
  }
}