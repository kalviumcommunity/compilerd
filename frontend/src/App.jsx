import { useState } from "react";
import Editor from "@monaco-editor/react";
import Navbar from "./Components/Navbar";
import Axios from "axios";
import spinner from "./Spinner.svg";
import "./App.css";

const apiKey = "d3e4ee7a9emsha45d05810b4c0f8p1cbe4ejsncb947d65b3e2";
const appURL = "https://judge0-ce.p.rapidapi.com/submissions";

function App() {
  const [userCode, setUserCode] = useState(``);
  const [userLanguage, setUserLanguage] = useState("java");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(16);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const options = {
    fontSize: fontSize,
  };

  function Compile() {
    setLoading(true);
    let languageId;
    if (userLanguage === "java") {
      languageId = 62;
    } else if (userLanguage === "c") {
      languageId = 50;
    } else if (userLanguage === "cpp") {
      languageId = 54;
    } else if (userLanguage === "python") {
      languageId = 71;
    } else if(userLanguage === "javascript") {
      languageId = 63;
    }

    const formData = {
      language_id: languageId,
      source_code: btoa(userCode),
      stdin: btoa(userInput),
    };
    const options = {
      method: "POST",
      url: appURL,
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        base64_encoded: "true",
        fields: "*",
        ...formData,
      },
    };
    
    console.log("Axios Request Options:", options);
    Axios
    .request(options)
    .then(function response(response) {
        console.log("res.data", response.data)
        const token = response.data.token;
        checkStatus(token);
    })
    .catch((err) => {
        let error = err.response ? err.response.data : err;
        setLoading(false);
        console.log(error);
    })
  }

  const checkStatus = async (token) => {
    const options = {
        method: "GET",
        url: appURL + "/" + token,
        params: {
            base64_encoded: "true",
            fields: "*",
          },
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
    };
    try {
        console.log(options)
        let response = await Axios.request(options);
        console.log(response)
        let statusId = response.data.status?.id;
        if(statusId === 1 || statusId === 2) {
            setTimeout(() => {
                checkStatus(token)
            }, 2000)
            return;
        } else {
            setLoading(false);
            console.log("res.data", response.data)
            if (response.data.compile_output) {
              setUserOutput(atob(response.data.compile_output));
            } else if (response.data.stderr) { 
              setUserOutput(atob(response.data.stderr)); 
            } else {
              setUserOutput(atob(response.data.stdout));
            }
        }
    } catch(err) {
        console.log(err);
    }
}


  function clearOutput() {
    setUserOutput("");
  }

  return (
    <div className="App">
      <Navbar
        userLanguage={userLanguage}
        setUserLanguage={setUserLanguage}
        userTheme={userTheme}
        setUserTheme={setUserTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <div className="main">
        <div className="left-container">
          <div className="editor-container">
            <Editor
              options={options}
              width={`100%`}
              theme={userTheme}
              language={userLanguage}
              defaultLanguage="java"
              defaultValue=""
              onChange={(value) => {
                setUserCode(value);
              }}
            />
          </div>
          <button className="run-btn" onClick={() => Compile()}>
            Run
          </button>
        </div>
        <div className="right-container">
          <div className="input-box">
            <h4>Input: </h4>
            <textarea
              id="code-input"
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>
          </div>
          {loading ? (
            <div className="output-box">
              <h4>Output: </h4>
              <div className="spinner-box">
                <img src={spinner} alt="Loading....." />
              </div>
            </div>
          ) : (
            <div className="output-box">
              <h4>Output: </h4>
              <pre>{userOutput}</pre>
              <button
                onClick={() => {
                  clearOutput();
                }}
                className="clear-btn"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
