const rubyCompiler = require('../compilers/ruby');

test('Ruby Hello World', done => {
    rubyCompiler('puts "Hello, World!"', (error, stdout, stderr) => {
        expect(stdout).toBe('Hello, World!\n');
        done();
    });
});
