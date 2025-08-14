import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import LockIcon from '@mui/icons-material/Lock'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import type { Password } from '@types'

interface PasswordGridProps {
  passwords: Password[]
}

export default function PasswordGrid({ passwords }: PasswordGridProps) {
  return (
    <Paper
      square
      elevation={0}
      sx={{ flexGrow: 1, overflow: 'auto', bgcolor: 'background.paper' }}
    >
      <List disablePadding>
        {passwords.map((p) => (
          <ListItemButton
            key={p.Id}
            divider
            sx={{
              py: 1.5,
              borderRadius: 1,
              '&:hover': { bgcolor: 'grey.100' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LockIcon color="action" />
            </ListItemIcon>
            <ListItemText
              primary={p.Name}
              secondary={p.UserName}
              primaryTypographyProps={{ fontWeight: 500 }}
            />
            <IconButton edge="end" aria-label="more">
              <MoreVertIcon />
            </IconButton>
          </ListItemButton>
        ))}
      </List>
    </Paper>
  )
}
