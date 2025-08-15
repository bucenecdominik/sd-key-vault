import { Box, Typography, Paper } from '@mui/material'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError() as Error
  return (
    <Box sx={{ minHeight:'100vh', bgcolor:'background.default', display:'flex', alignItems:'center', justifyContent:'center', p:2 }}>
      <Paper sx={{ p:4, maxWidth: 560 }}>
        <Typography variant="h5" color="error" fontWeight={700} gutterBottom>
          Nastala neočekávaná chyba
        </Typography>
        <Typography variant="body1">{error?.message ?? 'Unknown error'}</Typography>
      </Paper>
    </Box>
  )
}

