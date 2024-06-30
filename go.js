

const { exec } = require('child_process');

function execute(code, callback) {
    const command = `go run -e "${code}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            callback({ error: error.message, stderr: stderr });
        } else {
            callback({ output: stdout });
        }
    });
}

module.exports = {
    execute
};
