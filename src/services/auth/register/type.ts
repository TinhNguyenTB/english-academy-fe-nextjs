import { BaseResponse } from '@/services/types'

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export type RegisterResponse = BaseResponse<{
  id: number
  email: string
  name: string
  avatarUrl: string | null
}>
