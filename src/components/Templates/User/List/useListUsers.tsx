'use client'

import { CustomColumnType } from '@/components/Organisms/DataTable'
import { SaveUserValues } from '@/components/Templates/User/ModalUser/useModalUser'
import { ROLE } from '@/enums'
import { QueryParams } from '@/services/types'
import { useQueryListUser } from '@/services/user/list'
import { User } from '@/services/user/list/type'
import { Button, Space } from 'antd'
import { useState } from 'react'

const initialQueryParams = { page: 0, size: 10 }

export function useListUsers() {
  const [openModal, setOpenModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<SaveUserValues | null>(null)
  const [queryParams, setQueryParams] = useState<QueryParams>(initialQueryParams)

  const handleEdit = (user: User) => {
    setSelectedUser({
      id: user.id,
      email: user.email,
      name: user.email,
      role: user.role.name as ROLE
    })
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setSelectedUser(null)
    setOpenModal(false)
  }

  const { data, isLoading, refetch } = useQueryListUser(queryParams)

  const columns: CustomColumnType<User>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      searchable: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      searchable: true
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger>Delete</Button>
        </Space>
      ),
      width: 150
    }
  ]

  return [
    { columns, selectedUser, openModal, data, isLoading },
    { handleCloseModal, refetch, setQueryParams }
  ] as const
}
