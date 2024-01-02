const Joi = require('joi')
const { PROMPTV1 } = require('../enums/supportedLanguages')

const isValidForExecute = async (body) => {
    const schema = Joi.object({
        language: Joi.string().required(),
        script: Joi.string()
            .when('language', {
                is: PROMPTV1,
                then: Joi.optional(),
                otherwise: Joi.required()
            }),
        prompt: Joi.string()
            .when('language', {
                is: PROMPTV1,
                then: Joi.required(),
                otherwise: Joi.optional()
            }),
        question: Joi.string()
            .when('language', {
                is: PROMPTV1,
                then: Joi.required(),
                otherwise: Joi.optional()
            }),
        user_answer: Joi.string()
            .when('language', {
                is: PROMPTV1,
                then: Joi.required(),
                otherwise: Joi.optional()
            }),
        expected_answer: Joi.string(),
        hasInputFiles: Joi.bool(),
        args: Joi.string(),
        stdin: Joi.string(),
    })

    return schema.validateAsync(body)
}

module.exports = { isValidForExecute }
