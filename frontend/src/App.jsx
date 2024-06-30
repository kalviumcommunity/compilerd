import { useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import './App.css';

import { languageMap } from "./utils/languageMap";
import { runCode } from "./utils/api";
import Navbar from "./components/Navbar";

function App() {
  const [theme, setTheme] = useState("light");
  const [value, setValue] = useState({
    language: "PYTHON",
    script: `print("Made by Abhinandan")`,
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
    dispValue: "",
    errorMessage: "",
    isLoading: false,
  });

  const onCodeChange = useCallback((val, type = "script") => {
    if (type === "script") {
      setValue((prev) => ({ ...prev, script: val }));
    } else {
      setValue((prev) => ({ ...prev, language: val }));
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  async function onCodeRun() {
    if (!value.script) {
      setValue((prev) => ({
        ...prev,
        dispValue: "Enter your code to run",
      }));
      return;
    }
    setValue((prev) => ({ ...prev, isLoading: true, dispValue: "" }));
    const data = {
      language: value.language.toLowerCase(),
      script: value.script,
    };
    try {
      const response = await runCode(data);
      setValue((prev) => ({ ...prev, ...response, isLoading: false }));
    } catch (error) {
      setValue((prev) => ({
        ...prev,
        errorMessage: error.message,
        isLoading: false,
        dispValue: "",
      }));
    }
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Navbar
        value={value}
        handleOnChange={onCodeChange}
        handleOnRun={onCodeRun}
        toggleTheme={toggleTheme}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-4">
        <CodeMirror
          value={value.script}
          className={`w-full code-editor ${theme === "dark" ? "code-editor-dark" : "code-editor-light"}`}
          height="500px"
          extensions={[languageMap[value.language]]}
          onChange={(val, viewUpdate) => onCodeChange(val)}
          theme={theme}
        />
        <CodeMirror
          value={value.dispValue}
          className={`w-full`}
          height="500px"
          theme={theme}
          basicSetup={false}
        />
      </div>
    </div>
  );
}

export default App;
