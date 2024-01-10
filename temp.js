const util = require('util');
const exec = util.promisify(require('child_process').exec);

const function1 = async () => {
    console.log('Start');

    setTimeout(() => {
        console.log('Inside setTimeout');
    }, 20000); // setTimeout will be executed after 2000ms

    console.log('After setTimeout');

    await exec('sleep 5'); // Pauses execution for 5 seconds
    console.log('After first sleep');

    await exec('sleep 5'); // Pauses execution for another 5 seconds
    console.log('End');
}



const function_2 = async () => {
    await function1();
    console.log('out')
}

function_2()