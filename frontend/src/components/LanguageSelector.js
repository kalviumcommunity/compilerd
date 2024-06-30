import React from 'react';

const LanguageSelector = ({ language, setLanguage }) => {
  const languages = ['c', 'cpp', 'python', 'java', 'nodejs', 'ruby', 'php', 'swift', 'go', 'kotlin'];

  return (
    <div className="mb-4">
      <label htmlFor="language" className="block text-lg font-medium mb-2">Select Language</label>
      <select
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="p-2 border rounded"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
