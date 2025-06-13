const axios = require('axios')
const { testCases } = require('./data/testJson')
const { describe, expect, it } = require('@jest/globals')

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000/api/execute/'

// Memory comparison tolerance in percent (e.g., 20 means ±20%)
const MEMORY_TOLERANCE_PERCENT = 20

describe('Tests', () => {
    for (const testCase of testCases) {
        it(testCase.name, async () => {
            const response = await axios.post(ENDPOINT, testCase.reqObject)
            if (typeof response.data.output === 'object') {
                expect(response.data.output.score).toBeDefined()
                expect(response.data.output.rationale.positives).toBeDefined()
                expect(response.data.output.rationale.negatives).toBeDefined()
                expect(response.data.output.points).toBeDefined()
            } else {
                expect(response).toHaveProperty('data.output', testCase.expectedResponse.val)
                if (testCase.expectedResponse.approxMemoryUses) {
                    const actual = response.data.memory
                    const expected = testCase.expectedResponse.approxMemoryUses
                    const tolerance = (MEMORY_TOLERANCE_PERCENT / 100) * expected
                    expect(actual).toBeGreaterThanOrEqual(expected - tolerance)
                    expect(actual).toBeLessThanOrEqual(expected + tolerance)
                }
            }
            expect(response).toHaveProperty('status', testCase.expectedResponse.status)
            expect(response).toHaveProperty('data.error', testCase.expectedResponse.error)
        }, 15000)
    }
})
