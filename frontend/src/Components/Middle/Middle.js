import React, { useState, useRef, useEffect } from 'react';
import './middle.css'

const Middle = ({textAreaContent, setTextAreaContent }) => {
  const [dividerPosition, setDividerPosition] = useState(50);
  const [textArea1Lines, setTextArea1Lines] = useState([]);
  

  const textArea1Ref = useRef(null);
  
  useEffect(() => {
    const updateLineNumbers = () => {
      if (textArea1Ref.current) {
        const lines1 = textArea1Ref.current.value.split('\n').length;
        setTextArea1Lines(Array.from(Array(lines1).keys()));
      }
    };

    updateLineNumbers();
    window.addEventListener('resize', updateLineNumbers);

    return () => {
      window.removeEventListener('resize', updateLineNumbers);
    };
  }, []);

  const handleMouseDown = (e) => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const container = document.querySelector('.container');
    const rect = container.getBoundingClientRect();
    const newDividerPosition = ((e.clientX - rect.left) / rect.width) * 100;
    setDividerPosition(newDividerPosition);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTextAreaChange = () => {
    const textArea1 = textArea1Ref.current.value;
    setTextAreaContent({ textArea1});
  };

  return (
    <div className="container">
      <div className="textarea-container" style={{ flex: dividerPosition }}>
        <div className="textarea-with-line-numbers">
          <div className="line-numbers" style={{lineHeight: "26px"}}>
            {textArea1Lines.map((lineNumber) => (
              <span key={lineNumber + 1} className="line-number">{lineNumber + 1}</span>
            ))}
          </div>
          <textarea
            ref={textArea1Ref}
            placeholder="Enter your code here"
            style={{fontSize: "18px", lineHeight: "26px",color: "white", background: "#171f2b"}}
            onChange={() => {
              handleTextAreaChange();
              const lines = textArea1Ref.current.value.split('\n').length;
              setTextArea1Lines(Array.from(Array(lines).keys()));
            }}
          ></textarea>
        </div>
      </div>
      <div className="divider" onMouseDown={handleMouseDown}></div>
      <div className="textarea-container" style={{ flex: 100 - dividerPosition }}>
        <div className="textarea-with-line-numbers">
          
          <textarea
            placeholder="Output of your code"
            value={textAreaContent.textArea2}
            style={{fontSize: "18px", lineHeight: "26px",color: "white", background: "#171f2b"}}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Middle;
