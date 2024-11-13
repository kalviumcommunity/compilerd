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
        API_KEY:process.env.OPENAI_API_KEY
    },
    langfuseConfig: {
        publicKey:process.env.LANGFUSE_PUBLIC_KEY, 
        secretKey:process.env.LANGFUSE_SECRET_KEY,
        baseUrl:process.env.LANGFUSE_BASE_URL
    }
    
}
