import { useEffect } from 'react'
import { create } from 'zustand'

interface ToastState {
  message: string | null
  show: (msg: string) => void
  clear: () => void
}

export const useToast = create<ToastState>((set) => ({
  message: null,
  show: (message) => set({ message }),
  clear: () => set({ message: null }),
}))

export default function Toast() {
  const { message, clear } = useToast()

  useEffect(() => {
    if (!message) return
    const t = setTimeout(clear, 2000)
    return () => clearTimeout(t)
  }, [message, clear])

  if (!message) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded bg-black px-4 py-2 text-sm text-white shadow">
      {message}
    </div>
  )
}
