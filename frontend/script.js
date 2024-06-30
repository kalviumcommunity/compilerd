const submitCode = async () => {
    const code = document.getElementById('code').value; // Get code from textarea or input
    const language = document.getElementById('language').value; // Get selected language

    try {
        const response = await fetch('http://localhost:3000/api/run_code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, language }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        const result = await response.json();
        console.log('Execution Output:', result.output); // Handle output from backend
    } catch (error) {
        console.error('Error:', error.message);
    }
};
