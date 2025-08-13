import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import LockIcon from '@mui/icons-material/Lock'
import FolderIcon from '@mui/icons-material/Folder'
import LabelIcon from '@mui/icons-material/Label'

const folders = ['Práce', 'Osobní']
const tags = ['Web', 'Email']

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 260,
        bgcolor: 'grey.100',
        borderRight: 1,
        borderColor: 'divider',
        height: '100vh',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        flexShrink: 0,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <LockIcon color="primary" />
        <Typography variant="h6">Klíčenka</Typography>
      </Stack>
      <Divider />
      <Typography variant="overline">Složky</Typography>
      <List dense>
        {folders.map((folder) => (
          <ListItemButton key={folder} sx={{ pl: 1 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <FolderIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={folder} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <Typography variant="overline">Štítky</Typography>
      <List dense>
        {tags.map((tag) => (
          <ListItemButton key={tag} sx={{ pl: 1 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <LabelIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={tag} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}
