import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useVaultStore } from '../../../app/store/vault';

export default function Topbar() {
  const setFilterText = useVaultStore((s) => s.setFilterText);
  const [value, setValue] = useState('');

  // Debounce 250 ms
  useEffect(() => {
    const t = setTimeout(() => setFilterText(value), 250);
    return () => clearTimeout(t);
  }, [value, setFilterText]);

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 0 }}>Klíčenka</Typography>
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="small"
          placeholder="Hledat v trezoru…"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 300, flexGrow: 1, maxWidth: 640 }}
        />
      </Toolbar>
    </AppBar>
  );
}