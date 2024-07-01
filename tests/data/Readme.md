Sure, here's a description for each language test case we've discussed:

### Node.js Test Cases

1. **Hello World**:
   - **Description**: This test checks if the IDE can execute a basic Node.js script that prints "hello world".
   - **Test Case**:
     ```json
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
         }
     }
     ```

2. **Print Stdin**:
   - **Description**: This test checks if the IDE can handle standard input in a Node.js script.
   - **Test Case**:
     ```json
     {
         name: 'nodejs : print stdin',
         reqObject: {
             language: 'nodejs',
             script: 'process.stdin.setEncoding(\'utf8\');\nprocess.stdin.on(\'data\', (input) => {console.log(input);});',
             stdin: '1 2 3',
         },
         expectedResponse: {
             val: '1 2 3\n',
             status: 200,
             error: 0,
         }
     }
     ```

3. **TLE Test**:
   - **Description**: This test checks if the IDE can handle infinite loops in a Node.js script and correctly time out.
   - **Test Case**:
     ```json
     {
         name: 'nodejs : TLE test',
         reqObject: {
             language: 'nodejs',
             script: 'for(let i=0 ; ; ){i++}',
         },
         expectedResponse: {
             val: 'Time limit exceeded',
             status: 200,
             error: 1,
         }
     }
     ```

### C++ Test Cases

1. **Hello World**:
   - **Description**: This test checks if the IDE can execute a basic C++ script that prints "hello world".
   - **Test Case**:
     ```json
     {
         name: 'cpp : hello world',
         reqObject: {
             language: 'cpp',
             script: '#include<bits/stdc++.h>\nusing namespace std;\nint main() { cout << "hello world"; return 0; }',
         },
         expectedResponse: {
             val: 'hello world',
             status: 200,
             error: 0,
         }
     }
     ```

2. **Print Stdin**:
   - **Description**: This test checks if the IDE can handle standard input in a C++ script.
   - **Test Case**:
     ```json
     {
         name: 'cpp : print stdin',
         reqObject: {
             language: 'cpp',
             script: '#include <iostream>\nusing namespace std;\nint main() { int num; while(cin >> num) { cout << num << endl; } return 0; }',
             stdin: '1 2 3',
         },
         expectedResponse: {
             val: '1\n2\n3\n',
             status: 200,
             error: 0,
         }
     }
     ```

3. **TLE Test**:
   - **Description**: This test checks if the IDE can handle infinite loops in a C++ script and correctly time out.
   - **Test Case**:
     ```json
     {
         name: 'cpp : TLE test',
         reqObject: {
             language: 'cpp',
             script: '#include<bits/stdc++.h>\nusing namespace std;\nint main() { for(;;); return 0; }',
         },
         expectedResponse: {
             val: 'Time limit exceeded',
             status: 200,
             error: 1,
         }
     }
     ```

### Python Test Cases

1. **Hello World**:
   - **Description**: This test checks if the IDE can execute a basic Python script that prints "hello world".
   - **Test Case**:
     ```json
     {
         name: 'python : hello world',
         reqObject: {
             language: 'python',
             script: 'print("hello world")',
         },
         expectedResponse: {
             val: 'hello world\n',
             status: 200,
             error: 0,
         }
     }
     ```

2. **Print Stdin**:
   - **Description**: This test checks if the IDE can handle standard input in a Python script.
   - **Test Case**:
     ```json
     {
         name: 'python : print stdin',
         reqObject: {
             language: 'python',
             script: 'import sys\nfor line in sys.stdin: print(line, end="")',
             stdin: '1 2 3',
         },
         expectedResponse: {
             val: '1 2 3\n',
             status: 200,
             error: 0,
         }
     }
     ```

3. **TLE Test**:
   - **Description**: This test checks if the IDE can handle infinite loops in a Python script and correctly time out.
   - **Test Case**:
     ```json
     {
         name: 'python : TLE test',
         reqObject: {
             language: 'python',
             script: 'while True: pass',
         },
         expectedResponse: {
             val: 'Time limit exceeded',
             status: 200,
             error: 1,
         }
     }
     ```

### C Test Cases

1. **Hello World**:
   - **Description**: This test checks if the IDE can execute a basic C script that prints "hello world".
   - **Test Case**:
     ```json
     {
         name: 'c : hello world',
         reqObject: {
             language: 'c',
             script: '#include <stdio.h>\nint main() { printf("hello world\\n"); return 0; }',
         },
         expectedResponse: {
             val: 'hello world\n',
             status: 200,
             error: 0,
         }
     }
     ```

2. **Print Stdin**:
   - **Description**: This test checks if the IDE can handle standard input in a C script.
   - **Test Case**:
     ```json
     {
         name: 'c : print stdin',
         reqObject: {
             language: 'c',
             script: '#include <stdio.h>\nint main() { int number; while (scanf("%d", &number) == 1) { printf("%d\\n", number); } return 0; }',
             stdin: '1 2 3',
         },
         expectedResponse: {
             val: '1\n2\n3\n',
             status: 200,
             error: 0,
         }
     }
     ```

3. **TLE Test**:
   - **Description**: This test checks if the IDE can handle infinite loops in a C script and correctly time out.
   - **Test Case**:
     ```json
     {
         name: 'c : TLE test',
         reqObject: {
             language: 'c',
             script: '#include <stdio.h>\nint main() { while (1) {} return 0; }',
         },
         expectedResponse: {
             val: 'Time limit exceeded',
             status: 200,
             error: 1,
         }
     }
     ```

### Java Test Cases

1. **Hello World**:
   - **Description**: This test checks if the IDE can execute a basic Java script that prints "hello world".
   - **Test Case**:
     ```json
     {
         name: 'java : hello world',
         reqObject: {
             language: 'java',
             script: 'public class Main { public static void main(String[] args) { System.out.println("hello world"); } }',
         },
         expectedResponse: {
             val: 'hello world\n',
             status: 200,
             error: 0,
         }
     }
     ```

2. **Print Stdin**:
   - **Description**: This test checks if the IDE can handle standard input in a Java script.
   - **Test Case**:
     ```json
     {
         name: 'java : print stdin',
         reqObject: {
             language: 'java',
             script: 'import java.util.Scanner;\npublic class Main { public static void main(String[] args) { Scanner scanner = new Scanner(System.in); while (scanner.hasNextInt()) { System.out.println(scanner.nextInt()); } } }',
             stdin: '1 2 3',
         },
         expectedResponse: {
             val: '1\n2\n3\n',
             status: 200,
             error: 0,
         }
     }
     ```

3. **TLE Test**:
   - **Description**: This test checks if the IDE can handle infinite loops in a Java script and correctly time out.
   - **Test Case**:
     ```json
     {
         name: 'java : TLE test',
         reqObject: {
             language: 'java',
             script: 'public class Main { public static void main(String[] args) { while (true) {} } }',
         },
         expectedResponse: {
             val: 'Time limit exceeded',
             status: 200,
             error: 1,
         }
     }
     ```

### Ruby Test Cases

1. **Hello World**:
   - **Description**: This test checks if the IDE can execute a basic Ruby script that prints "hello world".
   - **Test Case**:
     ```json
     {
         name: 'ruby : hello