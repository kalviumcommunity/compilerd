const express = require('express');
const router = express.Router();
const pgLite = require('pg-lite');

const db = new pgLite.Client({
    database: 'mydb', // replace with your database name
    user: 'myuser', // replace with your database user
    password: 'mypassword', // replace with your database password
    port: 5432, // default PostgreSQL port
});

db.connect(err => {
    if (err) {
        console.error('Failed to connect to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

router.get('/data', (req, res) => {
    db.query('SELECT * FROM mytable', (err, result) => {
        if (err) {
            console.error('Failed to execute query:', err);
            return res.status(500).send('Internal Server Error');
        }

        res.json(result.rows);
    });
});

module.exports = router;
