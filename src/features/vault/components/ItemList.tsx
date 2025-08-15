import { useMemo, useEffect } from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import StorageIcon from '@mui/icons-material/Storage';
import RedditIcon from '@mui/icons-material/Reddit';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { useVaultStore } from '../../../app/store/vault';
import { filterItems } from '../../vault/selectors';
import { formatRelative } from '../../vault/model/time';

const iconFor = (name?: string) => {
  switch (name) {
    case 'server':
      return <StorageIcon fontSize="small" />;
    case 'reddit':
      return <RedditIcon fontSize="small" />;
    case 'bank':
      return <AccountBalanceIcon fontSize="small" />;
    default:
      return <PublicIcon fontSize="small" />;
  }
};

export default function ItemList() {
  const items = useVaultStore((s) => s.items);
  const filters = useVaultStore((s) => s.filters);
  const selectedId = useVaultStore((s) => s.selectedId);
  const selectItem = useVaultStore((s) => s.selectItem);

  const list = useMemo(() => filterItems(items, filters), [items, filters]);

  // Autoselect první položky: zamez smyčce (závis jen na length/selectedId)
  useEffect(() => {
    if (!selectedId && list.length > 0) {
      selectItem(list[0].id);
    }
  }, [selectedId, list.length, selectItem, list]);
  // pozn.: když bys chtěl být extra opatrný vůči StrictMode, můžeš přidat useRef bránu

  if (list.length === 0) {
    return (
      <Box sx={{ p: 2, color: 'text.secondary' }}>Žádné položky neodpovídají filtru.</Box>
    );
  }

  return (
    <List dense disablePadding>
      {list.map((it) => (
        <ListItemButton
          key={it.id}
          selected={selectedId === it.id}
          onClick={() => selectItem(it.id)}
        >
          <ListItemIcon>{iconFor(it.icon)}</ListItemIcon>
          <ListItemText
            primary={it.name}
            secondary={formatRelative(it.updatedAt)}
          />
        </ListItemButton>
      ))}
    </List>
  );
}