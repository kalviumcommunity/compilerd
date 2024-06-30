// tests/test_go.js

const assert = require('assert');
const { execute } = require('go.js');

describe('Go Language Tests', function() {
    it('should execute Go code and return correct output', function(done) {
        const code = `
            package main

            import "fmt"

            func main() {
                fmt.Println("Hello, Go!")
            }
        `;

        execute(code, function(result) {
            assert.strictEqual(result.output.trim(), 'Hello, Go!');
            done();
        });
    });

    
});
