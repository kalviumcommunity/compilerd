import React from "react";
import Select from "react-select";
import "./Styles/Navbar.css";

const Navbar = ({
  userLanguage,
  setUserLanguage,
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
}) => {
  const languages = [
    { value: "c", label: "C", name: "C" },
    { value: "cpp", label: "C++", name: "C++" },
    { value: "python", label: "Python", name: "Python" },
    { value: "java", label: "Java", name: "Java" },
    {
      value: "javascript",
      label: "JavaScript (Node.js 12.14.0)",
      name: "JavaScript (Node.js 12.14.0)",
    },
  ];
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];
  return (
    <div className="Navbar">
      <div className="leftDiv">
        <div className="title">Code Compiler</div>
        <Select
          options={languages}
          value={userLanguage}
          onChange={(e) => setUserLanguage(e.value)}
          placeholder={userLanguage}
          width="40px"
        />
        <Select
          options={themes}
          value={userTheme}
          onChange={(e) => setUserTheme(e.value)}
          placeholder={userTheme}
        />
      </div>
      <div className="rightDiv">
        <label>Font Size</label>
        <input
          type="range"
          min="16"
          max="30"
          value={fontSize}
          step="1"
          onChange={(e) => {
            setFontSize(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
