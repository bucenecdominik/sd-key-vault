import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import LockIcon from '@mui/icons-material/Lock'
import FolderIcon from '@mui/icons-material/Folder'
import LabelIcon from '@mui/icons-material/Label'
import type { Folder } from '@types'

interface SidebarProps {
  folders: Folder[]
}

const tags = ['Web', 'Email']

export default function Sidebar({ folders }: SidebarProps) {
  return (
    <Box
      sx={{
        width: 260,
        bgcolor: 'background.default',
        height: '100vh',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        flexShrink: 0,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <LockIcon color="primary" />
        <Typography variant="h6">Klíčenka</Typography>
      </Stack>
      <Typography variant="overline" sx={{ mt: 1 }}>
        Složky
      </Typography>
      <List dense>
        {folders.map((folder) => (
          <ListItemButton
            key={folder.Id}
            sx={{ pl: 1, borderRadius: 1, '&:hover': { bgcolor: 'action.hover' } }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <FolderIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={folder.Name} />
          </ListItemButton>
        ))}
      </List>
      <Typography variant="overline" sx={{ mt: 2 }}>
        Štítky
      </Typography>
      <List dense>
        {tags.map((tag) => (
          <ListItemButton
            key={tag}
            sx={{ pl: 1, borderRadius: 1, '&:hover': { bgcolor: 'action.hover' } }}
          >
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
