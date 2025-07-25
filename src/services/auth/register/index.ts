import axiosInstance from '@/config/axiosInstance'
import { RegisterRequest, RegisterResponse } from '@/services/auth/register/type'

export const register = async (requestBody: RegisterRequest) => {
  const { data } = await axiosInstance<RegisterResponse>({
    url: '/api/v1/users',
    method: 'POST',
    data: requestBody
  })
  return data
}
