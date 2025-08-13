import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function PasswordDetail() {
  return (
    <Paper
      square
      elevation={0}
      sx={{
        width: 320,
        borderLeft: 1,
        borderColor: 'divider',
        height: '100vh',
        p: 3,
        flexShrink: 0,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Detail
      </Typography>
      <Stack spacing={2}>
        <TextField label="Název" fullWidth />
        <TextField label="Heslo" type="password" fullWidth />
        <TextField label="Popis" multiline rows={4} fullWidth />
        <TextField label="Složka" fullWidth />
      </Stack>
    </Paper>
  )
}
