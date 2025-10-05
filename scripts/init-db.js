const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Create database directory if it doesn't exist
const dbDir = path.join(__dirname, '..', 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database
const dbPath = path.join(dbDir, 'aeroscope.db');
const db = new Database(dbPath);

// Read and execute schema
const schemaPath = path.join(dbDir, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema);

// Read and execute seed data
const seedPath = path.join(dbDir, 'seed.sql');
const seedData = fs.readFileSync(seedPath, 'utf8');
db.exec(seedData);

console.log('Database initialized successfully!');
console.log(`Database created at: ${dbPath}`);

db.close();