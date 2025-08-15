export type VaultFolder = 'Work' | 'Personal';
export type VaultIcon = 'globe' | 'server' | 'reddit' | 'bank';

export interface VaultItem {
  id: string;
  name: string;
  username?: string;
  password?: string; // DEMO: může být prázdné ""
  url?: string;
  folder?: VaultFolder;
  updatedAt: string; // ISO string
  notes?: string;
  icon?: VaultIcon;
}

