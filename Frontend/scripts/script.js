// List of programming languages
const languages = ["nodejs", "python", "java", "c++", "c", "go"];

// Function to populate the dropdown menu
function populateLanguages() {
    const languageSelect = document.getElementById('language');
    languageSelect.innerHTML = ''; // Clear any existing options
    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language;
        option.textContent = language.charAt(0).toUpperCase() + language.slice(1);
        languageSelect.appendChild(option);
    });
}

document.getElementById('compiler-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const language = document.getElementById('language').value;
    const script = document.getElementById('script').value;

    try {
        const response = await fetch('http://localhost:3000/api/execute/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ language, script })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        if (result.error) {
            document.getElementById('output').textContent = `Error: ${result.compile_message}`;
        } else {
            document.getElementById('output').textContent = result.output;
        }
    } catch (error) {
        document.getElementById('output').textContent = `Fetch error: ${error.message}`;
    }
});

// Populate the languages dropdown on page load
populateLanguages();
