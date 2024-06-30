import React, { useEffect, useState } from 'react';

const ExecutionResult = ({ result }) => {
  const [testResults, setTestResults] = useState(null);

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tests');
        if (!response.ok) {
          throw new Error('Failed to fetch test results.');
        }
        const data = await response.json();
        setTestResults(data.results);
      } catch (error) {
        console.error('Error fetching test results:', error);
        alert('Error fetching test results. Please try again.');
      }
    };

    fetchTestResults();
  }, []);

  return (
    <div className="execution-result">
      <h2>Execution Results</h2>
      <p>Output: {result.output}</p>
      <p>Status Code: {result.status_code}</p>
      <p>Error: {result.error}</p>
      {testResults && (
        <div>
          <h3>Test Results</h3>
          <ul>
            {testResults.map((test, index) => (
              <li key={index}>
                Test {index + 1}: {test.passed ? 'Passed' : 'Failed'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExecutionResult;
