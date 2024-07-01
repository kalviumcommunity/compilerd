import React, { useState } from 'react';
import axios from 'axios';

const Temp = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState('python');
    const [stdin, setStdin] = useState("");

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleInputChange = (e) => {
        setStdin(e.target.value);
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
            script: code,
            stdin: stdin || undefined
        };
        setOutput('');
        console.log(payload);

        try {
            const response = await axios.post('http://localhost:5000/api/execute/', payload);
            // console.log(response.data)
            setOutput(response.data.output);
        } catch (error) {
            console.error('Error executing code:', error);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="flex flex-col w-1/6 bg-gray-900 text-white p-4">
                <h2 className="text-xl font-bold mb-4">Select Language</h2>
                <ul>
                    {['python', 'java', 'c', 'cpp', 'csharp', 'nodejs', 'go', 'php', 'pearl', 'ruby', 'promptv1','promptv2'].map((lang) => (
                        <li key={lang} className="mb-2">
                            <button
                                onClick={() => setLanguage(lang)}
                                className={`w-full text-left p-2 rounded-md ${language === lang ? 'bg-blue-700' : 'bg-gray-800 hover:bg-gray-700'
                                    }`}
                            >
                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-row w-5/6 bg-gray-800 p-4">
                <div className="flex flex-col w-1/2 pr-2">
                    <h3 className="text-lg font-semibold text-white">Code:</h3>
                    <textarea
                        value={code}
                        onChange={handleCodeChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Write your code here..."
                        className="w-full h-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md font-mono"
                    />
                </div>
                <div className="flex flex-col w-1/2 pl-2">
                    <h3 className="text-lg font-semibold text-white">Input:</h3>
                    <textarea
                        value={stdin}
                        onChange={handleInputChange}
                        placeholder="Every input should be in seperate line"
                        className="w-full h-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md font-mono"
                    />
                    <button
                        onClick={runCode}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Run Code
                    </button>
                    <h3 className="text-lg font-semibold text-white mt-4">Output:</h3>
                    <pre className="w-full min-h-60 p-2 bg-gray-700 text-white border border-gray-600 rounded-md overflow-auto">
                        {output}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default Temp;
