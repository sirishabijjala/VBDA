const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// SQLite setup
const db = new sqlite3.Database("./invites.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS invites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    designation TEXT,
    organization TEXT,
    invited_by TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Generate message mock
const generateMessage = (name, designation, organization, invited_by) => {
  return `Dear ${name},\n\nYou are cordially invited to VBDA 2025 as a distinguished ${designation} from ${organization}. We look forward to your presence.\n\nRegards,\n${invited_by}`;
};

// POST: Add invite
app.post("/api/invites", (req, res) => {
  const { name, email, designation, organization, invited_by } = req.body;
  const message = generateMessage(name, designation, organization, invited_by);

  db.run(
    `INSERT INTO invites (name, email, designation, organization, invited_by, message)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, designation, organization, invited_by, message],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, message });
    }
  );
});
db.run(`ALTER TABLE invites ADD COLUMN message TEXT`, (err) => {
  if (err && !err.message.includes("duplicate")) {
    console.error("Error altering table:", err.message);
  }
});

// GET: List invites with pagination
app.get("/api/invites", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  db.all(
    `SELECT * FROM invites ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [limit, offset],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
