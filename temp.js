// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

// const function1 = async () => {
//     let intervalId;
//     try {
//         const first_promise = exec('sleep 5');
//         const child = first_promise.child;

//         intervalId = setInterval(() => {
//             if (child && !child.killed) {
//                 try {
//                     process.kill(child.pid);
//                 } catch (e) {
//                     console.log('Error killing process:', e.message);
//                 }
//             } else {
//                 clearInterval(intervalId);
//             }
//         }, 3000);

//         const result_first = await first_promise;
//     } catch (e) {
//         console.log(e);
//     } finally {
//         if (intervalId) {
//             clearInterval(intervalId);
//         }
//     }
// }

// function1();




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(5000)