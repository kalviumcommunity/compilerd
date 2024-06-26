// Test Case 1: Basic output
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}

// Test Case 2: Variable manipulation
#include <iostream>
using namespace std;

int main() {
    int x = 5;
    int y = 10;
    cout << "Sum: " << x + y << endl;
    return 0;
}

// Test Case 3: Conditional statements
#include <iostream>
using namespace std;

int main() {
    int age = 18;
    if (age >= 18) {
        cout << "Adult" << endl;
    } else {
        cout << "Minor" << endl;
    }
    return 0;
}

// Test Case 4: Loops
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}

// Test Case 5: Function definition and call
#include <iostream>
using namespace std;

int square(int x) {
    return x * x;
}

int main() {
    cout << "Square of 7: " << square(7) << endl;
    return 0;
}