import React, { useState } from "react";
import { LoaderCircle, ChevronDown, Play, Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { langMap } from "../utils/langMap";

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="p-3">
            {value.language}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44">
          {languages.map((lang) => (
            <DropdownMenuCheckboxItem checked={value.language == lang} onClick={() => handleOnChange(lang, "language")}>
              {lang}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant={"outline"} onClick={handleOnRun}>
        {value.isLoading ? <LoaderCircle size={20} className=" animate-spin" /> : <Play className="h-5 w-5" />}
      </Button>

      <Button onClick={() => setOpenSettings((prev) => !prev)} variant={openSettings ? "secondary" : "outline"}>
        <Settings className="h-5 w-5" />
      </Button>

      {openSettings && (
        <>
          <div className="flex items-center">
            <Button className={` rounded-l-md rounded-r-none`} variant={"secondary"}>
              Time Limit (ms)
            </Button>
            <div className="relative">
              <Input
                type="number"
                id="TLE"
                className={` focus-visible:ring-0 rounded-l-none w-24`}
                placeholder="0 = No Limit"
                value={value.constraints.TLE ? value.constraints.TLE : 0}
                onChange={changeConstraints}
                required
              />
            </div>
          </div>
          <div className="flex items-center">
            <Button className={` rounded-l-md rounded-r-none`} variant={"secondary"}>
              Memory Limit (KB)
            </Button>
            <div className="relative">
              <Input
                type="number"
                id="MLE"
                placeholder="0 = No Limit"
                className={` focus-visible:ring-0 rounded-l-none w-24`}
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
