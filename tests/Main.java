// Test Case 1: Basic output
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}

// Test Case 2: Variable manipulation
public class Main {
    public static void main(String[] args) {
        int x = 5;
        int y = 10;
        System.out.println("Sum: " + (x + y));
    }
}

// Test Case 3: Conditional statements
public class Main {
    public static void main(String[] args) {
        int age = 18;
        if (age >= 18) {
            System.out.println("Adult");
        } else {
            System.out.println("Minor");
        }
    }
}

// Test Case 4: Loops
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}

// Test Case 5: Function definition and call
public class Main {
    public static int square(int x) {
        return x * x;
    }

    public static void main(String[] args) {
        System.out.println("Square of 7: " + square(7));
    }
}