import { useState } from 'react'
import { useVaultStore } from '../../../app/store/vault'
import { formatRelative } from '../model/time'
import { useToast } from '../../../components/Toast'
import { useGeneratorDialog } from './password/GeneratorDialog'

const folders = [
  { key: 'Work', label: 'Práce' },
  { key: 'Personal', label: 'Osobní' },
]

export default function DetailPanel() {
  const { items, selectedId, updateItemPartial } = useVaultStore((s) => ({
    items: s.items,
    selectedId: s.selectedId,
    updateItemPartial: s.updateItemPartial,
  }))
  const item = items.find((i) => i.id === selectedId)
  const showToast = useToast((s) => s.show)
  const [showPassword, setShowPassword] = useState(false)
  const openGenerator = useGeneratorDialog((s) => s.show)

  if (!item) {
    return <div className="p-4 text-gray-500">Vyber položku</div>
  }

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    showToast('Zkopírováno')
  }

  const folderOptions = [...folders]
  if (item.folder && !folderOptions.find((f) => f.key === item.folder)) {
    folderOptions.push({ key: item.folder, label: item.folder })
  }

  return (
    <div className="flex h-full flex-col border-l">
      <div className="p-4">
        <h2 className="font-semibold">{item.name}</h2>
        <div className="text-xs text-gray-500">{formatRelative(item.updatedAt)}</div>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Název</label>
          <input
            type="text"
            value={item.name}
            onChange={(e) => updateItemPartial(item.id, { name: e.target.value })}
            className="w-full rounded border px-2 py-1"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">URL</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={item.url ?? ''}
              onChange={(e) => updateItemPartial(item.id, { url: e.target.value })}
              className="flex-1 rounded border px-2 py-1"
            />
            <button
              type="button"
              onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
              disabled={!item.url}
              className="rounded border px-2 py-1 text-sm text-blue-600 hover:bg-gray-100 disabled:opacity-50"
            >
              Otevřít
            </button>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Uživatel</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={item.username}
              onChange={(e) =>
                updateItemPartial(item.id, { username: e.target.value })
              }
              className="flex-1 rounded border px-2 py-1"
            />
            <button
              type="button"
              onClick={() => handleCopy(item.username)}
              className="rounded border px-2 py-1 text-sm text-blue-600 hover:bg-gray-100"
            >
              Kopírovat
            </button>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Heslo</label>
          <div className="flex gap-2">
            <input
              type={showPassword ? 'text' : 'password'}
              value={item.password}
              onChange={(e) =>
                updateItemPartial(item.id, { password: e.target.value })
              }
              className="flex-1 rounded border px-2 py-1"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="rounded border px-2 py-1 text-sm text-blue-600 hover:bg-gray-100"
            >
              {showPassword ? 'Schovat' : 'Zobrazit'}
            </button>
            <button
              type="button"
              onClick={() => handleCopy(item.password)}
              className="rounded border px-2 py-1 text-sm text-blue-600 hover:bg-gray-100"
            >
              Kopírovat
            </button>
            <button
              type="button"
              onClick={openGenerator}
              className="rounded border px-2 py-1 text-sm text-blue-600 hover:bg-gray-100"
            >
              Generátor
            </button>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Složka</label>
          <select
            value={item.folder ?? ''}
            onChange={(e) =>
              updateItemPartial(item.id, {
                folder: e.target.value === '' ? undefined : e.target.value,
              })
            }
            className="w-full rounded border px-2 py-1"
          >
            <option value="">(Žádná)</option>
            {folderOptions.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Poznámky</label>
          <textarea
            value={item.notes ?? ''}
            onChange={(e) =>
              updateItemPartial(item.id, { notes: e.target.value })
            }
            className="h-24 w-full rounded border px-2 py-1"
          />
        </div>
      </div>
    </div>
  )
}
