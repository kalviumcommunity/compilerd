import React from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  return (
    <div className="mt-4">
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm bg-gray-50"
        placeholder="Enter your code here..."
      />
    </div>
  );
};

export default CodeEditor;