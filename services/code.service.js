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
const puppeteer = require('puppeteer');
const express = require('express')
const http = require('http')
const unzipper = require('unzipper');
const { resolve } = require('path')
const { spawn } = require('child_process');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

const STATIC_SERVER_PATH = "/Users/anirudhpanwar/Downloads/jasmine-standalone-react/"
const SUBMISSION_FILE_DOWNLOAD_PATH = '/tmp/submission.zip'
const WORKING_DIR = '/tmp/submission/'

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
                        initial_memory: initialMemory
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
    langConfig,
    prompt,
    response,
    maxPoints = 10,
    systemPrompt,
) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: systemPrompt ?? getDefaultAIEvalSystemPrompt(maxPoints),
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
        })
        let openAIResponse = {}
        if (completion && completion.choices && completion.choices[0] && completion.choices[0].message) {
            openAIResponse = JSON.parse(completion.choices[0].message.content)
        }
        let schema
        if (systemPrompt) {
            schema = Joi.any()
        } else {
            schema = Joi.object({
                score: Joi.number().integer().required(),
                rationale: Joi.object({
                    positives: Joi.string().required().allow(''),
                    negatives: Joi.string().required().allow(''),
                }).required(),
                points: Joi.number().integer().required(),
            })
        }
        const validatedData = schema.validate(openAIResponse)
        if (validatedData.error) {
            /**
             * 502 Bad Gateway
             * This is often used when a server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.
             */
            logger.error(openAIResponse)
            const responseCode = 502
            const errorMessage = 'Unable to parse OPEN AI response'
            response.errorMessage = errorMessage
            response.statusCode = responseCode
            response.error = 1
        } else {
            response.output = openAIResponse
        }
    } catch (e) {
        logger.error(e)
        throw new Error('Unable to evaluate the prompt')
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
        await _executePrompt(
            LANGUAGES_CONFIG[req.language],
            req.prompt,
            response,
            req.points,
            req.systemPrompt,
        )
    } else if (['multifile'].includes(req.language)) {
		await _executeMultiFile(req, res, response)
	} else {
        await _executeCode(req, res, response)
    }
    return response
}

const sleep = (ms) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, ms)
	})
}

const _extractBucketAndFileName = (url) => {
    const urlParts = new URL(url);
    const pathSegments = urlParts.pathname.substring(1).split('/');

    const bucketName = pathSegments.shift();
    const fileName = pathSegments.join('/');

    return {
        bucketName,
        fileName
    };
}

const _getSubmission = async (url, destPath) => {
    const { bucketName, fileName } = _extractBucketAndFileName(url);
    const destFileName = destPath

    try {
        const options = {
            destination: destFileName,
        };
        await storage.bucket(bucketName).file(fileName).download(options);
        return destFileName
    } catch (err) {
        console.log(err)
        throw (err)
    }
};

const _unzipSubmission = async (fileLocalPath, unzipPath) => {
	try {
        const stats = await fs.promises.stat(fileLocalPath);
        if (!stats.isFile()) {
            throw new Error(`${fileLocalPath} does not point to a file.`);
        }

        const outputDir = unzipPath

        if (!fs.existsSync(outputDir)) {   // fs.exists is deprecated
            await fs.promises.mkdir(outputDir, { recursive: true });
        }

        const unzipProcess = spawn('unzip', ['-o', fileLocalPath, '-d', outputDir])

        return new Promise ((resolve, reject) => {
            unzipProcess.on('close', (code) => {
                if(code === 0){
                    resolve()
                } else {
                    reject(new Error('Failed to unzip the file'))
                }
            })
        })
    } catch (error) {
        console.error(error);
        throw(new Error('Failed to unzip the file:', error))
    }
}

const _startStaticServer = async (rootPath) => {
	const submissionDir = rootPath;
    const staticServer = express();
    staticServer.use(express.static(submissionDir));
    const staticServerInstance = http.createServer(staticServer);
    return new Promise((resolve, reject) => {
        staticServerInstance.listen(8080, () => {
            console.log('Static file server running on http://localhost:8080');
            resolve(staticServerInstance);
        }).on('error', (err) => {
            console.error('Failed to start server:', err);
            reject(err);
        });
    });
}

