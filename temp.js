const { Console } = require('console');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// const function1 = async () => {
//     console.log('Start');

//     setTimeout(() => {
//         console.log('Inside setTimeout');
//     }, 20000); // setTimeout will be executed after 2000ms

//     console.log('After setTimeout');

//     await exec('sleep 5'); // Pauses execution for 5 seconds
//     console.log('After first sleep');

//     await exec('sleep 5'); // Pauses execution for another 5 seconds
//     console.log('End');
// }



// const function_2 = async () => {
//     await function1();
//     console.log('out')
// }

// function_2()

// child.on('exit', (code, signal) => {
//     console.log(`Child process exited with code ${code} and signal ${signal}`);
// });

const main = async () => {
    console.log(process.pid)
    // console.log((await exec(`ps -ef | grep ${process.pid}`)).stdout)
    const command_promise = exec('ls')
    console.log('Child process PID:', command_promise.child.pid);
    // console.log(command_promise.child.pid)

    try {
        process.kill(command_promise.child.pid)
    } catch (e) {
        console.log(e)
    }
    console.log('Kill command sent to child process');
    // await new Promise((resolve) => command_promise.child.on('exit', resolve));

    command_promise.child.on('exit', () => {
        console.log('exiting the process')
    })
    // await new Promise(resolve => setTimeout(resolve, 10));

    // console.log((await exec(`ps -ef | grep ${process.pid}`)).stdout)
    try {
        await command_promise
    } catch (e) {
        console.log(e)
    }
    console.log('Child process promise resolved');
}

main()