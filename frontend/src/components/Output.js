import React from 'react';

function Output({ output }) {
  return (
    <div className="output-container bg-gray-800 p-4 rounded mt-4">
      <h2 className="text-lg font-bold mb-2">Output</h2>
      <pre className="whitespace-pre-wrap">{output}</pre>
    </div>
  );
}

export default Output;
