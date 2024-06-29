import React from "react";
import Select from "react-select";
import { languageOptions } from "../utils/languageOptions";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#852bf4",
    color: "white",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#852bf4",
    color: "white",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  input: (provided) => ({
    ...provided,
    color: "white",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#500ca2" : "#852bf4",
    color: "white",
    "&:hover": {
      backgroundColor: "#500ca2",
    },
  }),
};

const LanguageSelector = ({ language, onLanguageChange }) => {
  return (
    <Select
      options={languageOptions}
      value={language}
      onChange={onLanguageChange}
      placeholder="Select a language"
      styles={customStyles}
      className="language-select"
    />
  );
};

export default LanguageSelector;
