import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CodeEditor from './components/CodeEditor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CodeEditor></CodeEditor>
    </>
  )
}

export default App
