import { create } from 'zustand';
import type { VaultItem, VaultFolder } from '../../types/vault';

export interface VaultFilters {
  text: string;
  folder?: VaultFolder;
}

interface VaultState {
  items: VaultItem[];
  selectedId?: string;
  filters: VaultFilters;
  // actions
  init: (items: VaultItem[]) => void;
  setFilterText: (text: string) => void;
  setFolder: (folder?: VaultFolder) => void;
  clearFilters: () => void;
  selectItem: (id?: string) => void;
  updateItemPartial: (id: string, patch: Partial<VaultItem>) => void;
}

export const useVaultStore = create<VaultState>((set, get) => ({
  items: [],
  selectedId: undefined,
  filters: { text: '' },

  init: (items) => set({ items }),

  setFilterText: (text) =>
    set((s) => (s.filters.text === text ? s : { filters: { ...s.filters, text } })),

  setFolder: (folder) =>
    set((s) => (s.filters.folder === folder ? s : { filters: { ...s.filters, folder } })),

  clearFilters: () => set({ filters: { text: '', folder: undefined } }),

  selectItem: (id) => set((s) => (s.selectedId === id ? s : { selectedId: id })),

  updateItemPartial: (id, patch) =>
    set((s) => ({
      items: s.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    })),
}));
