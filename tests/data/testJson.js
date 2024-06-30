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
        name: "cpp : simple arithmetic",
        reqObject: {
            language: "cpp",
            script: 
                "#include<bits/stdc++.h>\n" +
                "using namespace std;\n" +
                "int main(){\n" +
                "    int a = 5, b = 10;\n" +
                "    cout << (a + b);\n" +
                "    return 0;\n" +
                "}\n"
        },
        expectedResponse: {
            val: "15",
            status: 200,
            error: 0
        }
    },
    {
        name: "cpp : conditional statements",
        reqObject: {
            language: "cpp",
            script: 
                "#include<bits/stdc++.h>\n" +
                "using namespace std;\n" +
                "int main(){\n" +
                "    int a = 10;\n" +
                "    if (a > 5) {\n" +
                "        cout << \"a is greater than 5\";\n" +
                "    } else {\n" +
                "        cout << \"a is not greater than 5\";\n" +
                "    }\n" +
                "    return 0;\n" +
                "}\n"
        },
        expectedResponse: {
            val: "a is greater than 5",
            status: 200,
            error: 0
        }
    },
    {
        name: "cpp : for loop",
        reqObject: {
            language: "cpp",
            script: 
                "#include<bits/stdc++.h>\n" +
                "using namespace std;\n" +
                "int main(){\n" +
                "    for (int i = 0; i < 5; ++i) {\n" +
                "        cout << i << \" \";\n" +
                "    }\n" +
                "    return 0;\n" +
                "}\n"
        },
        expectedResponse: {
            val: "0 1 2 3 4 ",
            status: 200,
            error: 0
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
        name: "nodejs : Module Import Test",
        reqObject: {
            language: "nodejs",
            script: "const os = require('os'); console.log(os.platform());"
        },
        expectedResponse: {
            val: "(platform name)",
            status: 200,
            error: 0
        }
    },
    {
        name: "nodejs : Async/Await Test",
        reqObject: {
            language: "nodejs",
            script: "\
const asyncFunction = async () => { \
    return 'Async Function Working'; \
}; \
(async function runTest() { \
    try { \
        const result = await asyncFunction(); \
        console.log(result); \
    } catch (err) { \
        console.error('Async/Await Test Failed', err); \
    } \
})();"
        },
        expectedResponse: {
            val: "Async Function Working",
            status: 200,
            error: 0
        }
    },
    {
        name: "nodejs : Child Process Test",
        reqObject: {
            language: "nodejs",
            script: "\
const { exec } = require('child_process'); \
exec('node -v', (err, stdout, stderr) => { \
    if (err) { \
        console.error('Child Process Test Failed', err); \
        return; \
    } \
    console.log('Node.js Version:', stdout.trim()); \
});"
        },
        expectedResponse: {
            val: "Node.js Version: (version)",
            status: 200,
            error: 0
        }
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
        name: "python : File System Test",
        reqObject: {
            language: "python",
            script: "\
import os\n\
path = 'test.txt'\n\
with open(path, 'w') as file:\n\
    file.write('Hello, file system!')\n\
with open(path, 'r') as file:\n\
    data = file.read()\n\
    print('File Content:', data)\n\
os.remove(path)"
        },
        expectedResponse: {
            val: "File Content: Hello, file system!",
            status: 200,
            error: 0
        }
    },
    {
        name: "python : Async/Await Test",
        reqObject: {
            language: "python",
            script: "\
import asyncio\n\
async def async_function():\n\
    return 'Async Function Working'\n\
async def run_test():\n\
    result = await async_function()\n\
    print(result)\n\
asyncio.run(run_test())"
        },
        expectedResponse: {
            val: "Async Function Working",
            status: 200,
            error: 0
        }
    },
    {
        name: "python : Subprocess Test",
        reqObject: {
            "language": "python",
            "script": "\
import subprocess\n\
result = subprocess.run(['python', '--version'], stdout=subprocess.PIPE)\n\
print('Python Version:', result.stdout.decode().strip())"
        },
        "expectedResponse": {
            "val": "Python Version: (version)",
            "status": 200,
            "error": 0
        }
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
        name: "c : Conditional Test",
        reqObject: {
            language: "c",
            script: "#include <stdio.h>\nint main() {\n    int x = 10;\n    if (x > 5) {\n        printf(\"x is greater than 5\\n\");\n    } else {\n        printf(\"x is not greater than 5\\n\");\n    }\n    return 0;\n}"
        },
        expectedResponse: {
            val: "x is greater than 5\n",
            status: 200,
            error: 0
        }
    },
    {
        name: "c : Loop Test",
        reqObject: {
            language: "c",
            script: "#include <stdio.h>\nint main() {\n    for (int i = 0; i < 5; i++) {\n        printf(\"%d \", i);\n    }\n    return 0;\n}"
        },
        expectedResponse: {
            val: "0 1 2 3 4 ",
            status: 200,
            error: 0
        }
    },
    {
        name: "c : Function Test",
        reqObject: {
            language: "c",
            script: "#include <stdio.h>\nint add(int a, int b) {\n    return a + b;\n}\nint main() {\n    int result = add(3, 4);\n    printf(\"%d\\n\", result);\n    return 0;\n}"
        },
        expectedResponse: {
            val: "7\n",
            status: 200,
            error: 0
        }
    },
    {
        name: "c : File I/O Test",
        reqObject: {
            language: "c",
            script: "#include <stdio.h>\nint main() {\n    FILE *file = fopen(\"test.txt\", \"w\");\n    if (file) {\n        fprintf(file, \"Hello, file system!\\n\");\n        fclose(file);\n    }\n    file = fopen(\"test.txt\", \"r\");\n    if (file) {\n        char buffer[50];\n        fgets(buffer, 50, file);\n        printf(\"%s\", buffer);\n        fclose(file);\n        remove(\"test.txt\");\n    }\n    return 0;\n}"
        },
        expectedResponse: {
            val: "Hello, file system!\n",
            status: 200,
            error: 0
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
        name: "java : Conditional Test",
        reqObject: {
            language: "java",
            script: "public class Main {\n    public static void main(String[] args) {\n        int x = 10;\n        if (x > 5) {\n            System.out.println(\"x is greater than 5\");\n        } else {\n            System.out.println(\"x is not greater than 5\");\n        }\n    }\n}"
        },
        expectedResponse: {
            val: "x is greater than 5\n",
            status: 200,
            error: 0
        }
    },
    {
        name: "java : Loop Test",
        reqObject: {
            language: "java",
            script: "public class Main {\n    public static void main(String[] args) {\n        for (int i = 0; i < 5; i++) {\n            System.out.print(i + \" \");\n        }\n    }\n}"
        },
        expectedResponse: {
            val: "0 1 2 3 4 ",
            status: 200,
            error: 0
        }
    },
    {
        name: "java : Function Test",
        reqObject: {
            language: "java",
            script: "public class Main {\n    public static int add(int a, int b) {\n        return a + b;\n    }\n    public static void main(String[] args) {\n        int result = add(3, 4);\n        System.out.println(result);\n    }\n}"
        },
        expectedResponse: {
            val: "7\n",
            status: 200,
            error: 0
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
        name: "ruby : Conditional Test",
        reqObject: {
            language: "ruby",
            script: "x = 10\nif x > 5\n  puts 'x is greater than 5'\nelse\n  puts 'x is not greater than 5'\nend"
        },
        expectedResponse: {
            val: "x is greater than 5\n",
            status: 200,
            error: 0
        }
    },
    {
        name: "ruby : Loop Test",
        reqObject: {
            language: "ruby",
            script: "5.times do |i|\n  print i, ' '\nend"
        },
        expectedResponse: {
            val: "0 1 2 3 4 ",
            status: 200,
            error: 0
        }
    },    
    {
        name: "ruby : Function Test",
        reqObject: {
            language: "ruby",
            script: "def add(a, b)\n  a + b\nend\nresult = add(3, 4)\nputs result"
        },
        expectedResponse: {
            val: "7\n",
            status: 200,
            error: 0
        }
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
