// server/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./invites.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS invites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    designation TEXT,
    organization TEXT,
    invited_by TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;
