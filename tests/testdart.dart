// Test Case 1: Basic output
void main() {
  print('Hello, Dart!');
}

// Test Case 2: Variable manipulation
void main() {
  int x = 5;
  int y = 10;
  print('Sum: ${x + y}');
}

// Test Case 3: Conditional statements
void main() {
  int age = 18;
  if (age >= 18) {
    print('Adult');
  } else {
    print('Minor');
  }
}

// Test Case 4: Loops
void main() {
  for (int i = 1; i <= 5; i++) {
    stdout.write('$i ');
  }
  print('');
}

// Test Case 5: Function definition and call
int square(int x) {
  return x * x;
}

void main() {
  print('Square of 7: ${square(7)}');
}