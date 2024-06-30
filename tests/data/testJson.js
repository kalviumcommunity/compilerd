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
        name: 'javascript : hello world',
        reqObject: {
            language: 'javascript',
            script: 'console.log(\'hello world\')',
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
            script: '<?php echo "hello world"; ?>',
        },
        expectedResponse: {
            val: 'hello world',
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
        name: 'javascript : console log multiple lines',
        reqObject: {
            language: 'javascript',
            script: 'console.log(\'line 1\'); console.log(\'line 2\');',
        },
        expectedResponse: {
            val: 'line 1\nline 2\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'javascript : factorial calculation',
        reqObject: {
            language: 'javascript',
            script:
                'function factorial(n) {\n' +
                '    if (n === 0 || n === 1)\n' +
                '        return 1;\n' +
                '    else\n' +
                '        return n * factorial(n - 1);\n' +
                '}\n' +
                'console.log(factorial(5));',
        },
        expectedResponse: {
            val: '120\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'javascript : simple addition',
        reqObject: {
            language: 'javascript',
            script: 'console.log(2 + 3);',
        },
        expectedResponse: {
            val: '5\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'javascript : infinite loop',
        reqObject: {
            language: 'javascript',
            script: 'for(let i = 0; ; i++) { console.log(i); }',
        },
        expectedResponse: {
            val: 'Time limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'javascript : memory-intensive operation',
        reqObject: {
            language: 'javascript',
            script:
                'let arr = new Array(1000000).fill(0);\n' +
                'for (let i = 0; i < arr.length; i++) {\n' +
                '    arr[i] = i;\n' +
                '}\n' +
                'console.log("Completed");',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'php : print with variables',
        reqObject: {
            language: 'php',
            script: '<?php $name = "World"; echo "Hello, $name!"; ?>',
        },
        expectedResponse: {
            val: 'Hello, World!',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'php : simple arithmetic',
        reqObject: {
            language: 'php',
            script: '<?php echo 2 + 3; ?>',
        },
        expectedResponse: {
            val: '5',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'php : infinite loop',
        reqObject: {
            language: 'php',
            script: '<?php for ($i = 0; ; $i++) { echo $i; } ?>',
        },
        expectedResponse: {
            val: 'Time limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'php : file inclusion',
        reqObject: {
            language: 'php',
            script:
                '<?php \n' +
                '$filename = "include.php";\n' +
                'include $filename;\n' +
                '?>',
        },
        expectedResponse: {
            val: 'File Not Found',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'php : memory-intensive operation',
        reqObject: {
            language: 'php',
            script:
                '<?php \n' +
                '$arr = array_fill(0, 1000000, 0);\n' +
                'echo "Completed";\n' +
                '?>',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'rust : factorial calculation',
        reqObject: {
            language: 'rust',
            script:
                'fn factorial(n: u64) -> u64 {\n' +
                '    match n {\n' +
                '        0 | 1 => 1,\n' +
                '        _ => n * factorial(n - 1),\n' +
                '    }\n' +
                '}\n' +
                'fn main() {\n' +
                '    println!("{}", factorial(5));\n' +
                '}\n',
        },
        expectedResponse: {
            val: '120\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'rust : simple addition',
        reqObject: {
            language: 'rust',
            script:
                'fn main() {\n' +
                '    println!("{}", 2 + 3);\n' +
                '}\n',
        },
        expectedResponse: {
            val: '5\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'rust : read from stdin',
        reqObject: {
            language: 'rust',
            script:
                'use std::io;\n' +
                'use std::io::BufRead;\n' +
                'fn main() {\n' +
                '    let stdin = io::stdin();\n' +
                '    for line in stdin.lock().lines() {\n' +
                '        println!("{}", line.unwrap());\n' +
                '    }\n' +
                '}\n',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1 2 3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'rust : infinite loop',
        reqObject: {
            language: 'rust',
            script: 'fn main() { loop { println!("Hello, world!"); } }',
        },
        expectedResponse: {
            val: 'Time limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'rust : memory-intensive operation',
        reqObject: {
            language: 'rust',
            script:
                'fn main() {\n' +
                '    let mut vec = Vec::new();\n' +
                '    for _ in 0..1_000_000 {\n' +
                '        vec.push(String::from("x"));\n' +
                '    }\n' +
                '    println!("Completed");\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'c : factorial calculation',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                'int factorial(int n) {\n' +
                '    if (n == 0)\n' +
                '        return 1;\n' +
                '    else\n' +
                '        return n * factorial(n - 1);\n' +
                '}\n' +
                'int main() {\n' +
                '    int n = 5;\n' +
                '    printf("%d", factorial(n));\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: '120',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : array traversal',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                'int main() {\n' +
                '    int arr[] = {1, 2, 3};\n' +
                '    for (int i = 0; i < sizeof(arr)/sizeof(arr[0]); i++) {\n' +
                '        printf("%d\\n", arr[i]);\n' +
                '    }\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : read from stdin',
        reqObject: {
            language: 'c',
            script:
                '#include <stdio.h>\n' +
                'int main() {\n' +
                '    int num;\n' +
                '    while (scanf("%d", &num) == 1) {\n' +
                '        printf("%d\\n", num);\n' +
                '    }\n' +
                '    return 0;\n' +
                '}\n',
            stdin: '4 5 6',
        },
        expectedResponse: {
            val: '4\n5\n6\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : infinite loop',
        reqObject: {
            language: 'c',
            script:
                '#include <stdio.h>\n' +
                'int main() {\n' +
                '    while (1) {\n' +
                '        printf("Hello, world!\\n");\n' +
                '    }\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Time limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'c : memory-intensive operation',
        reqObject: {
            language: 'c',
            script:
                '#include <stdlib.h>\n' +
                'int main() {\n' +
                '    int *arr = malloc(1000000 * sizeof(int));\n' +
                '    free(arr);\n' +
                '    printf("Completed\\n");\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'cpp : prime number check',
        reqObject: {
            language: 'cpp',
            script:
                '#include <iostream>\n' +
                'using namespace std;\n' +
                'bool isPrime(int n) {\n' +
                '    if (n <= 1) return false;\n' +
                '    for (int i = 2; i*i <= n; i++) {\n' +
                '        if (n % i == 0) return false;\n' +
                '    }\n' +
                '    return true;\n' +
                '}\n' +
                'int main() {\n' +
                '    cout << isPrime(29);\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: '1',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : array manipulation',
        reqObject: {
            language: 'cpp',
            script:
                '#include <iostream>\n' +
                'using namespace std;\n' +
                'int main() {\n' +
                '    int arr[] = {1, 2, 3};\n' +
                '    for (int i = 0; i < sizeof(arr)/sizeof(arr[0]); i++) {\n' +
                '        cout << arr[i] << endl;\n' +
                '    }\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : read from stdin',
        reqObject: {
            language: 'cpp',
            script:
                '#include <iostream>\n' +
                'using namespace std;\n' +
                'int main() {\n' +
                '    int num;\n' +
                '    while (cin >> num) {\n' +
                '        cout << num << endl;\n' +
                '    }\n' +
                '    return 0;\n' +
                '}\n',
            stdin: '7 8 9',
        },
        expectedResponse: {
            val: '7\n8\n9\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : infinite loop',
        reqObject: {
            language: 'cpp',
            script:
                '#include <iostream>\n' +
                'using namespace std;\n' +
                'int main() {\n' +
                '    while (true) {\n' +
                '        cout << "Hello, world!" << endl;\n' +
                '    }\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Time limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'cpp : memory-intensive operation',
        reqObject: {
            language: 'cpp',
            script:
                '#include <iostream>\n' +
                'using namespace std;\n' +
                'int main() {\n' +
                '    int* arr = new int[1000000];\n' +
                '    delete[] arr;\n' +
                '    cout << "Completed" << endl;\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'java : prime number check',
        reqObject: {
            language: 'java',
            script:
                'public class Main {\n' +
                '    static boolean isPrime(int n) {\n' +
                '        if (n <= 1) return false;\n' +
                '        for (int i = 2; i * i <= n; i++) {\n' +
                '            if (n % i == 0) return false;\n' +
                '        }\n' +
                '        return true;\n' +
                '    }\n' +
                '    public static void main(String[] args) {\n' +
                '        System.out.println(isPrime(29));\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'true\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : array manipulation',
        reqObject: {
            language: 'java',
            script:
                'public class Main {\n' +
                '    public static void main(String[] args) {\n' +
                '        int[] arr = {1, 2, 3};\n' +
                '        for (int i = 0; i < arr.length; i++) {\n' +
                '            System.out.println(arr[i]);\n' +
                '        }\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : read from stdin',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n' +
                'public class Main {\n' +
                '    public static void main(String[] args) {\n' +
                '        Scanner scanner = new Scanner(System.in);\n' +
                '        while (scanner.hasNextInt()) {\n' +
                '            int num = scanner.nextInt();\n' +
                '            System.out.println(num);\n' +
                '        }\n' +
                '        scanner.close();\n' +
                '    }\n' +
                '}\n',
            stdin: '10 20 30',
        },
        expectedResponse: {
            val: '10\n20\n30\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : infinite loop',
        reqObject: {
            language: 'java',
            script:
                'public class Main {\n' +
                '    public static void main(String[] args) {\n' +
                '        while (true) {\n' +
                '            System.out.println("Hello, world!");\n' +
                '        }\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Time limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'java : memory-intensive operation',
        reqObject: {
            language: 'java',
            script:
                'public class Main {\n' +
                '    public static void main(String[] args) {\n' +
                '        int[] arr = new int[1000000];\n' +
                '        System.out.println("Completed");\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'python : prime number check',
        reqObject: {
            language: 'python',
            script:
                'def is_prime(n):\n' +
                '    if n <= 1:\n' +
                '        return False\n' +
                '    for i in range(2, int(n**0.5) + 1):\n' +
                '        if n % i == 0:\n' +
                '            return False\n' +
                '    return True\n' +
                'print(is_prime(29))\n',
        },
        expectedResponse: {
            val: 'True\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : list manipulation',
        reqObject: {
            language: 'python',
            script:
                'def main():\n' +
                '    arr = [1, 2, 3]\n' +
                '    for num in arr:\n' +
                '        print(num)\n' +
                'main()\n',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : read from stdin',
        reqObject: {
            language: 'python',
            script:
                'import sys\n' +
                'for line in sys.stdin:\n' +
                '    print(line.strip())\n',
            stdin: 'Hello\nWorld\n',
        },
        expectedResponse: {
            val: 'Hello\nWorld\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : infinite loop',
        reqObject: {
            language: 'python',
            script:
                'while True:\n' +
                '    print("Hello, world!")\n',
        },
        expectedResponse: {
            val: 'Time limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'python : memory-intensive operation',
        reqObject: {
            language: 'python',
            script:
                'arr = [0] * (1000000)\n' +
                'print("Completed")\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'ruby : prime number check',
        reqObject: {
            language: 'ruby',
            script:
                'def is_prime(n)\n' +
                '  return false if n <= 1\n' +
                '  (2..Math.sqrt(n).to_i).each do |i|\n' +
                '    return false if n % i == 0\n' +
                '  end\n' +
                '  true\n' +
                'end\n' +
                'puts is_prime(29)\n',
        },
        expectedResponse: {
            val: 'true\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : array manipulation',
        reqObject: {
            language: 'ruby',
            script:
                'arr = [1, 2, 3]\n' +
                'arr.each { |num| puts num }\n',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : read from stdin',
        reqObject: {
            language: 'ruby',
            script:
                'while input = gets\n' +
                '  puts input\n' +
                'end\n',
            stdin: "Hello\nWorld\n",
        },
        expectedResponse: {
            val: "Hello\nWorld\n",
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : infinite loop',
        reqObject: {
            language: 'ruby',
            script:
                'loop do\n' +
                '  puts "Hello, world!"\n' +
                'end\n',
        },
        expectedResponse: {
            val: 'Time limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'ruby : memory-intensive operation',
        reqObject: {
            language: 'ruby',
            script:
                'arr = Array.new(1000000, 0)\n' +
                'puts "Completed"\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },                                
]

module.exports = { testCases }
