import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

const CodeEditor = ({ value, onChange }) => {
  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  return (
    <div className="code-editor">
      <label htmlFor="code-input">Enter your code:</label>
      <CodeMirror
        className='code-editor2'
        value={value}
        options={{
          mode: 'javascript', // Adjust based on selected language
          theme: 'material',
          lineNumbers: true,
        }}
        onBeforeChange={handleChange}
      />
    </div>
  );
};

export default CodeEditor;
