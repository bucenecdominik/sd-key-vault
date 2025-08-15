import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  MenuItem,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ContentCopy from '@mui/icons-material/ContentCopy';

import { useVaultStore } from '../../../app/store/vault';
import { useToast } from '../../../app/store/toast';

type Folder = 'Work' | 'Personal';

export default function DetailPanel() {
  const selectedId = useVaultStore((s) => s.selectedId);
  const item = useVaultStore((s) => s.items.find((i) => i.id === s.selectedId));
  const update = useVaultStore((s) => s.updateItemPartial);
  const toast = useToast();

  const [showPass, setShowPass] = React.useState(false);

  if (!selectedId || !item) {
    return (
      <Box sx={{ p: 2, color: 'text.secondary' }}>Vyber položku ze seznamu.</Box>
    );
  }

  const copy = async (val?: string) => {
    if (!val) return;
    await navigator.clipboard.writeText(val);
    toast({ message: 'Zkopírováno', severity: 'success' });
  };

  return (
    <Card variant="outlined" sx={{ m: 2 }}>
      <CardContent sx={{ display: 'grid', gap: 2 }}>
        <Typography variant="h6">{item.name}</Typography>
        <TextField
          label="Název"
          value={item.name}
          onChange={(e) => update(item.id, { name: e.target.value })}
        />
        <TextField
          label="URL"
          value={item.url ?? ''}
          onChange={(e) => update(item.id, { url: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
                >
                  Otevřít
                </Button>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Uživatel"
          value={item.username ?? ''}
          onChange={(e) => update(item.id, { username: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => copy(item.username)} aria-label="Kopírovat uživatele">
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Heslo"
          type={showPass ? 'text' : 'password'}
          value={item.password ?? ''}
          onChange={(e) => update(item.id, { password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPass((v) => !v)} aria-label="Zobrazit/skrýt heslo">
                  {showPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <IconButton onClick={() => copy(item.password)} aria-label="Kopírovat heslo">
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          label="Složka"
          value={item.folder ?? ''}
          onChange={(e) => update(item.id, { folder: (e.target.value as Folder) || undefined })}
        >
          <MenuItem value="">(Žádná)</MenuItem>
          <MenuItem value="Work">Práce</MenuItem>
          <MenuItem value="Personal">Osobní</MenuItem>
        </TextField>
        <TextField
          label="Poznámky"
          value={item.notes ?? ''}
          onChange={(e) => update(item.id, { notes: e.target.value })}
          multiline
          minRows={3}
        />
      </CardContent>
    </Card>
  );
}