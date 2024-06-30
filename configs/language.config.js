const {
  CPP,
  C,
  PYTHON,
  JAVA,
  NODEJS,
  RUBY,
  PROMPTV1,
  PROMPTV2,
  BASH,
  SWIFT,
  RUST,
  C_SHARP,
  DART,
  KOTLIN,
  PHP, // Add PHP to your imports if necessary
} = require("../enums/supportedLanguages");

const ONE_MB = 1024; // ulimit uses Kilobyte as base unit
const ALLOWED_RAM = process.env.ALLOWED_RAM || 512;

const LANGUAGES_CONFIG = {
  [C]: {
    compile: "gcc -o a.out solution.c",
    run: "./a.out",
    timeout: 2,
    filename: "solution.c",
    memory: ALLOWED_RAM * ONE_MB,
  },
  [CPP]: {
    compile: "g++ -o a.out -pthread -O0 solution.cpp",
    run: "./a.out",
    timeout: 2,
    filename: "solution.cpp",
    memory: ALLOWED_RAM * ONE_MB,
  },
  [PYTHON]: {
    compile: "python -m compileall -q solution.py",
    run: "python solution.py",
    timeout: 10,
    filename: "solution.py",
    memory: ALLOWED_RAM * ONE_MB,
  },
  [JAVA]: {
    compile: "javac Solution.java",
    run: "java Solution",
    timeout: 4,
    filename: "Solution.java",
    memory: ALLOWED_RAM * ONE_MB,
  },
  [NODEJS]: {
    compile: "node --check solution.js",
    run: "node solution.js",
    timeout: 10,
    filename: "solution.js",
    memory: 786432, // Node.js v20 requires more initial memory
  },
  [RUBY]: {
    compile: "ruby -c solution.rb",
    run: "ruby solution.rb",
    timeout: 10,
    filename: "solution.rb",
    memory: ALLOWED_RAM * ONE_MB,
  },
  [BASH]: {
    compile: "", // No compilation needed for Bash
    run: "bash solution.sh",
    timeout: 5,
    filename: "solution.sh",
    memory: ALLOWED_RAM * ONE_MB,
  },
  [SWIFT]: {
    compile: "swiftc -o solution solution.swift",
    run: "./solution",
    timeout: 5,
    filename: "solution.swift",
    memory: ALLOWED_RAM * ONE_MB,
  },
  [RUST]: {
    compile: "rustc -o solution solution.rs",
    run: "./solution",
    timeout: 5,
    filename: "solution.rs",
    memory: ALLOWED_RAM * ONE_MB,
  },
  [C_SHARP]: {
    compile: "dotnet build -o output",
    run: "dotnet run --project output",
    timeout: 5,
    filename: "program.cs",
    memory: ALLOWED_RAM * ONE_MB,
  },
  [DART]: {
    compile: "", // Dart does not need separate compilation step
    run: "dart /tmp/solution.dart",
    timeout: 10,
    filename: "solution.dart",
    memory: ALLOWED_RAM * ONE_MB,
  },
  [KOTLIN]: {
    compile: "kotlinc solution.kt -include-runtime -d solution.jar",
    run: "java -jar solution.jar",
    timeout: 5,
    filename: "solution.kt",
    memory: ALLOWED_RAM * ONE_MB,
  },
  [PHP]: {
    compile: "",
    run: "php solution.php",
    timeout: 5,
    filename: "solution.php",
    memory: ALLOWED_RAM * ONE_MB,
  },
  [PROMPTV1]: {
    model: "gpt-4-1106-preview",
  },
  [PROMPTV2]: {
    model: "gpt-3.5-turbo-1106",
  },
};

module.exports = { LANGUAGES_CONFIG };
