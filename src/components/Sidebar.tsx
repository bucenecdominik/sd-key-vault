import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'

const folders = ['Práce', 'Osobní']
const tags = ['Web', 'Email']

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        height: '100vh',
        p: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Logo
      </Typography>
      <Typography variant="h6" gutterBottom>
        Klíčenka
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1">Složky</Typography>
      <List dense>
        {folders.map((folder) => (
          <ListItem key={folder}>{folder}</ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1">Štítky</Typography>
      <List dense>
        {tags.map((tag) => (
          <ListItem key={tag}>{tag}</ListItem>
        ))}
      </List>
    </Box>
  )
}
