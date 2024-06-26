function compileAndRun() {
    const language = document.getElementById('language').value;
    const code = document.getElementById('code').value;
    const userInput = document.getElementById('userInput').value;
    const output = document.getElementById('output');

    output.textContent = 'Compiling and running...';

    const encodedParams = new URLSearchParams();
    encodedParams.append("language_id", language);
    encodedParams.append("source_code", code);
    encodedParams.append("stdin", userInput);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '528c194945msh8a618ca9464d3d4p15bff6jsnedfe812cf2c0',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: encodedParams
    };

    fetch('https://judge0-ce.p.rapidapi.com/submissions', options)
        .then(response => response.json())
        .then(response => {
            const token = response.token;
            setTimeout(() => getSubmissionResult(token), 2000);
        })
        .catch(err => {
            console.error(err);
            output.textContent = 'Error: ' + err.message;
        });
}

function getSubmissionResult(token) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '528c194945msh8a618ca9464d3d4p15bff6jsnedfe812cf2c0',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };

    fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, options)
        .then(response => response.json())
        .then(response => {
            const output = document.getElementById('output');
            if (response.status.id <= 2) {
                // Status: In Queue or Processing
                setTimeout(() => getSubmissionResult(token), 2000);
            } else if (response.status.id === 3) {
                // Status: Accepted
                output.textContent = response.stdout || 'No output';
            } else {
                // Status: Error
                output.textContent = response.status.description + '\n' + (response.compile_output || response.stderr || 'No error message');
            }
        })
        .catch(err => {
            console.error(err);
            output.textContent = 'Error: ' + err.message;
        });
}