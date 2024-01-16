const { logger } = require('./logger')
const { ValidationError } = require('joi')

const _logNon200Codes = (code, body) => {
    if (code < 200 || code >= 300) { logger.info(body) }
}

const respond = (res, code, body = null) => {
    /**
     * Logger seems to append data to the payload
     * Stringify to avoid log info getting appended to the response body
     */
    _logNon200Codes(code, body ? JSON.parse(JSON.stringify(body)) : null)

    return res.status(code).send(body)
}

const respondWithException = (res, error) => {
    logger.error(error)

    let errorCode = 401

    if (error instanceof ValidationError || error.isJoi) {
        errorCode = 400
        error.message = error.message?.replaceAll('"', '\'')
    }

    if (error.name === 'NotFoundError') errorCode = 404

    const body = { message: error.message }

    /**
     * Logger seems to append data to the payload
     * Stringify to avoid log info getting appended to the response body
     */
    _logNon200Codes(errorCode, JSON.parse(JSON.stringify(body)))

    return res.status(errorCode).send(body)
}

module.exports = { respond, respondWithException }
