// frontend/src/defaultStubs.js

const stubs = {};

stubs.c = `#include <stdio.h>

int main() {
    printf("Hello World");
    return 0;
}
`;

stubs.cpp = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}
`;

stubs.python = `# python3

import sys
sys.stdin  = open(sys.argv[1])
# keep the above lines to take user input

print("Hello World !!!")
`;

stubs.java = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
`;

stubs.nodejs = `console.log('Hello World');
`;

stubs.ruby = `puts "Hello World"
`;

stubs.promptv1 = `# This is a PromptV1 example
The question is: What is 2 + 2? The answer is 4.
`;

stubs.promptv2 = `# This is a PromptV2 example
The question is: What is the capital of France? The answer is Paris.
`;

stubs.multifile = `# This is a multifile example
# You can provide multiple files to be compiled/executed together.
`;

stubs.sqlite3 = `-- This is a SQLite3 example
CREATE TABLE test (id INTEGER PRIMARY KEY, value TEXT);
INSERT INTO test (value) VALUES ('Hello World');
SELECT * FROM test;
`;

stubs.rust = `fn main() {
    println!("Hello, world!");
}
`;

stubs.go = `package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
`;

stubs.php = `<?php
echo "Hello World";
?>
`;

stubs.r = `print("Hello World")
`;

stubs.perl = `print "Hello World\n";
`;

stubs.csharp = `using System;

class Program {
    static void Main(string[] args) {
        Console.WriteLine("Hello World");
    }
}
`;

module.exports = stubs;
