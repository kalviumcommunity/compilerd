const express = require('express');
const { validateExecutionRequest } = require('./code.validator');
const { prepareExecution } = require('./code.transformer');
const { executeCode } = require('./code.executor');

const router = express.Router();

// Endpoint to execute code
router.post('/execute', async (req, res) => {
    try {
        // Validate execution request
        validateExecutionRequest(req.body);

        // Prepare execution parameters
        const executionObject = await prepareExecution(req.body);

        // Execute code
        const result = await executeCode(executionObject);

        // Return execution result
        res.status(200).json(result);
    } catch (err) {
        console.error('Execution error:', err);
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
