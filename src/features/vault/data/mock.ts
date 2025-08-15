export interface VaultItem {
  id: string
  name: string
  username: string
  password: string
  url?: string
  tags: string[]
  folder?: string
}

export const mockVaultItems: VaultItem[] = [
  {
    id: 'github',
    name: 'GitHub',
    username: 'octocat',
    password: 'secret',
    url: 'https://github.com',
    tags: ['development', 'code'],
    folder: 'Work',
  },
  {
    id: 'banking',
    name: 'Bankovnictví',
    username: 'jdoe',
    password: 'bankpass',
    url: 'https://bank.example.com',
    tags: ['finance'],
    folder: 'Personal',
  },
  {
    id: 'server-prod',
    name: 'Server – prod',
    username: 'root',
    password: 'prodpass',
    url: 'ssh://prod.server',
    tags: ['server', 'prod'],
    folder: 'Infrastructure',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    username: 'redditUser',
    password: 'redditpass',
    url: 'https://reddit.com',
    tags: ['social'],
    folder: 'Personal',
  },
]
