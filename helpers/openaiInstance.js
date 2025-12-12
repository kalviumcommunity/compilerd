const OpenAI = require('openai');
const { observeOpenAI } = require('@langfuse/openai');
const { LangfuseClient } = require('@langfuse/client'); 
const {
    openaiConfig,
    langfuseConfig
} = require('../configs/app.config');

let openaiClient = null;
const instantiateOpenAI = () => {
    if (!openaiClient && openaiConfig.API_KEY) {
        openaiClient = new OpenAI({
            apiKey: openaiConfig.API_KEY,
        });
    }
    return openaiClient;
};

const getOpenAI = () => {
    return openaiClient || instantiateOpenAI();
};

let baseLangfuseClient;
const instantiateLangfuse = () => {
    // First ensure OpenAI is instantiated
    if (!openaiClient) {
        openaiClient = instantiateOpenAI();
    }

    // If we couldn't create OpenAI client, throw error
    if (!openaiClient) {
        throw new Error('OpenAI client could not be instantiated. Check API key.');
    }

    if (langfuseConfig.baseUrl) {
               baseLangfuseClient = observeOpenAI(openaiClient, {
                   clientInitParams: langfuseConfig,
                   generationName: "subjective",
               });
    } else {
        baseLangfuseClient = openaiClient;
    }
    
    return baseLangfuseClient;
};

const createLangfuseWithMetadata = (metadata) => {
    if (!openaiClient) {
        openaiClient = instantiateOpenAI();
    }

    if (!openaiClient) {
        throw new Error('OpenAI client could not be instantiated. Check API key.');
    }

    if (langfuseConfig.baseUrl) {
        const { slug, course_slug } = metadata;

        // Build tags array from metadata
        const tags = [];
        if (slug) tags.push(slug);
        if (course_slug) tags.push(`course:${course_slug}`);

        // Build configuration object
               const config = {
                   clientInitParams: langfuseConfig,
                   generationName: "subjective",
               };

        // Add optional properties only if they have values
        if (tags.length > 0) {
            config.tags = tags;
        }

        return observeOpenAI(openaiClient, config);
    } else {
        return openaiClient;
    }
};

const getLangfuse = (metadata = {}) => {
    // If no metadata provided, return cached base client
    if (!metadata || Object.keys(metadata).length === 0) {
        return baseLangfuseClient || instantiateLangfuse();
    }

    // Create a new client with metadata configuration
    return createLangfuseWithMetadata(metadata);
};

const getLangfusePromptClient = (() => {
    let langfusePromptClient = null;
    return () => {
        if (!langfusePromptClient && langfuseConfig.publicKey) {
            langfusePromptClient = new LangfuseClient(langfuseConfig);
        }
        return langfusePromptClient;
    }
})();


module.exports = {
    instantiateLangfuse,
    getLangfuse,
    getLangfusePromptClient
}
