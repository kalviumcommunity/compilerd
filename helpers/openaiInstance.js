const OpenAI = require('openai')
const { observeOpenAI } = require('langfuse')
const { openaiConfig, langfuseConfig} = require('../configs/app.config')

const openaiClient = new OpenAI({
    apiKey: openaiConfig.API_KEY,
})

let openai

const getLangfuse = (user_email) => {
    if (langfuseConfig.baseUrl) {
        openai = observeOpenAI(openaiClient, {
            clientInitParams: langfuseConfig,
            generationName: "compilerd",
            userId: user_email,
        })
    } 
    else {
        openai = openaiClient
    }
    return openai;
};

module.exports = { getLangfuse }