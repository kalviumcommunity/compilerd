import React from 'react';

const LANGUAGES_CONFIG = {
  C: { name: 'C' },
  CPP: { name: 'C++' },
  PYTHON: { name: 'Python' },
  JAVA: { name: 'Java' },
  NODEJS: { name: 'Node.js' },
  RUBY: { name: 'Ruby' },
  JAVASCRIPT: { name: 'JavaScript' },
  PHP: { name: 'PHP' },
  RUST: { name: 'Rust' },
  PROMPTV1: { name: 'Prompt V1' },
  PROMPTV2: { name: 'Prompt V2' }
};

const LanguageSelector = ({ onSelectLanguage }) => {
  const handleLanguageChange = (event) => {
    onSelectLanguage(event.target.value);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language-select">Select a language:</label>
      <select id="language-select" onChange={handleLanguageChange}>
        <option value="">Select...</option>
        {Object.keys(LANGUAGES_CONFIG).map((language) => (
          <option key={language} value={language}>
            {LANGUAGES_CONFIG[language].name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
