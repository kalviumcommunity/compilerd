const express = require('express');
const router = express.Router();
const codeController = require('../controllers/code.controller');

router.post('/execute', codeController.executeCode);
router.post('/save', codeController.saveVersion);
router.get('/versions', codeController.getVersions);
router.post('/retrieve', codeController.retrieveVersion);

module.exports = router;