const _runTests = async (staticServerInstance, entryPath) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let testResults = [];

	page.on('request', request => {
		console.log(`Request: ${request.url()} - ${request.method()}`);
	});
	page.on('response', response => {
		if (!response.ok()) {
			console.log(`Failed response: ${response.url()} - ${response.status()} ${response.statusText()}`);
		}
	});

	page.on('requestfailed', request => {
        console.log(`Failed request: ${request.url()} - ${request.failure().errorText}`);
    });


    page.on('console', msg => {
        console.log('BROWSER:', msg.text());
        testResults.push(msg.text());
    });

	try{
    	const resp = await page.goto('http://localhost:8080/' + entryPath);
        // check the http response code to figure out if the static server returned the response or not
        if(resp.status() !== 200){
            throw new Error('Failed to load the entry page');
        }
		console.log('🙂 went to index.html')
	} catch (error) {
		console.log(error)
		staticServerInstance.close(() => {
			console.log('Static server closed');
		});
        throw(error)
	}

	try{
    	await page.waitForFunction(() => 
    		document.querySelector('.jasmine-duration')?.textContent.includes('finished')
  		);
	} catch (error) {
		console.log(error)
		staticServerInstance.close(() => {
			console.log('Static server closed');
		});
	}

	console.log('🙂 jasmine painted score')

  	const jasmineResults = await page.evaluate(() => {
		return document.querySelector('.jasmine-bar').textContent
  	});

	console.log('🙂 got the test suite')

	return {browser, jasmineResults}
}

function extractSpecsAndFailures(summary) {
    const specsRegex = /(\d+)\s+spec(s?)/;
    const failuresRegex = /(\d+)\s+failure(s?)/;

    const specsMatch = summary.match(specsRegex);
    const failuresMatch = summary.match(failuresRegex);

    const result = {
        success: parseInt(specsMatch) - parseInt(failuresMatch),
        failures: parseInt(failuresMatch)
    };
    return result;
}

const cleanUpDir = async (dirPath, zipPath) => {
    await fs.promises.rm(dirPath, { recursive: true, force: true });
    console.log(`Removed directory: ${dirPath}`);

    // Remove the zip file
    await fs.promises.rm(zipPath, {recursive: true, force: true});
    console.log(`Removed file: ${zipPath}`);
}

const _installDependencies = async (path) => {
    return new Promise((resolve, reject) =>{
        let isRejected = false
        const npmInstall = spawn('npm', ['install'], { cwd: path });

        let stdout = ''
        npmInstall.stdout.on('data', (data) => {
            stdout += data.toString()
        })

        let stderr = ''
        npmInstall.stderr.on('data', (data) => {
            stderr += data.toString()
        })

        npmInstall.on('exit', (code) => {
            console.log(`npm install exited with code ${code}`)
        })

        npmInstall.on('close', (code) => {
            console.log(`npm install closed with code ${code}`);
            if(code === 0) {
                resolve()
            } else {
                if(!isRejected) {
                    reject(new Error('Failed to install dependencies'))
                    isRejected = true
                }
            }
        })

        npmInstall.on('error', (err) => {
            console.error('Failed to start npm install process:', err);
            if(!isRejectionHandled) {
                reject(err);
                isRejectionHandled = true
            }
        });
    })
}

const _startJamsmineServer = async () => {
    return new Promise((resolve, reject)=>{ 
        const jasmineServer = spawn('npm', ['run', 'test:serve'], {cwd: WORKING_DIR, detached: true});
        let isRejected = false

        let stdout = ''
        jasmineServer.stdout.on('data', (data) => {
            const output = data.toString();
            stdout += output;
            console.log(output);

            // check if the default port is already getting used, in that case we might have to switch
            if (output.includes('Jasmine server is running here')) {
                console.log('Jasmine server is up and running.');
                resolve(jasmineServer);
            }
        });
        let stderr =''
        jasmineServer.stderr.on('data', (data) => {
            stderr += data.toString()
            console.log(data.toString())
        });

        jasmineServer.on('error', (err) => {
            console.error('Failed to start jasmine server:', err);
            if(!isRejected) {
                reject(err);
                isRejected = true
            }
        })
        
        jasmineServer.on('close', (code) => {
            if(code !== 0) {
                if(!isRejected) {
                    reject(new Error('Failed to start jasmine server'))
                    isRejected = true
                }
            }
        })

        jasmineServer.on('exit', (code) => {
            console.log(`Jasmine server exited with code ${code}`)
        })
        
    })
}


