const express = require('express')
const router = express.Router()

const codeRouter = require('./routers/code.router')

router.use('/', codeRouter)

module.exports = router

const phpRouter = require('./routers/phpRouter');
const goRouter = require('./routers/goRouter');
const rRouter = require('./routers/rRouter');

router.use('/api', phpRouter);
router.use('/api', goRouter);
router.use('/api', rRouter);

module.exports = router;