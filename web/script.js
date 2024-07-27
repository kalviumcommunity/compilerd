document.addEventListener('DOMContentLoaded', () => {
    const codeForm = document.getElementById('codeForm');
    const languageSelect = document.getElementById('language');
    const responseDisplay = document.getElementById('response');

    // Initialize CodeMirror
    const codeMirror = CodeMirror.fromTextArea(document.getElementById('script'), {
        mode: 'text/x-c++src', // Default mode can be changed based on selection
        lineNumbers: true,
        theme: 'material', // Theme for CodeMirror
        matchBrackets: true,
        autoCloseBrackets: true,
        lineWrapping: true,
    });

    // Change the mode based on language selection
    languageSelect.addEventListener('change', () => {
        const mode = {
            c: 'text/x-csrc',
            cpp: 'text/x-c++src',
            python: 'text/x-python',
            java: 'text/x-java',
            nodejs: 'text/javascript',
            ruby: 'text/x-ruby',
            promptv1: 'text/plain',
            promptv2: 'text/plain',
            multifile: 'text/plain',
            sqlite3: 'text/plain',
        };
        codeMirror.setOption('mode', mode[languageSelect.value]);
    });

    codeForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form submission

        const language = languageSelect.value;
        const script = codeMirror.getValue(); // Get value from CodeMirror
        const requestData = { language, script };

        try {
            const res = await fetch('http://localhost:3000/api/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const result = await res.json();
            console.log(result); // Display the result in the console
            responseDisplay.textContent = JSON.stringify(result.output, null, 2); // Show formatted result
        } catch (error) {
            console.error('Error:', error);
            responseDisplay.textContent = 'Error occurred while executing code.';
        }
    });
});