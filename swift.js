// src/languages/swift.js

const { exec } = require('child_process');

function execute(code, callback) {
    const command = `swiftc -o /tmp/swift_exec /tmp/main.swift && /tmp/swift_exec`;

    // Write code to temporary file
    require('fs').writeFile('/tmp/main.swift', code, (err) => {
        if (err) {
            callback({ error: err.message });
            return;
        }

        // Execute compiled Swift code
        exec(command, (error, stdout, stderr) => {
            if (error) {
                callback({ error: error.message, stderr: stderr });
            } else {
                callback({ output: stdout });
            }
        });
    });
}

module.exports = {
    execute
};
