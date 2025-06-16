const { CPP, C, PYTHON, JAVA, NODEJS, RUBY, GO, PHP, TYPESCRIPT, CSHARP, KOTLIN, PROMPTV1, PROMPTV2, PROMPTV3 } = require('../enums/supportedLanguages')
const ONE_MB = 1024 // ulimit uses Kilobyte as base unit
const ALLOWED_RAM = process.env.ALLOWED_RAM || 512

const LANGUAGES_CONFIG = {
  [C]: {
    compile: 'gcc -o a.out solution.c',
    run: './a.out',
    timeout: 2,
    filename: 'solution.c',
    memory: ALLOWED_RAM * ONE_MB,
  },
  [CPP]: {
    compile: 'g++ -o a.out -pthread -O0 solution.cpp',
    run: './a.out',
    timeout: 2,
    filename: 'solution.cpp',
    memory: ALLOWED_RAM * ONE_MB,
  },
  [PYTHON]: {
    compile: 'python -m compileall -q solution.py',
    run: 'python solution.py',
    timeout: 10,
    filename: 'solution.py',
    memory: ALLOWED_RAM * ONE_MB,
  },
  [JAVA]: {
    compile: 'javac Solution.java',
    run: 'java Solution',
    timeout: 4,
    filename: 'Solution.java',
    memory: ALLOWED_RAM * ONE_MB,
  },
  [NODEJS]: {
    compile: 'node --check solution.js',
    run: 'node solution.js',
    timeout: 10,
    filename: 'solution.js',
    memory: 786432, // Node.js v20 requires more initial memory, so initialize it to around 780MB (1.5 * 512MB). This value is higher than the previous 512MB but below 1GB to ensure ulimit catches excessive memory use without the GCR container being killed.
  },
  [RUBY]: {
    compile: 'ruby -c solution.rb',
    run: 'ruby solution.rb',
    timeout: 10,
    filename: 'solution.rb',
    memory: ALLOWED_RAM * ONE_MB,
  },
  [GO]: {
    compile: 'go build -o solution solution.go',
    run: './solution',
    timeout: 4,
    filename: 'solution.go',
    memory: 1024 * ONE_MB, // Go programs can be memory-intensive, so we allocate 1GB
  },
  [PHP]: {
    compile: 'php -l solution.php',
    run: 'php solution.php',
    timeout: 8,
    filename: 'solution.php',
    memory: ALLOWED_RAM * ONE_MB,
  },
  [TYPESCRIPT]: {
    compile: 'tsc solution.ts --outDir .',
    run: 'node solution.js',
    timeout: 10,
    filename: 'solution.ts',
    memory: 786432, // Similar to Node.js since it compiles to JS
  },
  [CSHARP]: {
    compile: 'dotnet build solution.csproj -o .',
    run: 'dotnet solution.dll',
    timeout: 6,
    filename: 'solution.cs',
    memory: ALLOWED_RAM * ONE_MB * 1.5, // .NET typically needs more memory
    projectFile: 'solution.csproj', // Additional config for .NET projects
  },
  [KOTLIN]: {
    compile: 'kotlinc solution.kt -include-runtime -d solution.jar',
    run: 'java -jar solution.jar',
    timeout: 6,
    filename: 'solution.kt',
    memory: 1024 * ONE_MB //Kotlin/JVM needs slightly more memory
  },
  [PROMPTV1]: {
    model: 'gpt-4-1106-preview',
  },
  [PROMPTV2]: {
    model: 'gpt-3.5-turbo-1106',
  },
  [PROMPTV3]: {
    model: 'gpt-4o-2024-05-13',
  },
}

module.exports = { LANGUAGES_CONFIG }
