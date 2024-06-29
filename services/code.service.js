const axios = require('axios');

// Function to prepare execution parameters
async function prepareExecution(reqObject) {
    // Logic to prepare execution parameters based on the request object
    let executionObject = {
        language: reqObject.language,
        script: reqObject.script,
    };

    // Optionally add stdin if provided in the request object
    if (reqObject.stdin) {
        executionObject.stdin = reqObject.stdin;
    }

    return executionObject;
}

// Function to execute code
async function executeCode(executionObject) {
    const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000/api/execute/';

    try {
        // Make HTTP POST request to execute code
        const response = await axios.post(ENDPOINT, executionObject);

        // Return response data from the execution endpoint
        return response.data;
    } catch (error) {
        // Handle error
        console.error('Error executing code:', error);
        throw new Error('Failed to execute code.');
    }
}

module.exports = {
    prepareExecution,
    executeCode,
};
