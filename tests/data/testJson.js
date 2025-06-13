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
            approxMemoryUses: 2744,
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
            approxMemoryUses: 2680,
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
            approxMemoryUses: 44540,
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
            approxMemoryUses: 44888,
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
            approxMemoryUses: 5544,
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
            approxMemoryUses: 5800,
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
            approxMemoryUses: 900,
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
            approxMemoryUses: 924,
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
            approxMemoryUses: 33000,
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
            approxMemoryUses: 35900,
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : print hello world',
        reqObject: {
            language: 'ruby',
            script:
                'print "hello world"',
        },
        expectedResponse: {
            val: 'hello world',
            approxMemoryUses: 22800,
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
            stdin: '10\n',
        },
        expectedResponse: {
            val: '10\n',
            approxMemoryUses: 22800,
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
    {
        name: 'c :Heap memory allocation 50MB',
        reqObject: {
            language: 'c',
            script:
                '#include <stdio.h>\n' +
                '#include <stdlib.h>\n\n' +
                'int main() {\n' +
                '    size_t memory_size = 50 * 1024 * 1024;\n' +
                '    char *memory_block = malloc(memory_size);\n' +
                '    if (memory_block == NULL) {\n' +
                '        printf("Failed to allocate memory\\n");\n' +
                '        return 1;\n' +
                '    }\n' +
                '    printf("Memory allocation done\\n");\n' +
                '    for (size_t i = 0; i < memory_size; i += 4096) {\n' +
                '        memory_block[i] = (char)(i % 256);\n' +
                '    }\n' +
                '    printf("Memory touched and initialized\\n");\n' +
                '    free(memory_block);\n' +
                '    printf("Memory freed\\n");\n' +
                '    return 0;\n' +
                '}',
        },
        expectedResponse: {
            val: 'Memory allocation done\nMemory touched and initialized\nMemory freed\n',
            status: 200,
            error: 0,
            approxMemoryUses: 51000,
        },
        name: 'c :Stack memory allocation 50MB',
        reqObject: {
            language: 'c',
            script: `
                #include <stdio.h>
                #include <string.h>

                #define ONE_MB (1024 * 1024)

                void stack_allocate(int remaining_bytes, int depth) {
                    if (remaining_bytes <= 0) {
                        printf("Memory allocated on stack\\n");
                        return;
                    }
                    char buffer[ONE_MB];
                    memset(buffer, 0, ONE_MB);  // Touch the memory
                    stack_allocate(remaining_bytes - ONE_MB, depth + 1);
                }

                int main() {
                    stack_allocate(6 * ONE_MB, 0);
                    return 0;
                }
            `,
        },
        expectedResponse: {
            val: 'Memory allocated on stack\n',
            status: 200,
            error: 0,
            approxMemoryUses: 6500, // Max stack uses limit is 10 MB
        },
    },

]

module.exports = { testCases }
