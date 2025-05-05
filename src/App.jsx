import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ExitButton from './components/ExitButton';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Under Pressure</h1>
      <div className="body">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Goal is to see your heartrate in the box above! 
      </p>
      <div className="exit-button">
      <ExitButton />
      </div>
    </>
  )
}

export default App
