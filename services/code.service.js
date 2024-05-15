/* globals gc */
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const os = require('os')
const fs = require('fs')
const { PYTHON, PROMPTV1, PROMPTV2 } = require('../enums/supportedLanguages')
const logger = require('../loader').helpers.l
const OpenAI = require('openai')
const openai = new OpenAI()
const { LANGUAGES_CONFIG } = require('../configs/language.config')
const Joi = require('joi')
const memoryUsedThreshold = process.env.MEMORY_USED_THRESHOLD || 512
const getDefaultAIEvalSystemPrompt = require('../helpers/defaultAIEvalSystemPrompt')

const _runScript = async (cmd, res, runMemoryCheck = false) => {
    let initialMemory = 0
    let memoryCheckInterval
    let childProcess
    let isChildKilled = false
    try {
        if (runMemoryCheck) {
            memoryCheckInterval = setInterval(async () => {
                if (!initialMemory) {
                    initialMemory = Math.round((os.freemem() / 1024 / 1024))
                    logger.info({
                        initial_memory: initialMemory,
                    })
                }

                if ((initialMemory - Math.round((os.freemem() / 1024 / 1024))) > memoryUsedThreshold) {
                    /**
                     * detection logic of memory limit exceeded
                     */
                    logger.info({
                        use_mem: (initialMemory - Math.round((os.freemem() / 1024 / 1024))),
                        free_mem: Math.round((os.freemem() / 1024 / 1024)),
                        total_mem: Math.round((os.totalmem() / 1024 / 1024)),
                    })
                    logger.warn('Memory exceeded')

                    if (childProcess) {
                        childProcess.kill('SIGKILL')
                        isChildKilled = true
                    } else {
                        logger.warn('Child process is undefined and response is on way, trying to send another response')
                        _respondWithMemoryExceeded(res)
                    }
                }
            }, 50)
        }

        const execPromise = exec(cmd)
        childProcess = execPromise.child

        const result = await execPromise

        if (memoryCheckInterval) {
            clearInterval(memoryCheckInterval); childProcess = undefined
        }

        return { result }
    } catch (e) {
        if (memoryCheckInterval) {
            clearInterval(memoryCheckInterval); childProcess = undefined
        }

        if (isChildKilled) {
            /**
             * Logic for doing proper garbage collection once child process is killed
             * 2 sec delay is added just to give enough time for GC to happen
             */
            gc()
            await new Promise(resolve => setTimeout(resolve, 2000))
            // need some way to know from the error message that memory is the issue
            e.message = e.message + ' Process killed due to Memory Limit Exceeded'
        }
        // languages like java, c and c++ sometimes throw an error and write it to stdout
        return { error: e.message, stdout: e.stdout, stderr: e.stderr }
    }
}

const _respondWithMemoryExceeded = (res) => {
    if (!res.headersSent) {
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
    if ((errorMsg.substring(errorMsg.length - subString.length, errorMsg.length) === subString) || errorMsg.includes('Process killed due to Memory Limit Exceeded')) {
        errorMsg = 'Memory limit exceeded'
    }

    // In case of no error message, the msg could be in stdout
    if (!errorMsg.trim()) errorMsg = outputLog?.stdout || 'Time limit exceeded'

    return errorMsg.trim()
}

const _getResponse = async (langConfig, prompt, points) => {
    const res = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: getDefaultAIEvalSystemPrompt(points),
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
        model: langConfig.model,
        response_format: {
            type: 'json_object',
        },
        temperature: 0.1,
    })

    let openAIResponse = {}
    if (res.choices[0]?.message) {
        openAIResponse = JSON.parse(res.choices[0].message.content)
    }

    const schema = Joi.object({
        score: Joi.number().integer().required(),
        rationale: Joi.object({
            positives: Joi.string().required().allow(''),
            negatives: Joi.string().required().allow(''),
        }).required(),
        points: Joi.number().integer().required(),
    })

    const validatedData = schema.validate(openAIResponse)
    if (validatedData.error) {
        throw new Error('Invalid response format')
    } else {
        return openAIResponse
    }
}

