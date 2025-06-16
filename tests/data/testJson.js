
const testCases = [
  {
    name: 'cpp : hello world',
    reqObject: {
      language: 'cpp',
      script: `
#include<bits/stdc++.h>
using namespace std;
int main(){
    cout << "hello world";
    return 0;
}`,
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
      script: `
#include<bits/stdc++.h>
using namespace std;
int main(){
  int a;
  while(cin >> a){
    cout << a << endl;
  }
  return 0;
}`,
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
      script: `console.log('hello world')`,
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
      script: `
process.stdin.setEncoding('utf8'); 
process.stdin.on('data', (input) => { 
console.log(input.trim()); 
});`,
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
      script:
        `print('hello world')`,
    },
    expectedResponse: {
      val: 'hello world\n',
      approxMemoryUses: 7344,
      status: 200,
      error: 0,
    },
  },
  {
    name: 'python : print stdin',
    reqObject: {
      language: 'python',
      script: `
import sys
for line in sys.stdin:
    print(line.strip())`,
      stdin: '1 2 3',
    },
    expectedResponse: {
      val: '1 2 3\n',
      approxMemoryUses: 7228,
      status: 200,
      error: 0,
    },
  },
  {
    name: 'c : hello world',
    reqObject: {
      language: 'c',
      script:
        `#include <stdio.h>
int main(){
printf("hello world");
return 0;
} `,
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
      script: `
#include <stdio.h>
int main() {
    int number;
    while (scanf("%d", &number) == 1) {
        printf("%d\\n", number);
}
    return 0;
} `,
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
    name: 'java : hello world',
    reqObject: {
      language: 'java',
      script:
        `
import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        System.out.println("hello world");
    }
}`,
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
      script: `
import java.util.Scanner;
public class Solution {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextInt()) {
            int number = scanner.nextInt();
            System.out.println(number);
        }
        scanner.close();
    }
} `,
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
        `print "hello world"`,
    },
    expectedResponse: {
      val: 'hello world',
      approxMemoryUses: 11790,
      status: 200,
      error: 0,
    },
  },
  {
    name: 'ruby : print stdin',
    reqObject: {
      language: 'ruby',
      script: `
user_input = gets.chomp
puts user_input`,
      stdin: '10',
    },
    expectedResponse: {
      val: '10\n',
      approxMemoryUses: 11800,
      status: 200,
      error: 0,
    },
  },
  {
    name: 'TLE test',
    reqObject: {
      language: 'nodejs',
      script:
        `for(let i = 0 ;; ) { i++ } `,
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
      script:
        `one_gb_data = bytearray(1000 * 1024 * 1024)`,
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
      script: `
import time
def consume_memory(target_mb, duration_sec):
    float_size = 8
    floats_per_mb = (1024 * 1024) // float_size
    total_floats = target_mb * floats_per_mb
    iterations = int(duration_sec / 0.1)
    floats_per_iteration = total_floats // iterations
    memory_hog = []
    for _ in range(iterations):
        memory_hog.extend([0.0] * floats_per_iteration)
        time.sleep(0.1)
consume_memory(1000, 1)`,
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
      script: `
a = [100]
for i in a:
    a.append(i)
    `,
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
    name: 'c :Heap memory allocation',
    reqObject: {
      language: 'c',
      script: `
#include <stdio.h>
#include <stdlib.h>
int main() {
    size_t memory_size = 50 * 1024 * 1024;
    char *memory_block = malloc(memory_size);
    if (memory_block == NULL) {
        printf("Failed to allocate memory\\n");
        return 1;
    }
    printf("Memory allocation done\\n");
    for (size_t i = 0; i < memory_size; i += 4096) {
        memory_block[i] = (char)(i % 256);
    }
    printf("Memory touched and initialized\\n");
    free(memory_block);
    printf("Memory freed\\n");
    return 0;
} `,
    },
    expectedResponse: {
      val: 'Memory allocation done\nMemory touched and initialized\nMemory freed\n',
      status: 200,
      error: 0,
      approxMemoryUses: 51000,
    },
  },
  {
    name: 'c :Stack memory allocation',
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
} `,
    },
    expectedResponse: {
      val: 'Memory allocated on stack\n',
      status: 200,
      error: 0,
      approxMemoryUses: 6500, // Max stack uses limit is ~10 MB
    },
  },
  {
    name: "Go: Basic Hello World",
    reqObject: {
      language: "go",
      script: `
package main
import "fmt"

func main() {
    fmt.Println("Language: Go")
}`
    },
    expectedResponse: {
      val: "Language: Go\n",
      status: 200,
      error: 0
    }
  },
  {
    name: "PHP: Basic Hello World",
    reqObject: {
      language: "php",
      script: `
<?php echo "Language: PHP";?>`
    },
    expectedResponse: {
      val: "\nLanguage: PHP",
      status: 200,
      error: 0
    }
  },
  {
    name: "TypeScript: Basic Hello World",
    reqObject: {
      language: "typescript",
      script: `
function main(): void {
    console.log("Language: TypeScript");
}

main();`
    },
    expectedResponse: {
      val: "Language: TypeScript\n",
      status: 200,
      error: 0
    }
  },
  {
    name: "C#: Basic Hello World",
    reqObject: {
      language: "csharp",
      script: `
using System;
class Solution {
    static void Main(string[] args) {
        Console.WriteLine("Language: C#");
    }
}`
    },
    expectedResponse: {
      val: "Language: C#\n",
      status: 200,
      error: 0
    }
  },
  {
    name: "Kotlin: Basic Hello World",
    reqObject: {
      language: "kotlin",
      script: `
fun main() {
  println("Language: Kotlin")
}`
    },
    expectedResponse: {
      val: "Language: Kotlin\n",
      status: 200,
      error: 0
    }
  }
]

module.exports = { testCases }
