const express = require('express');
const { runPHPCode } = require('../controllers/phpController');
const router = express.Router();

router.post('/php', runPHPCode);

module.exports = router;