export const files = {
  C: {
    name: "main.c",
    language: "c",
    value: `#include<stdio.h>\nint main(){\n\tprintf("Hello World");\n\treturn 0;\n}`,
  },
  CPP: {
    name: "main.cpp",
    language: "cpp",
    value: `#include<bits/stdc++.h>\n\nint main(){\n\tstd::cout<<"Hello World";\n\treturn 0;\n}`,
  },
  Java: {
    name: "Solution.java",
    language: "java",
    value: `class Solution{\n\tpublic static void main(String[] args){\n\t\tSystem.out.println("Hello World");\n\t}\n}`,
  },
  nodejs: {
    name: "index.js",
    language: "javascript",
    value: `console.log("Hello World");`,
  },
  Python: {
    name: "script.py",
    language: "python",
    value: `print("Hello World");`,
  },
  Ruby:{
    name: "script.rb",
    language: "ruby",
    value: "puts 'Hello World'",
  },
  Promptv1:{
    name: "prompt.txt",
    language: "promptv1",
    value: "The question is what is 2 plus 2. The answer given is 4.",
  },
  Promptv2:{
    name: "prompt.txt",
    language: "promptv2",
    value: "The question is what is 2 plus 2. The answer given is 4.",
  }
};
