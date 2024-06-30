import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import Output from './components/Output';
import './index.css';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('http://localhost:4000/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language, script: code }),
      });
      const result = await response.json();
      setOutput(result.val);
    } catch (error) {
      setOutput('Error running code');
    }
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4 text-center animate-fadeIn">Code Editor</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 p-2">
          <label className="block mb-2 text-lg">Select Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mb-4 p-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="nodejs">Node.js</option>
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
            <option value="swift">Swift</option>
            <option value="go">Go</option>
            <option value="kotlin">Kotlin</option>
          </select>
          <CodeEditor code={code} setCode={setCode} language={language} />
          <button
            onClick={handleRunCode}
            className={`mt-4 px-4 py-2 bg-blue-500 rounded ${isRunning ? 'bg-gray-600' : 'hover:bg-blue-700'}`}
            disabled={isRunning}
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
        <div className="md:w-1/3 p-2">
          <Output output={output} />
        </div>
      </div>
    </div>
  );
}

export default App;
