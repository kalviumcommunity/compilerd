function executeCode() {
    const language = document.getElementById('language').value;
    const code = document.getElementById('code').value;

    fetch('http://localhost:3000/api/execute/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            language: language,
            script: code,
        }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').textContent = data.output;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('output').textContent = 'Error occurred. Please try again.';
    });
}
