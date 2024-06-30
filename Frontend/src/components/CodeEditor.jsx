import { useEffect, useState } from "react";
import { SiPython, SiC, SiRuby, SiGo, SiCsharp } from "react-icons/si";
import { TbBrandCpp, TbBrandKotlin } from "react-icons/tb";
import { IoLogoJavascript } from "react-icons/io5";
import { FaJava } from "react-icons/fa";
import codeSnippets from "./codeSnippets";
import axios from 'axios';

function CodeEditor() {
	const snippets = codeSnippets;

	// Mapping between language names and corresponding icon components
	const languageIcons = {
		cpp: TbBrandCpp,
		c: SiC,
		"c#": SiCsharp,
		java: FaJava,
		python: SiPython,
		go: SiGo,
		kotlin: TbBrandKotlin,
		ruby: SiRuby,
		nodejs: IoLogoJavascript,
	};

	const [code, setCode] = useState(snippets.cpp);
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState("cpp");
	const [err,setErr] = useState(false);
	const [loading,setLoading] = useState(false);
	const [theme, setTheme] = useState('dark');

	const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };
	const handleRunCode = async () => {
		await setErr(false);
		await setLoading(true);
		console.log(selectedLanguage);
		let requestBody;
		if(input===""){
			requestBody = {
					language: selectedLanguage,
					script: code,
			};
		}
		else{
			requestBody = {
				language: selectedLanguage,
				script: code,
				stdin: input,
			};
		}
		const url = 'http://localhost:3000/api/execute/';
		await axios.post(url, requestBody)
				.then(response => {
						const result = response.data;
						if(result.compile_message !== ""){
							setErr(true);
						}
						setOutput(result.output+result.compile_message);
						setLoading(false);
				})
				.catch(error => {
						console.error('Error:', error);
				});
	};

	const handleLanguageChange = (language) => {
		setSelectedLanguage(language);
		setCode(snippets[language]);
	};
	const handleKeyPress = (event) =>{
		if(event.key === "Enter" && event.ctrlKey) {
			handleRunCode();
		}
	}
	useEffect(() => {
		document.addEventListener("keydown",handleKeyPress);
		return () => {
			document.removeEventListener("keydown",handleKeyPress);
		};
	},[code,input,selectedLanguage]);

	return (
		// <div className="flex h-screen bg-slate-900 text-gray-100">
		// 	{/* <aside className="w-1/6 bg-slate-800 p-4"> */}
		// 	<aside className="w-16 md:w-1/6 bg-slate-800 p-4">
		// 		{/* <h1 className="text-xl font-bold mb-4 text-teal-500">Languages</h1> */}
		// 		<h1 className="text-xl font-bold mb-4 text-teal-500 hidden md:block">
		// 			Languages
		// 		</h1>
		// 		<ul>
		// 			{Object.keys(snippets).map((language) => {
		// 				const IconComponent = languageIcons[language];
		// 				return (
		// 					<li key={language} className="mb-2 flex items-center">
		// 						{/* {IconComponent && <IconComponent className="mr-2" />} */}
		// 						<button
		// 							className={`w-full flex items-center justify-center md:justify-start p-2 rounded-xl transition-colors duration-200 ${
		// 								selectedLanguage === language
		// 									? "bg-teal-600 text-white"
		// 									: "hover:bg-slate-500"
		// 							}`}
		// 							onClick={() => handleLanguageChange(language)}
		// 						>
		// 							{IconComponent && (
		// 								<IconComponent className="text-xl md:mr-2" />
		// 							)}
		// 							<span className="hidden md:inline">
		// 								{language.charAt(0).toUpperCase() + language.slice(1)}
		// 							</span>
		// 						</button>
		// 					</li>
		// 				);
		// 			})}
		// 		</ul>
		// 	</aside>
		// 	<main className="flex-1 flex flex-col p-6">
		// 		<div className="flex justify-between items-center mb-4">
		// 			<h2 className="text-2xl font-semibold text-teal-500">
		// 				Online {selectedLanguage.toUpperCase()} Compiler
		// 			</h2>
		// 			<button
		// 				id="run-button"
		// 				className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-lg transition-colors duration-200 shadow-lg"
		// 				onClick={handleRunCode}
		// 			>
		// 				{loading ? "Loading..." : "Run Code"}
		// 			</button>
		// 		</div>
		// 		<textarea
		// 			id="code-editor"
		// 			className="flex-1 bg-slate-800 text-gray-100 p-4 rounded-lg mb-4 resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
		// 			value={code}
		// 			onChange={(e) => setCode(e.target.value)}
		// 		/>
		// 		<div className="flex w-full">
		// 			<div className="flex-3 bg-slate-800 text-gray-100 p-4 rounded-lg m-1 resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
		// 				style={{ resize: "vertical", minHeight: "50px", maxHeight: "250px" }}
		// 			>
		// 				<h3 className="text-lg font-semibold mb-2 text-teal-300">Input:</h3>
		// 				<textarea id="input" value={input} onChange={(e) => setInput(e.target.value)}
		// 					className="bg-slate-800 text-gray-100 p-4 rounded-lg mb-4 resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
		// 					></textarea>
		// 			</div>
		// 			<div
		// 				id="output"
		// 				className="flex-1 m-1 bg-slate-800 text-gray-100 p-4 rounded-lg  overflow-y-auto resize-vertical focus:ring-2 focus:ring-teal-500 focus:outline-none"
		// 				style={{ resize: "vertical", minHeight: "50px", maxHeight: "250px" }}
		// 			>
		// 				<h3 className="text-lg font-semibold mb-2 text-teal-300">Output:</h3>
		// 				<pre className={`whitespace-pre-wrap break-words ${err && 'text-red-500'}`}> {output} </pre>
		// 			</div>
		// 		</div>
		// 	</main>
		// </div>
		<div className={`${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} flex h-screen`}>
            <aside className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-700'} w-16 md:w-1/6 p-4`}>
                <h1 className={`${theme === 'dark' ? 'text-gray-100' : 'text-white'} text-xl font-bold mb-4 hidden md:block`}>
                    Languages
                </h1>
                <ul>
                    {Object.keys(snippets).map((language) => {
                        const IconComponent = languageIcons[language];
                        return (
                            <li key={language} className="mb-2 flex items-center">
                                <button
                                    className={`w-full flex items-center justify-center md:justify-start p-2 rounded-xl transition-colors duration-200 ${
                                        selectedLanguage === language
                                            ? 'bg-indigo-500 text-white'
                                            : theme === 'dark'
                                            ? 'hover:bg-indigo-400 text-gray-100'
                                            : 'hover:bg-indigo-500 text-white'
                                    }`}
                                    onClick={() => handleLanguageChange(language)}
                                >
                                    {IconComponent && (
                                        <IconComponent className={`text-xl md:mr-2 ${theme === 'dark' ? 'text-gray-100' : 'text-white'}`} />
                                    )}
                                    <span className="hidden md:inline">
                                        {language.charAt(0).toUpperCase() + language.slice(1)}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <button
                    onClick={toggleTheme}
                    className="mt-4 w-full bg-indigo-600 text-white p-2 rounded-lg"
                >
                    Toggle Theme
                </button>
            </aside>
            <main className="flex-1 flex flex-col p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className={`${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-700'} text-2xl font-semibold`}>
                        Online {selectedLanguage.toUpperCase()} Compiler
                    </h2>
                    <button
                        id="run-button"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg transition-colors duration-200 shadow-lg"
                        onClick={handleRunCode}
                    >
                        {loading ? 'Loading...' : 'Run Code'}
                    </button>
                </div>
                <textarea
                    id="code-editor"
                    className={`flex-1 ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <div className="flex flex-col md:flex-row w-full space-y-6 md:space-y-0 md:space-x-6">
                    <div className={`flex-1 ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} p-4 rounded-lg shadow-sm`}>
                        <h3 className={`${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-700'} text-lg font-semibold mb-2`}>Input:</h3>
                        <textarea
                            id="input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className={`w-full ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} p-4 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                            style={{ minHeight: '50px', maxHeight: '250px' }}
                        />
                    </div>
                    <div
                        id="output"
                        className={`flex-1 ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} p-4 rounded-lg shadow-sm overflow-y-auto resize-vertical focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                        style={{ minHeight: '50px', maxHeight: '250px' }}
                    >
                        <h3 className={`${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-700'} text-lg font-semibold mb-2`}>Output:</h3>
                        <pre className={`whitespace-pre-wrap break-words ${err && 'text-red-500'}`}>{output}</pre>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CodeEditor;