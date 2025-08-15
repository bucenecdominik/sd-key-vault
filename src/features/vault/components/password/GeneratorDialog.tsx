import { useState } from 'react'
import { create } from 'zustand'
import { useVaultStore } from '../../../../app/store/vault'
import { useToast } from '../../../../components/Toast'

interface GeneratorState {
  open: boolean
  show: () => void
  hide: () => void
}

export const useGeneratorDialog = create<GeneratorState>((set) => ({
  open: false,
  show: () => set({ open: true }),
  hide: () => set({ open: false }),
}))

export default function GeneratorDialog() {
  const { open, hide } = useGeneratorDialog()
  const { selectedId, updateItemPartial } = useVaultStore((s) => ({
    selectedId: s.selectedId,
    updateItemPartial: s.updateItemPartial,
  }))
  const showToast = useToast((s) => s.show)

  const [length, setLength] = useState(16)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(false)
  const [password, setPassword] = useState('')

  const generate = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const nums = '0123456789'
    const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    let chars = letters
    if (numbers) chars += nums
    if (symbols) chars += syms
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    setPassword(result)
  }

  const copy = async () => {
    if (!password) return
    await navigator.clipboard.writeText(password)
    showToast('Zkopírováno')
  }

  const apply = () => {
    if (!password || !selectedId) return
    updateItemPartial(selectedId, { password })
    hide()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-80 rounded bg-white p-4 shadow">
        <h2 className="mb-4 text-lg font-semibold">Generátor hesla</h2>
        <div className="mb-2">
          <label className="mb-1 block text-sm font-medium">Délka: {length}</label>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="mb-2 flex items-center gap-2">
          <input
            id="numbers"
            type="checkbox"
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
          />
          <label htmlFor="numbers" className="text-sm">
            Čísla
          </label>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <input
            id="symbols"
            type="checkbox"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
          />
          <label htmlFor="symbols" className="text-sm">
            Symboly
          </label>
        </div>
        <div className="mb-4">
          <input
            type="text"
            readOnly
            value={password}
            className="w-full rounded border px-2 py-1"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={generate}
            className="rounded border px-3 py-1 text-sm text-blue-600 hover:bg-gray-100"
          >
            Vygenerovat
          </button>
          <button
            type="button"
            onClick={copy}
            disabled={!password}
            className="rounded border px-3 py-1 text-sm text-blue-600 hover:bg-gray-100 disabled:opacity-50"
          >
            Kopírovat
          </button>
          <button
            type="button"
            onClick={apply}
            disabled={!password || !selectedId}
            className="rounded border px-3 py-1 text-sm text-blue-600 hover:bg-gray-100 disabled:opacity-50"
          >
            Použít
          </button>
          <button
            type="button"
            onClick={hide}
            className="rounded border px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
          >
            Zavřít
          </button>
        </div>
      </div>
    </div>
  )
}

