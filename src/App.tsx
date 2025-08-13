import { useState } from 'react'
import Login from './components/Login'
import Vault from './components/Vault'
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      {loggedIn ? (
        <Vault onLogout={() => setLoggedIn(false)} />
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </>
  )
}

export default App
