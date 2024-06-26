const nodeTests = [
  {
    name: "nodejs : hello world",
    reqObject: {
      language: "nodejs",
      script: "console.log('hello world')",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "nodejs : print stdin",
    reqObject: {
      language: "nodejs",
      script:
        "process.stdin.setEncoding('utf8'); \n " + "process.stdin.on('data', (input) => { \n " + "  console.log(input); \n " + " \n " + "}); \n ",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1 2 3\n",
      status: 200,
      error: 0,
    },
  },

  {
    name: "nodejs : TLE test",
    reqObject: {
      language: "nodejs",
      script: "for(let i=0 ; ; ){i++}",
    },
    expectedResponse: {
      val: "Time limit exceeded",
      status: 200,
      error: 1,
    },
  },
  {
    name: "nodejs : NaN Handling",
    reqObject: {
      language: "nodejs",
      script: "console.log(1 / 'a');",
    },
    expectedResponse: {
      val: "NaN\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "nodejs : Asynchronous Example",
    reqObject: {
      language: "nodejs",
      script: "setTimeout(() => { console.log('Delayed Hello World'); }, 1000);",
    },
    expectedResponse: {
      val: "Delayed Hello World\n",
      status: 200,
      error: 0,
    },
  },
];

module.exports = nodeTests;
