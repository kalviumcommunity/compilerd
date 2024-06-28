const { exec } = require('child_process');
const fs = require('fs');

const runPHP = (code) => {
    return new Promise((resolve, reject) => {
        const fileName = 'program.php';
        fs.writeFileSync(fileName, code);

        exec(`php ${fileName}`, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
};

module.exports = { runPHP };