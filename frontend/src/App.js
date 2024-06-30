import React from 'react';
import CodeEditor from './components/CodeEditor';
import Navbar from './components/Navbar';
import { LanguageProvider } from './context/LanguageContext';
import './styles/App.css';

function App() {
  

  return (
    <LanguageProvider>
      <div style={{backgroundColor: '#151515'}}>
        <Navbar />
        <CodeEditor />
      </div>
    </LanguageProvider>
  );
}

export default App;
