const express = require('express')
const router = express.Router()
const codeController = require('../controllers/code.controller')

router.post('/execute', [], codeController.execute)
router.post('/fix-code', [], codeController.fixCode)
module.exports = router
