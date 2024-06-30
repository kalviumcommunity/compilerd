import React, { useState, useEffect, useContext } from 'react';
import Editor from '@monaco-editor/react';
import { LanguageContext } from '../context/LanguageContext';
import { executeCode } from '../api/api';
import OutputComponent from './OutputComponent';
import '../styles/Editor.css';

function CodeEditor() {
  const { selectedLanguage, runCode, resetRunCode } = useContext(LanguageContext);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  // Set initial code based on selected language
  useEffect(() => {
    switch (selectedLanguage) {
      case 'python':
        setCode(`# Start coding in Python\nprint("Hello, world!")`);
        break;
      case 'java':
        setCode(`// Start coding in Java\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, world!");\n  }\n}`);
        break;
      case 'cpp':
        setCode(`// Start coding in C++\n#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, world!" << endl;\n  return 0;\n}`);
        break;
      case 'c':
        setCode(`// Start coding in C\n#include <stdio.h>\n\nint main() {\n  printf("Hello, world!\\n");\n  return 0;\n}`);
        break;
      case 'nodejs':
        setCode(`// Start coding in Node.js\nconsole.log('Hello, world!');`);
        break;
      case 'ruby':
        setCode(`# Start coding in Ruby\nputs 'Hello, world!'`);
        break;
      case 'php':
        setCode(`// Start coding in PHP\necho "Hello, world!";`);
        break;
      case 'rust':
        setCode(`// Start coding in Rust\nfn main() {\n    println!("Hello, world!");\n}`);
        break;
      case 'perl':
        setCode(`# Start coding in Perl\nprint "Hello, world!\\n";`);
        break;
      case 'sqlite3':
        setCode(`-- Start coding in SQLite3\nSELECT 'Hello, world!';`);
        break;
      default:
        setCode(`// Start coding in ${selectedLanguage}`);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    const execute = async () => {
      if (runCode && code.trim() !== '') {
        try {
          const response = await executeCode(selectedLanguage, code);
          console.log(response); // Log the response for debugging
          if (response.status_code === 200) {
            setOutput(response.output || ''); // Update output state with the response
            setError(response.errorMessage || response.compile_message || ''); // Update error state
          } else {
            setError(response.errorMessage || response.compile_message || 'Unknown error'); // Display error message
          }
        } catch (error) {
          console.error('Error executing code:', error);
          setError('Error executing code'); 
        } finally {
          resetRunCode(); 
        }
      }
    };

    execute();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runCode]);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div className='editor-container'>
      <div className='editor-section'>
        <div className='editor-header'>Your Code</div>
        <Editor
          height="60vh"
          theme="vs-dark"
          language={selectedLanguage}
          value={code}
          onChange={handleEditorChange}
        />
      </div>
      
      <div className='output-section'>
        <div className='output-header'>Output</div>
        <OutputComponent output={output} error={error} />
      </div>
    </div>
  );

}

export default CodeEditor;
