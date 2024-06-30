import React, { useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { defineTheme } from '../utils/defineTheme'
import { languageOptions } from '../utils/languageOptions'
import LanguageSelector from './LanguageSelector'
import OutputDisplay from './OutputDisplay'
import LoadingSpinner from './LoadingSpinner'
import useDebounce from '../hooks/useDebounce'
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage'
import { LuSun, LuMoon } from 'react-icons/lu'

const MonacoEditor = dynamic(import('@monaco-editor/react'), { ssr: false })

const CodeEditor = () => {
    const [language, setLanguage] = useState(languageOptions[0])
    const [code, setCode] = useState('')
    const [theme, setTheme] = useState('vs-dark')
    const [outputDetails, setOutputDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [autoRun, setAutoRun] = useState(false)
    const [stdinInput, setStdinInput] = useState('')
    const [isClient, setIsClient] = useState(false)

    const debouncedCode = useDebounce(code, 1000)

    useEffect(() => {
        setIsClient(true)
        const savedLanguage = loadFromLocalStorage('language')
        const savedCode = loadFromLocalStorage('code')
        const savedTheme = loadFromLocalStorage('theme')
        const savedAutoRun = loadFromLocalStorage('autoRun')

        if (savedLanguage) setLanguage(savedLanguage)
        if (savedCode) setCode(savedCode)
        if (savedTheme) setTheme(savedTheme)
        if (savedAutoRun !== null) setAutoRun(savedAutoRun)
    }, [])

    useEffect(() => {
        if (autoRun && isClient) {
            handleSubmit()
        }
    }, [debouncedCode, autoRun, isClient])

    useEffect(() => {
        if (isClient) {
            saveToLocalStorage('language', language)
            saveToLocalStorage('code', code)
            saveToLocalStorage('theme', theme)
            saveToLocalStorage('autoRun', autoRun)
        }
    }, [language, code, theme, autoRun, isClient])

    const handleLanguageChange = (selectedOption) => {
        setLanguage(selectedOption)
        setCode('')
        setOutputDetails(null)
    }

    const handleEditorChange = (value) => {
        setCode(value)
    }

    const handleThemeChange = useCallback((th) => {
        const theme = th
        if (['light', 'vs-dark'].includes(theme.value)) {
            setTheme(theme.value)
        } else {
            defineTheme(theme.value).then((_) => setTheme(theme.value))
        }
    }, [])

    const handleToggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'vs-dark' ? 'light' : 'vs-dark'))
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        setOutputDetails(null)

        const formData = {
            language: language.value,
            script: code,
            stdin: stdinInput, // Include stdin input in the request
        }

        try {
            const { data } = await axios.post(
                process.env.NEXT_PUBLIC_API_URL,
                formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            )
            setOutputDetails(data)
        } catch (err) {
            setOutputDetails({
                error:
                    err.response?.data?.error ||
                    'An error occurred while compiling/running the code.',
            })
        } finally {
            setIsLoading(false)
        }
    }

    if (!isClient) {
        return null // or a loading placeholder
    }

    return (
        <div
            className={`compiler-container ${
                theme === 'vs-dark'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-black'
            }`}
        >
            <div className='editor-header flex justify-between items-center mb-4'>
                <LanguageSelector
                    language={language}
                    onLanguageChange={handleLanguageChange}
                />
                <div className='flex items-center space-x-4'>
                    <label className='auto-run-label flex items-center'>
                        <input
                            type='checkbox'
                            checked={autoRun}
                            onChange={(e) => setAutoRun(e.target.checked)}
                            className='mr-2'
                        />
                        Auto-run
                    </label>
                    <button
                        onClick={handleToggleTheme}
                        className='bg-transparent text-white px-4 py-2 rounded hover:bg-transparent'
                    >
                        {theme === 'vs-dark' ? <LuSun /> : <LuMoon />}
                    </button>
                </div>
            </div>
            <MonacoEditor
                height='400px'
                language={language.monaco}
                value={code}
                theme={theme}
                onChange={handleEditorChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 18,
                    automaticLayout: true,
                    snippetSuggestions: 'none',
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    renderLineHighlight: 'all',
                    tabSize: 2,
                }}
            />
            <div className='stdin-input'>
                <label className='block mb-2 text-white text-xl font-extrabold'>
                    Input for stdin:
                </label>
                <textarea
                    value={stdinInput}
                    onChange={(e) => setStdinInput(e.target.value)}
                    className='w-full px-3 py-2 border rounded-lg text-black'
                    rows='3'
                    placeholder='Enter input for stdin...'
                />
            </div>
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className='submit-btn'
            >
                {isLoading ? 'Running...' : 'Run Code'}
            </button>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <OutputDisplay outputDetails={outputDetails} />
            )}
        </div>
    )
}

export default CodeEditor
