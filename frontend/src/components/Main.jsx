/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { compileCode } from "../utils/helpers";
import { files } from "../constants/files";

const Main = () => {
  const [expanded, setExpanded] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("C");
  const file = files[selectedLanguage];
  const [code, setCode] = useState(file.value);
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState();
  const [showOutput, setShowOutput] = useState(false);
  const editorRef = useRef(null);
  const [textAreaPlaceholder, setTextAreaPlaceholder] = useState(
    "Enter input values separated by comma(,)..."
  );

  const handleCompilation = async () => {
    setCode(getEditorValue());
    const result = await compileCode(
      selectedLanguage.toLowerCase(),
      code,
      inputValue
    );
    setOutput(result !== undefined ? result.toString() : "No output");
    setShowOutput(true);
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function getEditorValue() {
    return editorRef.current.getValue();
  }

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    if (language == "Promptv1" || language == "Promptv2") {
      setTextAreaPlaceholder("Enter your answer...");
    }
    setSelectedLanguage(language);
    setCode(files[language]?.value);
    setShowOutput(false);
  };

  return (
    <main className={`w-full  font-primary`}>
      <section className="editor w-4/5 lg:w-3/5 mx-auto my-2 ">
        <div className="controls w-full flex justify-end gap-4 py-2 px-4 text-gray-300 bg-shadowBlack text-right">
          {expanded ? (
            <FaChevronUp
              onClick={() => setExpanded(false)}
              className="cursor-pointer hover:opacity-70"
            />
          ) : (
            <FaChevronDown
              onClick={() => setExpanded(true)}
              className="cursor-pointer hover:opacity-70"
            />
          )}
        </div>
        {expanded && (
          <>
            <div className="languages flex justify-between border-b-2 border-black">
              <select
                name="language"
                id="language"
                className="bg-shadowBlack text-primaryWhite outline-none border-2 border-primaryWhite"
                onChange={(e) => handleLanguageChange(e)}
              >
                <option value="C">C</option>
                <option value="CPP">C++</option>
                <option value="Java">Java</option>
                <option value="nodejs">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Ruby">Ruby</option>
                <option value="Promptv1">Promptv1</option>
                <option value="Promptv2">Promptv2</option>
              </select>
              <button
                className="uppercase bg-shadowBlack text-primaryWhite px-4 border-2 border-primaryWhite"
                onClick={() => setShowOutput(true)}
              >
                output
              </button>
              <button
                className="uppercase bg-shadowBlack text-primaryWhite px-4 border-2 border-primaryWhite"
                onClick={handleCompilation}
              >
                run
              </button>
            </div>
            {showOutput ? (
              <div className="w-full h-[60vh] bg-[#1e1f1f] border-2 border-black text-primaryWhite">
                <h3>Output:</h3>
                <br />
                <p>{output}</p>
              </div>
            ) : (
              <div className="codeEditor w-full border-2 border-black">
                <Editor
                  height="50vh"
                  width="100%"
                  theme="vs-dark"
                  onMount={handleEditorDidMount}
                  path={file.name}
                  defaultLanguage={file.language}
                  defaultValue={file.value}
                  onChange={() => setCode(getEditorValue())}
                />
                <div className="w-full h-full border-t-2 border-primaryWhite  flex justify-center items-center">
                  <textarea
                    name="input"
                    id="input"
                    rows={4}
                    placeholder={textAreaPlaceholder}
                    className="w-full outline-none border-none"
                    onChange={(e) => setInputValue(e.target.value)}
                  ></textarea>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Main;
