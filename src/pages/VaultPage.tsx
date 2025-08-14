import Sidebar from '../features/vault/components/Sidebar'
import Topbar from '../features/vault/components/Topbar'
import ItemList from '../features/vault/components/ItemList'
import DetailPanel from '../features/vault/components/DetailPanel'

export default function VaultPage() {
  return (
    <div className="grid h-screen grid-cols-[240px_1fr_360px]">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <ItemList />
      </div>
      <DetailPanel />
    </div>
  )
}
