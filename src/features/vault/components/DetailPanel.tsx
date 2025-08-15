import { useVaultStore } from '../../../app/store/vault'
import { formatRelative } from '../model/time'

export default function DetailPanel() {
  const { items, selectedId } = useVaultStore((s) => ({
    items: s.items,
    selectedId: s.selectedId,
  }))
  const item = items.find((i) => i.id === selectedId)

  if (!item) {
    return <div className="p-4 text-gray-500">Vyber položku</div>
  }

  return (
    <div className="flex h-full flex-col border-l">
      <div className="p-4">
        <h2 className="font-semibold">{item.name}</h2>
        <div className="text-xs text-gray-500">{formatRelative(item.updatedAt)}</div>
      </div>
    </div>
  )
}
