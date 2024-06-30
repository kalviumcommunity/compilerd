

import React, { useState } from 'react';
import axios from 'axios';

const Body = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState('nodejs');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const textarea = e.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newValue = code.substring(0, start) + '   ' + code.substring(end);

            setCode(newValue);

            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 3;
            }, 0);
        }
    };

    const runCode = async () => {
        const payload = {
            language,
            script: code
        };
        console.log(payload);
        setOutput(''); 

        try {
            const response = await axios.post('http://localhost:3000/api/execute/', payload);
            if (response.data.error === 0) {
                console.log(response.data);
                setOutput(response.data.output);
            } else {
                console.log(response.data);
                setOutput(response.data.compile_message);
            }
        } catch (error) {
            console.error('Error executing code:', error);
        }
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`flex flex-col items-center w-full max-w-6xl mt-8 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen rounded-lg shadow-lg`}>
            <div className="flex items-center mb-6 w-full justify-between">
                <div className="flex items-center">
                    <img src="https://camo.githubusercontent.com/f27baabc660e31293bb03fe4eda40e4ce9c1873620b0f51b2f221d138f77771c/68747470733a2f2f6b616c7669756d2e636f6d6d756e6974792f696d616765732f736964656261722d32642d6c6f676f2e737667" alt="Logo" className="h-12 mr-2"/>
                    <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}> Kalvium Online Code Compiler</h1>
                </div>
                <button onClick={toggleDarkMode} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                    Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
                </button>
            </div>
            <div className="flex flex-col items-start mb-4 w-full">
                <div className="flex justify-between w-full mb-2">
                    <select
                        id="language"
                        value={language}
                        onChange={handleLanguageChange}
                        className={`p-2 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} border border-gray-400 rounded-md`}
                    >
                        <option value="nodejs">JavaScript</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="ruby">Ruby</option>
                        <option value="promptv1">PromptV1</option>
                        <option value="multifile">Multifile</option>
                        <option value="sqlite3">SQLite3</option>
                        <option value="rust">Rust</option>
                        <option value="go">Go</option>
                        <option value="php">PHP</option>
                    </select>
                </div>
                <textarea
                    value={code}
                    onChange={handleCodeChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Write your code here..."
                    className={`w-full h-40 p-4 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-200 text-black'} border border-gray-400 rounded-md font-mono placeholder-gray-500`}
                />
                <button
                    onClick={runCode}
                    className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                >
                    Run Code
                </button>
            </div>
            <div className="w-full">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-black'} mb-2`}>Output:</h3>
                <pre className={`w-full h-40 p-4 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-200 text-black'} border border-gray-400 rounded-md overflow-auto`}>
                    {output}
                </pre>
            </div>
        </div>
    );
};

export default Body;
