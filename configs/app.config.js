module.exports = {
    multifile: {
        staticServerPath: '/tmp/submission/',
        submissionFileDownloadPath: '/tmp/submission.json',
        workingDir: '/tmp/submission/',
        jasminePort: process.env.JASMINE_PORT || 8080,
    },
    dbConfig: {
        PATH: '/tmp/database.db',
    },
}
