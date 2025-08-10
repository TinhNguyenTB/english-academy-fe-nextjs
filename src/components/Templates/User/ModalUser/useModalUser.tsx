import { ROLE } from '@/enums'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { createUser, updateUser } from '@/services/user/save'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export type SaveUserValues = {
  id: number
  name: string
  email: string
  password?: string
  role?: ROLE
}

export default function useModalUser(onCancel: () => void, refetch: () => void, isEdit?: boolean) {
  const roleOptions = [
    { id: ROLE.ADMIN, name: 'Quản trị viên' },
    { id: ROLE.USER, name: 'Người dùng' }
  ]

  const { handleSubmit, control, reset } = useForm<SaveUserValues>({
    defaultValues: {
      role: ROLE.USER
    }
  })

  const { toastError, toastSuccess } = useGlobalMessage()

  const { mutate: mutateUpdate, isPending: loadingUpdate } = useMutation({
    mutationFn: updateUser,
    onError(error) {
      toastError(error.message)
    },
    onSuccess(data) {
      toastSuccess(data.message ?? 'Success')
      onCancel()
      refetch()
    }
  })

  const { mutate: mutateCreate, isPending: loadingCreate } = useMutation({
    mutationFn: createUser,
    onError(error) {
      toastError(error.message)
    },
    onSuccess(data) {
      toastSuccess(data.message ?? 'Success')
      onCancel()
      refetch()
    }
  })

  const onSubmit = handleSubmit((data) => {
    isEdit
      ? mutateUpdate({
          id: data.id,
          body: {
            email: data.email,
            name: data.name,
            role: data.role as string
          }
        })
      : mutateCreate({
          body: {
            email: data.email,
            name: data.name,
            role: data.role as string,
            password: data.password
          }
        })
  })

  return [
    { control, roleOptions, loadingCreate, loadingUpdate },
    { handleSubmit, reset, onSubmit }
  ] as const
}
