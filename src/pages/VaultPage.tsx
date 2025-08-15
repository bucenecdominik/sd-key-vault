import { useEffect } from 'react'
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
      <div className="grid h-screen grid-cols-[240px_1fr_360px]">
        <Sidebar />
        <div className="flex flex-col">
          <Topbar />
          <ItemList />
        </div>
        <DetailPanel />
      </div>
      <Toast />
      <GeneratorDialog />
    </>
  )
}
