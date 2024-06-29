import React from "react";
import Select from "react-select";
import { languageOptions } from "../utils/languageOptions";

const LanguageSelector = ({ language, onLanguageChange }) => {
  return (
    <Select
      options={languageOptions}
      value={language}
      onChange={onLanguageChange}
      placeholder="Select a language"
      className="language-select"
    />
  );
};

export default LanguageSelector;
