import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
} from '@mui/material'
import { Add as AddIcon, Menu as MenuIcon } from '@mui/icons-material'
import ItemDetailDialog from './ItemDetailDialog'

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Password Vault
          </Typography>
          <IconButton color="inherit" onClick={() => setDialogOpen(true)}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          <ListItem button>
            <ListItemText primary="All Items" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Logins" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Secure Notes" />
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{ p: 2 }}>
        <TextField label="Search" variant="outlined" fullWidth sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Your items will appear here.
        </Typography>
      </Box>

      <ItemDetailDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}

export default App

