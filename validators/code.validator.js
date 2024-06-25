const Joi = require('joi')
const { PROMPTV1, PROMPTV2, MULTIFILE } = require('../enums/supportedLanguages')
const { FRONTEND_REACT_JASMINE, FRONTEND_STATIC_JASMINE } = require('../enums/supportedMultifileSetupTypes')

const isValidForExecute = async (body) => {
    const schema = Joi.object({
        language: Joi.string().required(),
        question: Joi.string().when('language', {
            is: [PROMPTV1, PROMPTV2],
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),
        userAnswer: Joi.string().when('language', {
            is: [PROMPTV1, PROMPTV2],
            then: Joi.required(),
            otherwise: Joi.forbidden(),
        }),
        rubric: Joi.string().when('language', {
            is: [PROMPTV1, PROMPTV2],
            then: Joi.optional(),
            otherwise: Joi.forbidden(),
        }),
        script: Joi.string()
            .when('language', {
                is: [PROMPTV1, PROMPTV2, MULTIFILE],
                then: Joi.optional(),
                otherwise: Joi.required(),
            }),
        url: Joi.string().trim()
            .when('language', {
                is: MULTIFILE,
                then: Joi.required(),
                otherwise: Joi.forbidden(),
            }),
        type: Joi.string().trim()
            .valid(FRONTEND_REACT_JASMINE, FRONTEND_STATIC_JASMINE)
            .when('language', {
                is: MULTIFILE,
                then: Joi.required(),
                otherwise: Joi.forbidden(),
            }),
        non_editable_files: Joi.object().pattern(
            Joi.string(),
            Joi.string().pattern(/^[a-fA-F0-9]{64}$/)
        ).optional(),
        points: Joi.number().integer().optional(), // totalScore
        hasInputFiles: Joi.bool(),
        args: Joi.string(),
        stdin: Joi.string(),
    })

    return schema.validateAsync(body)
}

module.exports = { isValidForExecute }
