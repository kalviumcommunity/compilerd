import { useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";

import { langMap } from "./utils/langMap";
import { executeCode } from "./utils/api";
import CodeNav from "./components/CodeNav";

function App() {
  const [value, setValue] = useState({
    language: "JAVASCRIPT",
    script: "console.log('Hello, World!');",
    result: {
      output: "",
      execute_time: null,
      errorMessage: "",
      status_code: 200,
      memory: null,
      cpu_time: null,
      output_files: [],
      compile_message: "",
      error: 0,
    },
    constraints: {
      TLE: 0,
      MLE: 0,
    },
    showValue: "Hello, World!",
    errorMessage: "",
    isLoading: false,
  });

  const onCodeChange = useCallback((val, type = "script") => {
    if (type === "script") {
      setValue((prev) => ({ ...prev, script: val }));
    } else if (type === "language") {
      setValue((prev) => ({ ...prev, language: val }));
    } else if (type === "constraints") {
      setValue((prev) => ({ ...prev, constraints: val }));
    }
  }, []);

  async function onCodeRun() {
    if (!value.script) {
      setValue((prev) => ({ ...prev, showValue: "Please enter some code to run" }));
      return;
    }
    setValue((prev) => ({ ...prev, isLoading: true, showValue: "" }));
    const data = {
      language: value.language.toLowerCase(),
      script: value.script,
      constraints: value.constraints,
    };
    try {
      const response = await executeCode(data);
      setValue((prev) => ({ ...prev, ...response, isLoading: false }));
    } catch (error) {
      setValue((prev) => ({ ...prev, errorMessage: error.message, isLoading: false, showValue: "" }));
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pb-5">
      <div className="flex justify-center items-center flex-col pt-5 pb-2 gap-2">
        <h1 className="text-5xl font-extrabold leading-none">CompilerD</h1>
        <p className="text-lg font-normal text-gray-400">Your Online Code Judge</p>
      </div>
      <CodeNav value={value} handleOnChange={onCodeChange} handleOnRun={onCodeRun} theme={"dark"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-4">
        <CodeMirror
          value={value.script}
          className="w-full"
          height="500px"
          extensions={[langMap[value.language]]}
          onChange={(val, viewUpdate) => onCodeChange(val)}
          theme={"dark"}
        />
        <div>
          <CodeMirror value={value.showValue} className="w-full" height="500px" theme={"dark"} basicSetup={false} />

          <div className="flex items-end justify-end md:justify-start flex-wrap gap-4 font-thin opacity-80 ml-1">
            <span>Time Taken: {value.result.execute_time}ms</span>
            <span>Memory: {value.result.memory}KB</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
