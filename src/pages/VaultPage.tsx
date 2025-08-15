
import { useEffect, useRef } from 'react';
import { Box, Toolbar } from '@mui/material';

import Sidebar from '../features/vault/components/Sidebar';
import Topbar from '../features/vault/components/Topbar';
import ItemList from '../features/vault/components/ItemList';
import DetailPanel from '../features/vault/components/DetailPanel';
import ToastHost from '../features/vault/components/ToastHost';

import { useVaultStore } from '../app/store/vault';
import { mockVaultItems } from '../mocks';

export default function VaultPage() {
  const init = useVaultStore((s) => s.init);
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true; // StrictMode guard
    init(mockVaultItems);
  }, [init]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '240px 1fr 380px', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar />
        <Toolbar />
        <Box sx={{ p: 1, overflow: 'auto' }}>
          <ItemList />
        </Box>
      </Box>
      <Box sx={{ borderLeft: 1, borderColor: 'divider', minWidth: 0 }}>
        <DetailPanel />
      </Box>
      <ToastHost />
    </Box>
  );
}
