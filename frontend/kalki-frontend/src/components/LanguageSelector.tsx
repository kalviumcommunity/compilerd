import React from 'react';

interface LanguageSelectorProps {
  onSelect: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect }) => {
  const languages = ['javascript', 'python', 'java']; // additional languages can be added here

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      {languages.map(lang => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;  