const logger = require('../loader').helpers.l

const initExeca = async () => {
    const module = await import('execa')
    return module.execa
}

const runCommand = async (command, workingDir) => {
    const execa = await initExeca()
    logger.info(`Executing: ${command}`);
    try {
        const startTime = Date.now()
        const result = await execa(command, {
            cwd: workingDir,
            shell: true,  // Usefull for npm commands having '&&'
            stdio: 'inherit',
            preferLocal: true,  // Use local binaries if available
            localDir: workingDir,
            reject: false, // Don't throw on non-zero exit code
        })

        logger.info({
            command,
            exitCode: result.exitCode,
            duration_ms: Date.now() - startTime,
        }, 'Command finished')

        if (result.failed) {
            throw new Error(`Command failed with exit code ${result.exitCode}`)
        }
        return result
    } catch (error) {
        if (error.exitCode !== undefined) {
            logger.error(`Command exited with code ${error.exitCode}`)
            if (error.stderr) logger.error(`Error output: ${error.stderr}`)
        } else if (error.signal) {
            logger.error(`Command was killed with signal ${error.signal}`)
        } else {
            logger.error(`Command failed to execute: ${error.message}`)
        }
        throw error
    }
}

const runCommandsSequentially = async (
    commands,
    workingDir = process.cwd()
) => {
    logger.info({ commands, workingDir }, 'Starting command sequence')
    for (const command of commands) {
        try {
            await runCommand(command, workingDir)
        } catch (error) {
            logger.error(`Error executing "${command}"`)
            if (error.stdout) logger.info(`Command output: ${error.stdout}`)
            throw new Error(`Command sequence failed at: ${command}`)
        }
    }
    logger.info("All commands completed successfully")
}

module.exports = { runCommandsSequentially }