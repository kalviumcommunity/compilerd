import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [language, setLanguage] = useState('cpp');
    const [code, setCode] = useState('');
    const [stdin, setStdin] = useState('');
    const [output, setOutput] = useState('');
    const [versionName, setVersionName] = useState('');
    const [versions, setVersions] = useState([]);

    const languages = ['cpp', 'nodejs', 'python', 'c', 'java', 'ruby'];

    const fetchVersions = async () => {
        const response = await axios.get('http://localhost:3000/api/versions');
        setVersions(response.data);
    };

    useEffect(() => {
        fetchVersions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/execute/', {
                language,
                script: code,
                stdin,
            });
            setOutput(response.data.output || response.data.error);
        } catch (error) {
            setOutput('An error occurred while executing the code.');
        }
    };

    const handleSave = async () => {
        await axios.post('http://localhost:3000/api/save', {
            versionName,
            code,
        });
        setVersionName('');
        fetchVersions();
    };

    const handleRetrieve = async (versionName) => {
        const response = await axios.post('http://localhost:3000/api/retrieve', {
            versionName,
        });
        setCode(response.data.code);
    };

    return (
        <div className="App">
            <h1>Code Judge</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Language:
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                        {languages.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Code:
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        rows="10"
                        cols="50"
                    />
                </label>
                <br />
                <label>
                    Standard Input:
                    <textarea
                        value={stdin}
                        onChange={(e) => setStdin(e.target.value)}
                        rows="4"
                        cols="50"
                    />
                </label>
                <br />
                <button type="submit">Run Code</button>
            </form>
            <h2>Output:</h2>
            <pre>{output}</pre>
            <h2>Save Version</h2>
            <label>
                Version Name:
                <input
                    type="text"
                    value={versionName}
                    onChange={(e) => setVersionName(e.target.value)}
                />
            </label>
            <button onClick={handleSave}>Save</button>
            <h2>Saved Versions</h2>
            <ul>
                {versions.map((version) => (
                    <li key={version.versionName}>
                        {version.versionName}
                        <button onClick={() => handleRetrieve(version.versionName)}>Load</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
