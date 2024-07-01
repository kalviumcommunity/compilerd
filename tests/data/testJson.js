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
        name: 'nodejs : incorrect output',
        reqObject: {
            language: 'nodejs',
            script: 'console.log(\'Hello World\')', 
        },
        expectedResponse: {
          val: 'Hello World\n', 
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
    // {
    //     name: 'python : runtime error',
    //     reqObject: {
    //         language: 'python',
    //         script: 'print(10 / 0)',
    //     },
    //     expectedResponse: {
    //         val: 'ZeroDivisionError: division by zero',
    //         status: 200, 
    //         error: 1,
    //     },
    // },
    {
        name: 'python : function call',
        reqObject: {
            language: 'python',
            script:
            'def add(x, y):\n' +
            '  return x + y\n' +
            '\n' +
            'print(add(5, 3))',
        },
        expectedResponse: {
          val: '8\n',
          status: 200,
          error: 0,
        },
    },
    {
        name: 'python : string manipulation',
        reqObject: {
            language: 'python',
            script:
            'text = "Hello, world!"\n' +
            'print(text.upper())\n' +  
            'print(text.split(" "))\n', 
        },
        expectedResponse: {
          val: 'HELLO, WORLD!\n[\'Hello,\', \'world!\']\n',
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
        name: 'java : infinite loop',
        reqObject: {
          language: 'java',
          script:
            'import java.util.Scanner;\n' +
            'public class Solution {\n' +
            'public static void main(String[] args) {\n' +
            'while (true) { // Infinite loop' +
            'System.out.println("Looping...");' +
            '} \n' +
            '}\n' +
            '}\n',
        },
        expectedResponse: {
          val: '',
          status: 200,
          error: 1,
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
        name: 'ruby : print with spaces',
        reqObject: {
            language: 'ruby',
            script: '  puts " hello world "  ', 
        },
        expectedResponse: {
        val: ' hello world \n',
        status: 200,
        error: 0,
        },
    },
    {
        name: 'ruby : access array elements',
        reqObject: {
            language: 'ruby',
            script:
              'colors = ["red", "green", "blue"]\n' +
              'puts colors[1]',
        },
        expectedResponse: {
          val: 'green\n',
          status: 200,
          error: 0,
        },
    },
    {
        name: 'ruby : regular expressions',
        reqObject: {
            language: 'ruby',
            script:
            'text = "This is an email: test@example.com"\n' +
            'match = text.match(/test@(.+)\.com/) \n' +
            'puts match ? match[1] : "No email found."',
        },
        expectedResponse: {
          val: 'example\n',
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
        name: 'go : hello world',
        reqObject: {
            language: 'go',
            script:
                'package main\n' +
                'import "fmt"\n' +
                'func main() {\n' +
                '    fmt.Println("hello world")\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'go : string concatenation',
        reqObject: {
            language: 'go',
            script: `package main
        
        import (
          "fmt"
        )
        
        func main() {
          firstName := "Sunil"
          lastName := "Sharma"
          fullName := firstName + " " + lastName
          fmt.Println(fullName)
        }
        `,
          },
          expectedResponse: {
            val: 'Sunil Sharma\n',
            status: 200,
            error: 0,
          },
    },
    {
      name: 'go : if-else statement',
      reqObject: {
            language: 'go',
            script: `package main
        
            import (
              "fmt"
            )
            
            func main() {
              number := 10
              if number > 5 {
                fmt.Println("Number is greater than 5")
              } else {
                fmt.Println("Number is less than or equal to 5")
              }
            }`,
      },
      expectedResponse: {
            val: 'Number is greater than 5\n',
            status: 200,
            error: 0,
      },
    },    
    {
        name: 'go : for loop',
        reqObject: {
            language: 'go',
            script: `package main
    
            import (
              "fmt"
            )
            
            func main() {
              for i := 0; i < 5; i++ {
                fmt.Println(i)
              }
            }`,
      },
      expectedResponse: {
        val: '0\n1\n2\n3\n4\n',
        status: 200,
        error: 0,
      },
    },
    {
        name: 'go : array access',
        reqObject: {
            language: 'go',
            script: `package main
    
            import (
              "fmt"
            )
            
            func main() {
              colors := [3]string{"red", "green", "blue"}
              secondColor := colors[1]
              fmt.Println(secondColor)
            }`,
      },
      expectedResponse: {
        val: 'green\n',
        status: 200,
        error: 0,
      },
    },
    {
        name: 'rust : hello world',
        reqObject: {
            language: 'rust',
            script: 'fn main() { println!("hello world"); }',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },



    {
        name: 'php : hello world',
        reqObject: {
            language: 'php',
            script: '<?php\n' + 'echo "hello world";\n',
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
]

module.exports = { testCases }
