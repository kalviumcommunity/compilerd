const express = require('express');
const { runGoCode } = require('../controllers/goController');
const router = express.Router();

router.post('/go', runGoCode);

module.exports = router;