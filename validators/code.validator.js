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
} = require('../enums/supportedMultifileSetupTypes')

const _getBaseSchema = () => {
    return Joi.object({
        language: Joi.string().required(),
        points: Joi.number().integer().optional(),
        hasInputFiles: Joi.bool(),
        args: Joi.string(),
        stdin: Joi.string(),
    })
}

const _getAiLanguageSchema = () => {
    return _getBaseSchema().keys({
        question: Joi.string().required(),
        userAnswer: Joi.string().required(),
        rubric: Joi.string().optional(),
    })
}

const _getMultiFileLanguageSchema = () => {
    return _getBaseSchema().keys({
        url: Joi.string().trim().required(),
        type: Joi.string()
            .trim()
            .valid(FRONTEND_REACT_JASMINE, FRONTEND_STATIC_JASMINE)
            .required(),
        non_editable_files: Joi.object()
            .pattern(Joi.string(), Joi.string().pattern(/^[a-fA-F0-9]{64}$/))
            .optional(),
    })
}

const _getDefaultLanguageSchema = () => {
    return _getBaseSchema().keys({
        script: Joi.string().required(),
    })
}

const _getSchemaForLanguage = (language) => {
    switch (language) {
    case PROMPTV1:
    case PROMPTV2:
    case PROMPTV3:
        return _getAiLanguageSchema()
    case MULTIFILE:
        return _getMultiFileLanguageSchema()
    default:
        return _getDefaultLanguageSchema()
    }
}

const isValidForExecute = async (payload) => {
    const schema = _getSchemaForLanguage(payload?.language)
    return schema.validateAsync(payload)
}

module.exports = { isValidForExecute }
