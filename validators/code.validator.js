const Joi = require('joi')
const { PROMPTV1, PROMPTV2 } = require('../enums/supportedLanguages')

const isValidForExecute = async (body) => {
    const schema = Joi.object({
        language: Joi.string().required(),
        script: Joi.string()
            .when('language', {
                is: [PROMPTV1, PROMPTV2, 'multifile'],
                then: Joi.optional(),
                otherwise: Joi.required(),
            }),
        prompt: Joi.string()
            .when('language', {
                is: [PROMPTV1, PROMPTV2],
                then: Joi.required(),
                otherwise: Joi.optional(),
            }),
        systemPrompt: Joi.string()
            .when('language', {
                is: [PROMPTV1, PROMPTV2],
                then: Joi.optional(),
                otherwise: Joi.forbidden(),
            }),
        url: Joi.string().trim()
            .when('language', {
                is: 'multifile',
                then: Joi.required(),
                otherwise: Joi.forbidden(),
            }),
        type: Joi.string().trim()
            .when('language', {
                is: 'multifile',
                then: Joi.required(),
                otherwise: Joi.forbidden(),
            }),
        path: Joi.string().trim()
            .when('language', {
                is: 'multifile',
                then: Joi.required(),
                otherwise: Joi.forbidden(),
            }),
        points: Joi.number().integer().optional(), // totalScore
        hasInputFiles: Joi.bool(),
        args: Joi.string(),
        stdin: Joi.string(),
    })

    return schema.validateAsync(body)
}

module.exports = { isValidForExecute }
