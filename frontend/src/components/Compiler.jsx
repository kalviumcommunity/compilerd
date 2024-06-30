import React, { useState } from 'react';
import axios from 'axios';

const Compiler = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState('nodejs');

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
        setOutput(''); // Clear the output while waiting for the response

        try {
            const response = await axios.post('http://localhost:5000/api/execute/', payload);
            // eslint-disable-next-line
            if (response.data.error == 0) {
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
    return (
        <div className="flex flex-col items-center w-full max-w-6xl mt-8">
            <div className="flex flex-col items-start mb-4 w-full">
                <div className="flex justify-between w-full">
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="mb-2 p-2 bg-gray-800 text-white border border-gray-600 rounded-md"
                    >
                        <option value="nodejs">JavaScript</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="ruby">Ruby</option>
                        <option value="promptv1">PromptV1</option>
                        <option value="promptv2">PromptV2</option>
                        <option value="multifile">Multifile</option>
                        <option value="sqlite3">SQLite3</option>
                        <option value="csharp">C#</option>
                        <option value="go">Go</option>
                        <option value="php">PHP</option>
                        <option value="perl">Perl</option>
                    </select>
                </div>
                <textarea
                    value={code}
                    onChange={handleCodeChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Write your code here..."
                    className="w-full h-40 p-2 bg-gray-800 text-white border border-gray-600 rounded-md font-mono"
                />
                <br />
                <button
                    onClick={runCode}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Run Code
                </button>
            </div>
            <div className="w-full">
                <br />
                <h3 className="text-lg font-semibold text-white">Output:</h3>
                <br />
                <pre className="w-full h-40 p-2 bg-gray-800 text-white border border-gray-600 rounded-md overflow-auto">
                    {output}
                </pre>
            </div>
        </div>
    );
}

export default Compiler