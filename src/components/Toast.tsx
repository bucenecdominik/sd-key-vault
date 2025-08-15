import { create } from 'zustand'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

interface ToastState {
  message: string | null
  show: (msg: string) => void
  clear: () => void
}

export const useToast = create<ToastState>((set) => ({
  message: null,
  show: (message) => set({ message }),
  clear: () => set({ message: null }),
}))

export default function Toast() {
  const { message, clear } = useToast()
  const open = Boolean(message)

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={(_, reason) => {
      if (reason === 'clickaway') return
      clear()
    }}>
      <Alert onClose={clear} severity="info" variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
