let codeMirrorEditor;

document.addEventListener('DOMContentLoaded', function () {
    codeMirrorEditor = CodeMirror.fromTextArea(document.getElementById('code'), {
        lineNumbers: true,
        mode: 'text/x-c++src',
        theme: 'dracula'
    });

    document.getElementById('language').addEventListener('change', function () {
        const mode = {
            'cpp': 'text/x-c++src',
            'java': 'text/x-java',
            'python': 'text/x-python',
            'javascript': 'text/javascript',
            'c': 'text/x-csrc',
            'csharp': 'text/x-csharp',
            'go': 'text/x-go',
            'php': 'text/x-php',
            'swift': 'text/x-swift'
        }[this.value];
        codeMirrorEditor.setOption('mode', mode);
    });

    document.getElementById('theme').addEventListener('change', function () {
        codeMirrorEditor.setOption('theme', this.value);
    });


    let selectedLanguage; 

    document.getElementById('language').addEventListener('change', function () {
        selectedLanguage = this.value;
        console.log('Selected language:', selectedLanguage);
    });

    document.getElementById('runButton').addEventListener('click', function () {
        debugger

        const languageSelect = document.getElementById('language').addEventListener('change', handleLanguageChange);


        const code = codeMirrorEditor.getValue();
        document.getElementById('loader').style.display = 'block';
        document.getElementById('output').innerText = '';


        fetch('http://localhost:3000/api/execute/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ language: selectedLanguage, script: code })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('loader').style.display = 'none';
                document.getElementById('output').innerText = data.output + "\n" + (data.code || '');
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('loader').style.display = 'none';
                document.getElementById('output').innerText = 'Error occurred while saving the code: ' + error.message;
            });

    });


    document.getElementById('clearButton').addEventListener('click', function () {
        codeMirrorEditor.setValue('');
        document.getElementById('output').innerText = '';
    });

    codeMirrorEditor.on('focus', function () {
        document.querySelector('.CodeMirror').style.flex = 7;
        document.querySelector('.output-container').style.flex = 3;
    });

});

function handleLanguageChange() {
    const languageSelect = document.getElementById('language');
    const selectedLanguage = languageSelect.value;
    console.log('Selected language:', selectedLanguage);

    let storedLanguage = selectedLanguage;

    return storedLanguage;
}

