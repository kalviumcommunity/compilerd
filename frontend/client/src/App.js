import axios from 'axios';
import './App.css';
import React, {useState} from 'react';

function App() {

  const [script, setScript] = useState('');
  const [language, setLanguage] = useState('c');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    const payload =  {
        language, 
        script
  };
  try {
    const {data} = await axios.post("http://localhost:3000/api/execute",payload)
    setOutput(data.output);
  } catch (err) {
    console.log(err.response);
  }
  }

  return (
    <div className="App">
      <h1>
        Compilerd
      </h1>
      <label> Select Language: </label>
      <select 
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value);
        }}
      >
            <option value = "c"> C </option>
            <option value = "cpp"> C++ </option>
            <option value = "python"> Python </option>
            <option value = "java"> Java </option>
            <option value = "nodejs"> Node.js </option>
            <option value = "ruby"> Ruby </option>
      </select>
      <br />
      <br />
      <textarea 
        rows = '20' 
        cols = '75' 
        value={script} 
        onChange={(e) => {
          setScript(e.target.value);
        }}
      ></textarea>
      <br />
      <br />
      <button onClick={handleSubmit}> Submit </button>
      <br />
      <br />
      <p>{output}</p>
    </div>
  );
}

export default App;
