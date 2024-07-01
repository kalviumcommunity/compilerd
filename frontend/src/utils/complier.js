const languageExtensions = {
    python: 'py',
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    csharp: 'cs',
    nodejs: 'js',
    go: 'go',
    php: 'php',
    pearl: 'pl',
    ruby: 'rb',
    promptv1: 'txt',
    promptv2: 'txt'
};

const boilerplateCode = {
    python: `print("Hello, World!")`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    c: `#include <stdio.h>
int main() {
    printf("Hello, World!");
    return 0;
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!";
    return 0;
}`,
    csharp: `using System;
class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
    nodejs: `console.log("Hello, World!");`,
    go: `package main
import "fmt"
func main() {
    fmt.Println("Hello, World!")
}`,
    php: `<?php
echo "Hello, World!";
?>`,
    pearl: `print "Hello, World!\\n";`,
    ruby: `puts "Hello, World!"`,
    promptv1: `# Write your prompt here`,
    promptv2: `# Write your prompt here`
};

export { languageExtensions, boilerplateCode }