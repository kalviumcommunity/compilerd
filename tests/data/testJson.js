const testCases = [
    {
        name: 'c : hello world',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                'int main(){\n\n' +
                '    printf("hello world");\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : print stdin',
        reqObject: {
            language: 'c',
            script:
                '#include <stdio.h>\n' +
                'int main() {\n' +
                '    int number;\n' +
                '    while (scanf("%d", &number) == 1) {\n' +
                '        printf("%d\\n", number);\n' +
                '    } \n' +
                '    return 0;\n' +
                '}',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    // C Language Additional Test Cases
    {
        name: 'c : division by zero',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                'int main(){\n\n' +
                '    int a = 1 / 0;\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Runtime Error: Division by zero',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'c : syntax error',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                'int main(\n\n' + // Missing closing parenthesis
                '    printf("hello world");\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Syntax Error',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'c : file not found',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                '#include "non_existent_file.h"\n\n' + // Non-existent file
                'int main(){\n\n' +
                '    printf("hello world");\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'File Not Found',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'c : memory limit exceeded',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                'int main(){\n\n' +
                '    int arr[100000000];\n' + // Large array to exceed memory
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Memory Limit Exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'c : null pointer dereference',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                'int main(){\n\n' +
                '    int *p = NULL;\n' +
                '    int a = *p;\n' + // Dereference null pointer
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Null Pointer Dereference',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'c : segmentation fault',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                'int main(){\n\n' +
                '    int arr[10];\n' +
                '    arr[100] = 1;\n' + // Out of bounds access
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Segmentation Fault',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'cpp : hello world',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    cout << "hello world";\n' +
                'return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : print stdin',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n\n' +
                'using namespace std;\n' +
                'int main(){\n\n' +
                '    int a;\n' +
                '    while(cin >> a){\n' +
                '        cout << a << endl;\n' +
                '    }\n' +
                '    return 0;\n\n' +
                '}\n',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    // CPP Language Additional Test Cases
    {
        name: 'cpp : division by zero',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    int a = 1 / 0;\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Runtime Error: Division by zero',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'cpp : syntax error',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(\n' + // Missing closing parenthesis
                '    cout << "hello world";\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Syntax Error',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'cpp : file not found',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                '#include "non_existent_file.h"\n' + // Non-existent file
                'using namespace std;\n' +
                'int main(){\n' +
                '    cout << "hello world";\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'File Not Found',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'cpp : memory limit exceeded',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    int arr[100000000];\n' + // Large array to exceed memory
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Memory Limit Exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'cpp : null pointer dereference',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    int *p = NULL;\n' +
                '    int a = *p;\n' + // Dereference null pointer
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Null Pointer Dereference',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'cpp : segmentation fault',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    int arr[10];\n' +
                '    arr[100] = 1;\n' + // Out of bounds access
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Segmentation Fault',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'python : hello world',
        reqObject: {
            language: 'python',
            script: 'print("hello world")',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : print stdin',
        reqObject: {
            language: 'python',
            script: 'import sys\nfor line in sys.stdin:\n\tprint(line, end="")',
            stdin: '1\n2\n3',
        },
        expectedResponse: {
            val: '1\n2\n3',
            status: 200,
            error: 0,
        },
    },
    // Python Language Additional Test Cases
    {
        name: 'python : division by zero',
        reqObject: {
            language: 'python',
            script: 'a = 1 / 0',
        },
        expectedResponse: {
            val: 'ZeroDivisionError: division by zero\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'python : syntax error',
        reqObject: {
            language: 'python',
            script: 'print("hello world"', // Missing closing parenthesis
        },
        expectedResponse: {
            val: 'SyntaxError: unexpected EOF while parsing\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'python : file not found',
        reqObject: {
            language: 'python',
            script: 'open("non_existent_file.txt")', // Non-existent file
        },
        expectedResponse: {
            val: 'FileNotFoundError: [Errno 2] No such file or directory: \'non_existent_file.txt\'\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'python : memory limit exceeded',
        reqObject: {
            language: 'python',
            script: 'arr = [0] * (10**8)', // Large array to exceed memory
        },
        expectedResponse: {
            val: 'MemoryError\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'python : infinite loop',
        reqObject: {
            language: 'python',
            script: 'while True: pass', // Infinite loop
        },
        expectedResponse: {
            val: 'Timeout Error: Infinite Loop\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'python : key error',
        reqObject: {
            language: 'python',
            script: 'd = {}\nprint(d["key"])', // KeyError
        },
        expectedResponse: {
            val: 'KeyError: \'key\'\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'java : hello world',
        reqObject: {
            language: 'java',
            script:
                'class main{\n' +
                '    public static void main(String args[]){\n' +
                '        System.out.println("hello world");\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : print stdin',
        reqObject: {
            language: 'java',
            script:
                'import java.util.*;\n' +
                'class main{\n' +
                '    public static void main(String args[]){\n' +
                '        Scanner sc = new Scanner(System.in);\n' +
                '        while(sc.hasNextInt()){\n' +
                '            System.out.println(sc.nextInt());\n' +
                '        }\n' +
                '    }\n' +
                '}\n',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    // Java Language Additional Test Cases
    {
        name: 'java : division by zero',
        reqObject: {
            language: 'java',
            script:
                'class main{\n' +
                '    public static void main(String args[]){\n' +
                '        int a = 1 / 0;\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Exception in thread "main" java.lang.ArithmeticException: / by zero\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'java : syntax error',
        reqObject: {
            language: 'java',
            script:
                'class main{\n' +
                '    public static void main(String args[]){\n' +
                '        System.out.println("hello world")\n' + // Missing semicolon
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Syntax Error\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'java : file not found',
        reqObject: {
            language: 'java',
            script:
                'import java.io.*;\n' +
                'class main{\n' +
                '    public static void main(String args[]){\n' +
                '        FileReader file = new FileReader("non_existent_file.txt");\n' + // Non-existent file
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Exception in thread "main" java.io.FileNotFoundException: non_existent_file.txt (No such file or directory)\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'java : memory limit exceeded',
        reqObject: {
            language: 'java',
            script:
                'class main{\n' +
                '    public static void main(String args[]){\n' +
                '        int arr[] = new int[100000000];\n' + // Large array to exceed memory
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Exception in thread "main" java.lang.OutOfMemoryError: Java heap space\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'java : null pointer exception',
        reqObject: {
            language: 'java',
            script:
                'class main{\n' +
                '    public static void main(String args[]){\n' +
                '        String str = null;\n' +
                '        System.out.println(str.length());\n' + // Null pointer exception
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Exception in thread "main" java.lang.NullPointerException\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'java : array index out of bounds exception',
        reqObject: {
            language: 'java',
            script:
                'class main{\n' +
                '    public static void main(String args[]){\n' +
                '        int arr[] = new int[10];\n' +
                '        arr[100] = 1;\n' + // Out of bounds access
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 100 out of bounds for length 10\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'ruby : hello world',
        reqObject: {
            language: 'ruby',
            script: 'puts "hello world"',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : print stdin',
        reqObject: {
            language: 'ruby',
            script: 'ARGF.each {|line| print line }',
            stdin: '1\n2\n3',
        },
        expectedResponse: {
            val: '1\n2\n3',
            status: 200,
            error: 0,
        },
    },
    // Ruby Language Additional Test Cases
    {
        name: 'ruby : division by zero',
        reqObject: {
            language: 'ruby',
            script: 'a = 1 / 0',
        },
        expectedResponse: {
            val: 'ZeroDivisionError: divided by 0\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'ruby : syntax error',
        reqObject: {
            language: 'ruby',
            script: 'puts "hello world"', // Missing end
        },
        expectedResponse: {
            val: 'SyntaxError: unexpected end-of-input, expecting end\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'ruby : file not found',
        reqObject: {
            language: 'ruby',
            script: 'File.read("non_existent_file.txt")', // Non-existent file
        },
        expectedResponse: {
            val: 'Errno::ENOENT: No such file or directory @ rb_sysopen - non_existent_file.txt\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'ruby : memory limit exceeded',
        reqObject: {
            language: 'ruby',
            script: 'arr = Array.new(100000000)', // Large array to exceed memory
        },
        expectedResponse: {
            val: 'NoMemoryError: failed to allocate memory\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'ruby : no method error',
        reqObject: {
            language: 'ruby',
            script: 'nil.some_method', // NoMethodError
        },
        expectedResponse: {
            val: 'NoMethodError: undefined method `some_method` for nil:NilClass\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'ruby : type error',
        reqObject: {
            language: 'ruby',
            script: '1 + "string"', // TypeError
        },
        expectedResponse: {
            val: 'TypeError: String can\'t be coerced into Integer\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'node : hello world',
        reqObject: {
            language: 'node',
            script: 'console.log("hello world");',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'node : print stdin',
        reqObject: {
            language: 'node',
            script: 'process.stdin.on("data", function(data) { console.log(data.toString()); });',
            stdin: '1\n2\n3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    // Node.js Language Additional Test Cases
    {
        name: 'node : division by zero',
        reqObject: {
            language: 'node',
            script: 'let a = 1 / 0; console.log(a);',
        },
        expectedResponse: {
            val: 'Infinity\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'node : syntax error',
        reqObject: {
            language: 'node',
            script: 'console.log("hello world"' // Missing closing parenthesis
        },
        expectedResponse: {
            val: 'SyntaxError: Unexpected end of input\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'node : file not found',
        reqObject: {
            language: 'node',
            script: 'const fs = require("fs"); fs.readFileSync("non_existent_file.txt");', // Non-existent file
        },
        expectedResponse: {
            val: 'Error: ENOENT: no such file or directory, open \'non_existent_file.txt\'\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'node : memory limit exceeded',
        reqObject: {
            language: 'node',
            script: 'let arr = new Array(1e9);', // Large array to exceed memory
        },
        expectedResponse: {
            val: 'RangeError: Invalid array length\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'node : infinite loop',
        reqObject: {
            language: 'node',
            script: 'while (true) {}', // Infinite loop
        },
        expectedResponse: {
            val: 'Timeout Error: Infinite Loop\n',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'node : reference error',
        reqObject: {
            language: 'node',
            script: 'console.log(nonExistentVariable);', // ReferenceError
        },
        expectedResponse: {
            val: 'ReferenceError: nonExistentVariable is not defined\n',
            status: 200,
            error: 1,
        },
    },
];

module.exports = testCases;
