import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import { useVaultStore } from '../../../app/store/vault'
import { useGeneratorDialog } from './password/GeneratorDialog'

export default function Topbar() {
  const text = useVaultStore((s) => s.filters.text)
  const setFilterText = useVaultStore((s) => s.setFilterText)
  const openGenerator = useGeneratorDialog((s) => s.show)

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        <TextField
          size="small"
          placeholder="Hledat v trezoru…"
          value={text}
          onChange={(e) => setFilterText(e.target.value)}
          sx={{ flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <Button onClick={openGenerator}>Generátor</Button>
        <Button variant="contained">Nová</Button>
      </Toolbar>
    </AppBar>
  )
}

