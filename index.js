const express = require('express');
const bodyParser = require('body-parser');
const { logger, requestLogger, errorHandler } = require('./loggers');
const codeRoutes = require('./code.routes');

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(requestLogger); // Log incoming requests

// Routes
app.use('/api', codeRoutes); // Mount code routes under /api

// Error handling middleware (must be defined last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(Server running on port ${PORT});
});
