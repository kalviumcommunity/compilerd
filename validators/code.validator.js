const Joi = require('joi')

const isValidForExecute = async (body) => {
    const schema = Joi.object({
        language: Joi.string().required(),
        script: Joi.string().required(),
        hasInputFiles: Joi.bool(),
        args: Joi.string(),
        stdin: Joi.string(),
    })

    return schema.validateAsync(body)
}

module.exports = { isValidForExecute }
