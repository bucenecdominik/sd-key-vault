import { useMemo } from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import LockIcon from '@mui/icons-material/Lock'
import FolderIcon from '@mui/icons-material/Folder'
import { useVaultStore } from '../../../app/store/vault'

const folders = [
  { key: 'Work', label: 'Práce' },
  { key: 'Personal', label: 'Osobní' },
]

const drawerWidth = 240

export default function Sidebar() {
  const items = useVaultStore((s) => s.items)
  const filters = useVaultStore((s) => s.filters)
  const setFolder = useVaultStore((s) => s.setFolder)

  const folderCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    const query = filters.text.trim().toLowerCase()
    items.forEach((item) => {
      const textMatch = query
        ? [item.name, item.username ?? '', item.url ?? '', item.notes ?? ''].some((field) =>
            field.toLowerCase().includes(query),
          )
        : true
      if (textMatch && item.folder) {
        counts[item.folder] = (counts[item.folder] ?? 0) + 1
      }
    })
    return counts
  }, [items, filters.text])

  const handleClick = (folder?: string) => {
    setFolder(filters.folder === folder ? undefined : folder)
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <LockIcon color="primary" />
        <Typography variant="h6">Klíčenka</Typography>
      </Toolbar>
      <List>
        <ListItemButton selected={!filters.folder} onClick={() => handleClick(undefined)}>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary="Vše" />
        </ListItemButton>
        {folders.map((f) => (
          <ListItemButton
            key={f.key}
            selected={filters.folder === f.key}
            onClick={() => handleClick(f.key)}
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={f.label} />
            <Badge badgeContent={folderCounts[f.key] ?? 0} color="primary" sx={{ ml: 'auto' }} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

