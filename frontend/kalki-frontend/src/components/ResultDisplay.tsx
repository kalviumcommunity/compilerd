import React from 'react';

interface ResultDisplayProps {
  result: any;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div>
      <h2>Result:</h2>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

export default ResultDisplay;