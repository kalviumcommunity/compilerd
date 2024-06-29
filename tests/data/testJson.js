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
    // adding a test case of arithmetic operation - one can input 2 values 'a' and 'b' and we get the answer in solution
    {
        name: "cpp : arithmetic operation",
        reqObject: {
            language: "cpp",
            script: "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int a, b;\n    cin >> a >> b;\n    int result = a + b;\n    cout << result;\n    return 0;\n}\n"
        },
        "expectedResponse": {
            "val": "<sum of a and b>",
            "status": 200,
            "error": 0
        }
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
        "name": "cpp : print multiple lines stdin",
        "reqObject": {
            "language": "cpp",
            "script": "#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string line;\n    while (getline(cin, line)) {\n        cout << line << endl;\n    }\n    return 0;\n}\n",
            "stdin": "first line\nsecond line\nthird line"
        },
        "expectedResponse": {
            "val": "first line\nsecond line\nthird line\n",
            "status": 200,
            "error": 0
        }
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
        "name": "nodejs : print multiple lines stdin",
        "reqObject": {
            "language": "nodejs",
            "script": "process.stdin.setEncoding('utf8');\nprocess.stdin.on('data', (input) => {\n  process.stdout.write(input);\n});\n",
            "stdin": "first line\nsecond line\nthird line"
        },
        "expectedResponse": {
            "val": "first line\nsecond line\nthird line",
            "status": 200,
            "error": 0
        }
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
        "name": "python : print multiple lines stdin",
        "reqObject": {
            "language": "python",
            "script": "import sys\nfor line in sys.stdin:\n    print(line)",
            "stdin": "first line\nsecond line\nthird line"
        },
        "expectedResponse": {
            "val": "first line\nsecond line\nthird line\n",
            "status": 200,
            "error": 0
        }
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
    {
        name: 'java : print hello world',
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
        "name": "c : arithmetic operation",
        "reqObject": {
            "language": "c",
            "script": "#include <stdio.h>\nint main() {\n    int a = 5;\n    int b = 10;\n    int result = a + b;\n    printf(\"%d\\n\", result);\n    return 0;\n}"
        },
        "expectedResponse": {
            "val": "15\n",
            "status": 200,
            "error": 0
        }
    },
    {
        "name": "c : print multiple lines stdin",
        "reqObject": {
            "language": "c",
            "script": "#include <stdio.h>\nint main() {\n    char line[100];\n    while (fgets(line, sizeof(line), stdin)) {\n        printf(\"%s\", line);\n    }\n    return 0;\n}",
            "stdin": "first line\nsecond line\nthird line"
        },
        "expectedResponse": {
            "val": "first line\nsecond line\nthird line",
            "status": 200,
            "error": 0
        }
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
        "name": "java : print multiple lines stdin",
        "reqObject": {
            "language": "java",
            "script": "import java.util.Scanner;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        while (scanner.hasNextLine()) {\n            System.out.println(scanner.nextLine());\n        }\n        scanner.close();\n    }\n}"
        },
        "expectedResponse": {
            "val": "first line\nsecond line\nthird line\n",
            "status": 200,
            "error": 0
        }
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
    {
        "name": "ruby : arithmetic operation",
        "reqObject": {
            "language": "ruby",
            "script": "a = 5\nb = 10\nresult = a + b\nputs result"
        },
        "expectedResponse": {
            "val": "15\n",
            "status": 200,
            "error": 0
        }
    },
    

]

module.exports = { testCases }
