import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const passwords = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: `Heslo ${i + 1}`,
}))

export default function PasswordGrid() {
  return (
    <Grid container spacing={2} p={2} sx={{ flexGrow: 1 }}>
      {passwords.map((p) => (
        <Grid item xs={12} sm={4} key={p.id}>
          <Card>
            <CardContent>
              <Typography>{p.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
