import { create } from 'zustand';

export type ToastSeverity = 'success' | 'info' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  message: string;
  severity?: ToastSeverity;
  duration?: number; // ms
}

interface ToastState {
  queue: ToastItem[];
  show: (t: Omit<ToastItem, 'id'>) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const useToastStore = create<ToastState>((set) => ({
  queue: [],
  show: (t) => {
    const id = genId();
    const item: ToastItem = {
      id,
      severity: 'info',
      duration: 3000,
      ...t,
    };
    set((s) => ({ queue: [...s.queue, item] }));
    return id;
  },
  dismiss: (id) => set((s) => ({ queue: s.queue.filter((x) => x.id !== id) })),
  clear: () => set({ queue: [] }),
}));

export const useToast = () => useToastStore((s) => s.show);
