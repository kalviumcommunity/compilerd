import React from 'react';
import PropTypes from 'prop-types';

const OutputComponent = ({ output, error }) => {
  return (
    <div className="output-container" style={{ 
      backgroundColor: '#1e1e1e', 
      padding: '20px', 
      borderRadius: '8px',
      height: '100%',
      overflow: 'auto', 
      display: 'flex',
      flexDirection: 'column'
    }}>
   
     {error && (
        <h4 style={{ color: 'red', marginBottom: '10px', margin: '0 0 10px 0' }}>Error:</h4>
      )}
      <pre style={{ 
        color: 'white', 
        fontSize: '14px', 
        whiteSpace: 'pre-wrap',
        flex: 1, // Take remaining space
        margin: 0,
        overflow: 'auto' // Add scrolling if content overflows
      }}>
        {error || output}
      </pre>
    </div>
  );
};

OutputComponent.propTypes = {
  output: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};

export default OutputComponent;