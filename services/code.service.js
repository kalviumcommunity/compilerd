/* globals gc */
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const os = require('os')
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const { PYTHON, PROMPTV1, PROMPTV2 } = require('../enums/supportedLanguages')
const logger = require('../loader').helpers.l
const OpenAI = require('openai')
const openai = new OpenAI()
const { LANGUAGES_CONFIG } = require('../configs/language.config')
const Joi = require('joi')
const memoryUsedThreshold = process.env.MEMORY_USED_THRESHOLD || 512
const getDefaultAIEvalSystemPrompt = require('../helpers/defaultAIEvalSystemPrompt')
const puppeteer = require('puppeteer')
const express = require('express')
const http = require('http')
const { spawn } = require('child_process')
const appConfig = require('../configs/app.config.js')
const { FRONTEND_STATIC_JASMINE } = require('../enums/supportedMultifileSetupTypes.js')
const axios = require('axios')
const supportedLanguages = require('../enums/supportedLanguages')
const { generate } = require('@builder.io/sqlgenerate')
const parser = require('sqlite-parser')
const crypto = require('crypto')
const pgp = require('pg-promise')()  // PGLite support

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

const _executePrompt = async (
    count,
    langConfig,
    prompt,
    points = 10, // Maximum points that can be given by open AI
) => {
    const promises = Array.from({ length: count }, () =>
        openai.chat.completions.create({
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
        }),
    )

    const evaluatedResponses = await Promise.allSettled(promises)
    let errorResponsesCount = 0
    const allValidResponses = []

    evaluatedResponses.forEach(res => {
        if (res.status === 'fulfilled') {
            let openAIResponse = {}
            if (res.value.choices[0]?.message) {
                openAIResponse = JSON.parse(res.value.choices[0].message.content)
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
            if (validatedData.error || openAIResponse.points !== points) {
                logger.error(`The response received from Open AI failed the validation check: ${JSON.stringify(validatedData)}`)
                ++errorResponsesCount
            } else {
                allValidResponses.push(openAIResponse)
            }
        } else {
            logger.error('No response received from Open AI')
            ++errorResponsesCount
        }
    })
    return { allValidResponses, errorResponsesCount }
}

const _executeCode = async (req, res, response) => {
    let args = null
    let code = null
    let hasInputFiles = false
    let language = null
    let stdin = null

    try {
        // Parse Input
        args = req.args
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
            } else if (language === 'pg') {
                // PGLite execution command
                const db = pgp('pgLite://:memory:')
                const result = await db.any(code);
                response.output = JSON.stringify(result, null, 2);
                return;
            } else {
                command = `cd /tmp/ && ulimit -v ${langConfig.memory} && ulimit -m ${langConfig.memory} && timeout ${langConfig.timeout}s ${langConfig.run}`
            }

            // Check if there is any input that is to be provided
            if (stdin) command = `cd /tmp/ && echo "${stdin}" | ${command}`

            // Run command and store result in variable
            const outputLog = await _runScript(command, res, true)

            if (outputLog.error !== undefined) {
                response.output = _prepareErrorMessage(outputLog, language, command)
                response.error = 1
            } else {
                response.output = outputLog.result.stdout
                response.execute_time = outputLog.result.stime
            }
        } else {
            response.error = 1
        }
    } catch (e) {
        response.error = 1
        response.output = e.message
    }
}

const _calculateScoreConfidence = (evaluations) => {
    const scoreDetails = new Map()
    for (let i = 0; i < evaluations.length; i++) {
        if (!scoreDetails.has(evaluations[i].score)) {
            scoreDetails.set(evaluations[i].score, 0)
        }
        scoreDetails.set(evaluations[i].score, scoreDetails.get(evaluations[i].score) + 1)
    }

    const mostFrequentScore = [...scoreDetails.entries()].reduce((prev, current) => (prev[1] > current[1] ? prev : current))[0]

    return {
        score: mostFrequentScore,
        confidence: Math.floor((scoreDetails.get(mostFrequentScore) / evaluations.length) * 100),
    }
}

const _collectResults = (responses) => {
    const collectedResults = []

    responses.forEach((res) => {
        if (res.score === 0 && res.confidence < 50) {
            res.rationale.positives = 'The code is logically correct.'
            res.rationale.negatives = 'The code is not optimized.'
        }

        collectedResults.push({
            score: res.score,
            confidence: res.confidence,
            rationale: {
                positives: res.rationale.positives,
                negatives: res.rationale.negatives,
            },
        })
    })

    return collectedResults
}

const evaluate = async (req, res) => {
    const { prompt, language, count } = req.body

    const langConfig = LANGUAGES_CONFIG[language]
    const { allValidResponses, errorResponsesCount } = await _executePrompt(count, langConfig, prompt)

    if (allValidResponses.length === 0) {
        return res.status(500).send({
            error: 'Unable to get valid responses from AI model',
        })
    }

    const scores = allValidResponses.map((response) => ({
        score: response.score,
        rationale: response.rationale,
    }))

    const { score, confidence } = _calculateScoreConfidence(scores)
    const results = _collectResults(scores)

    res.status(200).send({
        score,
        confidence,
        responses: results,
    })
}

const execute = async (req, res) => {
    const response = {
        output: null,
        execute_time: null,
        status_code: 200,
        memory: null,
        cpu_time: null,
        output_files: [],
        compile_message: '',
        error: 0,
    }

    try {
        await _executeCode(req.body, res, response)
    } catch (e) {
        return res.status(500).send({ error: e.message })
    }

    res.status(200).send(response)
}

const routes = [
    {
        method: 'POST',
        path: '/evaluate',
        handler: evaluate,
    },
    {
        method: 'POST',
        path: '/execute',
        handler: execute,
    },
]

module.exports = routes