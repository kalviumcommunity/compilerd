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

const setPermissions = (path) => {
    exec(`chmod -R 777 ${path}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error setting permissions: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`Error output: ${stderr}`);
        }
        console.log('Permissions set to 777 for all files and directories');
    });
};

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
	const destFileName = destPath;

	const {Storage} = require('@google-cloud/storage');

	const storage = new Storage();
	async function downloadFile() {
	  const options = {
	    destination: destFileName,
	  };

	  await storage.bucket(bucketName).file(fileName).download(options);

	  console.log(
	    `gs://${bucketName}/${fileName} downloaded to ${destFileName}.`
	  );
	}

	// downloadFile().catch(console.error);
	try{
		await downloadFile()
	} catch (error) {
		console.log(error)
	}
}

// const _unzipSubmission = async (submissionFile) => {
// 	try {
//         // Ensure the path to the zip file exists and it's a file not a directory
//         const stats = await fs.promises.stat(submissionFile);
//         if (!stats.isFile()) {
//             throw new Error('The provided path does not point to a file.');
//         }

//         // Create a read stream from the zip file
//         const zipStream = fs.createReadStream(submissionFile);

//         // Create a directory for the unzipped files, if needed
//         // const outputDir = submissionFile.replace(/\.zip$/, ''); // Removes '.zip' and uses the name as the directory
// 		const outputDir = './submission/';
//         if (!fs.existsSync(outputDir)) {
//             await fs.promises.mkdir(outputDir);
//         }

//         // Pipe the read stream into the unzipper which extracts the files to the output directory
//         await zipStream
//             .pipe(unzipper.Extract({ path: outputDir }))
//             .promise();

//         console.log(`Unzipped files to ${outputDir}`);
//     } catch (error) {
//         console.error('Failed to unzip the file:', error);
//     }
// }

const _unzipSubmission = async (submissionFile) => {
	try {
        // Ensure the path to the zip file exists and it's a file not a directory
        const stats = await fs.promises.stat(submissionFile);
        if (!stats.isFile()) {
            throw new Error('The provided path does not point to a file.');
        }

        // Define the output directory
        const outputDir = './submission';

        // Create the directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            await fs.promises.mkdir(outputDir, { recursive: true });
        }

        // Build the unzip command
        const command = `unzip -o "${submissionFile}" -d "${outputDir}"`;

        // Execute the unzip command
        const { stdout, stderr } = await exec(command);
        console.log('stdout:', stdout);
        console.error('stderr:', stderr);

        console.log(`Unzipped files to ${outputDir}`);
    } catch (error) {
        console.error('Failed to unzip the file:', error);
    }
}

const _startStaticServer = async () => {
	const submissionDir = './submission/';
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

const _runTests = async (staticServerInstance) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Redirect console output from the browser to Node.js console
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

    // Load the HTML file with Jasmine and the tests
    // await page.goto('https://expressjs.com/en/api.html');
	try{
    	await page.goto('http://localhost:8080/index.html');
		console.log('🙂 went to index.html')
	} catch (error) {
		console.log(error)
		staticServerInstance.close(() => {
			console.log('Static server closed');
		});
	}

	try{
    	await page.waitForFunction(() => 
    		document.querySelector('.jasmine-duration')?.textContent.includes('finished') // Assuming '.jasmine-overall-result' gets updated with 'finished'
  		);
	} catch (error) {
		console.log(error)
		staticServerInstance.close(() => {
			console.log('Static server closed');
		});
	}

	console.log('🙂 jasmine painted score')

  	const jasmineResults = await page.evaluate(() => {
    	// const suites = [...document.querySelectorAll('.jasmine-suite')];
    	// return suites.map(suite => {
    	//   	const id = suite?.id;
    	//   	const specs = suite.querySelectorAll('.jasmine-specs');
    	//   	return { id, specs };
    	// });

		return document.querySelector('.jasmine-bar').textContent
  	});

	console.log('🙂 got the test suite')

	return {browser, jasmineResults}

    // await page.screenshot({ path: 'screenshot.png' });

    // Optionally wait for the tests to complete
    // await page.waitForT // Adjust this timeout based on the expected test duration
}

function extractSpecsAndFailures(summary) {
	console.log('😇 summary')
	console.log(summary)
    // Regular expression to match numbers before the words "specs" and "failures"
    const specsRegex = /(\d+)\s+spec(s?)/;
    const failuresRegex = /(\d+)\s+failure(s?)/;

    // Extract the numbers using the regular expressions
    const specsMatch = summary.match(specsRegex);
    const failuresMatch = summary.match(failuresRegex);

    // Initialize the result
    const result = {
        success: parseInt(specsMatch) - parseInt(failuresMatch),
        failures: parseInt(failuresMatch)
    };
    return result;
}

const _executeMultiFile = async (req, res,response) => {

	await _getSubmission(req.url, req.path)
	// mkdir /submission
	await _unzipSubmission(req.path)
	setPermissions('./submission/')
	const staticServerInstance = await _startStaticServer()
	await sleep(10000)
	const {browser, jasmineResults} = await _runTests(staticServerInstance)


    // const submissionDir = './submission';
    // const staticServer = express();
    // staticServer.use(express.static(submissionDir));
    // const staticServerInstance = http.createServer(staticServer);
    // staticServerInstance.listen(8080, () => console.log('Static file server running on http://localhost:8080'));


    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();

    // // Redirect console output from the browser to Node.js console
    // let testResults = [];
    // page.on('console', msg => {
    //     console.log('BROWSER:', msg.text());
    //     testResults.push(msg.text());
    // });

    // // Load the HTML file with Jasmine and the tests
    // // await page.goto('https://expressjs.com/en/api.html');
    // await page.goto('http://localhost:8080/index.html');
	// console.log('🙂 went to index.html')

    // await page.waitForFunction(() => 
    // 	document.querySelector('.jasmine-duration')?.textContent.includes('finished') // Assuming '.jasmine-overall-result' gets updated with 'finished'
  	// );

	// console.log('🙂 jasmine painted score')

  	// const jasmineResults = await page.evaluate(() => {
    // 	// const suites = [...document.querySelectorAll('.jasmine-suite')];
    // 	// return suites.map(suite => {
    // 	//   	const id = suite?.id;
    // 	//   	const specs = suite.querySelectorAll('.jasmine-specs');
    // 	//   	return { id, specs };
    // 	// });

	// 	return document.querySelector('.jasmine-bar').textContent
  	// });

	// console.log('🙂 got the test suite')


    // // await page.screenshot({ path: 'screenshot.png' });

    // // Optionally wait for the tests to complete
    // // await page.waitForT // Adjust this timeout based on the expected test duration

	staticServerInstance.close(() => {
        console.log('Static server closed');
    });

    await browser.close();

	const result = extractSpecsAndFailures(jasmineResults)

    // Send the collected results back to the client
	response.output = result
	// response.output = 'hello'
	response.statusCode = 200
	response.message = "Tests completed"
    return response
}

module.exports = { execute }
