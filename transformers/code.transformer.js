const codeTransformer = {
    transform: (code) => {
        return {
            output: code.output,
            execute_time: code.executeTime,
            errorMessage: code.errorMessage,
            status_code: code.statusCode,
            memory: code.memory,
            cpu_time: code.cpuTime,
            output_files: code.outputFiles,
            compile_message: code.compileMessage,
            error: code.error,
            stdin: code.stdin,
        }
    },
}

module.exports = { codeTransformer }
