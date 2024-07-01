import React, { createContext, useContext, useState } from "react";
import templates from "./basecode";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const languages = [
    { id: "cpp", name: "C++" },
    { id: "c", name: "C" },
    { id: "java", name: "Java" },
    { id: "python", name: "Python" },
    { id: "ruby", name: "Ruby" },
    { id: "go", name: "Go" },
    { id: "php", name: "PHP" },
  ];

  const [language, setLanguage] = useState({ id: "cpp", name: "C++" });
  const [baseCode, setBaseCode] = useState(templates["cpp"]);
  const [code, setCode] = useState(baseCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(0);
  const [errorText, setErrorText] = useState("");

  const handleLanguageChange = (langId) => {
    const selectedLanguage = languages.find((lang) => lang.id === langId);
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      setBaseCode(templates[langId]);
      setCode(templates[langId]);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        languages,
        language,
        baseCode,
        handleLanguageChange,
        code,
        setCode,
        output,
        setOutput,
        error,
        setError,
        errorText,
        setErrorText,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
