// Test Case 1: Basic output
console.log("Hello, JavaScript!");

// Test Case 2: Variable manipulation
let x = 5;
let y = 10;
console.log(`Sum: ${x + y}`);

// Test Case 3: Conditional statements
let age = 18;
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}

// Test Case 4: Loops
for (let i = 1; i <= 5; i++) {
    process.stdout.write(i + " ");
}
console.log();

// Test Case 5: Function definition and call
function square(x) {
    return x * x;
}

console.log(`Square of 7: ${square(7)}`);