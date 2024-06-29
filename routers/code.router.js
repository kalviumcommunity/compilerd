const express = require('express');
const router = express.Router();
const codeController = require('../controllers/code.controller');

// Import the validator middleware
const { validateCodeInput } = require('../controllers/code.controller');

router.post('/execute', validateCodeInput, codeController.executeCode);
router.post('/save', codeController.saveVersion);
router.get('/versions', codeController.getVersions);
router.post('/retrieve', codeController.retrieveVersion);

module.exports = router;
