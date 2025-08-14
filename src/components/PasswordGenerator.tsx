import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'


interface PasswordGeneratorProps {
  open: boolean
  onClose: () => void
}

export default function PasswordGenerator({ open, onClose }: PasswordGeneratorProps) {
  const [length, setLength] = useState(12)
  const [useUpper, setUseUpper] = useState(true)
  const [useLower, setUseLower] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(false)
  const [password, setPassword] = useState('')

  const generatePassword = () => {
    let chars = ''
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (useNumbers) chars += '0123456789'
    if (useSymbols) chars += '!@#$%^&*()_+[]{}|;:,.<>?'
    if (!chars) {
      setPassword('')
      return
    }
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
  }

  const handleCopy = async () => {
    if (password) {
      await navigator.clipboard.writeText(password)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Generátor hesla</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Délka"
            type="number"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            inputProps={{ min: 1 }}
          />
          <FormControlLabel
            control={<Switch checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} />}
            label="Velká písmena"
          />
          <FormControlLabel
            control={<Switch checked={useLower} onChange={(e) => setUseLower(e.target.checked)} />}
            label="Malá písmena"
          />
          <FormControlLabel
            control={<Switch checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} />}
            label="Číslice"
          />
          <FormControlLabel
            control={<Switch checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} />}
            label="Symboly"
          />
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              label="Vygenerované heslo"
              value={password}
              fullWidth
              InputProps={{ readOnly: true }}
            />
            <IconButton onClick={handleCopy} disabled={!password}>
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zavřít</Button>
        <Button variant="contained" onClick={generatePassword}>
          Generovat
        </Button>
      </DialogActions>
    </Dialog>
  )
}

