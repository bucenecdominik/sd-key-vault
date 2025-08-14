import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LockIcon from '@mui/icons-material/Lock'
import type { Password } from '@types'

interface PasswordGridProps {
  passwords: Password[]
  onSelect: (password: Password) => void
}

export default function PasswordGrid({ passwords, onSelect }: PasswordGridProps) {
  return (
    <Grid
      container
      spacing={2}
      sx={{ flexGrow: 1, overflow: 'auto', bgcolor: 'background.paper', p: 2 }}
    >
      {passwords.map((p) => (
        <Grid item xs={4} key={p.Id}>
          <Paper
            variant="outlined"
            onClick={() => onSelect(p)}
            sx={{ p: 1.5, cursor: 'pointer' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <LockIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body1" fontWeight={500}>
                {p.Name}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {new Date(p.UpdatedAt).toLocaleDateString()}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

