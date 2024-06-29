const express = require('express');
const router = express.Router();
const CodeController = require('./controllers/code.controller');
const path = require('path');

// Serve frontend files (assuming they are in a 'frontend' folder)
router.use(express.static(path.join(__dirname, 'frontend')));

// Define routes for code judging
router.post('/api/execute', CodeController.executeCode);
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

module.exports = router;
