import { useState } from 'react'
import { create } from 'zustand'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import { useVaultStore } from '../../../../app/store/vault'
import { useToast } from '../../../../app/store/toast'

interface GeneratorState {
  open: boolean
  show: () => void
  hide: () => void
}

export const useGeneratorDialog = create<GeneratorState>((set) => ({
  open: false,
  show: () => set({ open: true }),
  hide: () => set({ open: false }),
}))

export default function GeneratorDialog() {
  const { open, hide } = useGeneratorDialog()
  const selectedId = useVaultStore((s) => s.selectedId)
  const updateItemPartial = useVaultStore((s) => s.updateItemPartial)
  const showToast = useToast()

  const [length, setLength] = useState(16)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(false)
  const [password, setPassword] = useState('')

  const generate = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const nums = '0123456789'
    const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    let chars = letters
    if (numbers) chars += nums
    if (symbols) chars += syms
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    setPassword(result)
  }

  const copy = async () => {
    if (!password) return
    await navigator.clipboard.writeText(password)
    showToast({ message: 'Zkopírováno' })
  }

  const apply = () => {
    if (!password || !selectedId) return
    updateItemPartial(selectedId, { password })
    hide()
  }

  return (
    <Dialog open={open} onClose={hide}>
      <DialogTitle>Generátor hesla</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField
          label={`Délka: ${length}`}
          type="range"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          inputProps={{ min: 8, max: 64 }}
        />
        <FormControlLabel
          control={<Checkbox checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />}
          label="Čísla"
        />
        <FormControlLabel
          control={<Checkbox checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />}
          label="Symboly"
        />
        <TextField label="Heslo" value={password} InputProps={{ readOnly: true }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={generate}>Vygenerovat</Button>
        <Button onClick={copy} disabled={!password}>
          Kopírovat
        </Button>
        <Button onClick={apply} disabled={!password || !selectedId}>
          Použít
        </Button>
        <Button onClick={hide}>Zavřít</Button>
      </DialogActions>
    </Dialog>
  )
}

