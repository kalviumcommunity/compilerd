document.getElementById('compileButton').addEventListener('click', function() {
    const code = document.getElementById('codeInput').value;
    const outputElement = document.getElementById('output');

    fetch('https://compilerd-backend-url/compile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
    })
    .then(response => response.json())
    .then(data => {
        outputElement.textContent = data.output;
    })
    .catch(error => {
        outputElement.textContent = 'Error: ' + error.message;
    });
});
