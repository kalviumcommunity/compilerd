const rubyTests = [
  {
    name: "ruby : print hello world",
    reqObject: {
      language: "ruby",
      script: 'print "hello world"',
    },
    expectedResponse: {
      val: "hello world",
      status: 200,
      error: 0,
    },
  },
  {
    name: "ruby : print stdin",
    reqObject: {
      language: "ruby",
      script: "user_input = gets.chomp\n" + "puts user_input",
      stdin: "10\n",
    },
    expectedResponse: {
      val: "10\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "ruby : Fibonacci Sequence",
    reqObject: {
      language: "ruby",
      script: "def fibonacci(n)\n  return n if n <= 1\n  fibonacci(n-1) + fibonacci(n-2)\nend\nputs fibonacci(10)",
    },
    expectedResponse: {
      val: "55\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "ruby : Exception Handling",
    reqObject: {
      language: "ruby",
      script: "begin\n  puts 1 / 0\nrescue ZeroDivisionError => e\n  puts 'Error: Division by zero'\nend",
    },
    expectedResponse: {
      val: "Error: Division by zero\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "ruby : Regular Expressions",
    reqObject: {
      language: "ruby",
      script: "str = 'Hello, world!'\nmatches = str.scan(/\\w+/)\nputs matches.inspect",
    },
    expectedResponse: {
      val: '["Hello", "world"]\n',
      status: 200,
      error: 0,
    },
  },
];

module.exports = rubyTests;
