import { useState, useEffect } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import stubs from "./defaultStubs";
import "./App.css";

const editorOptions = {
    scrollBeyondLastLine: false,
    fontSize: "14px",
    folding: false,
    // lineDecorationsWidth: 15,
};

const inputOptions = {
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    fontSize: "14px",
    lineDecorationsWidth: 5,
};
const outputOptions = {
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    fontSize: "14px",
    lineDecorationsWidth: 5,
};

function App() {
    const [language, setLanguage] = useState("python");
    const [code, setCode] = useState("");
    const [input, setInput] = useState("// enter input here");
    const [output, setOutput] = useState("");
    const [status, setStatus] = useState("");
    const [jobId, setJobId] = useState("");
    const [jobDetails, setJobDetails] = useState(null);
    const [editorMode, setEditorMode] = useState("vs-dark");
    const [languageIcon, setLanguageIcon] = useState("./resources/python.png");

    useEffect(() => {
        setCode(stubs[language]);
        setOutput("// output");
        setLanguageIcon(`./resources/${language}.png`);
    }, [language]);

    const toggleTheme = (idName) => {
        let currentClassName = document.getElementById(idName).className;
        let newClassName = currentClassName;
        if (currentClassName === idName + "-dark")
            newClassName = idName + "-light";
        else newClassName = idName + "-dark";
        document.getElementById(idName).className = newClassName;
    };

    const handleThemeChange = () => {
        if (editorMode === "vs-light") setEditorMode("vs-dark");
        else setEditorMode("vs-light");
        toggleTheme("App");
        toggleTheme("header");
        toggleTheme("app-name");
        toggleTheme("language-button");
        const themeToggler = document.getElementById("theme-icon");
        let classNames = themeToggler.classList;
        if (classNames.contains("theme-icon-light")) {
            classNames.replace("theme-icon-light", "theme-icon-dark");
            classNames.replace("fa-sun", "fa-moon");
        } else {
            classNames.replace("theme-icon-dark", "theme-icon-light");
            classNames.replace("fa-moon", "fa-sun");
        }
    };

    const handleSubmit = async () => {
        const payload = {
            language,
            script: code
        };
        console.log(payload);
        setOutput(''); 

        try {
            const response = await axios.post('http://localhost:3000/api/execute/', payload);
            if (response.data.error === 0) {
                console.log(response.data);
                setOutput(response.data.output);
            } else {
                console.log(response.data);
                setOutput(response.data.compile_message);
            }
        } catch (error) {
            console.error('Error executing code:', error);
        }
    };

    return (
        <div id="App" className="App-dark">
            <div id="header" className="header-dark">
                <h3 id="app-name" className="app-name-dark">
                    <i className="fas fa-solid fa-cube" aria-hidden="true">                    
                    <img src="https://camo.githubusercontent.com/f27baabc660e31293bb03fe4eda40e4ce9c1873620b0f51b2f221d138f77771c/68747470733a2f2f6b616c7669756d2e636f6d6d756e6974792f696d616765732f736964656261722d32642d6c6f676f2e737667" alt="Logo" className="h-12 mr-2"/>
                    <h1 className={`text-2xl font-bold ? 'text-white' : 'text-white-600'}`}> Kalvium Online Code Compiler</h1>
                    </i>
                </h3>

                <div className="nav-right-options">
                    <i
                        id="theme-icon"
                        className="fas fa-solid fa-sun fa-2x nav-icons theme-icon-light"
                        aria-hidden="true"
                        onClick={handleThemeChange}
                    ></i>

                    <i
                        className="fas fa-solid fa-swatchbook tutorial-icon nav-icons fa-2x"
                        aria-hidden="true"
                    ></i>
                </div>
            </div>

            <div className="secondary-nav-items">
                <button className="btn logo-btn" disabled={true}>
                    <img
                        src={require(`${languageIcon}`)}
                        className="image"
                        alt={`${language} icon`}
                    />
                </button>
                <button id="language-button" className="language-button-dark">
                    <select
                        value={language}
                        onChange={(e) => {
                            setStatus("");
                            setJobDetails(null);
                            setLanguage(e.target.value);
                            setCode(stubs[e.target.value]);
                            setLanguageIcon(`./resources/${language}.png`);
                        }}
                    >
                        <option value="nodejs">JavaScript</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="ruby">Ruby</option>
                        <option value="rust">Rust</option>
                        <option value="go">Go</option>
                        <option value="php">PHP</option>
                        <option value="csharp">C#</option>
                        <option value="go">Go</option>
                        <option value="r">R</option>
                        <option value="perl">Perl</option>
                        <option value="promptv1">Prompt</option>
                    </select>
                </button>
                {/* run button */}
                <button className="btn run-btn" onClick={handleSubmit}>
                    <i
                        className="fas fa-play fa-fade run-icon"
                        aria-hidden="true"
                    ></i>
                    &nbsp; Run
                </button>
            </div>

            <div className="editor">
                <Editor
                    height="100%"
                    width="100%"
                    theme={editorMode}
                    defaultLanguage={language}
                    defaultValue={code}
                    value={code}
                    onChange={(e) => setCode(e)}
                    options={editorOptions}
                    language={language}
                />
            </div>
            <div className="std-input-output">
                <div className="std-input">
                    <Editor
                        height="100%"
                        width="100%"
                        theme={editorMode}
                        defaultLanguage="plaintext"
                        defaultValue={"// enter input here"}
                        value={input}
                        options={inputOptions}
                        onChange={(e) => setInput(e)}
                    />
                </div>
                <div className="std-output">
                    <Editor
                        height="100%"
                        width="100%"
                        theme={editorMode}
                        defaultLanguage="plaintext"
                        defaultValue={"// output"}
                        value={output}
                        options={outputOptions}
                    />
                </div>
            </div>
            <br />
        </div>
    );
}

export default App;

