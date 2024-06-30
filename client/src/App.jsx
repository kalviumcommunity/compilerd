// App.js or your React component file
import React, { useState } from "react";
import { executeCode } from "./components/api/apicall";
import { LanguageProvider } from "./components/LanguageContext";

import { Navbar } from "./components/Navbar";
import { InputConsole } from "./components/InputConsole";

function App() {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleExecute = async () => {
    try {
      const result = await executeCode(language, code);
      setOutput(result.output);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(err.message);
      setOutput(""); // Clear any previous output
    }
  };

  return (
    <div className="App">
      <LanguageProvider>
        <Navbar />
        <InputConsole />
      </LanguageProvider>
    </div>
  );
}

export default App;
