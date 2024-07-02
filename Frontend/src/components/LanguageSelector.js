import React from 'react';

const LanguageSelector = ({ languages, selectedLanguage, onSelect }) => {
  return (
    <select
      value={selectedLanguage}
      onChange={(e) => onSelect(e.target.value)}
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;
