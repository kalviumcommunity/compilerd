const { runPHP } = require('../services/phpService');

const runPHPCode = async (req, res) => {
    try {
        const output = await runPHP(req.body.code);
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { runPHPCode };