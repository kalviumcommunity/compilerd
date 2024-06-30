const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const LANGUAGES_CONFIG = require('../configs/language.config').LANGUAGES_CONFIG;
const TEST_DIR = path.join(__dirname, 'typescript_test');
const TS_CONFIG = LANGUAGES_CONFIG['typescript'];

// Function to compile and execute TypeScript code
function runTypeScriptCode(code, filename) {
    const filePath = path.join(TEST_DIR, filename);
    fs.writeFileSync(filePath, code);

    exec(`${TS_CONFIG.compile} ${filename}`, { cwd: TEST_DIR }, (compileErr, compileStdout, compileStderr) => {
        if (compileErr) {
            console.error(`Compilation Error for ${filename}: ${compileStderr}`);
            return;
        }
        exec(`node ${filename.replace('.ts', '.js')}`, { cwd: TEST_DIR }, (execErr, execStdout, execStderr) => {
            if (execErr) {
                console.error(`Execution Error for ${filename}: ${execStderr}`);
                return;
            }
            console.log(`Execution Output for ${filename}: ${execStdout}`);
        });
    });
}

// Test Case 1: Hello World
const tsCodeHelloWorld = `
console.log('Hello, World!');
`;
runTypeScriptCode(tsCodeHelloWorld, 'hello_world.ts');

// Test Case 2: Fibonacci Series
const tsCodeFibonacci = `
function fibonacci(n: number): number {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fibonacci Series:');
for (let i = 0; i < 10; i++) {
    console.log(fibonacci(i));
}
`;
runTypeScriptCode(tsCodeFibonacci, 'fibonacci.ts');
