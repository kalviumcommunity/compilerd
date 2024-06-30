import React from "react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { LoaderCircle, ChevronDown } from "lucide-react";

import { languageMap } from "../utils/languageMap";

export default function Navbar({ value, handleOnChange, handleOnRun, toggleTheme }) {
  const languages = Object.keys(languageMap);

  return (
    <Flowbite>
    <div className="w-full px-4 pt-2 pb-3 flex items-center justify-start flex-wrap gap-4 justify-between">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700"
        type="button"
      >
        {value.language}
        <ChevronDown />
      </button>
      <div id="dropdown" className="z-10 hidden divide-y divide-gray-100 rounded-lg shadow w-36 bg-gray-700 font-mono">
        <ul className="py-2 text-sm text-gray-200" aria-labelledby="dropdownDefaultButton">
          {languages.map((lang) => (
            <li key={lang}>
              <button className="block w-full px-3 py-1.5 hover:bg-gray-600 hover:text-white" onClick={() => handleOnChange(lang, "language")}>
                {lang}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button className="font-medium rounded-lg text-sm px-5 py-2.5 bg-green-500 hover:bg-blue-800 font-mono" onClick={handleOnRun}>
        {value.isLoading ? <LoaderCircle className="animate-spin" /> : "RUN"}
      </button>
      <DarkThemeToggle onClick={toggleTheme}/>
    </div>
  </Flowbite>
  );
}