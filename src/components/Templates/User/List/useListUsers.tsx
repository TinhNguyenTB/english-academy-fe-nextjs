'use client'

import { CustomColumnType } from '@/components/Organisms/DataTable'
import { User } from '@/services/user/type'
import { Button, Space } from 'antd'

export function useListUsers() {
  const columns: CustomColumnType<User>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      width: 80
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      searchable: true,
      width: 200
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      searchable: true,
      width: 250
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size='middle'>
          <Button>Edit</Button>
          <Button danger>Delete</Button>
        </Space>
      ),
      width: 150
    }
  ]
  return [{ columns }] as const
}
