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
              className="flex w-full items-center rounded border p-2 text-left hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-200">
                  🔐
                </div>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">
                    {formatRelative(item.updatedAt)}
                  </div>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
