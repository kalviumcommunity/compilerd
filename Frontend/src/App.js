import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import LanguageSelector from './components/LanguageSelector';
import OutputDisplay from './components/OutputDisplay';
import RunButton from './components/RunButton';

const App = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');

  const handleCodeChange = (newCode) => setCode(newCode);

  const handleLanguageChange = (event) => setLanguage(event.target.value);

  const runCode = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/run-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      });
      const result = await response.json();
      setOutput(result.output);
    } catch (error) {
      setOutput('Error running the code.');
    }
  };

  return (
    <div className="app-container">
      <h1>Code Runner</h1>
      <LanguageSelector onChange={handleLanguageChange} />
      <CodeEditor code={code} onCodeChange={handleCodeChange} />
      <RunButton onClick={runCode} />
      <OutputDisplay output={output} />
    </div>
  );
};

export default App;
