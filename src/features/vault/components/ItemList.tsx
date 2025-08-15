import { useVaultStore } from '../../../app/store/vault'
import { selectFilteredItems } from '../selectors'

export default function ItemList() {
  const items = useVaultStore(selectFilteredItems)

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="rounded border p-2">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