const _retryRequest = async (langConfig, prompt, points, maxRetries) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return _getResponse(langConfig, prompt, points)
        } catch (error) {
            if (attempt === maxRetries) {
                throw new Error(
                    error.message + '\nFailed to get a valid response from OpenAI after multiple attempts',
                )
            }
            logger.warn(`Retrying request (${attempt}/${maxRetries})`)
        }
    }
}

const _executePrompt = async (
    count,
    langConfig,
    prompt,
    response,
    points = 10, // Maximum points that can be given by open AI
    maxRetries = 3, // Maximum amount of retries of a single request failure to open AI
) => {
    try {
        const promises = Array.from({ length: count }, () =>
            _retryRequest(langConfig, prompt, points, maxRetries),
        )
        const evaluatedResponses = await Promise.all(promises)
        return evaluatedResponses
    } catch (e) {
        logger.error(e)
        /**
       * 502 Bad Gateway
       * This is often used when a server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.
       */
        response.errorMessage = 'Unable to get response from OpenAI'
        response.statusCode = 502
        response.error = 1
        throw new Error('Unable to get response from OpenAI')
    }
}

const _executeCode = async (req, res, response) => {
    let args = null
    let code = null
    let hasInputFiles = false
    let language = null
    let stdin = null

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
        const compileLog = await _runScript(compileCommand, res, true)
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

            const outputLog = await _runScript(command, res, true)
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

const _calculateScoreConfidence = (scores) => {
    const scoreDetails = new Map()

    for (let i = 0; i < scores.length; ++i) {
        const score = scores[i].score
        if (scoreDetails.has(score)) {
            const details = scoreDetails.get(score)
            details.frequency++
            scoreDetails.set(score, details)
        } else {
            scoreDetails.set(score, {
                frequency: 1,
                rationale: scores[i].rationale,
                points: scores[i].points,
            })
        }
    }

    const sortedEntries = Array.from(scoreDetails.entries())
        .map(([score, details]) => ({
            score,
            frequency: details.frequency,
            rationale: details.rationale,
            points: details.points,
        }))
        .sort((a, b) => b.frequency - a.frequency)

    const highestFrequencyDetails = sortedEntries[0]

    return {
        score: highestFrequencyDetails.score,
        frequency: highestFrequencyDetails.frequency,
        rationale: highestFrequencyDetails.rationale,
        points: highestFrequencyDetails.points,
        total: scores.length,
    }
}

const _getAiScore = async (langConfig, question, response, points, userAnswer, rubric) => {
    try {
        const prompt = `Question: ${question}\n\nAnswer: ${userAnswer}\n\nRubric: ${rubric}`
        let totalRequests = 0
        let scores = await _executePrompt(3, langConfig, prompt, response, points)
        totalRequests += 3
        let result = _calculateScoreConfidence(scores)

        // If there's variation in the scores, increase the number of requests
        if (result.frequency !== 3) {
            const additionalScores = await _executePrompt(
                7,
                langConfig,
                prompt,
                response,
                points,
            )
            scores = scores.concat(additionalScores)
            totalRequests += 7
            result = _calculateScoreConfidence(scores)
        }

        // Keep requesting until a high confidence score is determined, respecting the request limit
        while (result.frequency / result.total < 0.5 && totalRequests < 15) {
            const additionalScores = await _executePrompt(
                1,
                langConfig,
                prompt,
                response,
                points,
            )
            scores = scores.concat(additionalScores)
            totalRequests += 1
            result = _calculateScoreConfidence(scores)
        }
        const confidence = (result.frequency / result.total) * 100
        response.output = {
            score: result.score,
            points: result.points,
            rationale: result.rationale,
            confidence,
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

const execute = async (req, res) => {
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
        errorMessage: '',
    }

    if ([PROMPTV1, PROMPTV2].includes(req.language)) {
        await _getAiScore(
            LANGUAGES_CONFIG[req.language],
            req.question,
            response,
            req.points,
            req.userAnswer,
            req.rubric,
        )
    } else {
        await _executeCode(req, res, response)
    }
    return response
}

module.exports = { execute }
