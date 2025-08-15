import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopy from '@mui/icons-material/ContentCopy';

function generatePassword(length: number, opts: { lower: boolean; upper: boolean; numbers: boolean; symbols: boolean; }) {
  const L = 'abcdefghijklmnopqrstuvwxyz';
  const U = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const N = '0123456789';
  const S = '!@#$%^&*()-_=+[]{};:,.<>/?';
  let pool = '';
  if (opts.lower) pool += L;
  if (opts.upper) pool += U;
  if (opts.numbers) pool += N;
  if (opts.symbols) pool += S;
  if (!pool) pool = L + U + N;
  let out = '';
  const array = new Uint32Array(length);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) out += pool[array[i] % pool.length];
  } else {
    for (let i = 0; i < length; i++) out += pool[Math.floor(Math.random() * pool.length)];
  }
  return out;
}

export interface GeneratorDialogProps {
  open: boolean;
  initialLength?: number;
  onClose: () => void;
  onUse: (password: string) => void;
}

export default function GeneratorDialog({ open, initialLength = 16, onClose, onUse }: GeneratorDialogProps) {
  const [length, setLength] = React.useState(initialLength);
  const [lower, setLower] = React.useState(true);
  const [upper, setUpper] = React.useState(true);
  const [numbers, setNumbers] = React.useState(true);
  const [symbols, setSymbols] = React.useState(false);
  const [pwd, setPwd] = React.useState('');

  const regen = React.useCallback(() => {
    setPwd(generatePassword(length, { lower, upper, numbers, symbols }));
  }, [length, lower, upper, numbers, symbols]);

  React.useEffect(() => {
    if (open) regen();
  }, [open, regen]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Generátor hesla</DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 2, pt: 1 }}>
        <TextField
          label="Délka"
          type="number"
          fullWidth
          margin="dense"
          value={length}
          onChange={(e) => setLength(Math.max(6, Math.min(128, Number(e.target.value) || 0)))}
          InputLabelProps={{ shrink: true }}
          // MUI v6: místo deprecated inputProps použij slotProps
          slotProps={{ input: { inputProps: { min: 6, max: 128 } } }}
        />
        <FormGroup row>
          <FormControlLabel control={<Checkbox checked={lower} onChange={(e) => setLower(e.target.checked)} />} label="malá písmena" />
          <FormControlLabel control={<Checkbox checked={upper} onChange={(e) => setUpper(e.target.checked)} />} label="VELKÁ písmena" />
          <FormControlLabel control={<Checkbox checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />} label="čísla" />
          <FormControlLabel control={<Checkbox checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />} label="symboly" />
        </FormGroup>
        <TextField
          label="Vygenerované heslo"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={regen} aria-label="Vygenerovat nové">
                  <RefreshIcon />
                </IconButton>
                <IconButton onClick={() => navigator.clipboard.writeText(pwd)} aria-label="Kopírovat">
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zavřít</Button>
        <Button variant="contained" onClick={() => onUse(pwd)} disabled={!pwd}>Použít do položky</Button>
      </DialogActions>
    </Dialog>
  );
}
