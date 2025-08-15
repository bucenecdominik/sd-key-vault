import type { Password } from '@types'

interface PasswordGridProps {
  passwords: Password[]
  onSelect: (password: Password) => void
}

export default function PasswordGrid({ passwords, onSelect }: PasswordGridProps) {
  return (
    <div className="grid flex-grow grid-cols-3 gap-2 overflow-auto bg-white p-2">
      {passwords.map((p) => (
        <div
          key={p.Id}
          onClick={() => onSelect(p)}
          className="cursor-pointer rounded border p-2 hover:bg-gray-100"
        >
          <div className="mb-1 flex items-center">
            <span className="mr-1 text-sm">🔒</span>
            <span className="font-medium">{p.Name}</span>
          </div>
          <div className="text-xs text-gray-500">
            {new Date(p.UpdatedAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )
}
