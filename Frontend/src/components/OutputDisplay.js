import React from 'react';

const OutputDisplay = ({ output }) => {
  return (
    <div className="output-display">
      <h2>Output</h2>
      <pre>{output}</pre>
    </div>
  );
};

export default OutputDisplay;
