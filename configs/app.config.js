const USE_CREDEX = process.env.USE_CREDEX === 'true';
const CREDEX_API_KEY = process.env.CREDEX_API_KEY;
const CREDEX_BASE_URL = process.env.CREDEX_BASE_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

module.exports = {
    multifile: {
        staticServerPath: "/tmp/submission/",
        submissionFileDownloadPath: "/tmp/submission.json",
        workingDir: "/tmp/submission/",
        jasminePort: process.env.JASMINE_PORT || 8888,
    },
    dbConfig: {
        PATH: "/tmp/database.db",
    },
    openaiConfig: {
        USE_CREDEX,
        API_KEY: USE_CREDEX 
            ? (CREDEX_API_KEY || OPENAI_API_KEY)
            : OPENAI_API_KEY,
        BASE_URL: USE_CREDEX 
            ? (CREDEX_BASE_URL || "https://llm.credex.rocks/v1")
            : undefined,
        SUBJECTIVE_OPENAI_MODEL: process.env.SUBJECTIVE_OPENAI_MODEL
    },
    langfuseConfig: {
        publicKey:process.env.LANGFUSE_PUBLIC_KEY, 
        secretKey:process.env.LANGFUSE_SECRET_KEY,
        baseUrl:process.env.LANGFUSE_BASE_URL,
        promptName:process.env.LANGFUSE_PROMPT_NAME || "subjective_prompt"
    }
    
}
