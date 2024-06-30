import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function AppContent() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const runCode = () => {
    fetch('http://localhost:3000/api/execute/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: 'nodejs',
        script: code,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.output !== undefined) {
          setOutput(data.output);
          setError('');
        } else {
          setError('Error executing code. Please try again later.');
        }
      })
      .catch(error => {
        setError('Error communicating with server. Please try again later.');
        console.error('Error executing code:', error);
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left side: Code input */}
        <div className="col-md-6">
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Enter the code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        {/* Right side: Output */}
        <div className="col-md-6">
          <h4>Output</h4>
          <div className="border p-3" style={{ height: '100%' }}>
            <Form.Control
              as="textarea"
              rows={10}
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              style={{ height: '100%', resize: 'none' }}
            />
          </div>
        </div>
      </div>
      {/* Run button */}
      <div className="row mt-4">
        <div className="col">
          <Button variant="primary" onClick={runCode}>
            Run
          </Button>
        </div>
      </div>
      {/* Error message */}
      {error && (
        <div className="row mt-4">
          <div className="col">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppContent;