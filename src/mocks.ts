import type { User, Role, Folder, Password, UserFolderRoles } from '@types'
import type { VaultItem } from './types/vault'

export const mockUsers: User[] = [
  { id: 1, username: 'admin', firstName: 'Admin', lastName: 'User' },
  { id: 2, username: 'jdoe', firstName: 'John', lastName: 'Doe' },
]

export const mockRoles: Role[] = [
  { Id: 1, Name: 'Administrator', Code: 'ADMIN' },
  { Id: 2, Name: 'User', Code: 'USER' },
]

export const mockFolders: Folder[] = [
  {
    Id: 1,
    Name: 'Default',
    CreatedBy: 1,
    CreatedAt: new Date(),
    UpdatedBy: 1,
    UpdatedAt: new Date(),
  },
  {
    Id: 2,
    Name: 'Shared',
    CreatedBy: 2,
    CreatedAt: new Date(),
    UpdatedBy: 2,
    UpdatedAt: new Date(),
  },
]

export const mockPasswords: Password[] = [
  {
    Id: 1,
    FolderId: 1,
    Name: 'Email',
    Description: 'Primary email account',
    PasswordId: 1,
    UserName: 'user1',
    CreatedBy: 1,
    CreatedAt: new Date(),
    UpdatedBy: 1,
    UpdatedAt: new Date(),
  },
  {
    Id: 2,
    FolderId: 1,
    Name: 'Bank',
    Description: 'Online banking',
    PasswordId: 2,
    UserName: 'user2',
    CreatedBy: 1,
    CreatedAt: new Date(),
    UpdatedBy: 1,
    UpdatedAt: new Date(),
  },
]

export const mockUserFolderRoles: UserFolderRoles[] = [
  {
    UserId: 1,
    FolderId: 1,
    RoleId: 1,
    CreatedBy: 1,
    CreatedAt: new Date(),
  },
  {
    UserId: 2,
    FolderId: 1,
    RoleId: 2,
    CreatedBy: 1,
    CreatedAt: new Date(),
  },
]

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
