import React, { useEffect, useState } from "react";
import axios from "axios";
import MonacoEditor from "react-monaco-editor";
function DataForm() {
  const defaultScripts = {
    nodejs: 'console.log("Hello World")',
    python: 'print("Hello World")',
    java: 'public class Solution {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
  };
  const [language, setLanguage] = useState("nodejs");
  const [script, setScript] = useState(defaultScripts[language]);
  const [output, setOutput] = useState("");
  const [compileroutput, setCompilerOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const executeScript = async () => {
    setOutput("");
    setCompilerOutput("");
    setError("");
    setLoading(true);
    const url = "http://localhost:3000/api/execute/";
    const payload = {
      language: language,
      script: script,
    };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setOutput(response.data.output);
      setCompilerOutput(response.data.compile_message);
      console.log(response.data);
      setError(response.data.error);
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message);
      setOutput("");
    }
    setLoading(false);
  };

  useEffect(() => {
    setScript(defaultScripts[language]);
    setOutput("");
    setCompilerOutput("");
    setError("");
  }, [language]);
  return (
    <div className="h-screen font-Montserrat bg-primary text-accent gap-5 px-10 py-5">
      <div className="flex flex-col gap-5 h-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Compilerd</h1>
            <p className="text-sm">
              Online <span className="text-red-500">code judge</span>
            </p>
          </div>
          <div className="self-end flex gap-3">
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setScript("");
                setOutput("");
                setCompilerOutput("");
                setError("");
              }}
              className="w-max bg-secondary px-5 py-2 rounded-md focus:outline-none font-bold "
            >
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="nodejs">Javascript</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>
            <button
              onClick={executeScript}
              className="w-max px-5 py-2 bg-blue font-medium rounded-md self-end"
            >
              Run
            </button>
          </div>
        </div>
        <MonacoEditor
          width="100%"
          language="javascript"
          theme="vs-dark"
          value={script}
          onChange={(script) => setScript(script)}
        />

        <div className="bg-black p-2 w-full h-1/2 overflow-scroll rounded flex flex-col">
          {loading && <div>Loading...</div>}
          {output && error === 0 && (
            <div>
              <h3 className="text-xl font-bold mb-2 bg-green-500 px-2 rounded">
                Output
              </h3>
              <pre className="ml-3">{output}</pre>
            </div>
          )}
          {output && error === 1 && (
            <div>
              <h3 className="text-xl font-bold mb-2 bg-red-500 px-2 rounded ">
                Output
              </h3>
              <pre className="ml-3">{output}</pre>
            </div>
          )}
          {compileroutput && error === 1 && (
            <div>
              <h3 className="text-xl font-bold mb-2 bg-red-500 px-2 rounded text-wrap">
                Compiler Error
              </h3>
              <pre className="ml-3">{compileroutput}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataForm;
