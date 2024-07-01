"use client";
import { useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";

import CodeNav from "@/components/CodeNav";

import { langMap } from "@/lib/langMap";
import { executeCode } from "@/lib/api";

export default function Home() {
  const [value, setValue] = useState({
    language: "Javascript",
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
    <main className="min-h-screen p-4 bg-black text-white flex flex-col gap-4">
      <div className="flex justify-center items-center flex-col pt-5 pb-2 gap-2">
        <h1 className="text-5xl font-extrabold leading-none">CompilerD</h1>
        <p className="text-lg font-normal text-gray-400">Your Online Code Judge</p>
      </div>
      <CodeNav value={value} handleOnChange={onCodeChange} handleOnRun={onCodeRun} theme={"dark"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-4">
        <div>
          <div className="w-full text-center whitespace-nowrap rounded-md rounded-b-none text-sm font-medium border p-2 border-zinc-800 bg-zinc-950 hover:bg-zinc-900 hover:text-zinc-50">
            Editor
          </div>
          <CodeMirror
            value={value.script}
            className="w-full"
            height="500px"
            extensions={[langMap[value.language]]}
            onChange={(val, viewUpdate) => onCodeChange(val)}
            theme={"dark"}
          />
        </div>
        <div>
          <div className="w-full text-center whitespace-nowrap rounded-md rounded-b-none text-sm font-medium border p-2 border-zinc-800 bg-zinc-950 hover:bg-zinc-900 hover:text-zinc-50">
            Output
          </div>
          <CodeMirror value={value.showValue} height="500px" theme={"dark"} basicSetup={false} />
          <div className="flex items-end justify-end flex-wrap gap-4 font-thin opacity-80 mt-1">
            <span>Time Taken: {value.result.execute_time}ms</span>
            <span>Memory: {value.result.memory}KB</span>
          </div>
        </div>
      </div>
    </main>
  );
}
