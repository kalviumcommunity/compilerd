const pythonTests = require("./pythonTests");
const nodeTests = require("./nodeTests");
const cppTests = require("./cppTests");
const javaTests = require("./javaTests");
const rubyTests = require("./rubyTests");
const cTests = require("./cTests");
const openAiTests = require("./openAiTests");

const testCases = [
  ...pythonTests,
  ...nodeTests,
  ...cppTests,
  ...javaTests,
  ...rubyTests,
  ...cTests,
  ...openAiTests,
];

module.exports = { testCases };
