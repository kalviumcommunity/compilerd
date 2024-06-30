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

  // Extra test cases added by me for cpp - 3
  {
    name: "cpp : sum of two numbers",
    reqObject: {
      language: "cpp",
      script:
        "#include<bits/stdc++.h>\n" +
        "using namespace std;\n" +
        "int main(){\n" +
        "    int a = 5;\n" +
        "    int b = 10;\n" +
        "    int sum = a + b;\n" +
        "    cout << sum;\n" +
        "    return 0;\n" +
        "}\n",
    },
    expectedResponse: {
      val: "15",
      status: 200,
      error: 0,
    },
  },

  {
    name: "cpp : concatenate strings",
    reqObject: {
      language: "cpp",
      script:
        "#include<bits/stdc++.h>\n" +
        "using namespace std;\n" +
        "int main(){\n" +
        '    string str1 = "Hello";\n' +
        '    string str2 = "World";\n' +
        '    string result = str1 + " " + str2;\n' +
        "    cout << result;\n" +
        "    return 0;\n" +
        "}\n",
    },
    expectedResponse: {
      val: "Hello World",
      status: 200,
      error: 0,
    },
  },

  {
    name: "cpp : array output",
    reqObject: {
      language: "cpp",
      script:
        "#include<bits/stdc++.h>\n" +
        "using namespace std;\n" +
        "int main(){\n" +
        "    int arr[] = {1, 2, 3, 4, 5};\n" +
        "    for (int i = 0; i < 5; i++) {\n" +
        '        cout << arr[i] << " ";\n' +
        "    }\n" +
        "    cout << endl;\n" +
        "    return 0;\n" +
        "}\n",
    },
    expectedResponse: {
      val: "1 2 3 4 5 \n",
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

  //Test cases added by me for nodejs - 3
  {
    name: "nodejs : sum of two numbers",
    reqObject: {
      language: "nodejs",
      script:
        "let a = 5;\n" +
        "let b = 10;\n" +
        "let sum = a + b;\n" +
        "console.log(sum);",
    },
    expectedResponse: {
      val: "15\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "nodejs : concatenate strings",
    reqObject: {
      language: "nodejs",
      script:
        "let str1 = 'Hello';\n" +
        "let str2 = 'World';\n" +
        "let result = str1 + ' ' + str2;\n" +
        "console.log(result);",
    },
    expectedResponse: {
      val: "Hello World\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "nodejs : array output",
    reqObject: {
      language: "nodejs",
      script:
        "let arr = [1, 2, 3, 4, 5];\n" + "console.log(arr.join(' ') + ' ');",
    },
    expectedResponse: {
      val: "1 2 3 4 5 \n",
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

  //Test cases added by me for python - 3
  {
    name: "python : sum of two numbers",
    reqObject: {
      language: "python",
      script: "a = 5\n" + "b = 10\n" + "sum = a + b\n" + "print(sum)",
    },
    expectedResponse: {
      val: "15\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "python : list output",
    reqObject: {
      language: "python",
      script:
        "arr = [1, 2, 3, 4, 5]\n" +
        "for value in arr:\n" +
        "    print(value, end=' ')\n" +
        "print()",
    },
    expectedResponse: {
      val: "1 2 3 4 5 \n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "python : conditional statement",
    reqObject: {
      language: "python",
      script:
        "a = 10\n" +
        "if a > 5:\n" +
        "    print('Greater')\n" +
        "else:\n" +
        "    print('Lesser or equal')\n",
    },
    expectedResponse: {
      val: "Greater\n",
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

  //Test cases added by me for c - 3
  {
    name: "c : conditional statement",
    reqObject: {
      language: "c",
      script:
        "#include<stdio.h>\n" +
        "int main(){\n" +
        "    int a = 10;\n" +
        "    if (a > 5) {\n" +
        '        printf("Greater");\n' +
        "    } else {\n" +
        '        printf("Lesser or equal");\n' +
        "    }\n" +
        "    return 0;\n" +
        "}\n",
    },
    expectedResponse: {
      val: "Greater",
      status: 200,
      error: 0,
    },
  },

  {
    name: "c : array output",
    reqObject: {
      language: "c",
      script:
        "#include<stdio.h>\n" +
        "int main(){\n" +
        "    int arr[] = {1, 2, 3, 4, 5};\n" +
        "    for (int i = 0; i < 5; i++) {\n" +
        '        printf("%d ", arr[i]);\n' +
        "    }\n" +
        '    printf("\\n");\n' +
        "    return 0;\n" +
        "}\n",
    },
    expectedResponse: {
      val: "1 2 3 4 5 \n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "c : concatenate strings",
    reqObject: {
      language: "c",
      script:
        "#include<stdio.h>\n" +
        "int main(){\n" +
        '    char str1[] = "Hello";\n' +
        '    char str2[] = "World";\n' +
        '    printf("%s %s", str1, str2);\n' +
        "    return 0;\n" +
        "}\n",
    },
    expectedResponse: {
      val: "Hello World",
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

  //Test cases added by me for java
  {
    name: "java : conditional statement",
    reqObject: {
      language: "java",
      script:
        "public class Solution {\n" +
        "    public static void main(String[] args) {\n" +
        "        int a = 10;\n" +
        "        if (a > 5) {\n" +
        '            System.out.println("Greater");\n' +
        "        } else {\n" +
        '            System.out.println("Lesser or equal");\n' +
        "        }\n" +
        "    }\n" +
        "}\n",
    },
    expectedResponse: {
      val: "Greater\n",
      status: 200,
      error: 0,
    },
  },

  {
    "name": "java : prime number check",
    "reqObject": {
      "language": "java",
      "script": "public class Solution {\n" +
                "    public static void main(String[] args) {\n" +
                "        int num = 29;\n" +
                "        boolean isPrime = true;\n" +
                "        for (int i = 2; i <= Math.sqrt(num); i++) {\n" +
                "            if (num % i == 0) {\n" +
                "                isPrime = false;\n" +
                "                break;\n" +
                "            }\n" +
                "        }\n" +
                "        if (isPrime) {\n" +
                "            System.out.println(\"Prime\");\n" +
                "        } else {\n" +
                "            System.out.println(\"Not Prime\");\n" +
                "        }\n" +
                "    }\n" +
                "}\n"
    },
    "expectedResponse": {
      "val": "Prime\n",
      "status": 200,
      "error": 0
    }
  },  

  {
    name: "java : reverse a string",
    reqObject: {
      language: "java",
      script:
        "public class Solution {\n" +
        "    public static void main(String[] args) {\n" +
        '        String str = "Hello World";\n' +
        "        StringBuilder reversed = new StringBuilder(str).reverse();\n" +
        "        System.out.println(reversed);\n" +
        "    }\n" +
        "}\n",
    },
    expectedResponse: {
      val: "dlroW olleH\n",
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

  //Test cases added by me for Ruby - 3
  {
    "name": "Ruby : Temperature conversion",
    "reqObject": {
      "language": "ruby",
      "script": 'def celsius_to_fahrenheit(celsius)\n' +
                '  return celsius * 9.0 / 5.0 + 32\n' +
                'end\n' +
                'puts celsius_to_fahrenheit(25)'
    },
    "expectedResponse": {
      "val": "77.0\n",
      "status": 200,
      "error": 0
    }
  },

  {
    "name": "Ruby : Sort an array",
    "reqObject": {
      "language": "ruby",
      "script": 'arr = [5, 3, 8, 1, 2]\n' +
                'puts arr.sort.join(" ")'
    },
    "expectedResponse": {
      "val": "1 2 3 5 8\n",
      "status": 200,
      "error": 0
    }
  },

  {
    "name": "Ruby : Area of circle",
    "reqObject": {
      "language": "ruby",
      "script": 'def area_of_circle(radius)\n' +
                '  return Math::PI * radius ** 2\n' +
                'end\n' +
                'puts area_of_circle(3)'
    },
    "expectedResponse": {
      "val": "28.274333882308138\n",
      "status": 200,
      "error": 0
    }
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

  //GO Test cases - 3 Nos
  {
    name: "GO : print stdin",
    reqObject: {
      language: "go",
      script:
        "package main\n" +
        'import "fmt"\n' +
        "func main() {\n" +
        '    fmt.Println("Hello World!")\n' +
        "}\n",
    },
    expectedResponse: {
      val: "Hello World!\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "GO: Concatenate strings",
    reqObject: {
      language: "go",
      script:
        "package main\n" +
        'import "fmt"\n' +
        "func main() {\n" +
        '    str1 := "Hello"\n' +
        '    str2 := "World"\n' +
        '    result := str1 + " " + str2\n' +
        "    fmt.Println(result)\n" +
        "}\n",
    },
    expectedResponse: {
      val: "Hello World\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "GO: Conditional statement",
    reqObject: {
      language: "go",
      script:
        "package main\n" +
        'import "fmt"\n' +
        "func main() {\n" +
        "    a := 10\n" +
        "    if a > 5 {\n" +
        '        fmt.Println("Greater")\n' +
        "    } else {\n" +
        '        fmt.Println("Lesser or equal")\n' +
        "    }\n" +
        "}\n",
    },
    expectedResponse: {
      val: "Greater\n",
      status: 200,
      error: 0,
    },
  },

  //Test cases for RUST - 3 Nos
  {
    name: "RUST: Hello World!",
    reqObject: {
      language: "rust",
      script: "fn main() {\n" + 'println!("Hello World!");\n' + "}\n",
    },
    expectedResponse: {
      val: "Hello World!\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "RUST: Array output",
    reqObject: {
      language: "rust",
      script:
        "fn main() {\n" +
        "    let arr = [1, 2, 3, 4, 5];\n" +
        "    for &value in arr.iter() {\n" +
        '        print!("{} ", value);\n' +
        "    }\n" +
        '    println!("");\n' +
        "}\n",
    },
    expectedResponse: {
      val: "1 2 3 4 5 \n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "RUST: Conditional statement",
    reqObject: {
      language: "rust",
      script:
        "fn main() {\n" +
        "    let a = 10;\n" +
        "    if a > 5 {\n" +
        '        println!("Greater");\n' +
        "    } else {\n" +
        '        println!("Lesser or equal");\n' +
        "    }\n" +
        "}\n",
    },
    expectedResponse: {
      val: "Greater\n",
      status: 200,
      error: 0,
    },
  },

  // Test cases for PERL - 3 Nos
  {
    name: "PHP: Hello world",
    reqObject: {
      language: "php",
      script: "<?php\n" + 'echo "Hello World!";\n' + "?>\n",
    },
    expectedResponse: {
      val: "Hello World!",
      status: 200,
      error: 0,
    },
  },
  {
    name: "PHP: Sum of two numbers",
    reqObject: {
      language: "php",
      script:
        "<?php\n" +
        "$a = 5;\n" +
        "$b = 10;\n" +
        "$sum = $a + $b;\n" +
        "echo $sum;\n" +
        "?>\n",
    },
    expectedResponse: {
      val: "15",
      status: 200,
      error: 0,
    },
  },
  {
    name: "PHP: Print user input",
    reqObject: {
      language: "php",
      script:
        "<?php\n" + "$input = fgets(STDIN);\n" + "echo $input;\n" + "?>\n",
      stdin: "Abhinandan\n",
    },
    expectedResponse: {
      val: "Abhinandan\n",
      status: 200,
      error: 0,
    },
  },

  // Test cases for PERL - 3 Nos
  {
    name: "PERL: Hello world",
    reqObject: {
      language: "perl",
      script:
        "#!/usr/bin/perl\n" +
        "use strict;\n" +
        "use warnings;\n" +
        'print "Hello World!";\n',
    },
    expectedResponse: {
      val: "Hello World!",
      status: 200,
      error: 0,
    },
  },
  {
    name: "PERL : Pattern printing for 5 rows",
    reqObject: {
      language: "perl",
      script:
        '#!/usr/bin/perl\nuse strict;\nuse warnings;\nsub print_pattern {\n    my ($n) = @_;\n    for my $i (1 .. $n) {\n        for my $j (1 .. $i) {\n            print "* ";\n        }\n        print "\\n";\n    }\n}\nprint_pattern(5);\n',
    },
    expectedResponse: {
      val: "* \n* * \n* * * \n* * * * \n* * * * * \n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "PERL: Sum of 5 and 7",
    reqObject: {
      language: "perl",
      script:
        '#!/usr/bin/perl\nuse strict;\nuse warnings;\nsub sum_two_numbers {\n    my ($a, $b) = @_;\n    return $a + $b;\n}\nmy $result = sum_two_numbers(5, 7);\nprint "$result\\n";\n',
    },
    expectedResponse: {
      val: "12\n",
      status: 200,
      error: 0,
    },
  },
  // {
  //   name: "OPEN AI test promptv1",
  //   reqObject: {
  //     language: "promptv1",
  //     prompt: "The question is what is 2 plus 2. The answer given is 4.",
  //   },
  //   expectedResponse: {
  //     val: {},
  //     status: 200,
  //     error: 0,
  //   },
  // },
  // {
  //   name: "OPEN AI test promptv2",
  //   reqObject: {
  //     language: "promptv2",
  //     prompt: "The question is what is 2 plus 2. The answer given is 4.",
  //   },
  //   expectedResponse: {
  //     val: {},
  //     status: 200,
  //     error: 0,
  //   },
  // },
];

module.exports = { testCases };
