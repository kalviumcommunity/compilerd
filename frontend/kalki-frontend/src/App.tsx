import React, { useState } from 'react';
import CodeEditor from './components/codeEditor';
import LanguageSelector from './components/LanguageSelector';
import ResultDisplay from './components/ResultDisplay';
import { submitCode } from './api.ts';

const App: React.FC = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {
    const response = await submitCode(code, language);
    setResult(response);
  };

  return (
    <div className="App">
      <h1>Code Judge</h1>
      <LanguageSelector onSelect={setLanguage} />
      <CodeEditor code={code} onChange={setCode} />
      <button onClick={handleSubmit}>Submit</button>
      <ResultDisplay result={result} />
    </div>
  );
};

export default App;