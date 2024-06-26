const javaTests = [
  {
    name: "java : print stdin",
    reqObject: {
      language: "java",
      script:
        "import java.util.Scanner;\n" +
        "public class Solution {\n" +
        "    public static void main(String[] args) {\n" +
        '        System.out.println("hello world");\n' +
        "    }\n" +
        "}\n",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "java : print stdin",
    reqObject: {
      language: "java",
      script:
        "import java.util.Scanner;\n" +
        "public class Solution {\n" +
        "    public static void main(String[] args) {\n" +
        "        Scanner scanner = new Scanner(System.in);\n" +
        "        while (scanner.hasNextInt()) {\n" +
        "            int number = scanner.nextInt();\n" +
        "            System.out.println(number);\n" +
        "        } \n" +
        "        scanner.close();\n" +
        "    }\n" +
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

module.exports = javaTests;
