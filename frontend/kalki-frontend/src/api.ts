export const submitCode = async (code: string, language: string) => {
    console.log('Submitting code:', { script: code, language });
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          script: code,
          language: language 
        }),
      });
      const data = await response.json();
      console.log('Response:', data);
      return data;
    } catch (error) {
      console.error('Error submitting code:', error);
      throw error;
    }
  };