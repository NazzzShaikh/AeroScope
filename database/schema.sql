-- AeroScope Air Quality Database Schema

-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    location TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Locations table
CREATE TABLE locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    country TEXT,
    state TEXT,
    city TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Air quality readings table
CREATE TABLE air_quality_readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location_id INTEGER NOT NULL,
    timestamp DATETIME NOT NULL,
    aqi INTEGER,
    ozone REAL,
    no2 REAL,
    so2 REAL,
    hcho REAL,
    pm25 REAL,
    pm10 REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- Weather data table
CREATE TABLE weather_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location_id INTEGER NOT NULL,
    timestamp DATETIME NOT NULL,
    temperature REAL,
    humidity REAL,
    wind_speed REAL,
    wind_direction REAL,
    pressure REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- Forecast data table
CREATE TABLE forecast_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location_id INTEGER NOT NULL,
    forecast_timestamp DATETIME NOT NULL,
    created_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    aqi INTEGER,
    ozone REAL,
    no2 REAL,
    so2 REAL,
    hcho REAL,
    confidence REAL,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- Alerts table
CREATE TABLE alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alert_id TEXT UNIQUE NOT NULL,
    location_id INTEGER NOT NULL,
    type TEXT CHECK(type IN ('warning', 'info', 'success')) NOT NULL,
    severity TEXT CHECK(severity IN ('low', 'medium', 'high')) NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- Pollutant standards table
CREATE TABLE pollutant_standards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pollutant_name TEXT NOT NULL,
    unit TEXT NOT NULL,
    good_max REAL,
    moderate_max REAL,
    unhealthy_max REAL,
    hazardous_min REAL
);

-- Indexes for better performance
CREATE INDEX idx_air_quality_location_timestamp ON air_quality_readings(location_id, timestamp);
CREATE INDEX idx_weather_location_timestamp ON weather_data(location_id, timestamp);
CREATE INDEX idx_forecast_location_timestamp ON forecast_data(location_id, forecast_timestamp);
CREATE INDEX idx_alerts_location_active ON alerts(location_id, is_active);

-- Insert default pollutant standards
INSERT INTO pollutant_standards (pollutant_name, unit, good_max, moderate_max, unhealthy_max, hazardous_min) VALUES
('ozone', 'ppb', 54, 70, 85, 105),
('no2', 'ppb', 53, 100, 360, 649),
('so2', 'ppb', 35, 75, 185, 304),
('pm25', 'μg/m³', 12, 35.4, 55.4, 150.4),
('pm10', 'μg/m³', 54, 154, 254, 354);

-- Insert sample locations
INSERT INTO locations (name, latitude, longitude, country, state, city) VALUES
('New York City', 40.7128, -74.0060, 'USA', 'NY', 'New York'),
('Los Angeles', 34.0522, -118.2437, 'USA', 'CA', 'Los Angeles'),
('Chicago', 41.8781, -87.6298, 'USA', 'IL', 'Chicago'),
('Houston', 29.7604, -95.3698, 'USA', 'TX', 'Houston'),
('Phoenix', 33.4484, -112.0740, 'USA', 'AZ', 'Phoenix');