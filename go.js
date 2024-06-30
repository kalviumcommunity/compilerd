const { exec } = require('child_process');

module.exports = function compileAndRunGo(code, callback) {
    const filename = 'program.go';
    require('fs').writeFileSync(filename, code);
    exec(`go run ${filename}`, (error, stdout, stderr) => {
        callback(error, stdout, stderr);
    });
};
