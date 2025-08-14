import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import PasswordGenerator from './PasswordGenerator'

export default function SearchBar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ bgcolor: 'background.paper' }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <TextField size="small" placeholder="Vyhledat" sx={{ flexGrow: 1 }} />
          <Button onClick={() => setOpen(true)}>Generátor</Button>
          <Button variant="contained">Nová položka</Button>
        </Toolbar>
      </AppBar>
      <PasswordGenerator open={open} onClose={() => setOpen(false)} />
    </>
  )
}
