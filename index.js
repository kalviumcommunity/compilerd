const express = require('express');
const bodyParser = require('body-parser');
const codeRoutes = require('./code.routes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', codeRoutes); // Mount code routes under /api

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(Server running on port ${PORT});
});
