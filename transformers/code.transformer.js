const { executeCode } = require('./code.executor'); // Assuming you have a code.executor.js for executing code
const fs = require('fs');
const path = require('path');

// Function to transform and prepare code execution request
async function prepareExecution(reqObject) {
    try {
        // Validate request object (Example: Check required fields)
        if (!reqObject.language || !reqObject.script) {
            throw new Error('Invalid request: Language and script are required.');
        }

        // Example: Save script to a file (assuming synchronous operation)
        const scriptFilePath = path.join(__dirname, 'scripts', 'user_script.' + reqObject.language);
        fs.writeFileSync(scriptFilePath, reqObject.script, 'utf8');
        
        // Example: Prepare execution object (for passing to execution module)
        const executionObject = {
            language: reqObject.language,
            scriptPath: scriptFilePath,
            stdin: reqObject.stdin || '', // Optional stdin input
        };

        return executionObject;
    } catch (err) {
        console.error('Error preparing execution:', err);
        throw err; // Propagate error for handling at higher levels
    }
}

module.exports = {
    prepareExecution,
    // Add more transformation functions as needed
};
