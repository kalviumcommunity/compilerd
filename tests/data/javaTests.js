const javaTests = [
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
  {
    name: "java : sum of integers",
    reqObject: {
      language: "java",
      script:
        "import java.util.Scanner;\n" +
        "public class Solution {\n" +
        "    public static void main(String[] args) {\n" +
        "        Scanner scanner = new Scanner(System.in);\n" +
        "        int sum = 0;\n" +
        "        while (scanner.hasNextInt()) {\n" +
        "            int number = scanner.nextInt();\n" +
        "            sum += number;\n" +
        "        } \n" +
        "        System.out.println(sum);\n" +
        "        scanner.close();\n" +
        "    }\n" +
        "}\n",
      stdin: "10 20 30",
    },
    expectedResponse: {
      val: "60\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "java : factorial of a number",
    reqObject: {
      language: "java",
      script:
        "import java.util.Scanner;\n" +
        "public class Solution {\n" +
        "    public static void main(String[] args) {\n" +
        "        Scanner scanner = new Scanner(System.in);\n" +
        "        int number = scanner.nextInt();\n" +
        "        int factorial = 1;\n" +
        "        for (int i = 2; i <= number; i++) {\n" +
        "            factorial *= i;\n" +
        "        }\n" +
        "        System.out.println(factorial);\n" +
        "        scanner.close();\n" +
        "    }\n" +
        "}\n",
      stdin: "5",
    },
    expectedResponse: {
      val: "120\n",
      status: 200,
      error: 0,
    },
  },
];

module.exports = javaTests;
