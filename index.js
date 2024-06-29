const express = require('express');
const app = express();
const codeRoutes = require('./routes/code.routes');

app.use(express.json());
app.use('/api', codeRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
