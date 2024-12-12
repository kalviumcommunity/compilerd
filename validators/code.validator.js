const Joi = require('joi')
const {
    PROMPTV1,
    PROMPTV2,
    PROMPTV3,
    MULTIFILE,
} = require('../enums/supportedLanguages')
const {
    FRONTEND_REACT_JASMINE,
    FRONTEND_STATIC_JASMINE,
    NODEJS_JUNIT,
} = require('../enums/supportedPMFTypes')
const { JUNIT } = require('../enums/supportedPMFOutputFormats')

const _getBaseSchema = () => {
    return Joi.object({
        language: Joi.string().required(),
        hasInputFiles: Joi.bool(),
        args: Joi.string(),
        stdin: Joi.string(),
    })
}

const _getAiSchema = () => {
    return _getBaseSchema().keys({
        question: Joi.string().required(),
        userAnswer: Joi.string().required(),
        points: Joi.number().integer().optional(),
        rubric: Joi.string().optional(),
        dispatchedBy: Joi.string().optional(),
        userEmail: Joi.string().email().required(),
    })
}

const _getMultiFileSchema = () => {
    return _getBaseSchema().keys({
        url: Joi.string().trim().required(),
        type: Joi.string()
            .trim()
            .valid(FRONTEND_REACT_JASMINE, FRONTEND_STATIC_JASMINE, NODEJS_JUNIT)
            .required(),
        non_editable_files: Joi.object()
            .pattern(Joi.string(), Joi.string().pattern(/^[a-fA-F0-9]{64}$/))
            .optional(),
        commands: Joi.alternatives().conditional('type', {
            is: NODEJS_JUNIT,
            then: Joi.array().items(Joi.string().required()),
            otherwise: Joi.optional(),
        }),
        output_file: Joi.alternatives().conditional('type', {
            is: NODEJS_JUNIT,
            then: Joi.string().required(),
            otherwise: Joi.optional(),
        }),
        output_format: Joi.alternatives().conditional('type', {
            is: NODEJS_JUNIT,
            then: Joi.string().valid(JUNIT).required(),
            otherwise: Joi.optional(),
        }),
    })
}

const _getDefaultSchema = () => {
    return _getBaseSchema().keys({
        script: Joi.string().required(),
    })
}

const _getSchema = (language) => {
    switch (language) {
    case PROMPTV1:
    case PROMPTV2:
    case PROMPTV3:
        return _getAiSchema()
    case MULTIFILE:
        return _getMultiFileSchema()
    default:
        return _getDefaultSchema()
    }
}

const isValidForExecute = async (payload) => {
    const schema = _getSchema(payload?.language)
    return schema.validateAsync(payload)
}

module.exports = { isValidForExecute }
