import React from 'react';
import MonacoEditor from '@monaco-editor/react';

const languageModes = {
  cpp: 'cpp',
  python: 'python',
  java: 'java',
  nodejs: 'javascript',
  ruby: 'ruby',
  php: 'php',
  swift: 'swift',
  go: 'go',
  kotlin: 'kotlin',
};

function CodeEditor({ code, setCode, language }) {
  return (
    <MonacoEditor
      height="60vh"
      language={languageModes[language]}
      value={code}
      theme="vs-dark"
      onChange={(value) => setCode(value)}
    />
  );
}

export default CodeEditor;
