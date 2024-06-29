// Function to send success response
function sendSuccessResponse(res, data) {
    res.status(200).json(data);
}

// Function to send error response
function sendErrorResponse(res, errorMessage, status = 500) {
    res.status(status).json({ error: errorMessage });
}

module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
};
const { sendSuccessResponse, sendErrorResponse } = require('./respond');
// Example usage in a route handler
const express = require('express');
const router = express.Router();
const { sendSuccessResponse, sendErrorResponse } = require('./respond');
const { executeCode } = require('./code.service');

router.post('/execute', async (req, res) => {
    try {
        const executionObject = prepareExecution(req.body);
        const result = await executeCode(executionObject);
        sendSuccessResponse(res, result);
    } catch (error) {
        sendErrorResponse(res, error.message);
    }
});

module.exports = router;
