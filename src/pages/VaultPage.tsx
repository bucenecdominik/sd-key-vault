import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Sidebar from '../features/vault/components/Sidebar'
import Topbar from '../features/vault/components/Topbar'
import ItemList from '../features/vault/components/ItemList'
import DetailPanel from '../features/vault/components/DetailPanel'
import Toast from '../components/Toast'
import GeneratorDialog from '../features/vault/components/password/GeneratorDialog'
import { mockVaultItems } from '../mocks'
import { useVaultStore } from '../app/store/vault'

export default function VaultPage() {
  const init = useVaultStore((s) => s.init)

  useEffect(() => {
    init(mockVaultItems)
  }, [init])

  return (
    <>
      <Box display="flex" height="100vh">
        <Sidebar />
        <Box flex={1} display="flex" flexDirection="column">
          <Topbar />
          <ItemList />
        </Box>
        <DetailPanel />
      </Box>
      <Toast />
      <GeneratorDialog />
    </>
  )
}
