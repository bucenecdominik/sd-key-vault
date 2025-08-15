import { Snackbar, Alert } from '@mui/material';
import { useToastStore } from '../../../app/store/toast';

export default function ToastHost() {
  const queue = useToastStore((s) => s.queue);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <>
      {queue.map((t) => (
        <Snackbar
          key={t.id}
          open
          autoHideDuration={t.duration ?? 3000}
          onClose={(_, reason) => {
            if (reason === 'clickaway') return;
            dismiss(t.id);
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => dismiss(t.id)}
            severity={t.severity ?? 'info'}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {t.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}