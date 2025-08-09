import axiosInstance from '@/config/axiosInstance'
import { PageResponse, QueryParams } from '@/services/types'
import { User } from '@/services/user/list/type'
import { useQuery } from '@tanstack/react-query'

export const fetchListUser = async (params: QueryParams): Promise<PageResponse<User>> => {
  const { data } = await axiosInstance<PageResponse<User>>({
    url: '/api/v1/users',
    method: 'GET',
    params: params
  })
  return data
}

export const useQueryListUser = (params: QueryParams) => {
  return useQuery<PageResponse<User>>({
    queryKey: ['/api/v1/users', params],
    queryFn: () => fetchListUser(params)
  })
}
