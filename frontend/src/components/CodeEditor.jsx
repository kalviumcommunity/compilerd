import React, { useState, useEffect, useContext } from 'react';
import Editor from '@monaco-editor/react';
import { LanguageContext } from '../context/LanguageContext';
import { executeCode, fixCode } from '../api/api';
import OutputComponent from './OutputComponent';
import '../styles/Editor.css';

function CodeEditor() {
  const { selectedLanguage, runCode, resetRunCode } = useContext(LanguageContext);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [fixedCode, setFixedCode] = useState('');
  const [explanation, setExplanation] = useState('');

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
          console.log(response);
          if (response.status_code === 200) {
            setOutput(response.output || '');
            setError(response.errorMessage || response.compile_message || '');
            if (response.errorMessage || response.compile_message) {
              await handleFixCode(response.errorMessage || response.compile_message);
            }
          } else {
            setError(response.errorMessage || response.compile_message || 'Unknown error');
            await handleFixCode(response.errorMessage || response.compile_message || 'Unknown error');
          }
        } catch (error) {
          console.error('Error executing code:', error);
          setError('Error executing code');
          await handleFixCode('Error executing code');
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

  const handleFixCode = async (errorMessage) => {
    try {
      const response = await fixCode(selectedLanguage, code, errorMessage);
      setFixedCode(response.fixedCode);
      setExplanation(response.explanation);
    } catch (error) {
      console.error('Error fixing code:', error);
      setExplanation('Unable to fix the code at this time.');
    }
  };

  return (
    <div className='editor-container'>
      <div className='editor-section'>
        <div className='editor-code-container'>
          <div className={error ? 'editor-code-error' : 'editor-code'}>
            <div className='editor-header'>Your Code</div>
            <Editor
              height="60vh"
              theme="vs-dark"
              language={selectedLanguage}
              value={code}
              onChange={handleEditorChange}
            />
          </div>
          {error && (
            <div className='editor-fix'>
              <div className='editor-header'>Fixed Code</div>
              <Editor
                height="60vh"
                theme="vs-dark"
                language={selectedLanguage}
                value={fixedCode}
                options={{ readOnly: true }} // Make this editor read-only
              />
            </div>
          )}
        </div>
      </div>

      <div className='output-section-container'>
        <div className={error ? 'output-section-wrapper' : 'output-section'}>
          <div className='output-box'>
            <div className='output-header'>Output</div>
            <OutputComponent output={output} error={error} />
          </div>
          {error && (
            <div className='explanation-box'>
              <div className='output-header'>Explanation</div>
              <div className='explanation-content'>
                  {explanation}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
