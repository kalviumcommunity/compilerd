

const { exec } = require('child_process');

function execute(code, callback) {
    const command = `rustc -o /tmp/rust_exec /tmp/main.rs && /tmp/rust_exec`;

    // Write code to temporary file
    require('fs').writeFile('/tmp/main.rs', code, (err) => {
        if (err) {
            callback({ error: err.message });
            return;
        }

        // Execute compiled Rust code
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
