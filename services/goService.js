const { exec } = require('child_process');
const fs = require('fs');

const compileAndRunGo = (code) => {
    return new Promise((resolve, reject) => {
        const fileName = 'program.go';
        fs.writeFileSync(fileName, code);

        exec(`go run ${fileName}`, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
};

module.exports = { compileAndRunGo };