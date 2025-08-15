import * as React from 'react';
import {
  Box,
  Container,
  Card,
  Grid,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Stack,
  Avatar,
  Typography,
  Divider,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import Sidebar from '../features/vault/components/Sidebar';
import ToastHost from '../features/vault/components/ToastHost';
import ConfirmDialog from '../features/vault/components/common/ConfirmDialog';
import { useToast } from '../app/store/toast';

export default function ProfilePage() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh' }}>
      {/* Levý panel zůstává – na /profile ukazuje "Zpět na hlavní stránku" */}
      <Sidebar />

      {/* Pravá část: obsah profilu */}
      <Box sx={{ p: 2, overflow: 'auto' }}>
        <Container maxWidth="md" sx={{ py: 2 }}>
          <Typography variant="h4" gutterBottom>Profil</Typography>

          <Grid container spacing={2}>
            <Grid size={{xs : 12, md: 6}} >
              <AccountCard />
            </Grid>

            <Grid size={{xs : 12, md: 6}} >
              <PreferencesCard />
            </Grid>
            <Grid size={{xs : 12, md: 6}} >
              <SecurityCard />
            </Grid>

            <Grid size={{xs : 12, md: 6}} >
              <DangerZoneCard />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <ToastHost />
    </Box>
  );
}

function AccountCard() {
  const toast = useToast();
  const [name, setName] = React.useState('Dominik');
  const [email, setEmail] = React.useState('dominik@example.com');
  const [avatarUrl, setAvatarUrl] = React.useState<string | undefined>(undefined);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    const url = URL.createObjectURL(f);
    setAvatarUrl(url);
    toast({ message: 'Avatar aktualizován (lokálně)', severity: 'success' });
  };

  const onSave = () => {
    // TODO: napojit na API
    toast({ message: 'Profil uložen (mock)', severity: 'success' });
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Účet" subheader="Základní informace o profilu" />
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Avatar src={avatarUrl} sx={{ width: 64, height: 64 }}>
            {name?.[0]?.toUpperCase() ?? 'U'}
          </Avatar>
          <div>
            <input id="avatar-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={onUpload} />
            <label htmlFor="avatar-upload">
              <Button variant="outlined" component="span">Nahrát avatar</Button>
            </label>
          </div>
        </Stack>

        <Grid container spacing={2}>
          <Grid size={{xs : 12, md: 6}} >
            <TextField label="Jméno" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid size={{xs : 12, md: 6}} >
            <TextField label="E-mail" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid size={{xs : 12, md: 6}} >
            <Button variant="contained" onClick={onSave}>Uložit změny</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function PreferencesCard() {
  const toast = useToast();
  const [theme, setTheme] = React.useState<'system'|'light'|'dark'>('system');
  const [lang, setLang] = React.useState<'cs'|'en'>('cs');
  const [copyMask, setCopyMask] = React.useState(true);

  const onSave = () => {
    // TODO: persist do store/API
    toast({ message: 'Předvolby uloženy (mock)', severity: 'success' });
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Předvolby" subheader="Zobrazení a chování aplikace" />
      <CardContent>
        <Stack spacing={2}>
          <TextField
            select
            label="Motiv"
            fullWidth
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'system' | 'light' | 'dark')}
          >
            <MenuItem value="system">Systémový</MenuItem>
            <MenuItem value="light">Světlý</MenuItem>
            <MenuItem value="dark">Tmavý</MenuItem>
          </TextField>

          <TextField
            select
            label="Jazyk"
            fullWidth
            value={lang}
            onChange={(e) => setLang(e.target.value as 'cs' | 'en')}
          >
            <MenuItem value="cs">Čeština</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </TextField>

          <FormControlLabel
            control={<Switch checked={copyMask} onChange={(e) => setCopyMask(e.target.checked)} />}
            label="Při kopírování hesla skrýt hodnotu v UI"
          />

          <Divider />

          <Button variant="contained" onClick={onSave}>Uložit předvolby</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

function SecurityCard() {
  const toast = useToast();
  const [newPass, setNewPass] = React.useState('');
  const [repeatPass, setRepeatPass] = React.useState('');

  const onChangeMaster = () => {
    if (!newPass) return toast({ message: 'Zadej nové heslo', severity: 'warning' });
    if (newPass !== repeatPass) return toast({ message: 'Hesla se neshodují', severity: 'error' });
    // TODO: volání API pro změnu „master“ hesla / klíče
    setNewPass('');
    setRepeatPass('');
    toast({ message: 'Heslo změněno (mock)', severity: 'success' });
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Bezpečnost" subheader="Změna hlavního hesla" />
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Nové heslo"
            type="password"
            fullWidth
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <TextField
            label="Potvrzení hesla"
            type="password"
            fullWidth
            value={repeatPass}
            onChange={(e) => setRepeatPass(e.target.value)}
          />
          <Button variant="contained" onClick={onChangeMaster}>Změnit heslo</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

function DangerZoneCard() {
  const toast = useToast();
  const [open, setOpen] = React.useState(false);
  const onDelete = () => {
    setOpen(false);
    // TODO: API delete
    toast({ message: 'Účet by byl smazán (mock)', severity: 'info' });
  };
  return (
    <Card variant="outlined">
      <CardHeader title="Nebezpečná zóna" subheader="Nevratné akce" />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Smazání účtu odstraní všechna data z Klíčenky. Tuto akci nelze vrátit zpět.
        </Typography>
        <Button color="error" variant="outlined" onClick={() => setOpen(true)}>Smazat účet</Button>
      </CardContent>
      <ConfirmDialog
        open={open}
        title="Smazat účet?"
        description="Opravdu chceš nenávratně smazat účet a všechna data?"
        confirmText="Smazat"
        onConfirm={onDelete}
        onClose={() => setOpen(false)}
      />
    </Card>
  );
}

