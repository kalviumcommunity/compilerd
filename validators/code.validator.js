const Joi = require('joi')

const isValidForExecute = async (body) => {
    const schema = Joi.object({
        language: Joi.string().required(),
        script: Joi.string()
            .when('language', {
                is: 'promptv1',
                then: Joi.optional(),
                otherwise: Joi.required()
            }),
        prompt: Joi.string()
            .when('language', {
                is: 'promptv1',
                then: Joi.required(),
                otherwise: Joi.optional()
            }),
        hasInputFiles: Joi.bool(),
        args: Joi.string(),
        stdin: Joi.string(),
    })

    return schema.validateAsync(body)
}

module.exports = { isValidForExecute }
