export interface VaultItem {
  id: string
  name: string
  username: string
  password: string
  url?: string
  folder?: string
  notes?: string
  updatedAt: string
}

export const mockVaultItems: VaultItem[] = [
  {
    id: 'github',
    name: 'GitHub',
    username: 'octocat',
    password: 'secret',
    url: 'https://github.com',
    folder: 'Work',
    notes: '',
    updatedAt: '2024-02-15T10:00:00Z',
  },
  {
    id: 'banking',
    name: 'Bankovnictví',
    username: 'jdoe',
    password: 'bankpass',
    url: 'https://bank.example.com',
    folder: 'Personal',
    notes: '',
    updatedAt: '2024-03-20T09:30:00Z',
  },
  {
    id: 'server-prod',
    name: 'Server – prod',
    username: 'root',
    password: 'prodpass',
    url: 'ssh://prod.server',
    folder: 'Infrastructure',
    notes: '',
    updatedAt: '2024-01-05T08:00:00Z',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    username: 'redditUser',
    password: 'redditpass',
    url: 'https://reddit.com',
    folder: 'Personal',
    notes: '',
    updatedAt: '2024-04-10T12:00:00Z',
  },
]
