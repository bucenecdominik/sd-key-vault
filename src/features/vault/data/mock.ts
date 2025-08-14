export interface VaultItem {
  id: string
  name: string
  username: string
  password: string
  tags: string[]
  folder?: string
}

export const mockVaultItems: VaultItem[] = [
  {
    id: 'github',
    name: 'GitHub',
    username: 'octocat',
    password: 'secret',
    tags: ['development', 'code'],
    folder: 'Work',
  },
  {
    id: 'banking',
    name: 'Bankovnictví',
    username: 'jdoe',
    password: 'bankpass',
    tags: ['finance'],
    folder: 'Personal',
  },
  {
    id: 'server-prod',
    name: 'Server – prod',
    username: 'root',
    password: 'prodpass',
    tags: ['server', 'prod'],
    folder: 'Infrastructure',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    username: 'redditUser',
    password: 'redditpass',
    tags: ['social'],
    folder: 'Personal',
  },
]
