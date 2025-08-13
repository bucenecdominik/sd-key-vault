import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  ContentCopy,
} from '@mui/icons-material'

interface ItemDetailDialogProps {
  open: boolean
  onClose: () => void
}

export default function ItemDetailDialog({ open, onClose }: ItemDetailDialogProps) {
  const [showPass, setShowPass] = useState(false)

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Login Details</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Username" fullWidth />
        <TextField
          margin="dense"
          label="Password"
          type={showPass ? 'text' : 'password'}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPass(!showPass)}>
                  {showPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <IconButton>
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  )
}

