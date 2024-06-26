const cppTests = [
  {
    name: "cpp : hello world",
    reqObject: {
      language: "cpp",
      script: "#include<bits/stdc++.h>\n" + "using namespace std;\n" + "int main(){\n" + '    cout << "hello world";\n' + "return 0;\n" + "}\n",
    },
    expectedResponse: {
      val: "hello world",
      status: 200,
      error: 0,
    },
  },
  {
    name: "cpp : print stdin",
    reqObject: {
      language: "cpp",
      script:
        "#include<bits/stdc++.h>\n\n" +
        "using namespace std;\n" +
        "int main(){\n\n" +
        "    int a;\n" +
        "    while(cin >> a){\n" +
        "        cout << a << endl;\n" +
        "    }\n" +
        "    return 0;\n\n" +
        "}\n",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1\n2\n3\n",
      status: 200,
      error: 0,
    },
  },
];

module.exports = cppTests;
