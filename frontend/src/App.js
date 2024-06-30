import './App.css';
import Middle from './Components/Middle/Middle';
import Navbar from './Components/Navbar/Navbar';
import { useState } from 'react';

function App() {

  const [language, setLanguage] = useState('');
  const [textAreaContent, setTextAreaContent] = useState({ textArea1: '', textArea2: ''});

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    console.log(selectedLanguage);
  };

  const handleSubmit = async () => {
    const data = {
      language,
      script: textAreaContent.textArea1
    };
    console.log(data)

    try {
      const response = await fetch('http://localhost:3000/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);

      setTextAreaContent(prevContent => ({
        ...prevContent,
        textArea2: result.output + result.compile_message

      }));
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="App" style={{display: "flex", flexDirection: "column"}}>
      <Navbar onLanguageChange={handleLanguageChange} onSubmit={handleSubmit} />
      <Middle textAreaContent={textAreaContent} setTextAreaContent={setTextAreaContent} />
    </div>
  );
}

export default App;
