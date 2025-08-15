import { useMemo } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Badge,
} from '@mui/material';
import { useVaultStore } from '../../../app/store/vault';

const drawerWidth = 240;

export default function Sidebar() {
  const items = useVaultStore((s) => s.items);
  const folder = useVaultStore((s) => s.filters.folder);
  const setFolder = useVaultStore((s) => s.setFolder);

  const counts = useMemo(() => {
    const work = items.filter((i) => i.folder === 'Work').length;
    const personal = items.filter((i) => i.folder === 'Personal').length;
    return { work, personal, all: items.length };
  }, [items]);

  const entry = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap> Trezor </Typography>
      </Toolbar>
      <List>
        <ListItemButton
          selected={!folder}
          onClick={() => setFolder(undefined)}
          aria-pressed={!folder}
        >
          <ListItemText primary={`Vše`} secondary={<Badge color="primary" badgeContent={counts.all} />} />
        </ListItemButton>
        <ListItemButton
          selected={folder === 'Work'}
          onClick={() => setFolder(folder === 'Work' ? undefined : 'Work')}
          aria-pressed={folder === 'Work'}
        >
          <ListItemText primary={`Práce`} secondary={<Badge color="primary" badgeContent={counts.work} />} />
        </ListItemButton>
        <ListItemButton
          selected={folder === 'Personal'}
          onClick={() => setFolder(folder === 'Personal' ? undefined : 'Personal')}
          aria-pressed={folder === 'Personal'}
        >
          <ListItemText primary={`Osobní`} secondary={<Badge color="primary" badgeContent={counts.personal} />} />
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