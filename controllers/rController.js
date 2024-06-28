const { runR } = require('../services/rService');

const runRCode = async (req, res) => {
    try {
        const output = await runR(req.body.code);
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { runRCode };