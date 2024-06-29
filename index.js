const express = require('express');
const app = express();
const router = require('./router');

// Middleware
app.use(express.json()); // JSON body parser

// Use the router
app.use(router);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});
