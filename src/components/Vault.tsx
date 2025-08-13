import { useState } from 'react'
import { Box, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

interface VaultItem {
  id: number
  name: string
  username: string
  password: string
}

interface VaultProps {
  onLogout: () => void
}

export default function Vault({ onLogout }: VaultProps) {
  const [items, setItems] = useState<VaultItem[]>(() => {
    const saved = localStorage.getItem('vaultItems')
    return saved ? JSON.parse(saved) : []
  })
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const saveItems = (newItems: VaultItem[]) => {
    setItems(newItems)
    localStorage.setItem('vaultItems', JSON.stringify(newItems))
  }

  const handleAdd = () => {
    const newItem: VaultItem = { id: Date.now(), name, username, password }
    const newItems = [...items, newItem]
    saveItems(newItems)
    setName('')
    setUsername('')
    setPassword('')
  }

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>Vault</h2>
        <Button onClick={onLogout}>Logout</Button>
      </Box>

      <Box display="flex" gap={2} mb={2}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" onClick={handleAdd} disabled={!name || !username || !password}>Add</Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Password</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {item.username}
                <Button size="small" onClick={() => handleCopy(item.username)}>Copy</Button>
              </TableCell>
              <TableCell>
                ****
                <Button size="small" onClick={() => handleCopy(item.password)}>Copy</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

