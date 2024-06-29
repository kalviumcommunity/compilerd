// Example: Validate code execution request
function validateExecutionRequest(reqObject) {
    const validLanguages = ['cpp', 'nodejs', 'python', 'c', 'java', 'ruby']; // List of supported languages

    // Check if language is provided and supported
    if (!reqObject.language || !validLanguages.includes(reqObject.language)) {
        throw new Error('Invalid or unsupported language.');
    }

    // Check if script is provided and not empty
    if (!reqObject.script || reqObject.script.trim() === '') {
        throw new Error('Script is required and cannot be empty.');
    }

    // Additional validation for specific languages or inputs can be added here

    // Optional: Validate stdin if provided
    if (reqObject.stdin && typeof reqObject.stdin !== 'string') {
        throw new Error('Invalid stdin format. Expected a string.');
    }

    // Validation passed
    return true;
}

module.exports = {
    validateExecutionRequest,
    // Add more validation functions as needed
};
