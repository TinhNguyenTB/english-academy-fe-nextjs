'use client'

import DataTable from '@/components/Organisms/DataTable'
import { useListUsers } from '@/components/Templates/User/List/useListUsers'
import ModalUser from '@/components/Templates/User/ModalUser'
import { User } from '@/services/user/list/type'

export default function ListUsers() {
  const [values, handles] = useListUsers()
  const { columns, openModal, selectedUser, data, isLoading } = values
  const { handleCloseModal, refetch, setQueryParams } = handles

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>User Management</h1>
      <DataTable<User>
        columns={columns}
        externalData={data || { data: { content: [], totalElements: 0, number: 0 } }}
        isLoading={isLoading}
        rowKey='id'
        size='middle'
        showResetAll={true}
        onQueryParamsChange={setQueryParams}
      />
      <ModalUser
        isEdit={selectedUser !== null}
        open={openModal}
        onCancel={handleCloseModal}
        user={selectedUser}
        refetch={refetch}
      />
    </div>
  )
}
