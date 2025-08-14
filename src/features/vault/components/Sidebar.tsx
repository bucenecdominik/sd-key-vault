import { useVaultStore } from '../../../app/store/vault'

const folders = [
  { key: 'Work', label: 'Práce' },
  { key: 'Personal', label: 'Osobní' },
]

const tags = ['work', 'dev', 'finance', 'secret', 'social']

export default function Sidebar() {
  const filters = useVaultStore((s) => s.filters)
  const setFolder = useVaultStore((s) => s.setFolder)
  const toggleTag = useVaultStore((s) => s.toggleTag)

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
                className={`w-full rounded px-2 py-1 text-left ${
                  filters.folder === f.key
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-500">Štítky</h2>
        <ul className="space-y-1">
          {tags.map((tag) => (
            <li key={tag}>
              <button
                type="button"
                onClick={() => toggleTag(tag)}
                className={`w-full rounded px-2 py-1 text-left ${
                  filters.tags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}
