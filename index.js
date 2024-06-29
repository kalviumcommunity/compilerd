const express = require('express');
const app = express();
app.use(express.json());

let versions = [];

app.post('/api/execute', (req, res) => {
    const { language, script, stdin } = req.body;
    // Mock response for demonstration
    res.send({ output: Executed ${language} code });
});

app.post('/api/save', (req, res) => {
    const { versionName, code } = req.body;
    versions.push({ versionName, code });
    res.send({ message: 'Version saved successfully' });
});

app.get('/api/versions', (req, res) => {
    res.send(versions);
});

app.post('/api/retrieve', (req, res) => {
    const { versionName } = req.body;
    const version = versions.find(v => v.versionName === versionName);
    if (version) {
        res.send(version);
    } else {
        res.status(404).send({ message: 'Version not found' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
