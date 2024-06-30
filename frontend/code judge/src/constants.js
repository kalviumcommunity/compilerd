export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  c: "11.2.0",
  cpp: "11.2.0",
  python: "3.10.0",
  java: "15.0.2",
  ruby: "3.1.2",
  go: "1.18",
  rust: "1.53.0",
  typescript: "5.0.3",
  promptv2: "gpt-3.5",
};

export const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Sumresh");\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Sumresh")\n`,
  java: `\n//class name should be Solution\npublic class Solution {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Sumresh';\necho $name;\n",
  c: `\n#include <stdio.h>\n\nint main() {\n\tprintf("Hello, Sumresh!\\n");\n\treturn 0;\n}\n`,
  cpp: `\n#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, Sumresh!" << std::endl;\n\treturn 0;\n}\n`,
  ruby: `\nname = "Sumresh"\nputs "Hello, #{name}!"\n`,
  rust: `\nfn main() {\n\tprintln!("Hello, Sumresh!");\n}\n`,
  go: `\npackage main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, Sumresh!")\n}\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Sumresh" });\n`,
  promptv2: `The question is what is 2 plus 2`,
};
