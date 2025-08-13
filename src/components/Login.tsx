import { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'

interface LoginProps {
  onLogin: () => void
}

export default function Login({ onLogin }: LoginProps) {
  const stored = localStorage.getItem('masterPassword')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (stored) {
      if (password === stored) {
        onLogin()
      } else {
        setError('Incorrect password')
      }
    } else {
      localStorage.setItem('masterPassword', password)
      onLogin()
    }
  }

  return (
    <Box maxWidth={400} mx="auto" mt={4} display="flex" flexDirection="column" gap={2}>
      <TextField
        type="password"
        label={stored ? 'Master Password' : 'Create Master Password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
      <Button variant="contained" onClick={handleSubmit} disabled={!password}>
        {stored ? 'Unlock' : 'Create'}
      </Button>
    </Box>
  )
}

