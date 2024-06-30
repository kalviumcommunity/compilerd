/* globals gc */
// services/executeService.js (hypothetical file name)
const { exec } = require('child_process');

const executeCode = (language, script) => {
  return new Promise((resolve, reject) => {
    let command;
    switch (language) {
      case 'c':
        command = `echo "${script}" | gcc -o /tmp/a.out -xc - && /tmp/a.out`;
        break;
      case 'cpp':
        command = `echo "${script}" | g++ -o /tmp/a.out -xc++ - && /tmp/a.out`;
        break;
      case 'python':
        command = `python -c "${script}"`;
        break;
      case 'java':
        command = `echo "${script}" > /tmp/Main.java && javac /tmp/Main.java && java -cp /tmp Main`;
        break;
      case 'nodejs':
        command = `node -e "${script}"`;
        break;
      case 'ruby':
        command = `ruby -e "${script}"`;
        break;
      default:
        return reject(new Error('Unsupported language'));
    }
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};


module.exports = { execute }
