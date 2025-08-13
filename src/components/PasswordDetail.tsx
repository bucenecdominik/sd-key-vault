import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function PasswordDetail() {
  return (
    <Box
      sx={{
        width: 300,
        borderLeft: 1,
        borderColor: 'divider',
        height: '100vh',
        p: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Detail
      </Typography>
      <TextField label="Název" fullWidth margin="normal" />
      <TextField label="Heslo" type="password" fullWidth margin="normal" />
      <TextField label="Popis" multiline rows={4} fullWidth margin="normal" />
      <TextField label="Složka" fullWidth margin="normal" />
    </Box>
  )
}
