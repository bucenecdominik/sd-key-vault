export interface User {
  id: number
  username: string
  firstName: string
  lastName: string
}

export interface UserFolderRoles {
  UserId: number
  FolderId: number
  RoleId: number
  CreatedBy: number
  CreatedAt: Date
}

export interface Role {
  Id: number
  Name: string
  Code: string
}

export interface Folder {
  Id: number
  Name: string
  CreatedBy: number
  CreatedAt: Date
  UpdatedBy: number
  UpdatedAt: Date
}

export interface Password {
  Id: number
  FolderId: number
  Name: string
  Description: string
  PasswordId: number
  UserName: string
  CreatedBy: number
  CreatedAt: Date
  UpdatedBy: number
  UpdatedAt: Date
}
