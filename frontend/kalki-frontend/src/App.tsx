import React, { useState } from 'react';
import CodeEditor from './components/codeEditor';
import LanguageSelector from './components/LanguageSelector';
import ResultDisplay from './components/ResultDisplay';
import Header from './components/Header';
import Footer from './components/Footer';
import { submitCode } from './api';
import './index.css';
import './App.css';

const App: React.FC = () => {
  const [code, setCode] = useState('print("Hello, World!")');
  const [language, setLanguage] = useState('python');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setError(null);
      console.log('Submitting code:', { script: code, language });
      const response = await submitCode(code, language);
      console.log('Received response:', response);
      if (response.error || response.message) {
        setError(response.error || response.message);
      } else {
        setResult(response);
      }
    } catch (err) {
      console.error('Error during submission:', err);
      setError('An error occurred while submitting the code. Check the console for more details.');
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-8 text-gradient">Code Judge</h1>
          <div className="code-section">
            <div className="language-selector">
              <LanguageSelector onSelect={setLanguage} />
            </div>
            <div className="code-editor">
              <CodeEditor code={code} onChange={setCode} />
              <button onClick={handleSubmit} className="submit-button">
                Submit
              </button>
              {error && <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
            </div>
          </div>
          <ResultDisplay result={result} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;