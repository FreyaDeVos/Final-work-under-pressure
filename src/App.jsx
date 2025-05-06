import { useState } from 'react'
import './App.css'
import WelcomePage from './components/WelcomePage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WelcomePage/>
    </>
  )
}

export default App
