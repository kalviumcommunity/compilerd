const { exec } = require('child_process');

module.exports = function compileAndRunPython(code, callback) {
    const filename = 'program.py';
    require('fs').writeFileSync(filename, code);
    exec(`python3 ${filename}`, (error, stdout, stderr) => {
        callback(error, stdout, stderr);
    });
};
