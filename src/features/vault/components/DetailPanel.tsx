import { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useVaultStore } from '../../../app/store/vault'
import { formatRelative } from '../model/time'
import { useToast } from '../../../components/Toast'
import { useGeneratorDialog } from './password/GeneratorDialog'

const folders = [
  { key: 'Work', label: 'Práce' },
  { key: 'Personal', label: 'Osobní' },
]

export default function DetailPanel() {
  const items = useVaultStore((s) => s.items)
  const selectedId = useVaultStore((s) => s.selectedId)
  const updateItemPartial = useVaultStore((s) => s.updateItemPartial)
  const item = items.find((i) => i.id === selectedId)
  const showToast = useToast((s) => s.show)
  const [showPassword, setShowPassword] = useState(false)
  const openGenerator = useGeneratorDialog((s) => s.show)

  if (!item) {
    return (
      <Box p={4} color="text.secondary">
        Vyber položku
      </Box>
    )
  }

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    showToast('Zkopírováno')
  }

  const folderOptions = [...folders]
  if (item.folder && !folderOptions.find((f) => f.key === item.folder)) {
    folderOptions.push({ key: item.folder, label: item.folder })
  }

  return (
    <Paper
      square
      sx={{ width: 360, display: 'flex', flexDirection: 'column', borderLeft: 1, borderColor: 'divider' }}
    >
      <Box p={2}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="caption" color="text.secondary">
          {formatRelative(item.updatedAt)}
        </Typography>
      </Box>
      <Box flex={1} p={2} display="flex" flexDirection="column" gap={2} overflow="auto">
        <TextField
          label="Název"
          value={item.name}
          onChange={(e) => updateItemPartial(item.id, { name: e.target.value })}
          fullWidth
        />
        <Box display="flex" gap={1}>
          <TextField
            label="URL"
            value={item.url ?? ''}
            onChange={(e) => updateItemPartial(item.id, { url: e.target.value })}
            fullWidth
          />
          <Button
            variant="outlined"
            onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
            disabled={!item.url}
            startIcon={<OpenInNewIcon />}
          >
            Otevřít
          </Button>
        </Box>
        <TextField
          label="Uživatel"
          value={item.username ?? ''}
          onChange={(e) => updateItemPartial(item.id, { username: e.target.value })}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Kopírovat uživatele"
                  onClick={() => handleCopy(item.username ?? '')}
                  edge="end"
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box display="flex" gap={1} alignItems="flex-end">
          <TextField
            label="Heslo"
            type={showPassword ? 'text' : 'password'}
            value={item.password ?? ''}
            onChange={(e) => updateItemPartial(item.id, { password: e.target.value })}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'Schovat heslo' : 'Zobrazit heslo'}
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                  <IconButton
                    aria-label="Kopírovat heslo"
                    onClick={() => handleCopy(item.password ?? '')}
                    edge="end"
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="outlined" onClick={openGenerator}>
            Generátor
          </Button>
        </Box>
        <TextField
          select
          label="Složka"
          value={item.folder ?? ''}
          onChange={(e) =>
            updateItemPartial(item.id, {
              folder: e.target.value === '' ? undefined : (e.target.value as 'Work' | 'Personal'),
            })
          }
          fullWidth
        >
          <MenuItem value="">(Žádná)</MenuItem>
          {folderOptions.map((f) => (
            <MenuItem key={f.key} value={f.key}>
              {f.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Poznámky"
          multiline
          rows={4}
          value={item.notes ?? ''}
          onChange={(e) => updateItemPartial(item.id, { notes: e.target.value })}
          fullWidth
        />
      </Box>
    </Paper>
  )
}

