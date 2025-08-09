import axiosInstance from '@/config/axiosInstance'
import { BaseResponse } from '@/services/types'
import { User } from '@/services/user/list/type'
import { SaveUser } from '@/services/user/save/type'

export const updateUser = async ({
  id,
  body
}: {
  id: number
  body: SaveUser
}): Promise<BaseResponse<User>> => {
  const { data } = await axiosInstance<BaseResponse<User>>({
    method: 'PUT',
    url: `/api/v1/users/${id}`,
    data: body
  })
  return data
}
