// Required modules
const express = require('express');
const { loadEnvVariables } = require('./envloaders'); // Assuming you have an envloaders.js to load environment variables
const router = require('./router'); // Assuming you have a router.js for routing
const path = require('path');

// Load environment variables from .env file
loadEnvVariables();

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'frontend'))); // Serve static files from 'frontend' folder

// Routes
app.use(router); // Use router for handling routes

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});
