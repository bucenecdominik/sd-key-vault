import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { Password } from '@types'

interface PasswordDetailProps {
  password: Password | null
}

export default function PasswordDetail({ password }: PasswordDetailProps) {
  return (
    <Paper
      square
      elevation={0}
      sx={{
        width: { xs: 320, md: '35%' },
        minWidth: 320,
        borderLeft: 1,
        borderColor: 'divider',
        height: '100vh',
        p: 3,
        flexShrink: 0,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Detail
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Název"
          value={password?.Name ?? ''}
          fullWidth
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Uživatelské jméno"
          value={password?.UserName ?? ''}
          fullWidth
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Popis"
          multiline
          rows={4}
          value={password?.Description ?? ''}
          fullWidth
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Složka"
          value={password?.FolderId ?? ''}
          fullWidth
          InputProps={{ readOnly: true }}
        />
      </Stack>
    </Paper>
  )
}
