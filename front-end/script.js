function runCode() {
    const language = document.getElementById('language').value;
    const code = document.getElementById('code').value;

    document.getElementById('output').innerHTML = '';

    fetch('/api/run', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language, script: code }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('output').innerText = 'Error: ' + error.message;
    });
}
