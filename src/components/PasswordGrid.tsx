import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import type { Password } from '@types'

interface PasswordGridProps {
  passwords: Password[]
}

export default function PasswordGrid({ passwords }: PasswordGridProps) {
  return (
    <Grid container spacing={2} p={3} columns={{ xs: 3 }} sx={{ flexGrow: 1, bgcolor: 'grey.50', overflow: 'auto' }}>
      {passwords.map((p) => (
        <Grid size={1} key={p.Id}>
          <Card variant="outlined">
            <CardActionArea>
              <CardContent>
                <Typography variant="body2">{p.Name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
