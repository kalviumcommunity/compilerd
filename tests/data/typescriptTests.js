const typescriptTests = [
  {
    name: "typescript : calculate square of a number",
    reqObject: {
      language: "typescript",
      script: "const number: number = 5;\n" + "const square: number = number * number;\n" + "console.log(`Square of ${number} is: ${square}`);\n",
    },
    expectedResponse: {
      val: "Square of 5 is: 25\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "typescript : create custom data type",
    reqObject: {
      language: "typescript",
      script:
        "interface User {\n" +
        "    id: number;\n" +
        "    username: string;\n" +
        "}\n" +
        "const user: User = { id: 1, username: 'john_doe' };\n" +
        "console.log(`User ID: ${user.id}, Username: ${user.username}`);\n",
    },
    expectedResponse: {
      val: "User ID: 1, Username: john_doe\n",
      status: 200,
      error: 0,
    },
  },
];

module.exports = typescriptTests;
