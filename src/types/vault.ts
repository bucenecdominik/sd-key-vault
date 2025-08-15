export interface VaultItem {
  id: string
  name: string
  username?: string
  password?: string
  url?: string
  folder?: 'Work' | 'Personal'
  updatedAt: string // ISO
  notes?: string
  icon?: 'globe' | 'server' | 'reddit' | 'bank'
}
