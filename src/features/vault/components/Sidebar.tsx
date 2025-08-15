import { useMemo } from 'react'
import { useVaultStore } from '../../../app/store/vault'
import { selectFilteredItems } from '../selectors'

const folders = [
  { key: 'Work', label: 'Práce' },
  { key: 'Personal', label: 'Osobní' },
]

export default function Sidebar() {
  const filters = useVaultStore((s) => s.filters)
  const setFolder = useVaultStore((s) => s.setFolder)
  const filteredItems = useVaultStore(selectFilteredItems)

  // counts are computed from items after applying current search and filter settings
  const folderCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    filteredItems.forEach((item) => {
      if (item.folder) {
        counts[item.folder] = (counts[item.folder] ?? 0) + 1
      }
    })
    return counts
  }, [filteredItems])

  const handleFolderClick = (folder: string) => {
    setFolder(filters.folder === folder ? undefined : folder)
  }

  return (
    <aside className="flex h-full flex-col gap-6 border-r bg-gray-50 p-4">
      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-500">Složky</h2>
        <ul className="space-y-1">
          {folders.map((f) => (
            <li key={f.key}>
              <button
                type="button"
                onClick={() => handleFolderClick(f.key)}
                className={`flex w-full items-center justify-between rounded px-2 py-1 text-left ${
                  filters.folder === f.key
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{f.label}</span>
                <span className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-700">
                  {folderCounts[f.key] ?? 0}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}
