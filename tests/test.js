const axios = require('axios');
const assert = require('assert');
const {testCases} = require('./data/testJson')

const ENDPOINT = process.env.ENDPOINT || `http://localhost:3000/api/execute/`

async function runTests(){
    const totalTests = testCases.length
    let testCasesPassed = 0
    for (const testCase of testCases) {
        try{
            const response = await axios.post(ENDPOINT, testCase.reqObject)
            assert.strictEqual(response.data.error, testCase.expectedResponse.error, `Compilation error : ${response.data.compile_message}`)
            assert.strictEqual(response.status, testCase.expectedResponse.status, `Expected status code ${testCase.expectedResponse.status}`);
            assert.strictEqual(response.data.output, testCase.expectedResponse.val, 'Expected output doesnot match')
            console.log(`${testCase.name}, status : passed`)
            testCasesPassed++
        } catch(error) {
            console.log(`${testCase.name}, stauts : failed : `, error.message);
        }
    } 
    const passPercent = testCasesPassed/totalTests*100;
    console.log(`\npass percentage: ${passPercent}, failed tests count: ${totalTests-testCasesPassed}`)
}

runTests()