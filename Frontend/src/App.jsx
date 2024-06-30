import { useState } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-r";
import "ace-builds/src-noconflict/mode-perl";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Ensure this file contains your custom styles

const App = () => {
  const [language, setLanguage] = useState("python");
  const [script, setScript] = useState("");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("github"); // Default theme is github

  const languageOptions = {
    c: "c_cpp",
    cpp: "c_cpp",
    python: "python",
    java: "java",
    nodejs: "javascript",
    ruby: "ruby",
    php: "php",
    r: "r",
    perl: "perl",
    go: "golang",
    rust: "rust",
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleScriptChange = (newScript) => {
    setScript(newScript);
  };

  const handleStdinChange = (newStdin) => {
    setStdin(newStdin);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        language: language,
        script: script,
        stdin: stdin,
      };

      const res = await axios.post(
        "http://localhost:3000/api/execute/",
        payload
      );
      const data = res.data;

      if (data.error === 0) {
        setOutput(data.output);
      } else {
        setOutput("Error occurred during execution.");
      }
    } catch (error) {
      setOutput("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "github" ? "monokai" : "github";
    setTheme(newTheme);
  };

  return (
    <div className="container mt-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Advanced Code Debugger</h1>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={toggleTheme}>
            Toggle Theme
          </button>
          <a
            href="https://github.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub"
              width="40"
            />
          </a>
        </div>
      </header>

      <div className="row">
        <div className="col-lg-6 mb-3">
          <label htmlFor="language" className="form-label">Select Language</label>
          <select
            id="language"
            className="form-select"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="nodejs">Node.js</option>
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
            <option value="r">R</option>
            <option value="perl">Perl</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
          </select>
        </div>

        <div className="col-lg-6 mb-3">
          <label htmlFor="stdin" className="form-label">Standard Input (stdin)</label>
          <textarea
            id="stdin"
            className="form-control"
            value={stdin}
            onChange={(e) => handleStdinChange(e.target.value)}
            rows="4"
          ></textarea>
        </div>
      </div>

      <div className="mb-3">
        <AceEditor
          mode={languageOptions[language]}
          theme={theme}
          name="editor"
          onChange={handleScriptChange}
          value={script}
          editorProps={{ $blockScrolling: true }}
          setOptions={{ useWorker: false }}
          width="100%"
          height="400px"
          className="mb-3"
        />
      </div>

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          onClick={handleSubmit}
          className="btn btn-primary me-md-2 mb-2"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {loading && (
          <div className="progress mb-2" style={{ height: "2px", width: "100%" }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
              role="progressbar"
              style={{ width: "100%" }}
            ></div>
          </div>
        )}
      </div>

      <div className="mb-3">
        <h2>Output:</h2>
        <pre className="bg-light p-3">{output}</pre>
      </div>
    </div>
  );
};

export default App;
