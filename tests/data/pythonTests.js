const pythonTests = [
  {
    name: "python : hello world",
    reqObject: {
      language: "python",
      script: "print('hello world')",
    },
    expectedResponse: {
      val: "hello world\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "python : print stdin",
    reqObject: {
      language: "python",
      script:
        "try:\n" +
        "    while(True):\n" +
        "        line = input()\n" +
        "        if not line:\n" +
        "            break\n" +
        "        print(line)\n" +
        "except EOFError:\n" +
        "    pass",
      stdin: "1 2 3",
    },
    expectedResponse: {
      val: "1 2 3\n",
      status: 200,
      error: 0,
    },
  },
  {
    name: "python : MLE test",
    reqObject: {
      language: "python",
      script: "one_gb_data = bytearray(1000 * 1024 * 1024)",
    },
    expectedResponse: {
      val: "Memory limit exceeded",
      status: 200,
      error: 1,
    },
  },
  {
    name: "python : MLE test 2",
    reqObject: {
      language: "python",
      script:
        "import time\n" +
        "def consume_memory(target_mb, duration_sec):\n" +
        "    float_size = 8\n" +
        "    floats_per_mb = (1024 * 1024) // float_size\n" +
        "    total_floats = target_mb * floats_per_mb\n" +
        "    iterations = int(duration_sec / 0.1)\n" +
        "    floats_per_iteration = total_floats // iterations\n" +
        "    memory_hog = []\n" +
        "    for _ in range(iterations):\n" +
        "        memory_hog.extend([0.0] * floats_per_iteration)\n" +
        "        time.sleep(0.1)\n" +
        "consume_memory(1000, 1)\n",
    },
    expectedResponse: {
      val: "Memory limit exceeded",
      status: 200,
      error: 1,
    },
  },
  {
    name: "python : MLE test 3",
    reqObject: {
      language: "python",
      script: "a = [100]\n" + "for i in a:\n" + "    a.append(i)\n",
    },
    expectedResponse: {
      val: "Memory limit exceeded",
      status: 200,
      error: 1,
    },
  },
  {
    name: "python : Large Integer Calculation",
    reqObject: {
      language: "python",
      script: "print(2 ** 1000)",
    },
    expectedResponse: {
      val: "10715086071862673209484250490600018105614048117055336074437503883703510511249361224931983788156958581275946729175531468251871452856923140435984577574698574803934567774824230985421074605062371141877954182153046474983581941267398767559165543946077062914571196477686542167660429831652624386837205668069376\n",
      status: 200,
      error: 0,
    },
  },
];

module.exports = pythonTests;