import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";
import "./css/navbar.css";
import { executeCode } from "./api/apicall";

export const Navbar = () => {
  const {
    languages,
    language,
    handleLanguageChange,
    code,
    setOutput,
    setError,
    setErrorText,
  } = useLanguage();

  const [loading, setLoading] = useState(false);

  const handleExecute = async () => {
    try {
      setLoading(true);
      const result = await executeCode(language.id, code);
      if (result.error == 0) {
        setOutput(result.output);
        setErrorText("");
        setError(result.error);
        setLoading(false);
      } else {
        setError(result.error);
        setErrorText(result.compile_message);
        setOutput("");
        setLoading(false);
      }
    } catch (err) {
      setErrorText(err.message);
      setOutput("");
      setLoading(false);
    }
  };
  return (
    <>
      <div className="navbar">
        <div className="loading-info">
          <div>
            <button onClick={handleExecute}>Run</button>
          </div>

          {loading && <div className="spinner"></div>}
        </div>

        <div className="select-lang">
          <select
            value={language.id}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
