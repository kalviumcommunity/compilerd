import React, { useState, useEffect, useRef } from 'react';

const CodeEditor = ({ script, setScript, theme }) => {
  const [numLines, setNumLines] = useState(1);
  const editorRef = useRef(null);
  const lineNumbersRef = useRef(null);

  useEffect(() => {
    const lines = script.split('\n').length;
    setNumLines(lines);
  }, [script]);

  const handleScroll = () => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = editorRef.current.scrollTop;
    }
  };

  return (
    <div className="my-5 relative">
      <label htmlFor="code" className="block text-xl mb-2 font-bold">Your Code</label>
      <div className="flex">
        <div
          ref={lineNumbersRef}
          className={`text-gray-400 text-md w-10 p-2 overflow-hidden ${theme === 'dark' ? 'bg-black text-white' : 'bg-white border text-black'}`}
          style={{ height: '50vh' /* same as h-64 */, overflowY: 'hidden' }}
        >
          {Array.from(Array(numLines), (_, index) => index + 1).map((lineNum) => (
            <div key={lineNum}>{lineNum}</div>
          ))}
        </div>
        <textarea
          id="code"
          ref={editorRef}
          value={script}
          onChange={(e) => setScript(e.target.value)}
          onScroll={handleScroll}
          className={`block flex-1 w-full h-[50vh] text-md p-2 overflow-auto ${theme === 'dark' ? 'bg-black text-white' : 'bg-white border text-black'}`}
          style={{ outline: 'none', resize: 'none' }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;

