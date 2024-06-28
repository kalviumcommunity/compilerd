const { exec } = require('child_process');
const fs = require('fs');

const runR = (code) => {
    return new Promise((resolve, reject) => {
        const fileName = 'program.R';
        fs.writeFileSync(fileName, code);

        exec(`Rscript ${fileName}`, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
};

module.exports = { runR };