import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563EB',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111111',
      secondary: '#555555',
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: 'system-ui, sans-serif',
  },
})
