const cTests = [
  {
    name: "c : hello world",
    reqObject: {
      language: "c",
      script: "#include<stdio.h>\n\n" + "int main(){\n\n" + '    printf("hello world");\n' + "    return 0;\n" + "}\n",
    },
    expectedResponse: {
      val: "hello world",
      status: 200,
      error: 0,
    },
  },
  {
    name: "c : print stdin",
    reqObject: {
      language: "c",
      script:
        "#include <stdio.h>\n" +
        "int main() {\n" +
        "    int number;\n" +
        '    while (scanf("%d", &number) == 1) {\n' +
        '        printf("%d\\n", number);\n' +
        "    } \n" +
        "    return 0;\n" +
        "}",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1\n2\n3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "c : Factorial Calculation",
    reqObject: {
      language: "c",
      script:
        '#include <stdio.h>\nint factorial(int n) {\n  if (n <= 1)\n    return 1;\n  else\n    return n * factorial(n - 1);\n}\nint main() {\n  int num = 5;\n  printf("Factorial of %d is %d\\n", num, factorial(num));\n  return 0;\n}',
    },
    expectedResponse: {
      val: "Factorial of 5 is 120\n",
      status: 200,
      error: 0,
    },
  },
];

module.exports = cTests;