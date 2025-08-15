import { useQueryListTopic } from '@/services/topic/list'
import React from 'react'

export default function useListTopic() {
  const { data, isLoading, refetch } = useQueryListTopic({ page: 0, size: 20 })

  const handleReorder = async (newTopics: any) => {
    console.log('New order:', newTopics)
    // Gọi API PUT /topics/reorder
  }

  return [{ listTopics: data?.data.content || [] }, { handleReorder }] as const
}
