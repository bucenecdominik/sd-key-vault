import { useVaultStore } from '../../../app/store/vault'
import { selectFilteredItems } from '../selectors'
import { formatRelative } from '../model/time'

export default function ItemList() {
  const items = useVaultStore(selectFilteredItems)
  const selectItem = useVaultStore((s) => s.selectItem)

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => selectItem(item.id)}
              className="flex w-full items-center gap-3 rounded border p-2 hover:bg-gray-100"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-200">
                🔐
              </div>
              <span className="flex-1 text-left font-medium">{item.name}</span>
              <span className="text-xs text-gray-500">
                {formatRelative(item.updatedAt)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
