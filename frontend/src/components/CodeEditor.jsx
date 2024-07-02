import { useState, useRef, useEffect } from "react";
import {
  SiPython,
  SiC,
  SiRuby,
  SiGo,
  SiCsharp,
  SiPhp,
  SiPerl,
  SiTypescript,
} from "react-icons/si";
import { RiTerminalBoxFill } from "react-icons/ri";
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
    php: SiPhp,
    bash: RiTerminalBoxFill,
    perl: SiPerl,
    typescript: SiTypescript,
  };

  const [code, setCode] = useState(snippets.cpp);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [loading, setLoading] = useState(false);

  const handleRunCode = async () => {
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
      setError(compileMessage !== "" || output.toLowerCase().includes("error"));
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

  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  useEffect(() => {
    const syncScroll = () => {
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
      }
    };

    textareaRef.current.addEventListener("scroll", syncScroll);
    return () => textareaRef.current.removeEventListener("scroll", syncScroll);
  }, []);

  return (
    <div className="flex h-screen bg-slate-900 text-gray-100">
      <aside className="w-14 md:w-1/6 bg-slate-800 flex flex-col h-screen">
        <h1 className="text-lg font-bold p-3 text-teal-500 hidden md:block">
          Languages
        </h1>
        <div className="overflow-y-auto flex-grow">
          <ul className="p-2">
            {Object.keys(snippets).map((language) => {
              const IconComponent = languageIcons[language];
              return (
                <li key={language} className="mb-1">
                  <button
                    className={`w-full flex items-center justify-center md:justify-start p-2 rounded-lg transition-colors duration-200 ${
                      selectedLanguage === language
                        ? "bg-teal-600 text-white"
                        : "hover:bg-slate-700"
                    }`}
                    onClick={() => handleLanguageChange(language)}
                  >
                    {IconComponent && (
                      <IconComponent className="text-base md:text-lg md:mr-2" />
                    )}
                    <span className="hidden md:inline text-sm">
                      {language.charAt(0).toUpperCase() + language.slice(1)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      {/* <aside className="w-16 md:w-1/6 bg-slate-800 p-4">
        <h1 className="text-xl font-bold mb-4 text-teal-500 hidden md:block">
          Languages
        </h1>
        <div className="overflow-y-auto max-h-screen-3/4">
          <ul>
            {Object.keys(snippets).map((language) => {
              const IconComponent = languageIcons[language];
              return (
                <li key={language} className="mb-2 flex items-center">
                  <button
                    className={`w-full flex items-center justify-center md:justify-start p-1 rounded-xl transition-colors duration-200 ${
                      selectedLanguage === language
                        ? "bg-teal-600 text-white"
                        : "hover:bg-slate-500"
                    }`}
                    onClick={() => handleLanguageChange(language)}
                  >
                    {IconComponent && (
                      <IconComponent className="text-lg md:text-xl md:mr-2" />
                    )}
                    <span className="hidden md:inline">
                      {language.charAt(0).toUpperCase() + language.slice(1)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside> */}
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
        <div className="relative flex-1 mb-4 font-mono text-sm">
          <div
            ref={lineNumbersRef}
            className="absolute left-0 top-0 bottom-0 w-10 bg-slate-700 text-gray-400 text-right pr-2 pt-4 select-none overflow-hidden"
          >
            {code.split("\n").map((_, index) => (
              <div key={index} className="leading-6">
                {index + 1}
              </div>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            id="code-editor"
            className="w-full h-full bg-slate-800 text-gray-100 p-4 pl-12 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none leading-6"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ tabSize: 2 }}
          />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 bg-slate-800 rounded-lg overflow-hidden">
            <div className=" px-4 py-2">
              <h3 className="text-sm font-semibold text-teal-300">Input</h3>
            </div>
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-32 bg-slate-800 text-gray-100 p-4 resize-none focus:ring-1 focus:ring-teal-500 focus:outline-none"
              placeholder="Enter your input here..."
            ></textarea>
          </div>
          <div className="flex-1 bg-slate-800 rounded-lg overflow-hidden">
            <div className=" px-4 py-2">
              <h3 className="text-sm font-semibold text-teal-300">Output</h3>
            </div>
            <pre
              className={`w-full h-32 p-4 overflow-auto whitespace-pre-wrap break-words ${
                error ? "text-red-500" : "text-gray-100"
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
