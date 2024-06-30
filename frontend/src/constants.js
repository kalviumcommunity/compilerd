export const LANGUAGE_VERSIONS = {
    c : "18.15.0",
    cpp : "19.0.8",
    python: "3.10.0",
    java: "15.0.2",
    nodejs: "12.0.8",
    ruby: "12.0.9",
    go : "12.0.9",
    typescript: "5.0.3",
    php: "8.2.3",
  };
  
  export const CODE_SNIPPETS = {
    c: "#include<stdio.h>\n\nint main() {\n\tprintf(\"Hello World\\n\");\n\treturn 0;\n}",
    cpp: "#include<iostream>\nusing namespace std;\n\nint main() {\n\tcout << \"Hello World\" << endl;\n\treturn 0;\n}",
    python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
    java: `public class Solution {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    nodejs: "console.log(\"Hello World\");",
    ruby: "puts \"Hello World\"",
    go: "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tfmt.Println(\"Hello World\")\n}",
    typescript: "type Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log(\"Hello, \" + data.name + \"!\");\n}\n\ngreet({ name: \"Alex\" });\n",
    php: "<?php\n$name = 'Alex';\necho $name;\n?>"
  };
  