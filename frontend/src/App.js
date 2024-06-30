import React, { useState, useEffect } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import LanguageSelector from './components/LanguageSelector';
import Output from './components/Output';
import ThemeToggle from './components/ThemeToggle';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const [script, setScript] = useState('');
  const [language, setLanguage] = useState('nodejs');
  const [outputData, setOutputData] = useState({
    output: '',
    error: 0,
    compile_message: '',
    execute_time: null,
    memory: null,
    cpu_time: null,
    status_code: 200,
    message: null, 
  });
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [stdin, setStdin] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const preparePayload = (script, language, stdin) => {
    const payload = {
      language: language,
      script: script.replace(/\n/g, '\n'),
    };
    if (stdin !== '') {
      payload.stdin = stdin;
    }
    return JSON.stringify(payload);
  };

  const handleRunCode = async () => {
    try {
      const payload = preparePayload(script, language, stdin);
      const response = await fetch('http://localhost:3000/api/execute/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });
      const data = await response.json();
      setOutputData({
        output: data.output,
        error: data.error,
        compile_message: data.compile_message,
        execute_time: data.execute_time,
        memory: data.memory,
        cpu_time: data.cpu_time,
        status_code: data.status_code,
        message: data.message,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStdinChange = (event) => {
    setStdin(event.target.value);
  };

  return (
    <div className={`container mx-auto p-4 w-screen min-h-screen ${theme === 'dark' ? 'dark:bg-gray-900 dark:text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center mt-5 mb-8">
        <h1 className="text-2xl font-extrabold">COMPILERD</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>

      <div className="md:flex">
        {/* Left Panel */}
        <div className="md:w-1/2 md:pr-4">
          <LanguageSelector language={language} setLanguage={setLanguage} theme={theme} />
          <CodeEditor script={script} setScript={setScript} theme={theme} />
          
          <div className="flex justify-end">
            <button
              onClick={handleRunCode}
              className={`flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md my-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              Run Code
              <FontAwesomeIcon icon={faPlay} className="ml-2" />
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 md:pl-4">
          <h2 className="text-xl font-bold mt-12 mb-2">Output</h2>
          <Output
            outputData={outputData}
            output={outputData.output}
            error={outputData.error}
            compile_message={outputData.compile_message}
            execute_time={outputData.execute_time}
            memory={outputData.memory}
            cpu_time={outputData.cpu_time}
            status_code={outputData.status_code}
            theme={theme}
          />

          {/* Input Section */}
          <div className="mt-4">
            <h2 className="text-xl font-bold my-2">Input</h2>
            <input
              type="text"
              value={stdin}
              onChange={handleStdinChange}
              placeholder="Enter stdin here..."
              className={`border p-2 text-black rounded ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
