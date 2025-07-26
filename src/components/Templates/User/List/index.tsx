'use client'

import DataTable from '@/components/Organisms/DataTable'
import { useListUsers } from '@/components/Templates/User/List/useListUsers'
import { fetchListUser } from '@/services/user'
import { User } from '@/services/user/type'

export default function ListUsers() {
  const [values] = useListUsers()
  const { columns } = values
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>User Management</h1>
      <DataTable<User>
        queryKey='listUsers'
        fetchDataFn={fetchListUser}
        columns={columns}
        initialQueryParams={{ page: 0, size: 10 }}
        rowKey='id'
        size='middle'
      />
    </div>
  )
}
