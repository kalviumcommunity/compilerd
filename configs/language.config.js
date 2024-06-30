// const { CPP, C, PYTHON, JAVA, NODEJS, RUBY, PROMPTV1, PROMPTV2 } = require('../enums/supportedLanguages')
// const ONE_MB = 1024 // ulimit uses Kilobyte as base unit
// const ALLOWED_RAM = process.env.ALLOWED_RAM || 512

// const LANGUAGES_CONFIG = {
//     [C]: {
//         compile: 'gcc -o a.out solution.c',
//         run: './a.out',
//         timeout: 2,
//         filename: 'solution.c',
//         memory: ALLOWED_RAM * ONE_MB,
//     },
//     [CPP]: {
//         compile: 'g++ -o a.out -pthread -O0 solution.cpp',
//         run: './a.out',
//         timeout: 2,
//         filename: 'solution.cpp',
//         memory: ALLOWED_RAM * ONE_MB,
//     },
//     [PYTHON]: {
//         compile: 'python -m compileall -q solution.py',
//         run: 'python solution.py',
//         timeout: 10,
//         filename: 'solution.py',
//         memory: ALLOWED_RAM * ONE_MB,
//     },
//     [JAVA]: {
//         compile: 'javac Solution.java',
//         run: 'java Solution',
//         timeout: 4,
//         filename: 'Solution.java',
//         memory: ALLOWED_RAM * ONE_MB,
//     },
//     [NODEJS]: {
//         compile: 'node --check solution.js',
//         run: 'node solution.js',
//         timeout: 10,
//         filename: 'solution.js',
//         memory: 786432, // Node.js v20 requires more initial memory, so initialize it to around 780MB (1.5 * 512MB). This value is higher than the previous 512MB but below 1GB to ensure ulimit catches excessive memory use without the GCR container being killed.
//     },
//     [RUBY]: {
//         compile: 'ruby -c solution.rb',
//         run: 'ruby solution.rb',
//         timeout: 10,
//         filename: 'solution.rb',
//         memory: ALLOWED_RAM * ONE_MB,
//     },
//     [PROMPTV1]: {
//         model: 'gpt-4-1106-preview',
//     },
//     [PROMPTV2]: {
//         model: 'gpt-3.5-turbo-1106',
//     },
// }

// module.exports = { LANGUAGES_CONFIG }

const { CPP, C, PYTHON, JAVA, NODEJS, RUBY, PROMPTV1, PROMPTV2, RUST, GO, PHP, R, PERL, CSHARP } = require('../enums/supportedLanguages');
const ONE_MB = 1024; // ulimit uses Kilobyte as base unit
const ALLOWED_RAM = process.env.ALLOWED_RAM || 512;

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
        memory: 786432,
    },
    [RUBY]: {
        compile: 'ruby -c solution.rb',
        run: 'ruby solution.rb',
        timeout: 10,
        filename: 'solution.rb',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [PROMPTV1]: {
        model: 'gpt-4-1106-preview',
    },
    [PROMPTV2]: {
        model: 'gpt-3.5-turbo-1106',
    },
    [RUST]: {
        compile: 'rustc solution.rs',
        run: './solution',
        timeout: 10,
        filename: 'solution.rs',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [GO]: {
        compile: 'go build -o solution solution.go',
        run: './solution',
        timeout: 10,
        filename: 'solution.go',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [PHP]: {
        compile: null,
        run: 'php -f solution.php',
        timeout: 10,
        filename: 'solution.php',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [CSHARP]: {
        compile: 'mcs -out:solution.exe solution.cs',
        run: 'mono solution.exe',
        timeout: 10,
        filename: 'solution.cs',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [R]: {
        compile: null,
        run: 'Rscript solution.R',
        timeout: 10,
        filename: 'solution.R',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [PERL]: {
        compile: null,
        run: 'perl solution.pl',
        timeout: 10,
        filename: 'solution.pl',
        memory: ALLOWED_RAM * ONE_MB,
    },
};

module.exports = { LANGUAGES_CONFIG };

