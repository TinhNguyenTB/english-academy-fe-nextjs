import axiosInstance from '@/config/axiosInstance'
import { PageResponse, QueryParams } from '@/services/types'
import { Topic } from '@/services/topic/list/type'
import { useQuery } from '@tanstack/react-query'

export const fetchListTopic = async (params: QueryParams): Promise<PageResponse<Topic>> => {
  const { data } = await axiosInstance<PageResponse<Topic>>({
    url: '/api/v1/topics',
    method: 'GET',
    params: params
  })
  return data
}

export const useQueryListTopic = (params: QueryParams) => {
  return useQuery<PageResponse<Topic>>({
    queryKey: ['/api/v1/topics', params],
    queryFn: () => fetchListTopic(params)
  })
}
