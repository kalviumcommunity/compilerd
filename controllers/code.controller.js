const { respond, respondWithException } = require('../loader').helpers
const { codeTransformer } = require('../transformers/code.transformer')
const codeService = require('../services/code.service')
const { isValidForExecute } = require('../validators/code.validator')

const execute = async (req, res) => {
    try {
        const validatedData = await isValidForExecute(req.body)

        return respond(res, 200, codeTransformer.transform(
            await codeService.execute(validatedData, res),
        ))
    } catch (error) {
        respondWithException(res, error)
    }
}

module.exports = {
    execute,
}
