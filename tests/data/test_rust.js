

const assert = require('chai').assert;
const { execute } = require('../src/languages/rust');

describe('Rust Language Tests', function() {
    it('should execute Rust code and return correct output', function(done) {
        const code = `
            fn main() {
                println!("Hello, Rust!");
            }
        `;

        execute(code, function(result) {
            assert.strictEqual(result.output.trim(), 'Hello, Rust!');
            done();
        });
    });

    it('should handle syntax errors gracefully', function(done) {
        const code = `
            fn main() {
                println!("Hello, Rust!" // Missing closing parenthesis
            }
        `;

        execute(code, function(result) {
            assert.include(result.error, 'error: expected');
            done();
        });
    });

    
});
