const util = require('util')
const exec = util.promisify(require('child_process').exec)
const os = require('os')
const fs = require('fs')
const { PYTHON } = require('../constants/allowedLanguages')
const logger = require('../loader').helpers.l
const OpenAI = require("openai");
const openai = new OpenAI();

const ONE_MB = 1024 // ulimit uses Kilobyte as base unit
const ALLOWED_RAM = 512
const LANGUAGES_CONFIG = {
    c: {
        compile: 'gcc -o a.out solution.c',
        run: './a.out',
        timeout: 2,
        filename: 'solution.c',
        memory: ALLOWED_RAM * ONE_MB,
    },
    cpp: {
        compile: 'g++ -o a.out -pthread -O0 solution.cpp',
        run: './a.out',
        timeout: 2,
        filename: 'solution.cpp',
        memory: ALLOWED_RAM * ONE_MB,
    },
    python: {
        compile: 'python -m compileall -q solution.py',
        run: 'python solution.py',
        timeout: 10,
        filename: 'solution.py',
        memory: ALLOWED_RAM * ONE_MB,
    },
    java: {
        compile: 'javac Solution.java',
        run: 'java Solution',
        timeout: 4,
        filename: 'Solution.java',
        memory: ALLOWED_RAM * ONE_MB,
    },
    nodejs: {
        compile: 'node --check solution.js',
        run: 'node solution.js',
        timeout: 10,
        filename: 'solution.js',
        memory: ALLOWED_RAM * ONE_MB,
    },
    promptv1: {
        model: "gpt-4-1106-preview",
    }
}

const _runScript = async (cmd, res) => {
    let initialMemory = 0
    let myInterval
    try {
        myInterval = setInterval(() => {
            if (!initialMemory) {
                initialMemory = Math.round((os.freemem() / 1024 / 1024))
            }

            if ((initialMemory - Math.round((os.freemem() / 1024 / 1024))) > 425) {
                logger.info({
                    use_mem: (initialMemory - Math.round((os.freemem() / 1024 / 1024))),
                    free_mem: Math.round((os.freemem() / 1024 / 1024)),
                    total_mem: Math.round((os.totalmem() / 1024 / 1024)),
                })
                logger.warn('Memory exceeded')
                res.status(200).send({
                    output: 'Memory exceeded',
                    execute_time: null,
                    status_code: 200,
                    memory: null,
                    cpu_time: null,
                    output_files: [],
                    compile_message: '',
                    error: 1,
                })
                process.exit(1)
            }
        }, 250)
        const result = await exec(cmd)
        clearInterval(myInterval)
        return { result }
    } catch (e) {
        if (myInterval) { clearInterval(myInterval) }
        // languages like java, c and c++ sometimes throw an error and write it to stdout
        return { error: e.message, stdout: e.stdout, stderr: e.stderr }
    }
}

const _prepareErrorMessage = (outputLog, language, command) => {
    let errorMsg = outputLog?.error ?? ''
    // strip the command info
    if (errorMsg.startsWith('Command failed:')) {
        errorMsg = errorMsg.replace('Command failed: ' + command, '')
    }

    // Remove file path info
    if (language === PYTHON) {
        errorMsg = errorMsg.replace(/File ".*\/(.*?)"/g, 'File "$1"')
    }

    const subString = 'MemoryError\n'
    if (errorMsg.substring(errorMsg.length - subString.length, errorMsg.length) === subString) {
        errorMsg = 'Memory limit exceeded'
    }

    // In case of no error message, the msg could be in stdout
    if (!errorMsg.trim()) errorMsg = outputLog?.stdout || 'Time limit exceeded'

    return errorMsg.trim()
}


const _executePrompt = async (langConfig, prompt, response) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful tutoring assistant. You will be given the question, students answer, and optionally rubrics for evaluation. If no rubric is given you can build one by yourself. Your task is to evaluate the answer and return a JSON object with only 2 keys: score and rationale. Score should be out of 10. The rationale clearly explains why you provided the score, including breaking up the score when needed"
                }, {
                    role: "user",
                    content: prompt
                }
            ],
            model: langConfig.model,
            response_format: {
                type: "json_object"
            }
        })
        let openAIResponse = {}
        if (completion && completion.choices && completion.choices[0] && completion.choices[0].message) {
            openAIResponse = JSON.parse(completion.choices[0].message.content)
        }
        const keysToCheck = ['score', 'rationale']
        const allKeysExist = keysToCheck.every(key => key in openAIResponse)
        if (!allKeysExist) {
            /**
             * 502 Bad Gateway
             * This is often used when a server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.
             */
            const responseCode = 502
            const errorMessage = "Unable to parse OPEN AI response"
            response.errorMessage = errorMessage
            response.statusCode = responseCode
        } else {
            response.output = openAIResponse
        }

    } catch (e) {
        logger.error(e)
        throw new Error('Unable to evaluate the prompt')
    }
}

const execute = async (req, res) => {
    let args = null
    let code = null
    let hasInputFiles = false
    let language = null
    let stdin = null

    const response = {
        output: '',
        executeTime: null,
        statusCode: 200,
        memory: null,
        cpuTime: null,
        outputFiles: [],
        compileMessage: '',
        error: 0,
        stdin: req?.stdin,
        errorMessage: ''
    }

    if (req.language === 'promptv1') {
        await _executePrompt(LANGUAGES_CONFIG[req.language], req.prompt, response);
    }
    else {
        try {
            // Parse Input
            // eslint-disable-next-line no-unused-vars
            args = req.args
            // eslint-disable-next-line no-unused-vars
            hasInputFiles = req.hasInputFiles

            code = req.script
            language = req.language
            stdin = req.stdin
            const langConfig = LANGUAGES_CONFIG[language]
            // Remove all files from tmp folder
            await _runScript('rm -rf /tmp/*', res)

            // Write file in tmp folder based on language
            await fs.promises.writeFile(`/tmp/${langConfig.filename}`, code)

            const compileCommand = `cd /tmp/ && ${langConfig.compile}`
            // Run compile command
            const compileLog = await _runScript(compileCommand, res)
            response.compileMessage =
                compileLog.error !== undefined ? _prepareErrorMessage(compileLog, language, compileCommand) : ''

            // Check if there is no compilation error
            if (response.compileMessage === '') {
                let command
                if (language === 'java') {
                    // Remove ulimit as a temp fix
                    command = `cd /tmp/ && timeout ${langConfig.timeout}s ${langConfig.run}`
                } else {
                    command = `cd /tmp/ && ulimit -v ${langConfig.memory} && ulimit -m ${langConfig.memory} && timeout ${langConfig.timeout}s ${langConfig.run}`
                }

                // Check if there is any input that is to be provided to code execution
                if (stdin) {
                    // Write input in a file in tmp folder
                    await fs.promises.writeFile('/tmp/input.txt', stdin)
                    // Update the execution command
                    command += ' < input.txt'
                }

                const outputLog = await _runScript(command, res)
                response.output =
                    outputLog.error !== undefined
                        ? _prepareErrorMessage(outputLog, language, command)
                        : outputLog.result.stdout
                if (outputLog.error) {
                    response.error = 1
                }
            } else {
                response.error = 1
            }
        } catch (e) {
            logger.error(e)
            throw new Error('Unable to execute code.')
        }
    }
    return response
}

module.exports = { execute }
