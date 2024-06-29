import React, { useState } from "react";
import { LoaderCircle, ChevronDown, Check, Settings } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { langMap } from "../utils/langMap";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CodeNav({ value, handleOnChange, handleOnRun }) {
  const languages = Object.keys(langMap);

  const [openSettings, setOpenSettings] = useState(false);

  const changeConstraints = (e) => {
    if (e.target.value < 0) return;
    let currConstraints = { ...value.constraints };
    currConstraints[e.target.id] = e.target.value == "" ? 0 : parseFloat(e.target.value);
    handleOnChange(currConstraints, "constraints");
  };

  return (
    <div className="w-full px-4 pt-2 pb-2 flex items-center justify-start flex-wrap gap-4">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-1.5 bg-slate-700 hover:bg-slate-600">
            {value.language}
            <ChevronDown className="-mr-1 h-5 w-5" aria-hidden="true" />
          </MenuButton>
        </div>
        <MenuItems
          transition
          className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-2 text-sm text-gray-200 bg-gray-800">
            {languages.map((lang) => (
              <MenuItem key={lang}>
                {
                  <a
                    className={classNames(
                      value.language === lang ? "bg-gray-900" : "bg-gray-800 pl-9 hover:bg-gray-700",
                      "block w-full px-3 py-1.5 hover:text-white cursor-pointer"
                    )}
                    onClick={() => handleOnChange(lang, "language")}
                  >
                    <span className="flex items-center justify-start gap-1">
                      {value.language === lang && <Check size={18} />} {lang}
                    </span>
                  </a>
                }
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>

      <button className="font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-700 hover:bg-blue-800" onClick={handleOnRun}>
        {value.isLoading ? <LoaderCircle size={20} className=" animate-spin" /> : "RUN"}
      </button>

      <button className="font-medium rounded-lg text-sm px-3 py-2.5 bg-slate-700 hover:bg-slate-600" onClick={() => setOpenSettings((prev) => !prev)}>
        <Settings className="h-5 w-5" />
      </button>

      {openSettings && (
        <>
          <div className="flex items-center">
            <div className="flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-sm font-medium text-center border rounded-s-lg bg-gray-700 hover:bg-gray-600 border-gray-600">
              Time Limit (ms)
            </div>
            <div className="relative">
              <input
                type="number"
                id="TLE"
                className="block p-2 w-full z-20 text-sm rounded-e-lg border-s-0 border bg-gray-700 border-s-gray-700 border-gray-600 placeholder-gray-400 focus:outline-0"
                placeholder="0 = No Limit"
                value={value.constraints.TLE ? value.constraints.TLE : 0}
                onChange={changeConstraints}
                required
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-sm font-medium text-center border rounded-s-lg bg-gray-700 hover:bg-gray-600 border-gray-600">
              Memory Limit (KB)
            </div>
            <div className="relative">
              <input
                type="number"
                id="MLE"
                className="block p-2 w-full z-20 text-sm rounded-e-lg border-s-0 border bg-gray-700 border-s-gray-700 border-gray-600 placeholder-gray-400 focus:outline-0"
                placeholder="0 = No Limit"
                value={value.constraints.MLE ? value.constraints.MLE : 0}
                onChange={changeConstraints}
                required
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
