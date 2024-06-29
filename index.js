const express = require('express');
const app = express();
const router = require('./router'); // Assuming your router file is named router.js
const path = require('path');

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'frontend'))); // Serve static files from 'frontend' folder

// Routes
app.use(router); // Use router for handling routes

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
})
