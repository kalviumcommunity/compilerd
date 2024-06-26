// Test Case 1: Basic output
fn main() {
    println!("Hello, Rust!");
}

// Test Case 2: Variable manipulation
fn main() {
    let x = 5;
    let y = 10;
    println!("Sum: {}", x + y);
}

// Test Case 3: Conditional statements
fn main() {
    let age = 18;
    if age >= 18 {
        println!("Adult");
    } else {
        println!("Minor");
    }
}

// Test Case 4: Loops
fn main() {
    for i in 1..=5 {
        print!("{} ", i);
    }
    println!();
}

// Test Case 5: Function definition and call
fn square(x: i32) -> i32 {
    x * x
}

fn main() {
    println!("Square of 7: {}", square(7));
}