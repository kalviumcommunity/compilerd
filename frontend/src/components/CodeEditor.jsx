import { useState, useEffect } from "react";
import { SiPython, SiC, SiRuby, SiGo, SiCsharp } from "react-icons/si";
import { TbBrandCpp, TbBrandKotlin } from "react-icons/tb";
import { IoLogoJavascript } from "react-icons/io5";
import { FaJava } from "react-icons/fa";
import codeSnippets from "./codeSnippets";

function CodeEditor() {
  const snippets = codeSnippets;

  const languageIcons = {
    cpp: TbBrandCpp,
    c: SiC,
    java: FaJava,
    python: SiPython,
    ruby: SiRuby,
    nodejs: IoLogoJavascript,
    go: SiGo,
    "c#": SiCsharp,
    kotlin: TbBrandKotlin,
  };

  const [code, setCode] = useState(snippets.cpp);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [loading, setLoading] = useState(false);

  const handleRunCode = async () => {
    // Assuming here you want to send 'code' to the backend
    await setLoading(true);
    await sendCodeToBackend(code);
    await setLoading(false);
  };

  const sendCodeToBackend = async (code) => {
    let reqbody;
    if (input === "") {
      reqbody = {
        language: selectedLanguage,
        script: code,
      };
    } else {
      reqbody = {
        language: selectedLanguage,
        script: code,
        stdin: input,
      };
    }
    try {
      const response = await fetch("http://localhost:3000/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqbody),
      });
      if (!response.ok) {
        throw new Error("Failed to send code to backend");
      }

      await setError(false);

      const result = await response.json();
      console.log(result);
      const output = result.output || "";
      const compileMessage = result.compile_message || "";
      if (compileMessage !== "") {
        setError(true);
      }
      const formattedOutput = output + compileMessage;

      setOutput(formattedOutput);
    } catch (error) {
      console.error("Error sending code to backend:", error.message);
      setOutput("Error executing code. Please try again.");
    }
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setCode(snippets[language]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.ctrlKey) {
      handleRunCode();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [code, input, selectedLanguage]);

  return (
    <div className="flex h-screen bg-slate-900 text-gray-100">
      <aside className="w-16 md:w-1/6 bg-slate-800 p-4">
        <h1 className="text-xl font-bold mb-4 text-teal-500 hidden md:block">
          Languages
        </h1>
        <ul>
          {Object.keys(snippets).map((language) => {
            const IconComponent = languageIcons[language];
            return (
              <li key={language} className="mb-2 flex items-center">
                <button
                  className={`w-full flex items-center justify-center md:justify-start p-2 rounded-xl transition-colors duration-200 ${
                    selectedLanguage === language
                      ? "bg-teal-600 text-white"
                      : "hover:bg-slate-500"
                  }`}
                  onClick={() => handleLanguageChange(language)}
                >
                  {IconComponent && (
                    <IconComponent className="text-xl md:mr-2" />
                  )}
                  <span className="hidden md:inline">
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
      <main className="flex-1 flex flex-col p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-teal-500">
            Online {selectedLanguage.toUpperCase()} Compiler
            <p className="text-xs text-gray-500">
              {" "}
              (Ctrl + Enter) to run the code
            </p>
          </h2>

          <button
            id="run-button"
            className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-lg transition-colors duration-200 shadow-lg"
            onClick={handleRunCode}
          >
            {loading ? "Loading...." : "Run Code"}
          </button>
        </div>
        <textarea
          id="code-editor"
          className="flex-1 bg-slate-800 text-gray-100 p-4 rounded-lg mb-4 resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="flex w-full ">
          <div
            className="flex-3 m-1 bg-slate-800 text-gray-100 p-4 rounded-lg overflow-y-auto resize-vertical focus:ring-2 focus:ring-teal-500 focus:outline-none"
            style={{
              resize: "vertical",
              minHeight: "100px",
              maxHeight: "250px",
            }}
          >
            <h3 className="text-lg font-semibold mb-2 text-teal-300">Input:</h3>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-slate-800 text-gray-100 p-4 rounded-lg mb-4 resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
            ></textarea>
          </div>
          <div
            id="output"
            className="flex-1 m-1 bg-slate-800 text-gray-100 p-4 rounded-lg overflow-y-auto resize-vertical focus:ring-2 focus:ring-teal-500 focus:outline-none"
            style={{
              resize: "vertical",
              minHeight: "100px",
              maxHeight: "250px",
            }}
          >
            <h3 className="text-lg font-semibold mb-2 text-teal-300">
              Output:
            </h3>
            <pre
              className={`whitespace-pre-wrap break-words ${
                error ? "text-red-500" : ""
              }`}
            >
              {output}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CodeEditor;
