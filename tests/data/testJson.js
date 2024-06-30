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
        name: "nodejs : conditional statements",
        reqObject: {
            language: "nodejs",
            script: 
                "let a = 10;\n" +
                "if (a > 5) {\n" +
                "    console.log('a is greater than 5');\n" +
                "} else {\n" +
                "    console.log('a is not greater than 5');\n" +
                "}"
        },
        expectedResponse: {
            val: "a is greater than 5",
            status: 200,
            error: 0
        }
    },

    {
        name: "nodejs : read file",
        reqObject: {
            language: "nodejs",
            script: 
                "const fs = require('fs');\n" +
                "fs.readFile('test.txt', 'utf8', (err, data) => {\n" +
                "    if (err) throw err;\n" +
                "    console.log(data);\n" +
                "});"
        },
        fileContent: {
            "test.txt": "This is a test file."
        },
        expectedResponse: {
            val: "This is a test file.",
            status: 200,
            error: 0
        }
    },
    {
        name: "nodejs : write file",
        reqObject: {
            language: "nodejs",
            script: 
                "const fs = require('fs');\n" +
                "fs.writeFile('output.txt', 'Hello, world!', 'utf8', (err) => {\n" +
                "    if (err) throw err;\n" +
                "    console.log('File has been saved!');\n" +
                "});"
        },
        expectedResponse: {
            val: "File has been saved!",
            status: 200,
            error: 0
        },
        checkFileContent: {
            "output.txt": "Hello, world!"
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
        name: "python : for loop",
        reqObject: {
            language: "python",
            script: 
                "for i in range(5):\n" +
                "    print(i)"
        },
        expectedResponse: {
            val: "0\n1\n2\n3\n4\n",
            status: 200,
            error: 0
        }
    },

    {
        name: "python : read file",
        reqObject: {
            language: "python",
            script: 
                "with open('test.txt', 'r') as file:\n" +
                "    data = file.read()\n" +
                "print(data)"
        },
        fileContent: {
            "test.txt": "This is a test file."
        },
        expectedResponse: {
            val: "This is a test file.",
            status: 200,
            error: 0
        }
    },

    {
        name: "python : write file",
        reqObject: {
            language: "python",
            script: 
                "with open('output.txt', 'w') as file:\n" +
                "    file.write('Hello, world!')\n" +
                "print('File has been saved!')"
        },
        expectedResponse: {
            val: "File has been saved!",
            status: 200,
            error: 0
        },
        checkFileContent: {
            "output.txt": "Hello, world!"
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
        name: "c : conditional statements",
        reqObject: {
            language: "c",
            script: 
                "#include <stdio.h>\n" +
                "int main() {\n" +
                "    int a = 10;\n" +
                "    if (a > 5) {\n" +
                "        printf(\"a is greater than 5\\n\");\n" +
                "    } else {\n" +
                "        printf(\"a is not greater than 5\\n\");\n" +
                "    }\n" +
                "    return 0;\n" +
                "}\n"
        },
        expectedResponse: {
            val: "a is greater than 5\n",
            status: 200,
            error: 0
        }
    },

    {
        name: "c : for loop",
        reqObject: {
            language: "c",
            script: 
                "#include <stdio.h>\n" +
                "int main() {\n" +
                "    for (int i = 0; i < 5; ++i) {\n" +
                "        printf(\"%d\\n\", i);\n" +
                "    }\n" +
                "    return 0;\n" +
                "}\n"
        },
        expectedResponse: {
            val: "0\n1\n2\n3\n4\n",
            status: 200,
            error: 0
        }
    },
    
    {
        name: "c : write file",
        reqObject: {
            language: "c",
            script: 
                "#include <stdio.h>\n" +
                "#include <stdlib.h>\n" +
                "int main() {\n" +
                "    FILE *file = fopen(\"output.txt\", \"w\");\n" +
                "    if (file == NULL) {\n" +
                "        fprintf(stderr, \"Could not open file\\n\");\n" +
                "        return 1;\n" +
                "    }\n" +
                "    fprintf(file, \"Hello, world!\\n\");\n" +
                "    fclose(file);\n" +
                "    printf(\"File has been saved!\\n\");\n" +
                "    return 0;\n" +
                "}\n"
        },
        expectedResponse: {
            val: "File has been saved!\n",
            status: 200,
            error: 0
        },
        checkFileContent: {
            "output.txt": "Hello, world!\n"
        }
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
        name: "java : simple arithmetic",
        reqObject: {
            language: "java",
            script: 
                "public class Main {\n" +
                "    public static void main(String[] args) {\n" +
                "        int a = 5;\n" +
                "        int b = 10;\n" +
                "        System.out.println(a + b);\n" +
                "    }\n" +
                "}\n"
        },
        expectedResponse: {
            val: "15\n",
            status: 200,
            error: 0
        }
    },
    

    {
        name: "java : conditional statements",
        reqObject: {
            language: "java",
            script: 
                "public class Main {\n" +
                "    public static void main(String[] args) {\n" +
                "        int a = 10;\n" +
                "        if (a > 5) {\n" +
                "            System.out.println(\"a is greater than 5\");\n" +
                "        } else {\n" +
                "            System.out.println(\"a is not greater than 5\");\n" +
                "        }\n" +
                "    }\n" +
                "}\n"
        },
        expectedResponse: {
            val: "a is greater than 5\n",
            status: 200,
            error: 0
        }
    },
    {
        name: "java : for loop",
        reqObject: {
            language: "java",
            script: 
                "public class Main {\n" +
                "    public static void main(String[] args) {\n" +
                "        for (int i = 0; i < 5; i++) {\n" +
                "            System.out.println(i);\n" +
                "        }\n" +
                "    }\n" +
                "}\n"
        },
        expectedResponse: {
            val: "0\n1\n2\n3\n4\n",
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
        "name": "ruby : conditional statements",
        "reqObject": {
            "language": "ruby",
            "script": 
                "a = 10\n" +
                "if a > 5\n" +
                "    puts 'a is greater than 5'\n" +
                "else\n" +
                "    puts 'a is not greater than 5'\n" +
                "end"
        },
        expectedResponse: {
            val: "a is greater than 5\n",
            status: 200,
            error: 0
        }
    },

    {
        name: "ruby : division by zero error",
        reqObject: {
            language: "ruby",
            script: 
                "begin\n" +
                "    5 / 0\n" +
                "rescue => e\n" +
                "    puts 'Error occurred: ' + e.message\n" +
                "end"
        },
        expectedResponse: {
            val: "Error occurred: divided by 0\n",
            status: 200,
            error: 0
        }
    },

    {
        name: "ruby : for loop",
        reqObject: {
            language: "ruby",
            script: 
                "for i in 0..4\n" +
                "    puts i\n" +
                "end"
        },
        expectedResponse: {
            val: "0\n1\n2\n3\n4\n",
            status: 200,
            error: 0
        }
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
]

module.exports = { testCases }
