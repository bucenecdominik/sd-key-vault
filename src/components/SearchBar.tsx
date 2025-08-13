import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function SearchBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <TextField size="small" placeholder="Vyhledat" />
      <Button variant="outlined">Generátor</Button>
      <Button variant="contained">Nová položka</Button>
    </Box>
  )
}
