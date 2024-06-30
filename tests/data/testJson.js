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
        name: 'go : hello world',
        reqObject: {
            language: 'go',
            script: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("hello world")\n}',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'kotlin : hello world',
        reqObject: {
            language: 'kotlin',
            script: 'fun main() {\n    println("hello world")\n}',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'csharp : hello world',
        reqObject: {
            language: 'c#',
            script: 'using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("hello world");\n    }\n}',
        },
        expectedResponse: {
            val: 'hello world\n',
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
                'print "hello world"',
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
            stdin: '10\n',
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
        name: 'java : arithmetic operations',
        reqObject: {
            language: 'java',
            script: `
                public class Solution {
                    public static void main(String[] args) {
                        System.out.println("Hello, World!");
    
                        int a = 5;
                        int b = 10;
    
                        int sum = a + b;
                        int difference = b - a;
                        int product = a * b;
                        int quotient = b / a;
    
                        System.out.println("Sum: " + sum);
                        System.out.println("Difference: " + difference);
                        System.out.println("Product: " + product);
                        System.out.println("Quotient: " + quotient);
                    }
                }
            `,
        },
        expectedResponse: {
            val: 'Hello, World!\nSum: 15\nDifference: 5\nProduct: 50\nQuotient: 2\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'kotlin : arithmetic operations',
        reqObject: {
            language: 'kotlin',
            script: `
                fun main() {
                    println("Hello, World!")
                    
                    val a = 5
                    val b = 10
    
                    val sum = a + b
                    val difference = b - a
                    val product = a * b
                    val quotient = b / a
    
                    println("Sum: $sum")
                    println("Difference: $difference")
                    println("Product: $product")
                    println("Quotient: $quotient")
                }
            `,
        },
        expectedResponse: {
            val: 'Hello, World!\nSum: 15\nDifference: 5\nProduct: 50\nQuotient: 2\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'kotlin : list sum',
        reqObject: {
            language: 'kotlin',
            script: `
                fun main() {
                    val nums = listOf(1, 2, 3, 4, 5)
                    val sum = nums.sum()
                    println("Sum: $sum")
                }
            `,
        },
        expectedResponse: {
            val: 'Sum: 15\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : string manipulation',
        reqObject: {
            language: 'java',
            script: `
                public class Solution {
                    public static void main(String[] args) {
                        String text = "Hello, World!";
                        String upper = text.toUpperCase();
                        String lower = text.toLowerCase();
                        System.out.println("Uppercase: " + upper);
                        System.out.println("Lowercase: " + lower);
                    }
                }
            `,
        },
        expectedResponse: {
            val: 'Uppercase: HELLO, WORLD!\nLowercase: hello, world!\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'javascript : string reverse',
        reqObject: {
            language: 'nodejs',
            script: `
                const str = 'hello';
                const reversed = str.split('').reverse().join('');
                console.log(reversed);
            `,
        },
        expectedResponse: {
            val: 'olleh\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : array sum',
        reqObject: {
            language: 'ruby',
            script: `
                arr = [1, 2, 3, 4, 5]
                sum = arr.reduce(0, :+)
                puts sum
            `,
        },
        expectedResponse: {
            val: '15\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : find max',
        reqObject: {
            language: 'c',
            script: `
                #include <stdio.h>

                int main() {
                    int nums[] = {10, 20, 30, 40, 50};
                    int max = nums[0];
                    for (int i = 1; i < 5; i++) {
                        if (nums[i] > max) {
                            max = nums[i];
                        }
                    }
                    printf("Max: %d\\n", max);
                    return 0;
                }
            `,
        },
        expectedResponse: {
            val: 'Max: 50\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'kotlin : list sum',
        reqObject: {
            language: 'kotlin',
            script: `
                fun main() {
                    val nums = listOf(1, 2, 3, 4, 5)
                    val sum = nums.sum()
                    println("Sum: $sum")
                }
            `,
        },
        expectedResponse: {
            val: 'Sum: 15\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'go : sum of array',
        reqObject: {
            language: 'go',
            script: `
                package main
                import "fmt"
                
                func main() {
                    arr := []int{1, 2, 3, 4, 5}
                    sum := 0
                    for _, num := range arr {
                        sum += num
                    }
                    fmt.Println(sum)
                }
            `,
        },
        expectedResponse: {
            val: '15\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'nodejs : async/await',
        reqObject: {
            language: 'nodejs',
            script: `
                async function fetchData() {
                    return 'data received';
                }

                (async () => {
                    const data = await fetchData();
                    console.log(data);
                })();
            `,
        },
        expectedResponse: {
            val: 'data received\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : loop through range',
        reqObject: {
            language: 'ruby',
            script: `
                (1..5).each do |i|
                    puts i
                end
            `,
        },
        expectedResponse: {
            val: '1\n2\n3\n4\n5\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : factorial',
        reqObject: {
            language: 'c',
            script: `
                #include <stdio.h>

                int factorial(int n) {
                    if (n <= 1) return 1;
                    return n * factorial(n - 1);
                }

                int main() {
                    printf("%d\\n", factorial(5));
                    return 0;
                }
            `,
        },
        expectedResponse: {
            val: '120\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'kotlin : filter list',
        reqObject: {
            language: 'kotlin',
            script: `
                fun main() {
                    val nums = listOf(1, 2, 3, 4, 5)
                    val evenNums = nums.filter { it % 2 == 0 }
                    println(evenNums)
                }
            `,
        },
        expectedResponse: {
            val: '[2, 4]\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : reverse array',
        reqObject: {
            language: 'java',
            script: `
                import java.util.Arrays;
                import java.util.Collections;

                public class Solution {
                    public static void main(String[] args) {
                        Integer[] arr = {1, 2, 3, 4, 5};
                        Collections.reverse(Arrays.asList(arr));
                        System.out.println(Arrays.toString(arr));
                    }
                }
            `,
        },
        expectedResponse: {
            val: '[5, 4, 3, 2, 1]\n',
            status: 200,
            error: 0,
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
