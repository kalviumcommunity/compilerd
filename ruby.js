const { exec } = require('child_process');

module.exports = function compileAndRunRuby(code, callback) {
    const filename = 'program.rb';
    require('fs').writeFileSync(filename, code);
    exec(`ruby ${filename}`, (error, stdout, stderr) => {
        callback(error, stdout, stderr);
    });
};
