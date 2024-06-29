import React from "react";

const OutputDisplay = ({ outputDetails, isLoading }) => {
  if (isLoading) {
    return <div className="loading">Running code...</div>;
  }

  if (!outputDetails) {
    return null;
  }

  if (outputDetails.error) {
    return <pre className="error-output">{outputDetails.error}</pre>;
  }

  return (
    <div className="output-display">
      <pre className="success-output">{outputDetails.output}</pre>
      {/*<div className="metrics">
        <p>Execution Time: {outputDetails.execute_time || "N/A"}</p>
        <p>Memory Used: {outputDetails.memory || "N/A"}</p>
        <p>CPU Time: {outputDetails.cpu_time || "N/A"}</p>
      </div>*/}
    </div>
  );
};

export default OutputDisplay;
