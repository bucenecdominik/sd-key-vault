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
  Stack,
  Tooltip,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ContentCopy from '@mui/icons-material/ContentCopy';
import DeleteForever from '@mui/icons-material/DeleteForever';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import { useVaultStore } from '../../../app/store/vault';
import { useToast } from '../../../app/store/toast';
import ConfirmDialog from './common/ConfirmDialog';
import GeneratorDialog from './password/GeneratorDialog';

export default function DetailPanel() {
  const selectedId = useVaultStore((s) => s.selectedId);
  const item = useVaultStore((s) => s.items.find((i) => i.id === s.selectedId));
  const update = useVaultStore((s) => s.updateItemPartial);
  const toast = useToast();

  const [showPass, setShowPass] = React.useState(false);
  const [askDelete, setAskDelete] = React.useState(false);
  const [genOpen, setGenOpen] = React.useState(false);

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

  const onDeletePassword = () => {
    update(item.id, { password: '' });
    setAskDelete(false);
    toast({ message: 'Heslo bylo smazáno', severity: 'success' });
  };

  const onUseGenerated = (pwd: string) => {
    update(item.id, { password: pwd });
    setGenOpen(false);
    toast({ message: 'Heslo bylo vygenerováno', severity: 'success' });
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
                <Tooltip title="Kopírovat uživatele">
                  <IconButton onClick={() => copy(item.username)} aria-label="Kopírovat uživatele">
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />

        <Stack direction="row" alignItems="center" spacing={1}>
          <TextField
            fullWidth
            label="Heslo"
            type={showPass ? 'text' : 'password'}
            value={item.password ?? ''}
            onChange={(e) => update(item.id, { password: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title={showPass ? 'Skrýt' : 'Zobrazit'}>
                    <IconButton onClick={() => setShowPass((v) => !v)} aria-label="Zobrazit/skrýt heslo">
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Kopírovat heslo">
                    <IconButton onClick={() => copy(item.password)} aria-label="Kopírovat heslo">
                      <ContentCopy />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <Tooltip title="Vygenerovat heslo">
            <span>
              <IconButton
                color="primary"
                onClick={() => setGenOpen(true)}
                aria-label="Vygenerovat heslo"
              >
                <AutoFixHighIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Smazat heslo">
            <span>
              <IconButton
                color="error"
                onClick={() => setAskDelete(true)}
                aria-label="Smazat heslo"
              >
                <DeleteForever />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>

        <TextField
          select
          label="Složka"
          value={item.folder ?? ''}
          onChange={(e) => update(item.id, { folder: (e.target.value as any) || undefined })}
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

      <ConfirmDialog
        open={askDelete}
        title="Smazat heslo?"
        description="Tato akce vyprázdní pole hesla u této položky. Pokračovat?"
        confirmText="Smazat"
        onConfirm={onDeletePassword}
        onClose={() => setAskDelete(false)}
      />

      <GeneratorDialog
        open={genOpen}
        onClose={() => setGenOpen(false)}
        onUse={onUseGenerated}
      />
    </Card>
  );
}
