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
    console.log({data});
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
            <option value = "go">  Go  </option>
            <option value = "php">  PHP  </option>
            <option value = "typescript">  TypeScript  </option>
      </select>
      <br />
      <br />
      <textarea 
        rows = '20' 
        cols = '90' 
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
      <label> Output: </label>
      <br />
      <pre dangerouslySetInnerHTML={{ __html: output }} />
    </div>
  );
}

export default App;
