const { respond, respondWithException } = require('../loader').helpers
const { codeTransformer } = require('../transformers/code.transformer')
const codeService = require('../services/code.service')
const { isValidForExecute } = require('../validators/code.validator')

const execute = async (req, res) => {
    try {
        const validatedData = await isValidForExecute(req.body)

        const responseBody = await codeService.execute(validatedData, res)
        return respond(res, responseBody.statusCode, codeTransformer.transform(responseBody))
    } catch (error) {
        respondWithException(res, error)
    }
}

module.exports = {
    execute,
}
