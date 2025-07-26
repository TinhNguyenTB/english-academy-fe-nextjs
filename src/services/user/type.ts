export interface User {
  id: number
  name: string
  email: string
  avatarUrl: string | null
  role: Role
}

export interface Role {
  name: string
  description: string
  permissions: Permission[]
}

export interface Permission {
  name: string
  description: string
}
