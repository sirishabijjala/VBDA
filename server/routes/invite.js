const express = require('express');
const router = express.Router();
const getConnection = require('../database');

// POST /api/invite/generate
router.post('/generate', async (req, res) => {
  const { name, role, organization, email, invitation } = req.body;

  try {
    const conn = await getConnection();
    const result = await conn.execute(
      `INSERT INTO invitations (name, role, organization, email, invitation)
       VALUES (:name, :role, :organization, :email, :invitation)`,
      { name, role, organization, email, invitation },
      { autoCommit: true }
    );
    await conn.close();
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate invitation' });
  }
});

// GET /api/invite/list
router.get('/list', async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute(`SELECT * FROM invitations`, [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    await conn.close();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch invitations' });
  }
});

module.exports = router;
