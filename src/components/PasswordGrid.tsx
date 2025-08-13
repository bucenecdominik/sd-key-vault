import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const passwords = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: `Heslo ${i + 1}`,
}))

export default function PasswordGrid() {
  return (
    <Grid container spacing={2} p={3} columns={3} sx={{ flexGrow: 1, bgcolor: 'grey.50', overflow: 'auto' }}>
      {passwords.map((p) => (
        <Grid item xs={1} key={p.id}>
          <Card variant="outlined">
            <CardActionArea>
              <CardContent>
                <Typography variant="body2">{p.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
