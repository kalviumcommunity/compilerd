"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Download, LoaderCircle, Play, Save, Trash } from "lucide-react";
import { useTheme } from "next-themes";
import Common from "@/api/common";
import { Modal, message } from "antd";
import languagesData from "../data/languages.json";

export default function Home() {

  const monaco = useMonaco();
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false);
  const [loadingForStart, setLoadingForStart] = useState(false);
  const [language, setLanguage] = useState('c');
  const [languageInfo, setLanguageInfo] = useState({});
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const lang = localStorage.getItem("compilerd");
    if (!lang) return;
    setLanguage(lang);
    const prevCode = localStorage.getItem(lang);
    setCode(prevCode);
    const selected = languagesData.filter(e => e.value === lang);
    setLanguageInfo(selected[0]);
    message.info("Progress has been restored");
  }, [])

  useEffect(() => {
    if (!language) return;
    const lang = localStorage.getItem("compilerd");
    const selected = languagesData.filter(e => e.value === language);
    console.log(selected);
    setLanguageInfo(selected[0]);
    if (!lang) setCode(selected[0]?.comment);
  }, [language])

  const compileProgram = async () => {
    if (!code) {
      message.error("Program cannot be empty");
      return;
    }
    setLoading(true);
    setLoadingForStart(true);
    saveCode(false);
    const data = {
      language: language,
      script: code,
      ...(input && { stdin: input })
    }
    const response = await Common.execute(data);
    if (response.status_code === 200) {
      message.success("Compiled successfully");
    } else {
      message.error("Error compiling program");
      setOutput(response.message);
    }
    setLoading(false);
    setLoadingForStart(false);
  }

  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `my_program.${languageInfo?.extension}`;
    document.body.appendChild(element);
    element.click();
  }

  const saveCode = (notify) => {
    localStorage.setItem('compilerd', language);
    localStorage.setItem(language, code);
    if (notify === false) return;
    message.success("Saved in your browser");
  }

  const deleteCode = () => {
    localStorage.removeItem('compilerd');
    localStorage.removeItem(language);
    setCode("");
    message.info("Program cleared from browser");
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-[calc(100%-100px)] pr-10 md:pr-0 mb-4">
      <div className="flex flex-col gap-8 md:gap-0 items-start md:w-1/2 px-3 h-full md:px-2">
        <div className="md:w-full pt-6 md:h-[15vh] flex flex-col gap-6 md:gap-0 md:flex-row justify-between px-5 md:px-5">
          <Select value={language} onValueChange={(e) => setLanguage(e)}>
            <SelectTrigger className="w-[200px] md:w-[180px]" title="Language">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {languagesData && languagesData.map((language, index) => {
                  return (
                    <SelectItem key={index} value={language.value}>{language.name}</SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex gap-4">
            <Button className="h-9 px-3 dark:bg-slate-600 dark:text-white" title="Run" onClick={compileProgram}>
              {loadingForStart ? <LoaderCircle className="animate-spin" /> : <Play className="size-5" />}
            </Button>
            <Button className="h-9 px-3 dark:bg-slate-600 dark:text-white" title="Save" onClick={saveCode}>
              <Save className="size-5" />
            </Button>
            <Button className="h-9 px-3 dark:bg-slate-600 dark:text-white" title="Delete" onClick={deleteCode}>
              <Trash className="size-5" />
            </Button>
            <Button className="h-9 px-3 dark:bg-slate-600 dark:text-white" title="Download" onClick={downloadFile}>
              <Download className="size-5" />
            </Button>
          </div>
        </div>
        {monaco ?
          <div className="flex flex-col w-full h-[60vh] border-2 border-bg-background">
            <p className="py-1 bg-gray-200 dark:bg-gray-700">Enter your code here</p>
            <Editor
              language={language}
              theme={`vs-${theme}`}
              value={code}
              onChange={(e) => setCode(e)}
              options={{
                inlineSuggest: true,
                fontSize: "16px",
                formatOnType: true,
                autoClosingBrackets: true,
                minimap: { autohide: true, scale: 10 }
              }}
              onMount={() => setLoading(prev => !prev)}
              className="!h-[50vh]"
            />
          </div> :
          <div className="flex justify-center items-center w-1/2 h-[50vh]">
            <LoaderCircle className="animate-spin" />
          </div>
        }
      </div>
      <div className="md:w-1/2 h-full flex flex-col justify-between pt-4 gap-2 px-2">
        <div className="flex flex-col w-full h-1/2 border-2 border-bg-background">
          <p className="py-1 bg-gray-200 dark:bg-gray-700">Input</p>
          <Editor
            language={"text"}
            theme={`vs-${theme}`}
            value={input}
            onChange={(e) => setInput(e)}
            options={{
              fontSize: "16px",
            }}
            onMount={() => setLoading(prev => !prev)}
            className="!h-[35vh]"
          />
        </div>
        <div className="flex flex-col w-full h-1/2 border-2 border-bg-background">
          <p className="py-1 bg-gray-200 dark:bg-gray-700">Output</p>
          <Editor
            language={"text"}
            theme={`vs-${theme}`}
            value={output}
            onChange={(e) => setOutput(e)}
            options={{
              fontSize: "16px",
            }}
            onMount={() => setLoading(prev => !prev)}
            className="!h-[35vh]"
          />
        </div>
      </div>
    </div>
  );
}