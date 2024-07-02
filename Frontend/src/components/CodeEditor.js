import React from 'react';

const CodeEditor = ({ code, onChange }) => {
  return (
    <textarea
      value={code}
      onChange={(e) => onChange(e.target.value)}
      rows="10"
      cols="50"
      placeholder="Write your code here..."
    />
  );
};

export default CodeEditor;
