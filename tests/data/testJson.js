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

    
    // CPP extra test cases

    {
        name: 'CPP: String Stream',
        reqObject: {
            language: 'cpp',
            script:
            '#include <sstream>\n' +
            '#include <vector>\n' +
            '#include <iostream>\n' +
            'using namespace std;\n' +
            'int main() {\n' +
                'string str;\n' +
                'cin >> str;\n' +
                'stringstream ss(str);\n' +
                'char ch ;\n' +
                'int num;\n' +
                'while(ss >> num){\n' +
                  'cout << num << endl;\n' +
                  'ss >> ch;\n' +
                '}\n' +
                'return 0;\n' +
                '}\n',
            stdin: '23,4,56\n',
        },
        expectedResponse: {
            val: '23\n4\n56\n',
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

    // Python extra test cases
    {
        name: 'Python: Find runner up score',
        reqObject: {
            language: 'python',
            script: 
            'if __name__ == "__main__":\n' +
            '   n = int(input())\n' +
            '   arr = list(map(int, input().split()))\n' +
            '   print(max([a for a in arr if a < max(arr)]))\n',
            stdin: '5\n' + '2 3 6 6 5\n',
        },
        expectedResponse: {
            val: '5\n',
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
    
    // {
    //     name: 'OPEN AI test promptv1',
    //     reqObject: {
    //         language: 'promptv1',
    //         prompt: 'The question is what is 2 plus 2. The answer given is 4.',
    //     },
    //     expectedResponse: {
    //         val: {},
    //         status: 200,
    //         error: 0,
    //     },
    // },
    // {
    //     name: 'OPEN AI test promptv2',
    //     reqObject: {
    //         language: 'promptv2',
    //         prompt: 'The question is what is 2 plus 2. The answer given is 4.',
    //     },
    //     expectedResponse: {
    //         val: {},
    //         status: 200,
    //         error: 0,
    //     },
    // },

    // GO test cases
    {
        name: 'GO: Hello World',
        reqObject: {
            language: 'go',
            script:
                'package main\n' +
                'import "fmt"\n' +
                'func main() {\n' +
                '   var var1 string\n' +
                '   var1 = "Hello World"\n' +
                '   fmt.Println(var1)\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Hello World\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'GO: Addition of two variables',
        reqObject: {
            language: 'go',
            script:
            'package main\n' +
            'import "fmt"\n' +
            'func main() {\n' +
                'var num1 int =10\n' +
                'var num2 int =20\n' +
                'var num3 int =0\n' +
                'num3=num1+num2\n' +
                'fmt.Println(num3)\n' +
            '}\n',
        },
        expectedResponse: {
            val: '30\n',
            status: 200,
            error: 0,
        },
    },

    // // TS test cases
    {
        name: 'TS: hello world',
        reqObject: {
            language: 'typescript',
            script:
            'console.log("Hello World!");\n',
        },
        expectedResponse: {
            val: 'Hello World!\n',
            status: 200,
            error: 0,
        },
    },

    {
        name: 'TS: variable sum',
        reqObject: {
            language: 'typescript',
            script:
            'let var1 = 10;\n' +
            'let var2 = 20;\n' +
            'let sum = var1 + var2;\n' +
            'console.log(sum);\n',
        },
        expectedResponse: {
            val: '30\n',
            status: 200,
            error: 0,
        },
    },

    // // rust test cases
    {
        name: 'RUST: hello world',
        reqObject: {
            language: 'rust',
            script:
            'fn main() {\n' +
                'println!("Hello World!");\n' +
            '}\n',
        },
        expectedResponse: {
            val: 'Hello World!\n',
            status: 200,
            error: 0,
        },
    },

    {
        name: 'RUST: variable sum',
        reqObject: {
            language: 'rust',
            script:
            'fn main() {\n' +
                'let num1 = 10;\n'+
                'let num2 = 20;\n'+
                'let sum = num1 + num2;\n'+
                'println!("{}",sum);\n'+
            '}\n',
        },
        expectedResponse: {
            val: '30\n',
            status: 200,
            error: 0,
        },
    },

    {
        name: 'RUST: Constants',
        reqObject: {
            language: 'rust',
            script:
            'fn main() {\n' +
                'const PI:f32 = 3.14;\n' +
                'println!("{}",PI);\n' +
            '}\n',
        },
        expectedResponse: {
            val: '3.14\n',
            status: 200,
            error: 0,
        },
    },


    // PHP test cases
    {
        name: 'PHP: Hello world',
        reqObject: {
            language: 'php',
            script:
                '<?php\n' +
                'echo "Hello World!";\n' +
                '?>\n',
        },
        expectedResponse: {
            val: 'Hello World!',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'PHP: Variable sum',
        reqObject: {
            language: 'php',
            script:
            '<?php\n' +
            '$x = 5;\n' +
            '$y = 4;\n' +
            'echo $x + $y;' +
            '?>\n',
        },
        expectedResponse: {
            val: '9',
            status: 200,
            error: 0,
        },
    },

]

module.exports = { testCases }
