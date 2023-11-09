const express = require('express');
const router = express.Router();
const db = require('../db'); // import your database connection

// Route for user registration
router.post('/register', (req, res) => {
  const { first_name, last_name, email, password, address, phone_no, disease } = req.body;

  // Check if user with the same email already exists in the database
  const checkUser = `SELECT * FROM users WHERE email = ?`;
  db.query(checkUser, [email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // If user doesn't exist, create a new user in the database
    const createUser = `INSERT INTO users (first_name, last_name, email, password, address, phone_no, disease) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(createUser, [first_name, last_name, email, password, address, phone_no, disease], (err, result) => {
      if (err) throw err;
      return res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

module.exports = router;
