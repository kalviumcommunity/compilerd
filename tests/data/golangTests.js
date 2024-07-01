const golangTests = [
  {
    name: "go : print stdin",
    reqObject: {
      language: "go",
      script: "package main\n" + 'import "fmt"\n' + "func main() {\n" + '    fmt.Println("hello world")\n' + "}\n",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "go : calculate sum",
    reqObject: {
      language: "go",
      script: "package main\n" + 'import "fmt"\n' + "func main() {\n" + "    a := 5\n" + "    b := 7\n" + "    fmt.Println(a + b)\n" + "}\n",
    },
    expectedResponse: {
      val: "12\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "go : read and print input",
    reqObject: {
      language: "go",
      script:
        'package main\nimport "fmt"\nimport "os"\nimport "bufio"\nfunc main() {\n    reader := bufio.NewReader(os.Stdin)\n    fmt.Print("Enter text: ")\n    text, _ := reader.ReadString(\'\\n\')\n    fmt.Println(text)\n}\n',
      stdin: "Hello, Golang!\n",
    },
    expectedResponse: {
      val: "Enter text: Hello, Golang!\n\n",
      status: 200,
      error: 0,
    },
  },
];

module.exports = golangTests;
