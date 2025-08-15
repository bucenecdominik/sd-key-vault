import { useMemo } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Chip,
  Stack,
  Divider,
  IconButton,
  Avatar,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useVaultStore } from '../../../app/store/vault';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar() {
  const items = useVaultStore((s) => s.items);
  const folder = useVaultStore((s) => s.filters.folder);
  const setFolder = useVaultStore((s) => s.setFolder);
  const navigate = useNavigate();

  const counts = useMemo(() => {
    const work = items.filter((i) => i.folder === 'Work').length;
    const personal = items.filter((i) => i.folder === 'Personal').length;
    return { work, personal, all: items.length };
  }, [items]);

  const entry = (
    <>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={() => navigate('/profile')} aria-label="Uživatelský profil" size="small">
          <Avatar sx={{ width: 32, height: 32 }}><AccountCircle /></Avatar>
        </IconButton>
        <Typography variant="h6" noWrap>Klíčenka</Typography>
      </Toolbar>
      <Divider />
      <Typography variant="overline" sx={{ px: 2, pt: 1, color: 'text.secondary' }}>Složky</Typography>
      <List>
        <ListItemButton selected={!folder} onClick={() => setFolder(undefined)} aria-pressed={!folder}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            <ListItemText primary="Vše" />
            <Chip size="small" label={counts.all} />
          </Stack>
        </ListItemButton>
        <ListItemButton selected={folder === 'Work'} onClick={() => setFolder(folder === 'Work' ? undefined : 'Work')} aria-pressed={folder === 'Work'}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            <ListItemText primary="Práce" />
            <Chip size="small" label={counts.work} />
          </Stack>
        </ListItemButton>
        <ListItemButton selected={folder === 'Personal'} onClick={() => setFolder(folder === 'Personal' ? undefined : 'Personal')} aria-pressed={folder === 'Personal'}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
            <ListItemText primary="Osobní" />
            <Chip size="small" label={counts.personal} />
          </Stack>
        </ListItemButton>
      </List>
    </>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
      open
    >
      {entry}
    </Drawer>
  );
}