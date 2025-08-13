import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

interface VaultItem {
  id: number
  name: string
  username: string
  password: string
}

export default function Vault() {
  const [items, setItems] = useState<VaultItem[]>(() => {
    const saved = localStorage.getItem('vaultItems')
    return saved ? JSON.parse(saved) : []
  })
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
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
    setOpen(false)
  }

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Vault
          </Typography>
          <TextField
            size="small"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{ bgcolor: 'background.paper', borderRadius: 1, mr: 1 }}
          />
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 2 }}>
        <List>
          {filtered.map(item => (
            <ListItem key={item.id} divider>
              <ListItemText primary={item.name} secondary={item.username} />
              <IconButton edge="end" aria-label="copy username" onClick={() => handleCopy(item.username)}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
              <IconButton edge="end" aria-label="copy password" onClick={() => handleCopy(item.password)}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField label="Name" value={name} onChange={e => setName(e.target.value)} />
            <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!name || !username || !password}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
