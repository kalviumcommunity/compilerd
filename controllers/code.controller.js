const { respond, respondWithException } = require('../loader').helpers
const { codeTransformer } = require('../transformers/code.transformer')
const codeService = require('../services/code.service')
const { isValidForExecute, isValidForFixCode } = require('../validators/code.validator')

const execute = async (req, res) => {
    try {
        const validatedData = await isValidForExecute(req.body)
        const responseBody = await codeService.execute(validatedData, res)
        return respond(res, responseBody.statusCode, codeTransformer.transform(responseBody))
    } catch (error) {
        respondWithException(res, error)
    }
}

const fixCode = async (req, res) => {
    try {
        const validatedData = await isValidForFixCode(req.body)
        const responseBody = await codeService.fixCode(validatedData)
        return respond(res, 200, codeTransformer.transformFixedCode(responseBody))
    } catch (error) {
        respondWithException(res, error)
    }
}

module.exports = {
    execute,
    fixCode,
}
