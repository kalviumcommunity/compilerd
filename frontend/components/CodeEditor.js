import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { defineTheme } from "../utils/defineTheme";
import { languageOptions } from "../utils/languageOptions";
import LanguageSelector from "./LanguageSelector";
import OutputDisplay from "./OutputDisplay";
import LoadingSpinner from "./LoadingSpinner";
import useDebounce from "../hooks/useDebounce";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utils/localStorage";

const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });

const CodeEditor = () => {
  const [language, setLanguage] = useState(languageOptions[0]);
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("vs-dark");
  const [outputDetails, setOutputDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autoRun, setAutoRun] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const debouncedCode = useDebounce(code, 1000);

  useEffect(() => {
    setIsClient(true);
    const savedLanguage = loadFromLocalStorage("language");
    const savedCode = loadFromLocalStorage("code");
    const savedTheme = loadFromLocalStorage("theme");
    const savedAutoRun = loadFromLocalStorage("autoRun");

    if (savedLanguage) setLanguage(savedLanguage);
    if (savedCode) setCode(savedCode);
    if (savedTheme) setTheme(savedTheme);
    if (savedAutoRun !== null) setAutoRun(savedAutoRun);
  }, []);

  useEffect(() => {
    if (autoRun && isClient) {
      handleSubmit();
    }
  }, [debouncedCode, autoRun, isClient]);

  useEffect(() => {
    if (isClient) {
      saveToLocalStorage("language", language);
      saveToLocalStorage("code", code);
      saveToLocalStorage("theme", theme);
      saveToLocalStorage("autoRun", autoRun);
    }
  }, [language, code, theme, autoRun, isClient]);

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption);
    setCode("");
    setOutputDetails(null);
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleThemeChange = useCallback((th) => {
    const theme = th;
    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme.value);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme.value));
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setOutputDetails(null);

    const formData = {
      language: language.value,
      script: code,
    };

    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_API_URL,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setOutputDetails(data);
    } catch (err) {
      setOutputDetails({
        error:
          err.response?.data?.error ||
          "An error occurred while compiling/running the code.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return null; // or a loading placeholder
  }

  return (
    <div className="compiler-container">
      <div className="editor-header">
        <LanguageSelector
          language={language}
          onLanguageChange={handleLanguageChange}
        />
        <label className="auto-run-label">
          <input
            type="checkbox"
            checked={autoRun}
            onChange={(e) => setAutoRun(e.target.checked)}
          />
          Auto-run
        </label>
      </div>
      <MonacoEditor
        height="400px"
        language={language.monaco}
        value={code}
        theme={theme}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          automaticLayout: true,
          snippetSuggestions: "none",
          scrollBeyondLastLine: false,
          lineNumbers: "on",
          renderLineHighlight: "all",
          tabSize: 2,
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="submit-btn"
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <OutputDisplay outputDetails={outputDetails} />
      )}
    </div>
  );
};

export default CodeEditor;
