const OpenAI = require('openai')
const { observeOpenAI } = require('langfuse')
const { 
    openaiConfig,
    langfuseConfig
} = require('../configs/app.config')

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

let langfuseClient;
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
        langfuseClient = observeOpenAI(openaiClient, {
            clientInitParams: langfuseConfig,
            generationName: "compilerd",
        })
    } else {
        langfuseClient = openaiClient;
    }
    
    return langfuseClient;
};

const getLangfuse = () => {
    if (!langfuseClient) {
        return instantiateLangfuse();
    }
    return langfuseClient;
};

module.exports = {
    instantiateLangfuse,
    getLangfuse
}