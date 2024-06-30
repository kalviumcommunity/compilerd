const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const LANGUAGES_CONFIG = require('../configs/language.config').LANGUAGES_CONFIG;
const TEST_DIR = path.join(__dirname, 'rust_test');
const RUST_CONFIG = LANGUAGES_CONFIG['rust'];

// Function to compile and execute Rust code
function runRustCode(code, filename) {
    const filePath = path.join(TEST_DIR, filename);
    fs.writeFileSync(filePath, code);

    exec(`${RUST_CONFIG.compile} ${filename}`, { cwd: TEST_DIR }, (compileErr, compileStdout, compileStderr) => {
        if (compileErr) {
            console.error(`Compilation Error for ${filename}: ${compileStderr}`);
            return;
        }
        exec(`./${filename.replace('.rs', '')}`, { cwd: TEST_DIR }, (execErr, execStdout, execStderr) => {
            if (execErr) {
                console.error(`Execution Error for ${filename}: ${execStderr}`);
                return;
            }
            console.log(`Execution Output for ${filename}: ${execStdout}`);
        });
    });
}

// Test Case 1: Hello World
const rustCodeHelloWorld = `
fn main() {
    println!("Hello, World!");
}
`;
runRustCode(rustCodeHelloWorld, 'hello_world.rs');

// Test Case 2: Fibonacci Series
const rustCodeFibonacci = `
fn fibonacci(n: u64) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    println!("Fibonacci Series:");
    for i in 0..10 {
        println!("{}", fibonacci(i));
    }
}
`;
runRustCode(rustCodeFibonacci, 'fibonacci.rs');
