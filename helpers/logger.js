const winston = require('winston');

// Define logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ],
});

// Middleware function to log requests
function requestLogger(req, res, next) {
    logger.info(${req.method} ${req.originalUrl} - ${req.ip});
    next();
}

// Error handler middleware to log errors
function errorHandler(err, req, res, next) {
    logger.error(${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip});
    next(err);
}

module.exports = {
    logger,
    requestLogger,
    errorHandler,
};
