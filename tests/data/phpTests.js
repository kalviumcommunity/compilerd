const phpTests = [
  {
    name: "php : print user ID and username",
    reqObject: {
      language: "php",
      script:
        "<?php\n" +
        "class User {\n" +
        "    public $id;\n" +
        "    public $username;\n" +
        "    public function __construct($id, $username) {\n" +
        "        $this->id = $id;\n" +
        "        $this->username = $username;\n" +
        "    }\n" +
        "}\n" +
        "$user = new User(1, 'john_doe');\n" +
        'echo "User ID: {$user->id}, Username: {$user->username}\\n";\n',
    },
    expectedResponse: {
      val: "User ID: 1, Username: john_doe\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "php : calculate square of a number",
    reqObject: {
      language: "php",
      script: "<?php\n" + "$number = 5;\n" + "$square = $number * $number;\n" + 'echo "Square of {$number} is: {$square}\\n";\n',
    },
    expectedResponse: {
      val: "Square of 5 is: 25\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "php : print stdin",
    reqObject: {
      language: "php",
      script: "<?php\n" + "$input = readline();\n" + "echo $input;\n",
      stdin: "1 2 3 php test input",
    },
    expectedResponse: {
      val: "1 2 3 php test input",
      status: 200,
      error: 0,
    },
  },
];

module.exports = phpTests;
