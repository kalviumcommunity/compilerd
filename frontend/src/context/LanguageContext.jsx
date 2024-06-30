import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [runCode, setRunCode] = useState(false);

  const handleRunCode = () => {
    setRunCode(true);
  };

  const resetRunCode = () => {
    setRunCode(false);
  };


  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, runCode, handleRunCode, resetRunCode }}>
      {children}
    </LanguageContext.Provider>
  );
};
