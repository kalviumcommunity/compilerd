const express = require('express');
const app = express();
const port = 3000;

app.post('/api/execute/', (req, res) => {
    res.send('POST request to the execute endpoint');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

