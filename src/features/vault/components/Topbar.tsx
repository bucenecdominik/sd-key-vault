import { useVaultStore } from '../../../app/store/vault'
import { useGeneratorDialog } from './password/GeneratorDialog'

export default function Topbar() {
  const text = useVaultStore((s) => s.filters.text)
  const setFilterText = useVaultStore((s) => s.setFilterText)

  const openGenerator = useGeneratorDialog((s) => s.show)

  return (
    <div className="border-b p-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Hledat v trezoru…"
          value={text}
          onChange={(e) => setFilterText(e.target.value)}
          className="flex-1 rounded border px-3 py-2"
        />
        <button
          type="button"
          onClick={openGenerator}
          className="rounded border px-3 py-2 text-sm text-blue-600 hover:bg-gray-100"
        >
          Generátor
        </button>
      </div>
    </div>
  )
}
