const { compileAndRunGo } = require('../services/goService');

const runGoCode = async (req, res) => {
    try {
        const output = await compileAndRunGo(req.body.code);
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { runGoCode };