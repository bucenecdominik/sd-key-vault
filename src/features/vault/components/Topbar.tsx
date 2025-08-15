import { useVaultStore } from '../../../app/store/vault'

export default function Topbar() {
  const text = useVaultStore((s) => s.filters.text)
  const setFilterText = useVaultStore((s) => s.setFilterText)

  return (
    <div className="border-b p-4">
      <input
        type="text"
        placeholder="Hledat v trezoru…"
        value={text}
        onChange={(e) => setFilterText(e.target.value)}
        className="w-full rounded border px-3 py-2"
      />
    </div>
  )
}
