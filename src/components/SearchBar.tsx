import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export default function SearchBar() {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField size="small" placeholder="Vyhledat" />
          <Button variant="outlined">Generátor</Button>
          <Button variant="contained">Nová položka</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
