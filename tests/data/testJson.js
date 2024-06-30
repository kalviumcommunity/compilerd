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
        name: 'php : hello world',
        reqObject: {
            language: 'php',
            script:
                'echo \'hello world\';\n'
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
        name: 'python : calculate factorial',
        reqObject: {
            language: 'python',
            script:
                'def factorial(n):\n' +
                '    if n == 0:\n' +
                '        return 1\n' +
                '    else:\n' +
                '        return n * factorial(n - 1)\n' +
                'print(factorial(5))\n',
        },
        expectedResponse: {
            val: '120\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : calculate sum of numbers',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n' +
                'public class Solution {\n' +
                '    public static void main(String[] args) {\n' +
                '        Scanner scanner = new Scanner(System.in);\n' +
                '        int sum = 0;\n' +
                '        while (scanner.hasNextInt()) {\n' +
                '            sum += scanner.nextInt();\n' +
                '        }\n' +
                '        System.out.println(sum);\n' +
                '    }\n' +
                '}\n',
            stdin: '1 2 3 4 5',
        },
        expectedResponse: {
            val: '15\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : calculate power of a number',
        reqObject: {
            language: 'ruby',
            script:
                'def power(base, exp)\n' +
                '  return 1 if exp == 0\n' +
                '  base * power(base, exp - 1)\n' +
                'end\n' +
                'puts power(2, 5)\n',
        },
        expectedResponse: {
            val: '32\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'php : calculate factorial',
        reqObject: {
            language: 'php',
            script:
                '<?php\n' +
                'function factorial($n) {\n' +
                '    if ($n <= 1) {\n' +
                '        return 1;\n' +
                '    }\n' +
                '    return $n * factorial($n - 1);\n' +
                '}\n' +
                'echo factorial(5);\n',
        },
        expectedResponse: {
            val: '120',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'php : calculate sum of numbers',
        reqObject: {
            language: 'php',
            script:
                '<?php\n' +
                '$input = trim(fgets(STDIN));\n' +
                '$numbers = explode(" ", $input);\n' +
                '$sum = array_sum($numbers);\n' +
                'echo $sum;\n',
            stdin: '1 2 3 4 5',
        },
        expectedResponse: {
            val: '15',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'go : calculate factorial',
        reqObject: {
            language: 'go',
            script:
                'package main\n' +
                'import "fmt"\n' +
                'func factorial(n int) int {\n' +
                '    if n <= 1 {\n' +
                '        return 1\n' +
                '    }\n' +
                '    return n * factorial(n-1)\n' +
                '}\n' +
                'func main() {\n' +
                '    fmt.Println(factorial(5))\n' +
                '}\n',
        },
        expectedResponse: {
            val: '120',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'go : calculate sum of numbers',
        reqObject: {
            language: 'go',
            script:
                'package main\n' +
                'import (\n' +
                '    "fmt"\n' +
                '    "os"\n' +
                '    "strconv"\n' +
                ')\n' +
                'func main() {\n' +
                '    args := os.Args[1:]\n' +
                '    sum := 0\n' +
                '    for _, arg := range args {\n' +
                '        num, _ := strconv.Atoi(arg)\n' +
                '        sum += num\n' +
                '    }\n' +
                '    fmt.Println(sum)\n' +
                '}\n',
            stdin: '1 2 3 4 5',
        },
        expectedResponse: {
            val: '15',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'dart : calculate factorial',
        reqObject: {
            language: 'dart',
            script:
                'void main() {\n' +
                '  print(factorial(5));\n' +
                '}\n' +
                'int factorial(int n) {\n' +
                '  if (n <= 1) {\n' +
                '    return 1;\n' +
                '  }\n' +
                '  return n * factorial(n - 1);\n' +
                '}\n',
        },
        expectedResponse: {
            val: '120\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'dart : calculate sum of numbers',
        reqObject: {
            language: 'dart',
            script:
                'void main() {\n' +
                '  List<String> args = ["1", "2", "3", "4", "5"];\n' +
                '  int sum = args.map(int.parse).reduce((a, b) => a + b);\n' +
                '  print(sum);\n' +
                '}\n',
        },
        expectedResponse: {
            val: '15\n',
            status: 200,
            error: 0,
        },
    },            
]

module.exports = { testCases }
