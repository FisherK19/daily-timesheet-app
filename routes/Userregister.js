const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/connection');

// Registration route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
            
            // Respond with success message
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

