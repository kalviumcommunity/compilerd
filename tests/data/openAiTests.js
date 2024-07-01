const openAiTests = [
    {
    name: "OPEN AI test promptv1",
    reqObject: {
      language: "promptv1",
      question: "What is 2 plus 2?",
      userAnswer: "4",
    },
    expectedResponse: {
      val: {},
      status: 200,
      error: 0,
    },
  },
  {
    name: "OPEN AI test promptv2",
    reqObject: {
      language: "promptv2",
      question: "What is 2 plus 2?",
      userAnswer: "4",
    },
    expectedResponse: {
      val: {},
      status: 200,
      error: 0,
    },
  },
];

module.exports = openAiTests;