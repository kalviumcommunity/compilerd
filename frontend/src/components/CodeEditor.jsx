import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

function CodeEditor() {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [editorKey, setEditorKey] = useState(Date.now());
  const editorDefaultValue = `// Start coding in ${selectedLanguage}`;

  function handleEditorChange(value, event) {
    // Handle editor change logic here
  }

  function handleEditorDidMount(editor, monaco) {
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
  }

  function handleEditorWillMount(monaco) {
    console.log('beforeMount: the monaco instance:', monaco);
  }

  function handleEditorValidation(markers) {
    // Handle editor validation logic here
  }

  useEffect(() => {
    setEditorKey(Date.now()); 
    console.log(`Editor remounted for language: ${selectedLanguage}`);
  }, [selectedLanguage]);

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    console.log(`Selected language: ${selectedLang}`);
    setSelectedLanguage(selectedLang);
  };

  return (
    <div>
      <label htmlFor="language-select">Select a language:</label>
      <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="c">C</option>
        <option value="nodejs">Node.js</option>
        <option value="ruby">Ruby</option>
        <option value="php">PHP</option>
        <option value="rust">Rust</option>
        <option value="perl">Perl</option>
        <option value="sqlite3">SQLite3</option>
      </select>

      <Editor
        key={editorKey} 
        height="70vh"
        theme="vs-dark"
        language={selectedLanguage}
        defaultValue={editorDefaultValue}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onValidate={handleEditorValidation}
      />
    </div>
  );
}

export default CodeEditor;