const _runTests2 = async (jasmineServer, entryPath) => {
    const browser = await puppeteer.launch({ 
        executablePath: '/usr/bin/chromium', 
        args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    let testResults = [];

	page.on('request', request => {
		console.log(`Request: ${request.url()} - ${request.method()}`);
	});
	page.on('response', response => {
		if (!response.ok()) {
			console.log(`Failed response: ${response.url()} - ${response.status()} ${response.statusText()}`);
		}
	});
	page.on('requestfailed', request => {
        console.log(`Failed request: ${request.url()} - ${request.failure().errorText}`);
    });
    page.on('console', msg => {
        console.log('BROWSER:', msg.text());
        testResults.push(msg.text());
    });

    let jasmineResults
	try{
    	const resp = await page.goto('http://localhost:8888/' + entryPath);
        if(resp.status() !== 200){
            throw new Error('Failed to load the entry page');
        }
		console.log('🙂 went to index.html')

        await page.waitForFunction(() => 
            document.querySelector('.jasmine-duration')?.textContent.includes('finished')
        );

        console.log('🙂 jasmine painted score')

        jasmineResults = await page.evaluate(() => {
          return document.querySelector('.jasmine-bar').textContent
        });
	} catch (error) {
		console.log(error)
        process.kill(-jasmineServer.pid);
        throw(error)
	}

	console.log('🙂 got the test suite')

	return {browser, jasmineResults}
}

const _executeMultiFile = async (req, res, response) => {
    try {
        let timeTakenLog = ''
        let previousTime = Date.now()

        const fileLocalPath = await _getSubmission(req.url, SUBMISSION_FILE_DOWNLOAD_PATH)
        if(!fileLocalPath) {
            response.output = 'Failed to download submission';
            response.statusCode = 404;
            response.message = 'Failed to download submission';
            return response;
        }
        let timeDiff = Date.now() - previousTime
        previousTime = Date.now()
        timeTakenLog = timeTakenLog + `\nTime taken to download submission : ${timeDiff} ms`

        await _unzipSubmission(fileLocalPath, WORKING_DIR)
        timeDiff = Date.now() - previousTime
        previousTime = Date.now()
        timeTakenLog = timeTakenLog + `\nTime taken to unzip submission : ${timeDiff} ms`
    
        let browser
        let jasmineResults
        if(req.isJasmineStandAlone){
            const staticServerInstance = await _startStaticServer(STATIC_SERVER_PATH)
            let values = await _runTests(staticServerInstance, req.path)
            browser = values.browser
            jasmineResults = values.jasmineResults
            staticServerInstance.close(() => {
                console.log('Static server closed');
            });
            await browser.close();
        } else {
            if(fs.existsSync(WORKING_DIR + 'package.json')){
                await _installDependencies(WORKING_DIR)
                timeDiff = Date.now() - previousTime
                previousTime = Date.now()
                timeTakenLog = timeTakenLog + `\nTime taken to install dependencies : ${timeDiff} ms`
            }
            const jasmineServer = await _startJamsmineServer()
            timeDiff = Date.now() - previousTime
            previousTime = Date.now()
            timeTakenLog = timeTakenLog + `\nTime taken to build files and start jasmine-browser-runner : ${timeDiff} ms`

            // await sleep(60000)
            let values = await _runTests2(jasmineServer, req.path)
            timeDiff = Date.now() - previousTime
            previousTime = Date.now()
            timeTakenLog = timeTakenLog + `\nTime taken to start puppeteer with browser inside and scrape test result : ${timeDiff} ms`

            browser = values.browser
            jasmineResults = values.jasmineResults
            process.kill(-jasmineServer.pid);
            await browser.close();
        }
    
        const result = extractSpecsAndFailures(jasmineResults)
    
        await cleanUpDir(WORKING_DIR, SUBMISSION_FILE_DOWNLOAD_PATH)

        timeDiff = Date.now() - previousTime
        previousTime = Date.now()
        timeTakenLog = timeTakenLog + `\nTime taken to clean up resources, parse, results, and clean up files : ${timeDiff} ms`
        console.log(`🚀🚀 \n${timeTakenLog}`)
    
        response.output = result
        response.statusCode = 200
        response.message = "Tests completed"
        return response
    } catch (err) {
        console.log(err)
        throw(new Error('Error in running multifile submission'))
    }
}

module.exports = { execute }
