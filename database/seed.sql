-- Sample data for AeroScope database

-- Insert sample air quality readings
INSERT INTO air_quality_readings (location_id, timestamp, aqi, ozone, no2, so2, hcho, pm25, pm10) VALUES
(1, '2024-01-15 12:00:00', 85, 65, 42, 15, 8, 28, 45),
(1, '2024-01-15 13:00:00', 92, 72, 45, 18, 9, 32, 48),
(2, '2024-01-15 12:00:00', 105, 85, 55, 25, 12, 45, 65),
(2, '2024-01-15 13:00:00', 98, 78, 48, 22, 10, 38, 58),
(3, '2024-01-15 12:00:00', 75, 58, 35, 12, 6, 22, 38);

-- Insert sample weather data
INSERT INTO weather_data (location_id, timestamp, temperature, humidity, wind_speed, wind_direction, pressure) VALUES
(1, '2024-01-15 12:00:00', 22.5, 65, 8.5, 180, 1013.2),
(1, '2024-01-15 13:00:00', 23.1, 62, 9.2, 185, 1012.8),
(2, '2024-01-15 12:00:00', 28.3, 45, 12.1, 270, 1015.5),
(2, '2024-01-15 13:00:00', 29.0, 42, 13.5, 275, 1015.2),
(3, '2024-01-15 12:00:00', 18.7, 72, 6.8, 90, 1018.1);

-- Insert sample forecast data
INSERT INTO forecast_data (location_id, forecast_timestamp, aqi, ozone, no2, so2, hcho, confidence) VALUES
(1, '2024-01-15 14:00:00', 88, 68, 44, 16, 8, 0.85),
(1, '2024-01-15 15:00:00', 82, 62, 40, 14, 7, 0.82),
(1, '2024-01-15 16:00:00', 79, 58, 38, 13, 6, 0.78),
(2, '2024-01-15 14:00:00', 102, 82, 52, 24, 11, 0.88),
(2, '2024-01-15 15:00:00', 95, 75, 48, 21, 9, 0.85);

-- Insert sample alerts
INSERT INTO alerts (alert_id, location_id, type, severity, title, message, timestamp) VALUES
('alert_001', 1, 'warning', 'medium', 'Moderate Air Quality', 'Air quality has reached moderate levels. Sensitive individuals should limit outdoor activities.', '2024-01-15 12:30:00'),
('alert_002', 2, 'warning', 'high', 'Unhealthy Air Quality', 'Air quality is unhealthy for sensitive groups. Consider reducing outdoor activities.', '2024-01-15 13:15:00'),
('alert_003', 3, 'info', 'low', 'Good Air Quality', 'Air quality is good. Enjoy outdoor activities!', '2024-01-15 12:00:00');