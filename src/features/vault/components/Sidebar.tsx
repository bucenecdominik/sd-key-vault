import { useMemo } from 'react'
import { useVaultStore } from '../../../app/store/vault'

const folders = [
  { key: 'Work', label: 'Práce' },
  { key: 'Personal', label: 'Osobní' },
]

const fuzzyMatch = (target: string, query: string): boolean => {
  const t = target.toLowerCase()
  const q = query.toLowerCase()
  let ti = 0
  let qi = 0
  while (ti < t.length && qi < q.length) {
    if (t[ti] === q[qi]) {
      qi++
    }
    ti++
  }
  return qi === q.length
}

export default function Sidebar() {
  const { items, filters } = useVaultStore((s) => ({ items: s.items, filters: s.filters }))
  const setFolder = useVaultStore((s) => s.setFolder)

  // counts are computed from items after applying current search text but ignoring folder filter
  const folderCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    const query = filters.text.trim()
    items.forEach((item) => {
      const textMatch = query
        ? [item.name, item.username, item.url ?? '', item.notes ?? ''].some((field) =>
            fuzzyMatch(field, query),
          )
        : true
      if (textMatch && item.folder) {
        counts[item.folder] = (counts[item.folder] ?? 0) + 1
      }
    })
    return counts
  }, [items, filters.text])

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
