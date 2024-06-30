import React, { useState } from 'react';
import LanguageSelector from './LanguageSelector.js';
import CodeEditor from './CodeEditor.js';
import ExecutionResult from './ExecutionResults.js';
import './App.css';

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [code, setCode] = useState('');
  const [executionResult, setExecutionResult] = useState(null);

  const executeCode = async () => {
    if (!selectedLanguage || !code.trim()) {
      alert('Please select a language and enter some code.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
        },
        body: JSON.stringify({
          language: selectedLanguage,
          script: code.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to execute code.');
      }

      const result = await response.json();
      setExecutionResult(result);
    } catch (error) {
      console.error('Error executing code:', error);
      alert('Error executing code. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Code Judge Frontend</h1>
      <LanguageSelector onSelectLanguage={setSelectedLanguage} />
      <CodeEditor value={code} onChange={setCode} />
      <button onClick={executeCode}>Run Code</button>
      {executionResult && <ExecutionResult result={executionResult} />}
    </div>
  );
};

export default App;
