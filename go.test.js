const goCompiler = require('../compilers/go');

test('Go Hello World', done => {
    goCompiler('package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, World!")\n}', (error, stdout, stderr) => {
        expect(stdout).toBe('Hello, World!\n');
        done();
    });
});
