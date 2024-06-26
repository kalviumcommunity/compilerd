// Test Case 1: Basic output
#include <stdio.h>

int main() {
    printf("Hello, C!\n");
    return 0;
}

// Test Case 2: Variable manipulation
#include <stdio.h>

int main() {
    int x = 5;
    int y = 10;
    printf("Sum: %d\n", x + y);
    return 0;
}

// Test Case 3: Conditional statements
#include <stdio.h>

int main() {
    int age = 18;
    if (age >= 18) {
        printf("Adult\n");
    } else {
        printf("Minor\n");
    }
    return 0;
}

// Test Case 4: Loops
#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}

// Test Case 5: Function definition and call
#include <stdio.h>

int square(int x) {
    return x * x;
}

int main() {
    printf("Square of 7: %d\n", square(7));
    return 0;
}