const versions = [];

const executeCode = (req, res) => {
    const { language, script, stdin } = req.body;
    // Mock response for demonstration
    res.send({ output: Executed ${language} code });
};

const saveVersion = (req, res) => {
    const { versionName, code } = req.body;
    versions.push({ versionName, code });
    res.send({ message: 'Version saved successfully' });
};

const getVersions = (req, res) => {
    res.send(versions);
};

const retrieveVersion = (req, res) => {
    const { versionName } = req.body;
    const version = versions.find(v => v.versionName === versionName);
    if (version) {
        res.send(version);
    } else {
        res.status(404).send({ message: 'Version not found' });
    }
};

module.exports = {
    executeCode,
    saveVersion,
    getVersions,
    retrieveVersion,
};
