import React from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <textarea
      value={code}
      onChange={(e) => onChange(e.target.value)}
      rows={20}
      cols={80}
    />
  );
};

export default CodeEditor;