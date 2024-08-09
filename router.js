const express = require('express')
const router = express.Router()

const codeRouter = require('./routers/code.router')

router.use('/', codeRouter)

module.exports = router