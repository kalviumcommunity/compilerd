import React from 'react';
import CodeEditor from './components/CodeEditor';
import Navbar from './components/Navbar';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  

  return (
    <LanguageProvider>
      <div>
        <Navbar />
        <CodeEditor />
      </div>
    </LanguageProvider>
  );
}

export default App;
