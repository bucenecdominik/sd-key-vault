import { createTheme } from '@mui/material/styles'

const baseTheme = createTheme({
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

export const theme = createTheme(baseTheme, {
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: baseTheme.palette.common.black,
          '& + .MuiSwitch-track': {
            backgroundColor: baseTheme.palette.common.white,
            border: `1px solid ${baseTheme.palette.common.black}`,
            opacity: 1,
          },
          '&.Mui-checked': {
            color: baseTheme.palette.common.white,
            '& + .MuiSwitch-track': {
              backgroundColor: baseTheme.palette.common.black,
              opacity: 1,
            },
          },
        },
      },
    },
  },
})
