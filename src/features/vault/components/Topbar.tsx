import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import { useVaultStore } from '../../../app/store/vault';
import { exportItems, importItems, mergeById } from '../utils/io';
import { useToast } from '../../../app/store/toast';

export default function Topbar() {
  const setFilterText = useVaultStore((s) => s.setFilterText);
  const items = useVaultStore((s) => s.items);
  const init = useVaultStore((s) => s.init);
  const [value, setValue] = useState('');
  const toast = useToast();

  // Debounce 250 ms
  useEffect(() => {
    const t = setTimeout(() => setFilterText(value), 250);
    return () => clearTimeout(t);
  }, [value, setFilterText]);

  const onExport = () => {
    exportItems(items);
    toast({ message: 'Export hotov', severity: 'success' });
  };

  const onImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const incoming = await importItems(file);
      init(mergeById(items, incoming));
      toast({ message: `Načteno ${incoming.length} položek`, severity: 'success' });
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'message' in err && typeof (err as { message?: unknown }).message === 'string'
          ? (err as { message: string }).message
          : 'Import selhal';
      toast({ message, severity: 'error' });
    }
  };

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
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

        <input id="vault-import" type="file" accept="application/json" style={{ display: 'none' }} onChange={onImport} />
        <label htmlFor="vault-import">
          <Button variant="outlined" startIcon={<UploadIcon />} component="span">Import</Button>
        </label>
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={onExport}>Export</Button>
      </Toolbar>
    </AppBar>
  );
}
