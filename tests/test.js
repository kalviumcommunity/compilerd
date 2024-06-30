const axios = require('axios');
const { testCases } = require('./data/testJson');
const { describe, expect, it } = require('@jest/globals');

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000/api/execute/';

describe('Tests', () => {
    for (const testCase of testCases) {
        it(testCase.name, async () => {
            try {
                const response = await axios.post(ENDPOINT, testCase.reqObject);

                // Log response for debugging
                console.log('Response:', response.data);

                // Adjusted expectation based on response structure
                if (typeof response.data.output === 'object') {
                    expect(response.data.output.score).toBeDefined();
                    expect(response.data.output.rationale.positives).toBeDefined();
                    expect(response.data.output.rationale.negatives).toBeDefined();
                    expect(response.data.output.points).toBeDefined();
                } else {
                    expect(response.data.output).toEqual(testCase.expectedResponse.val);
                }

                expect(response.status).toEqual(testCase.expectedResponse.status);
                expect(response.data.error).toEqual(testCase.expectedResponse.error);
            } catch (error) {
                // Log any errors encountered during the test
                console.error('Test error:', error);
                throw error; // Rethrow the error to fail the test
            }
        }, 15000);
    }
});
