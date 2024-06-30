
const assert = require('chai').assert;
const { execute } = require('../src/languages/swift');

describe('Swift Language Tests', function() {
    it('should execute Swift code and return correct output', function(done) {
        const code = `
            print("Hello, Swift!")
        `;

        execute(code, function(result) {
            assert.strictEqual(result.output.trim(), 'Hello, Swift!');
            done();
        });
    });

    it('should handle syntax errors gracefully', function(done) {
        const code = `
            print("Hello, Swift!" // Missing closing parenthesis
        `;

        execute(code, function(result) {
            assert.include(result.error, 'error: expected');
            done();
        });
    });

    
});
