const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const LANGUAGES_CONFIG = require('../configs/language.config').LANGUAGES_CONFIG;
const TEST_DIR = path.join(__dirname, 'swift_test');
const SWIFT_CONFIG = LANGUAGES_CONFIG['swift'];

// Function to compile and execute Swift code
function runSwiftCode(code, filename) {
    const filePath = path.join(TEST_DIR, filename);
    fs.writeFileSync(filePath, code);

    exec(`${SWIFT_CONFIG.compile} ${filename}`, { cwd: TEST_DIR }, (compileErr, compileStdout, compileStderr) => {
        if (compileErr) {
            console.error(`Compilation Error for ${filename}: ${compileStderr}`);
            return;
        }
        exec(`./${filename.replace('.swift', '')}`, { cwd: TEST_DIR }, (execErr, execStdout, execStderr) => {
            if (execErr) {
                console.error(`Execution Error for ${filename}: ${execStderr}`);
                return;
            }
            console.log(`Execution Output for ${filename}: ${execStdout}`);
        });
    });
}

// Test Case 1: Hello World
const swiftCodeHelloWorld = `
print("Hello, World!")
`;
runSwiftCode(swiftCodeHelloWorld, 'hello_world.swift');

// Test Case 2: Fibonacci Series
const swiftCodeFibonacci = `
func fibonacci(_ n: Int) -> Int {
    if n <= 1 {
        return n
    }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

print("Fibonacci Series:")
for i in 0..<10 {
    print(fibonacci(i))
}
`;
runSwiftCode(swiftCodeFibonacci, 'fibonacci.swift');
