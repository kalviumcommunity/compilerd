const testCases = [
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
        
            name: 'cpp : conditional statements',
            reqObject: {
                language: 'cpp',
                script: 
                    '#include<iostream>\n' +
                    'using namespace std;\n' +
                    'int main(){\n' +
                    '    int number;\n' +
                    '    cout << "Enter a number: ";\n' +
                    '    cin >> number;\n' +
                    '    if (number % 2 == 0) {\n' +
                    '        cout << number << " is even." << endl;\n' +
                    '    } else {\n' +
                    '        cout << number << " is odd." << endl;\n' +
                    '    }\n' +
                    '    return 0;\n' +
                    '}\n',
            },
            expectedResponse: {
                val: 'Enter a number: ',
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
    {
        name: 'cpp : loops',
        reqObject: {
            language: 'cpp',
            script: 
                '#include<iostream>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    for (int i = 1; i <= 5; ++i) {\n' +
                '        cout << "Count: " << i << endl;\n' +
                '    }\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : strings',
        reqObject: {
            language: 'cpp',
            script: 
                '#include<iostream>\n' +
                '#include<string>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    string str;\n' +
                '    cout << "Enter a string: ";\n' +
                '    cin >> str;\n' +
                '    cout << "You entered: " << str << endl;\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Enter a string: ',
            status: 200,
            error: 0,
        },
    },
    
    
    {
        name: 'nodejs : hello world',
        reqObject: {
            language: 'nodejs',
            script: 'console.log(\'hello world\')',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    
    {
        name: 'nodejs : simple addition function',
        reqObject: {
            language: 'nodejs',
            script:
                'function add(a, b) {\n' +
                '  return a + b;\n' +
                '}\n' +
                'console.log(add(2, 3));\n',
        },
        expectedResponse: {
            val: '5\n',
            status: 200,
            error: 0,
        },
    },
    

    {
        name: 'nodejs : print stdin',
        reqObject: {
            language: 'nodejs',
            script:
                'process.stdin.setEncoding(\'utf8\'); \n ' +
                'process.stdin.on(\'data\', (input) => { \n ' +
                '  console.log(input); \n ' +
                ' \n ' +
                '}); \n ',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1 2 3\n',
            status: 200,
            error: 0,
        },
    },

    {
        name: 'nodejs : http server',
        reqObject: {
            language: 'nodejs',
            script:
                'const http = require("http");\n' +
                'const server = http.createServer((req, res) => {\n' +
                '  res.statusCode = 200;\n' +
                '  res.setHeader("Content-Type", "text/plain");\n' +
                '  res.end("Hello, World!\\n");\n' +
                '});\n' +
                'server.listen(3000, "127.0.0.1", () => {\n' +
                '  console.log("Server running at http://127.0.0.1:3000/");\n' +
                '});\n',
        },
        expectedResponse: {
            val: 'Server running at http://127.0.0.1:3000/\n',
            status: 200,
            error: 0,
        },
    },
    

    {
        name: 'python : hello world',
        reqObject: {
            language: 'python',
            script: 'print(\'hello world\')',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : basic arithmetic',
        reqObject: {
            language: 'python',
            script: 
                'a = 5\n' +
                'b = 3\n' +
                'print(a + b)\n',
        },
        expectedResponse: {
            val: '8\n',
            status: 200,
            error: 0,
        },
    },
    
    {
        name: 'python : print stdin',
        reqObject: {
            language: 'python',
            script:
                'try:\n' +
                '    while(True):\n' +
                '        line = input()\n' +
                '        if not line:\n' +
                '            break\n' +
                '        print(line)\n' +
                'except EOFError:\n' +
                '    pass',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1 2 3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : loops',
        reqObject: {
            language: 'python',
            script: 
                'for i in range(1, 6):\n' +
                '    print(f"Count: {i}")\n',
        },
        expectedResponse: {
            val: 'Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5\n',
            status: 200,
            error: 0,
        },
    },
    
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
        name: 'c : conditional statements',
        reqObject: {
            language: 'c',
            script: 
                '#include <stdio.h>\n' +
                'int main() {\n' +
                '    int number = 7;\n' +
                '    if (number % 2 == 0) {\n' +
                '        printf("even\\n");\n' +
                '    } else {\n' +
                '        printf("odd\\n");\n' +
                '    }\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'odd\n',
            status: 200,
            error: 0,
        },
    },


    {
        name: 'c : loops',
        reqObject: {
            language: 'c',
            script: 
                '#include <stdio.h>\n' +
                'int main() {\n' +
                '    for (int i = 1; i <= 5; i++) {\n' +
                '        printf("Count: %d\\n", i);\n' +
                '    }\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5\n',
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
    {
        name: 'java : print stdin',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n' +
                'public class Solution {\n' +
                '    public static void main(String[] args) {\n' +
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
                'import java.util.Scanner;\n' +
                'public class Solution {\n' +
                '    public static void main(String[] args) {\n' +
                '        Scanner scanner = new Scanner(System.in);\n' +
                '        while (scanner.hasNextInt()) {\n' +
                '            int number = scanner.nextInt();\n' +
                '            System.out.println(number);\n' +
                '        } \n' +
                '        scanner.close();\n' +
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
    {
        name: 'java : conditional statements',
        reqObject: {
            language: 'java',
            script: 
                'public class Main {\n' +
                '    public static void main(String[] args) {\n' +
                '        int number = 7;\n' +
                '        if (number % 2 == 0) {\n' +
                '            System.out.println("even");\n' +
                '        } else {\n' +
                '            System.out.println("odd");\n' +
                '        }\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'odd\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : loops',
        reqObject: {
            language: 'java',
            script: 
                'public class Main {\n' +
                '    public static void main(String[] args) {\n' +
                '        for (int i = 1; i <= 5; i++) {\n' +
                '            System.out.println("Count: " + i);\n' +
                '        }\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5\n',
            status: 200,
            error: 0,
        },
    },
    
    
    {
        name: 'ruby : print hello world',
        reqObject: {
            language: 'ruby',
            script:
                'print "hello world"'
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : print stdin',
        reqObject: {
            language: 'ruby',
            script:
                'user_input = gets.chomp\n' +
                'puts user_input',
            stdin: '10\n'
        },
        expectedResponse: {
            val: '10\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : conditional statements',
        reqObject: {
            language: 'ruby',
            script: 
                'number = 7\n' +
                'if number % 2 == 0\n' +
                '    puts "even"\n' +
                'else\n' +
                '    puts "odd"\n' +
                'end'
        },
        expectedResponse: {
            val: 'odd\n',
            status: 200,
            error: 0,
        },
    },

    {
        name: 'ruby : loops',
        reqObject: {
            language: 'ruby',
            script: 
                '5.times do |i|\n' +
                '    puts "Count: #{i + 1}"\n' +
                'end'
        },
        expectedResponse: {
            val: 'Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5\n',
            status: 200,
            error: 0,
        },
    },
    
    
    
    {
        name: 'TLE test',
        reqObject: {
            language: 'nodejs',
            script: 'for(let i=0 ; ; ){i++}',
        },
        expectedResponse: {
            val: 'Time limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test',
        reqObject: {
            language: 'python',
            script: 'one_gb_data = bytearray(1000 * 1024 * 1024)',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test 2',
        reqObject: {
            language: 'python',
            script:
                'import time\n' +
                'def consume_memory(target_mb, duration_sec):\n' +
                '    float_size = 8\n' +
                '    floats_per_mb = (1024 * 1024) // float_size\n' +
                '    total_floats = target_mb * floats_per_mb\n' +
                '    iterations = int(duration_sec / 0.1)\n' +
                '    floats_per_iteration = total_floats // iterations\n' +
                '    memory_hog = []\n' +
                '    for _ in range(iterations):\n' +
                '        memory_hog.extend([0.0] * floats_per_iteration)\n' +
                '        time.sleep(0.1)\n' +
                'consume_memory(1000, 1)\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test 3',
        reqObject: {
            language: 'python',
            script:
                'a = [100]\n' +
                'for i in a:\n' +
                '    a.append(i)\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'OPEN AI test promptv1',
        reqObject: {
            language: 'promptv1',
            prompt: 'The question is what is 2 plus 2. The answer given is 4.',
        },
        expectedResponse: {
            val: {},
            status: 200,
            error: 0,
        },
    },
    {
        name: 'OPEN AI test promptv2',
        reqObject: {
            language: 'promptv2',
            prompt: 'The question is what is 2 plus 2. The answer given is 4.',
        },
        expectedResponse: {
            val: {},
            status: 200,
            error: 0,
        },
    },
]

module.exports = { testCases }
