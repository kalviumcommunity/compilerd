const OpenAI = require('openai')
const { observeOpenAI } = require('langfuse')
const { 
    openaiAPIKey, 
    langfusePublicKey, 
    langfuseSecretKey,
    langfuseBaseURL
} = require('../configs/app.config')

const openaiClient = new OpenAI({
    apiKey: openaiAPIKey,
})

let openai

if (langfuseBaseURL) {
    openai = observeOpenAI(openaiClient, {
        clientInitParams: {
          publicKey: langfusePublicKey,
          secretKey: langfuseSecretKey,
          baseUrl: langfuseBaseURL,
        },
        generationName: "compilerd",
    })
} else {
    openai = openaiClient
}

module.exports = { openai }
