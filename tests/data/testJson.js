const testCases = [
  {
    name: "cpp : hello world",
    reqObject: {
      language: "cpp",
      script:
        "#include<bits/stdc++.h>\n" +
        "using namespace std;\n" +
        "int main(){\n" +
        '    cout << "hello world";\n' +
        "return 0;\n" +
        "}\n",
    },
    expectedResponse: {
      val: "hello world",
      status: 200,
      error: 0,
    },
  },
  {
    name: "cpp : print stdin",
    reqObject: {
      language: "cpp",
      script:
        "#include<bits/stdc++.h>\n\n" +
        "using namespace std;\n" +
        "int main(){\n\n" +
        "    int a;\n" +
        "    while(cin >> a){\n" +
        "        cout << a << endl;\n" +
        "    }\n" +
        "    return 0;\n\n" +
        "}\n",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1\n2\n3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "nodejs : hello world",
    reqObject: {
      language: "nodejs",
      script: "console.log('hello world')",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "nodejs : print stdin",
    reqObject: {
      language: "nodejs",
      script:
        "process.stdin.setEncoding('utf8'); \n " +
        "process.stdin.on('data', (input) => { \n " +
        "  console.log(input); \n " +
        " \n " +
        "}); \n ",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1 2 3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "python : hello world",
    reqObject: {
      language: "python",
      script: "print('hello world')",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "python : print stdin",
    reqObject: {
      language: "python",
      script:
        "try:\n" +
        "    while(True):\n" +
        "        line = input()\n" +
        "        if not line:\n" +
        "            break\n" +
        "        print(line)\n" +
        "except EOFError:\n" +
        "    pass",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1 2 3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "c : hello world",
    reqObject: {
      language: "c",
      script:
        "#include<stdio.h>\n\n" +
        "int main(){\n\n" +
        '    printf("hello world");\n' +
        "    return 0;\n" +
        "}\n",
    },
    expectedResponse: {
      val: "hello world",
      status: 200,
      error: 0,
    },
  },
  {
    name: "c : print stdin",
    reqObject: {
      language: "c",
      script:
        "#include <stdio.h>\n" +
        "int main() {\n" +
        "    int number;\n" +
        '    while (scanf("%d", &number) == 1) {\n' +
        '        printf("%d\\n", number);\n' +
        "    } \n" +
        "    return 0;\n" +
        "}",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1\n2\n3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "java : print hello world",
    reqObject: {
      language: "java",
      script:
        "import java.util.Scanner;\n" +
        "public class Solution {\n" +
        "    public static void main(String[] args) {\n" +
        '        System.out.println("hello world");\n' +
        "    }\n" +
        "}\n",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "java : print stdin",
    reqObject: {
      language: "java",
      script:
        "import java.util.Scanner;\n" +
        "public class Solution {\n" +
        "    public static void main(String[] args) {\n" +
        "        Scanner scanner = new Scanner(System.in);\n" +
        "        while (scanner.hasNextInt()) {\n" +
        "            int number = scanner.nextInt();\n" +
        "            System.out.println(number);\n" +
        "        } \n" +
        "        scanner.close();\n" +
        "    }\n" +
        "}\n",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1\n2\n3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "ruby : print hello world",
    reqObject: {
      language: "ruby",
      script: 'print "hello world"',
    },
    expectedResponse: {
      val: "hello world",
      status: 200,
      error: 0,
    },
  },
  {
    name: "ruby : print stdin",
    reqObject: {
      language: "ruby",
      script: "user_input = gets.chomp\n" + "puts user_input",
      stdin: "10\n",
    },
    expectedResponse: {
      val: "10\n",
      status: 200,
      error: 0,
    },
  },
  // Two Test case PHP : "print hello world" and "print stdin"
  {
    name: "php : print hello world",
    reqObject: {
      language: "php",
      script: '<?php echo "hello world"; ?>',
    },
    expectedResponse: {
      val: "hello world",
      status: 200,
      error: 0,
    },
  },
  {
    name: "php : print stdin",
    reqObject: {
      language: "php",
      script:
        "<?php\n" +
        "while ($input = fgets(STDIN)) {\n" +
        "    echo $input;\n" +
        "}\n" +
        "?>",
      stdin: "10\n",
    },
    expectedResponse: {
      val: "10\n",
      status: 200,
      error: 0,
    },
  },
  // Two Test case GO: "print hello world" and "print stdin"
  {
    name: "go : print hello world",
    reqObject: {
      language: "go",
      script:
        "package main\n" +
        'import "fmt"\n' +
        "func main() {\n" +
        '    fmt.Println("hello world")\n' +
        "}",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "go : print stdin",
    reqObject: {
      language: "go",
      script:
        "package main\n" +
        "import (\n" +
        '    "bufio"\n' +
        '    "fmt"\n' +
        '    "os"\n' +
        ")\n" +
        "func main() {\n" +
        "    scanner := bufio.NewScanner(os.Stdin)\n" +
        "    for scanner.Scan() {\n" +
        "        fmt.Println(scanner.Text())\n" +
        "    }\n" +
        "}",
      stdin: "10\n",
    },
    expectedResponse: {
      val: "10\n",
      status: 200,
      error: 0,
    },
  },
  // Two Test case RUST: "print hello world" and "print stdin"
  {
    name: "rust : print hello world",
    reqObject: {
      language: "rust",
      script: "fn main() {\n" + '    println!("hello world");\n' + "}",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "rust : print stdin",
    reqObject: {
      language: "rust",
      script:
        "use std::io::{self, BufRead};\n" +
        "fn main() {\n" +
        "    let stdin = io::stdin();\n" +
        "    for line in stdin.lock().lines() {\n" +
        '        println!("{}", line.unwrap());\n' +
        "    }\n" +
        "}",
      stdin: "10\n",
    },
    expectedResponse: {
      val: "10\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "TLE test",
    reqObject: {
      language: "nodejs",
      script: "for(let i=0 ; ; ){i++}",
    },
    expectedResponse: {
      val: "Time limit exceeded",
      status: 200,
      error: 1,
    },
  },
  {
    name: "MLE test",
    reqObject: {
      language: "python",
      script: "one_gb_data = bytearray(1000 * 1024 * 1024)",
    },
    expectedResponse: {
      val: "Memory limit exceeded",
      status: 200,
      error: 1,
    },
  },
  {
    name: "MLE test 2",
    reqObject: {
      language: "python",
      script:
        "import time\n" +
        "def consume_memory(target_mb, duration_sec):\n" +
        "    float_size = 8\n" +
        "    floats_per_mb = (1024 * 1024) // float_size\n" +
        "    total_floats = target_mb * floats_per_mb\n" +
        "    iterations = int(duration_sec / 0.1)\n" +
        "    floats_per_iteration = total_floats // iterations\n" +
        "    memory_hog = []\n" +
        "    for _ in range(iterations):\n" +
        "        memory_hog.extend([0.0] * floats_per_iteration)\n" +
        "        time.sleep(0.1)\n" +
        "consume_memory(1000, 1)\n",
    },
    expectedResponse: {
      val: "Memory limit exceeded",
      status: 200,
      error: 1,
    },
  },
  {
    name: "MLE test 3",
    reqObject: {
      language: "python",
      script: "a = [100]\n" + "for i in a:\n" + "    a.append(i)\n",
    },
    expectedResponse: {
      val: "Memory limit exceeded",
      status: 200,
      error: 1,
    },
  },
  {
    name: "OPEN AI test promptv1",
    reqObject: {
      language: "promptv1",
      prompt: "The question is what is 2 plus 2. The answer given is 4.",
    },
    expectedResponse: {
      val: {},
      status: 200,
      error: 0,
    },
  },
  {
    name: "OPEN AI test promptv2",
    reqObject: {
      language: "promptv2",
      prompt: "The question is what is 2 plus 2. The answer given is 4.",
    },
    expectedResponse: {
      val: {},
      status: 200,
      error: 0,
    },
  },

  // Additional Test Cases : Sum of two number & max of element
  {
    name: "cpp : sum of two numbers",
    reqObject: {
      language: "cpp",
      script:
        "#include<bits/stdc++.h>\n" +
        "using namespace std;\n" +
        "int main(){\n" +
        "    int a, b;\n" +
        "    cin >> a >> b;\n" +
        "    cout << (a + b);\n" +
        "    return 0;\n" +
        "}\n",
      stdin: "3 4",
    },
    expectedResponse: {
      val: "7",
      status: 200,
      error: 0,
    },
  },
  {
    name: "cpp : max in array",
    reqObject: {
      language: "cpp",
      script:
        "#include<bits/stdc++.h>\n" +
        "using namespace std;\n" +
        "int main(){\n" +
        "    int n;\n" +
        "    cin >> n;\n" +
        "    vector<int> arr(n);\n" +
        "    for(int i = 0; i < n; i++){\n" +
        "        cin >> arr[i];\n" +
        "    }\n" +
        "    cout << *max_element(arr.begin(), arr.end());\n" +
        "    return 0;\n" +
        "}\n",
      stdin: "5\n1 2 3 4 5",
    },
    expectedResponse: {
      val: "5",
      status: 200,
      error: 0,
    },
  },

  // Additional Node.js Test Cases
  {
    name: "nodejs : sum of two numbers",
    reqObject: {
      language: "nodejs",
      script:
        "process.stdin.setEncoding('utf8');\n" +
        "process.stdin.on('data', (input) => {\n" +
        '  const [a, b] = input.split(" ").map(Number);\n' +
        "  console.log(a + b);\n" +
        "});\n",
      stdin: "3 4",
    },
    expectedResponse: {
      val: "7\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "nodejs : max in array",
    reqObject: {
      language: "nodejs",
      script:
        "process.stdin.setEncoding('utf8');\n" +
        "process.stdin.on('data', (input) => {\n" +
        '  const numbers = input.split(" ").map(Number);\n' +
        "  console.log(Math.max(...numbers));\n" +
        "});\n",
      stdin: "1 2 3 4 5",
    },
    expectedResponse: {
      val: "5\n",
      status: 200,
      error: 0,
    },
  },

  // Additional Python Test Cases
  {
    name: "python : sum of two numbers",
    reqObject: {
      language: "python",
      script: "a, b = map(int, input().split())\n" + "print(a + b)\n",
      stdin: "3 4",
    },
    expectedResponse: {
      val: "7\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "python : max in array",
    reqObject: {
      language: "python",
      script:
        "n = int(input())\n" +
        "arr = list(map(int, input().split()))\n" +
        "print(max(arr))\n",
      stdin: "5\n1 2 3 4 5",
    },
    expectedResponse: {
      val: "5\n",
      status: 200,
      error: 0,
    },
  },

  // Additional C Test Cases
  {
    name: "c : sum of two numbers",
    reqObject: {
      language: "c",
      script:
        "#include<stdio.h>\n\n" +
        "int main(){\n" +
        "    int a, b;\n" +
        '    scanf("%d %d", &a, &b);\n' +
        '    printf("%d", a + b);\n' +
        "    return 0;\n" +
        "}\n",
      stdin: "3 4",
    },
    expectedResponse: {
      val: "7",
      status: 200,
      error: 0,
    },
  },
  {
    name: "c : max in array",
    reqObject: {
      language: "c",
      script:
        "#include<stdio.h>\n\n" +
        "int main(){\n" +
        "    int n;\n" +
        '    scanf("%d", &n);\n' +
        "    int arr[n];\n" +
        "    for(int i = 0; i < n; i++){\n" +
        '        scanf("%d", &arr[i]);\n' +
        "    }\n" +
        "    int max = arr[0];\n" +
        "    for(int i = 1; i < n; i++){\n" +
        "        if(arr[i] > max){\n" +
        "            max = arr[i];\n" +
        "        }\n" +
        "    }\n" +
        '    printf("%d", max);\n' +
        "    return 0;\n" +
        "}\n",
      stdin: "5\n1 2 3 4 5",
    },
    expectedResponse: {
      val: "5",
      status: 200,
      error: 0,
    },
  },

  // Additional Java Test Cases
  {
    name: "java : sum of two numbers",
    reqObject: {
      language: "java",
      script:
        "import java.util.Scanner;\n" +
        "public class Solution {\n" +
        "    public static void main(String[] args) {\n" +
        "        Scanner scanner = new Scanner(System.in);\n" +
        "        int a = scanner.nextInt();\n" +
        "        int b = scanner.nextInt();\n" +
        "        System.out.println(a + b);\n" +
        "        scanner.close();\n" +
        "    }\n" +
        "}\n",
      stdin: "3 4",
    },
    expectedResponse: {
      val: "7\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "java : max in array",
    reqObject: {
      language: "java",
      script:
        "import java.util.Scanner;\n" +
        "import java.util.Arrays;\n" +
        "public class Solution {\n" +
        "    public static void main(String[] args) {\n" +
        "        Scanner scanner = new Scanner(System.in);\n" +
        "        int n = scanner.nextInt();\n" +
        "        int[] arr = new int[n];\n" +
        "        for(int i = 0; i < n; i++){\n" +
        "            arr[i] = scanner.nextInt();\n" +
        "        }\n" +
        "        System.out.println(Arrays.stream(arr).max().getAsInt());\n" +
        "        scanner.close();\n" +
        "    }\n" +
        "}\n",
      stdin: "5\n1 2 3 4 5",
    },
    expectedResponse: {
      val: "5\n",
      status: 200,
      error: 0,
    },
  },

  // Additional Ruby Test Cases
  {
    name: "ruby : sum of two numbers",
    reqObject: {
      language: "ruby",
      script: "a, b = gets.split.map(&:to_i)\n" + "puts a + b\n",
      stdin: "3 4",
    },
    expectedResponse: {
      val: "7\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "ruby : max in array",
    reqObject: {
      language: "ruby",
      script:
        "n = gets.to_i\n" + "arr = gets.split.map(&:to_i)\n" + "puts arr.max\n",
      stdin: "5\n1 2 3 4 5",
    },
    expectedResponse: {
      val: "5\n",
      status: 200,
      error: 0,
    },
  },

  // Additional PHP Test Cases
  {
    name: "php : sum of two numbers",
    reqObject: {
      language: "php",
      script:
        "<?php\n" +
        '$input = explode(" ", fgets(STDIN));\n' +
        "$a = (int)$input[0];\n" +
        "$b = (int)$input[1];\n" +
        "echo $a + $b;\n" +
        "?>",
      stdin: "3 4",
    },
    expectedResponse: {
      val: "7\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "php : max in array",
    reqObject: {
      language: "php",
      script:
        "<?php\n" +
        "$n = (int)trim(fgets(STDIN));\n" +
        '$arr = array_map("intval", explode(" ", trim(fgets(STDIN))));\n' +
        "echo max($arr);\n" +
        "?>",
      stdin: "5\n1 2 3 4 5",
    },
    expectedResponse: {
      val: "5\n",
      status: 200,
      error: 0,
    },
  },

  // Additional Go Test Cases
  {
    name: "go : sum of two numbers",
    reqObject: {
      language: "go",
      script:
        "package main\n" +
        "import (\n" +
        '    "fmt"\n' +
        '    "bufio"\n' +
        '    "os"\n' +
        '    "strconv"\n' +
        '    "strings"\n' +
        ")\n" +
        "func main() {\n" +
        "    reader := bufio.NewReader(os.Stdin)\n" +
        "    input, _ := reader.ReadString('\\n')\n" +
        "    numbers := strings.Fields(input)\n" +
        "    a, _ := strconv.Atoi(numbers[0])\n" +
        "    b, _ := strconv.Atoi(numbers[1])\n" +
        "    fmt.Println(a + b)\n" +
        "}\n",
      stdin: "3 4",
    },
    expectedResponse: {
      val: "7\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "go : max in array",
    reqObject: {
      language: "go",
      script:
        "package main\n" +
        "import (\n" +
        '    "fmt"\n' +
        '    "bufio"\n' +
        '    "os"\n' +
        '    "strconv"\n' +
        '    "strings"\n' +
        ")\n" +
        "func main() {\n" +
        "    reader := bufio.NewReader(os.Stdin)\n" +
        "    input, _ := reader.ReadString('\\n')\n" +
        "    numbers := strings.Fields(input)\n" +
        "    max, _ := strconv.Atoi(numbers[0])\n" +
        "    for _, numStr := range numbers[1:] {\n" +
        "        num, _ := strconv.Atoi(numStr)\n" +
        "        if num > max {\n" +
        "            max = num\n" +
        "        }\n" +
        "    }\n" +
        "    fmt.Println(max)\n" +
        "}\n",
      stdin: "5\n1 2 3 4 5",
    },
    expectedResponse: {
      val: "5\n",
      status: 200,
      error: 0,
    },
  },

  // Additional Rust Test Cases
  {
    name: "rust : sum of two numbers",
    reqObject: {
      language: "rust",
      script:
        "use std::io;\n" +
        "fn main() {\n" +
        "    let mut input = String::new();\n" +
        "    io::stdin().read_line(&mut input).unwrap();\n" +
        "    let nums: Vec<i32> = input.split_whitespace()\n" +
        "        .map(|s| s.parse().unwrap()).collect();\n" +
        '    println!("{}", nums[0] + nums[1]);\n' +
        "}\n",
      stdin: "3 4",
    },
    expectedResponse: {
      val: "7\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "rust : max in array",
    reqObject: {
      language: "rust",
      script:
        "use std::io;\n" +
        "fn main() {\n" +
        "    let mut input = String::new();\n" +
        "    io::stdin().read_line(&mut input).unwrap();\n" +
        "    let nums: Vec<i32> = input.trim().split_whitespace()\n" +
        "        .map(|s| s.parse().unwrap()).collect();\n" +
        "    let max_num = nums.iter().max().unwrap();\n" +
        '    println!("{}", max_num);\n' +
        "}\n",
      stdin: "5 1 2 3 4 5",
    },
    expectedResponse: {
      val: "5\n",
      status: 200,
      error: 0,
    },
  },
  // Test Case : Fibonacci Series
  {
    name: "cpp : fibonacci series",
    reqObject: {
      language: "cpp",
      script:
        "#include<bits/stdc++.h>\n" +
        "using namespace std;\n" +
        "int main(){\n" +
        "    int n;\n" +
        "    cin >> n;\n" +
        "    vector<int> fib(n);\n" +
        "    fib[0] = 0; fib[1] = 1;\n" +
        "    for(int i = 2; i < n; i++){\n" +
        "        fib[i] = fib[i-1] + fib[i-2];\n" +
        "    }\n" +
        "    for(int i = 0; i < n; i++){\n" +
        "        cout << fib[i] << ' ';\n" +
        "    }\n" +
        "    return 0;\n" +
        "}\n",
      stdin: "10",
    },
    expectedResponse: {
      val: "0 1 1 2 3 5 8 13 21 34 ",
      status: 200,
      error: 0,
    },
  },
  {
    name: "nodejs : fibonacci series",
    reqObject: {
      language: "nodejs",
      script:
        "process.stdin.setEncoding('utf8');\n" +
        "process.stdin.on('data', (input) => {\n" +
        "  const n = parseInt(input.trim(), 10);\n" +
        "  let fib = [0, 1];\n" +
        "  for (let i = 2; i < n; i++) {\n" +
        "    fib.push(fib[i - 1] + fib[i - 2]);\n" +
        "  }\n" +
        "  console.log(fib.join(' '));\n" +
        "});\n",
      stdin: "10",
    },
    expectedResponse: {
      val: "0 1 1 2 3 5 8 13 21 34\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "python : fibonacci series",
    reqObject: {
      language: "python",
      script:
        "n = int(input())\n" +
        "fib = [0, 1]\n" +
        "for i in range(2, n):\n" +
        "    fib.append(fib[-1] + fib[-2])\n" +
        "print(' '.join(map(str, fib)))\n",
      stdin: "10",
    },
    expectedResponse: {
      val: "0 1 1 2 3 5 8 13 21 34\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "c : fibonacci series",
    reqObject: {
      language: "c",
      script:
        "#include<stdio.h>\n\n" +
        "int main(){\n" +
        "    int n;\n" +
        '    scanf("%d", &n);\n' +
        "    int fib[n];\n" +
        "    fib[0] = 0; fib[1] = 1;\n" +
        "    for(int i = 2; i < n; i++){\n" +
        "        fib[i] = fib[i-1] + fib[i-2];\n" +
        "    }\n" +
        "    for(int i = 0; i < n; i++){\n" +
        '        printf("%d ", fib[i]);\n' +
        "    }\n" +
        "    return 0;\n" +
        "}\n",
      stdin: "10",
    },
    expectedResponse: {
      val: "0 1 1 2 3 5 8 13 21 34 ",
      status: 200,
      error: 0,
    },
  },
  {
    name: "java : fibonacci series",
    reqObject: {
      language: "java",
      script:
        "import java.util.Scanner;\n" +
        "public class Solution {\n" +
        "    public static void main(String[] args) {\n" +
        "        Scanner scanner = new Scanner(System.in);\n" +
        "        int n = scanner.nextInt();\n" +
        "        int[] fib = new int[n];\n" +
        "        fib[0] = 0; fib[1] = 1;\n" +
        "        for(int i = 2; i < n; i++){\n" +
        "            fib[i] = fib[i-1] + fib[i-2];\n" +
        "        }\n" +
        "        for(int i = 0; i < n; i++){\n" +
        '            System.out.print(fib[i] + " ");\n' +
        "        }\n" +
        "        scanner.close();\n" +
        "    }\n" +
        "}\n",
      stdin: "10",
    },
    expectedResponse: {
      val: "0 1 1 2 3 5 8 13 21 34 ",
      status: 200,
      error: 0,
    },
  },
  {
    name: "ruby : fibonacci series",
    reqObject: {
      language: "ruby",
      script:
        "n = gets.to_i\n" +
        "fib = [0, 1]\n" +
        "for i in 2...n\n" +
        "  fib << fib[-1] + fib[-2]\n" +
        "end\n" +
        "puts fib.join(' ')\n",
      stdin: "10",
    },
    expectedResponse: {
      val: "0 1 1 2 3 5 8 13 21 34\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "php : fibonacci series",
    reqObject: {
      language: "php",
      script:
        "<?php\n" +
        "$n = (int)trim(fgets(STDIN));\n" +
        "$fib = [0, 1];\n" +
        "for ($i = 2; $i < $n; $i++) {\n" +
        "    $fib[] = $fib[$i-1] + $fib[$i-2];\n" +
        "}\n" +
        "echo implode(' ', $fib);\n" +
        "?>",
      stdin: "10",
    },
    expectedResponse: {
      val: "0 1 1 2 3 5 8 13 21 34\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "go : fibonacci series",
    reqObject: {
      language: "go",
      script:
        "package main\n" +
        "import (\n" +
        '    "fmt"\n' +
        '    "bufio"\n' +
        '    "os"\n' +
        '    "strconv"\n' +
        ")\n" +
        "func main() {\n" +
        "    reader := bufio.NewReader(os.Stdin)\n" +
        "    input, _ := reader.ReadString('\\n')\n" +
        "    n, _ := strconv.Atoi(input)\n" +
        "    fib := make([]int, n)\n" +
        "    fib[0] = 0; fib[1] = 1\n" +
        "    for i := 2; i < n; i++ {\n" +
        "        fib[i] = fib[i-1] + fib[i-2]\n" +
        "    }\n" +
        "    for i := 0; i < n; i++ {\n" +
        '        fmt.Print(fib[i], " ")\n' +
        "    }\n" +
        "}\n",
      stdin: "10",
    },
    expectedResponse: {
      val: "0 1 1 2 3 5 8 13 21 34 ",
      status: 200,
      error: 0,
    },
  },

  {
    name: "rust : fibonacci series",
    reqObject: {
      language: "rust",
      script:
        "use std::io;\n" +
        "fn main() {\n" +
        "    let mut input = String::new();\n" +
        "    io::stdin().read_line(&mut input).unwrap();\n" +
        "    let n: usize = input.trim().parse().unwrap();\n" +
        "    let mut fib = vec![0, 1];\n" +
        "    for i in 2..n {\n" +
        "        let next = fib[i-1] + fib[i-2];\n" +
        "        fib.push(next);\n" +
        "    }\n" +
        "    for i in 0..n {\n" +
        '        print!("{} ", fib[i]);\n' +
        "    }\n" +
        "}\n",
      stdin: "10",
    },
    expectedResponse: {
      val: "0 1 1 2 3 5 8 13 21 34 ",
      status: 200,
      error: 0,
    },
  },

  // Additional Test Case for Multiplication
  {
    name: "cpp : multiplication of two numbers",
    reqObject: {
      language: "cpp",
      script:
        "#include<bits/stdc++.h>\n" +
        "using namespace std;\n" +
        "int main(){\n" +
        "    int a, b;\n" +
        "    cin >> a >> b;\n" +
        "    cout << a * b << endl;\n" +
        "    return 0;\n" +
        "}\n",
      stdin: "6 7",
    },
    expectedResponse: {
      val: "42\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "nodejs : multiplication of two numbers",
    reqObject: {
      language: "nodejs",
      script:
        "process.stdin.setEncoding('utf8');\n" +
        "process.stdin.on('data', (input) => {\n" +
        "  const [a, b] = input.trim().split(' ').map(Number);\n" +
        "  console.log(a * b);\n" +
        "});\n",
      stdin: "6 7",
    },
    expectedResponse: {
      val: "42\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "python : multiplication of two numbers",
    reqObject: {
      language: "python",
      script: "a, b = map(int, input().split())\n" + "print(a * b)\n",
      stdin: "6 7",
    },
    expectedResponse: {
      val: "42\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "c : multiplication of two numbers",
    reqObject: {
      language: "c",
      script:
        "#include<stdio.h>\n\n" +
        "int main(){\n" +
        "    int a, b;\n" +
        '    scanf("%d %d", &a, &b);\n' +
        '    printf("%d\\n", a * b);\n' +
        "    return 0;\n" +
        "}\n",
      stdin: "6 7",
    },
    expectedResponse: {
      val: "42\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "java : multiplication of two numbers",
    reqObject: {
      language: "java",
      script:
        "import java.util.Scanner;\n" +
        "public class Solution {\n" +
        "    public static void main(String[] args) {\n" +
        "        Scanner scanner = new Scanner(System.in);\n" +
        "        int a = scanner.nextInt();\n" +
        "        int b = scanner.nextInt();\n" +
        "        System.out.println(a * b);\n" +
        "        scanner.close();\n" +
        "    }\n" +
        "}\n",
      stdin: "6 7",
    },
    expectedResponse: {
      val: "42\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "ruby : multiplication of two numbers",
    reqObject: {
      language: "ruby",
      script: "a, b = gets.split.map(&:to_i)\n" + "puts a * b\n",
      stdin: "6 7",
    },
    expectedResponse: {
      val: "42\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "php : multiplication of two numbers",
    reqObject: {
      language: "php",
      script:
        "<?php\n" +
        "$input = trim(fgets(STDIN));\n" +
        "list($a, $b) = array_map('intval', explode(' ', $input));\n" +
        'echo $a * $b . "\\n";\n' +
        "?>",
      stdin: "6 7",
    },
    expectedResponse: {
      val: "42\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "go : multiplication of two numbers",
    reqObject: {
      language: "go",
      script:
        "package main\n" +
        "import (\n" +
        '    "fmt"\n' +
        '    "bufio"\n' +
        '    "os"\n' +
        '    "strconv"\n' +
        '    "strings"\n' +
        ")\n" +
        "func main() {\n" +
        "    reader := bufio.NewReader(os.Stdin)\n" +
        "    input, _ := reader.ReadString('\\n')\n" +
        "    nums := strings.Fields(input)\n" +
        "    a, _ := strconv.Atoi(nums[0])\n" +
        "    b, _ := strconv.Atoi(nums[1])\n" +
        "    fmt.Println(a * b)\n" +
        "}\n",
      stdin: "6 7",
    },
    expectedResponse: {
      val: "42\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "rust : multiplication of two numbers",
    reqObject: {
      language: "rust",
      script:
        "use std::io;\n" +
        "fn main() {\n" +
        "    let mut input = String::new();\n" +
        "    io::stdin().read_line(&mut input).unwrap();\n" +
        "    let nums: Vec<i32> = input.trim().split_whitespace().map(|s| s.parse().unwrap()).collect();\n" +
        '    println!("{}", nums[0] * nums[1]);\n' +
        "}\n",
      stdin: "6 7",
    },
    expectedResponse: {
      val: "42\n",
      status: 200,
      error: 0,
    },
  },
];

module.exports = { testCases };
