const express = require('express');
const { runRCode } = require('../controllers/rController');
const router = express.Router();

router.post('/r', runRCode);

module.exports = router;