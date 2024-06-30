async function executeCode(language, code) {
    const url = 'http://localhost:3000/api/execute/';
    const body = {
      language: language,
      script: code
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
  
    } catch (error) {
      console.error('Error executing code:', error.message);
      throw error;
    }
  }
  
  export { executeCode };
  