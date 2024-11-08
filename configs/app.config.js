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
    openaiAPIKey:process.env.OPENAI_API_KEY, 
    langfusePublicKey:process.env.LANGFUSE_PUBLIC_KEY, 
    langfuseSecretKey:process.env.LANGFUSE_SECRET_KEY,
    langfuseBaseURL:process.env.LANGFUSE_BASE_URL
}
