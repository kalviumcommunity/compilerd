import React from 'react';

const SUPPORTED_LANGUAGES = {
  C: 'c',
  CPP: 'cpp',
  PYTHON: 'python',
  JAVA: 'java',
  NODEJS: 'nodejs',
  RUBY: 'ruby',
  SQLITE3: 'sqlite3',
};

interface LanguageSelectorProps {
  onSelect: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect }) => {
  return (
    <div className="mb-4">
      <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select Language
      </label>
      <select
        id="language-select"
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
          <option key={value} value={value}>{key}</option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;