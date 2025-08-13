import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function SearchBar() {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar sx={{ gap: 2 }}>
        <TextField size="small" placeholder="Vyhledat" sx={{ flexGrow: 1 }} />
        <Button variant="outlined">Generátor</Button>
        <Button variant="contained">Nová položka</Button>
      </Toolbar>
    </AppBar>
  )
}
