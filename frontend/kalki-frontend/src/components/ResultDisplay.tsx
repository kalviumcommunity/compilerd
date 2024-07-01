import React from 'react';

interface ResultDisplayProps {
  result: any;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) return null;
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Result</h2>
        <pre className="whitespace-pre-wrap break-words text-sm bg-gray-50 p-4 rounded-md border border-gray-200 overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ResultDisplay;