const validateCodeInput = (req, res, next) => {
    const { language, script } = req.body;

    // Validate language and script presence
    if (!language || !script) {
        return res.status(400).send({ message: 'Language and script are required' });
    }

    // Example: Validate script length or specific language requirements
    if (script.length > 1000) {
        return res.status(400).send({ message: 'Script length exceeds maximum allowed' });
    }

    // Add more specific validations as needed

    // Proceed to next middleware (controller) if validation passes
    next();
};

module.exports = {
    validateCodeInput,
}
