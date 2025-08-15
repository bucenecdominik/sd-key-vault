import { create } from 'zustand'
import type { VaultItem } from '../../features/vault/data/mock'
import { mockVaultItems } from '../../features/vault/data/mock'

export interface VaultState {
  items: VaultItem[]
  filters: {
    text: string
    folder?: string
  }
  selectedId?: string
  setItems: (items: VaultItem[]) => void
  setFilterText: (text: string) => void
  setFolder: (folder?: string) => void
  selectItem: (id?: string) => void
  updateItemPartial: (id: string, partial: Partial<VaultItem>) => void
  clearFilters: () => void
}

export const useVaultStore = create<VaultState>((set) => ({
  items: mockVaultItems,
  filters: {
    text: '',
    folder: undefined,
  },
  selectedId: undefined,
  setItems: (items) => set({ items }),
  setFilterText: (text) =>
    set((state) => ({ filters: { ...state.filters, text } })),
  setFolder: (folder) =>
    set((state) => ({ filters: { ...state.filters, folder } })),
  selectItem: (id) => set({ selectedId: id }),
  updateItemPartial: (id, partial) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...partial } : item
      ),
    })),
  clearFilters: () =>
    set({ filters: { text: '', folder: undefined } }),
}))
