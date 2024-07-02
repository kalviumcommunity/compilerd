let codeMirrorEditor;

document.addEventListener('DOMContentLoaded', function () {
    codeMirrorEditor = CodeMirror.fromTextArea(document.getElementById('code'), {
        lineNumbers: true,
        mode: 'text/x-c++src',
        theme: 'dracula'
    });

    var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
        lineNumbers: true,
        mode: 'text/x-c++src',
        theme: 'solarized dark'  // Initialize with solarized dark theme
    });

    document.getElementById('language').addEventListener('change', function() {
        var language = this.value;
        var mode;
        switch (language) {
            case 'cpp':
                mode = 'text/x-c++src';
                break;
            case 'java':
                mode = 'text/x-java';
                break;
            case 'python':
                mode = 'text/x-python';
                break;
            case 'nodejs':
                mode = 'text/javascript';
                break;
            case 'c':
                mode = 'text/x-csrc';
                break;
            case 'csharp':
                mode = 'text/x-csharp';
                break;
            case 'ruby':
                mode = 'text/x-ruby';
                break;
            case 'go':
                mode = 'text/x-go';
                break;
            case 'php':
                mode = 'application/x-httpd-php';
                break;
            case 'swift':
                mode = 'text/x-swift';
                break;
        }
        editor.setOption('mode', mode);
    });
    

    document.getElementById('theme').addEventListener('change', function() {
        var theme = this.value;
        var themeStylesheet = document.getElementById('theme-stylesheet');
        if (theme === 'solarized-dark') {
            themeStylesheet.href = 'styles-dark.css';
            editor.setOption('theme', 'solarized dark');
        } else {
            themeStylesheet.href = 'styles-light.css';
            editor.setOption('theme', 'solarized light');
        }
    });


    let selectedLanguage; 

    document.getElementById('language').addEventListener('change', function () {
        selectedLanguage = this.value;
        console.log('Selected language:', selectedLanguage);
    });



    document.getElementById('runButton').addEventListener('click', function () {
        debugger

        const languageSelect = document.getElementById('language').addEventListener('change', handleLanguageChange);
       var code = editor.getValue();

        document.getElementById('loader').style.display = 'block';
        document.getElementById('output').textContent = 'Please wait Running your Amazing code ...';
        setTimeout(function() {
        document.getElementById('output').textContent = code;
    }, 100000);


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


   document.getElementById('clearButton').addEventListener('click', function() {
    editor.setValue('');
    document.getElementById('output').textContent = '';
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

