import React, {useContext} from 'react';
import '../styles/Navbar.css';  
import { Select } from "antd";
import { LanguageContext } from '../context/LanguageContext';

const { Option } = Select;

function Navbar() {

  const { selectedLanguage, setSelectedLanguage, handleRunCode } = useContext(LanguageContext);


  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
  };

  return (
    <div className='navbar'>
      <div className='left-section'>
        <span className='action-text' >Save File</span>
        <span className='action-text' style={{cursor: 'pointer'}} onClick={handleRunCode}>Run Code</span>
      </div>

      <div className='right-section'>   
        <Select
          placeholder="Select a Language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          style={{ width: 200 }}
        >
          <Option value="python">Python</Option>
          <Option value="java">Java</Option>
          <Option value="cpp">C++</Option>
          <Option value="c">C</Option>
          <Option value="nodejs">Node.js</Option>
          <Option value="ruby">Ruby</Option>
          <Option value="php">PHP</Option>
          <Option value="rust">Rust</Option>
          <Option value="perl">Perl</Option>
          <Option value="sqlite3">SQLite3</Option>
        </Select>
      </div>
    </div>
  );
}

export default Navbar;
