const logger = require('../loader').helpers.l
const fs = require('fs')
const xml2js = require('xml2js')

// recursively process all the test suites
const processTestSuite = (testsuite, success, failed) => {
    if (testsuite.testsuite) {
        testsuite.testsuite.forEach(suite => processTestSuite(suite, success, failed))
    }
    if (testsuite.testcase) {
        testsuite.testcase.forEach(testcase => {
            const testName = testcase.$.name

            if (testcase.failure) {
                failed.push(testName)
            } else {
                success.push(testName)
            }
        })
    }
}

const extractTestCasesJunit = async (xmlFilePath) => {
    try {
        const xmlData = await fs.promises.readFile(xmlFilePath, 'utf8')
        const parser = new xml2js.Parser()
        const result = await parser.parseStringPromise(xmlData)

        const success = []
        const failed = []

        // Start processing from the root
        if (result.testsuites) {
            processTestSuite(result.testsuites, success, failed)
        }

        return { success, failed }
    } catch (error) {
        logger.error(`Error processing XML file: ${error.message}`)
        throw error
    }
}

module.exports = { extractTestCasesJunit }