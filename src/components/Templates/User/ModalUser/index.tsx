'use client'

import { FormInput } from '@/components/Atoms/FormInput'
import { FormSelect } from '@/components/Atoms/FormSelect'
import { CoreModal } from '@/components/Molecules/CoreModal'
import useModalUser, { SaveUserValues } from '@/components/Templates/User/ModalUser/useModalUser'
import { Form } from 'antd'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

type ModalUserProps = {
  open: boolean
  isEdit?: boolean
  onCancel: () => void
  refetch: () => void
  user?: SaveUserValues | null
}

export default function ModalUser({ open, isEdit, onCancel, refetch, user }: ModalUserProps) {
  const t = useTranslations()
  const [values, handles] = useModalUser(onCancel, refetch)
  const { control, roleOptions, isPending } = values
  const { reset, onSubmit } = handles

  useEffect(() => {
    if (user) {
      reset({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      })
    }
  }, [user])

  return (
    <CoreModal
      open={open}
      title={isEdit ? 'Edit user' : 'Add a user'}
      onOk={onSubmit}
      onCancel={onCancel}
      loading={isPending}
    >
      <Form layout='vertical'>
        <FormInput
          control={control}
          name='name'
          label={t('register.name')}
          required
          rules={{
            required: t('common.validation.required', { field: t('register.name') })
          }}
        />
        <FormInput
          control={control}
          name='email'
          label={t('register.email')}
          required
          rules={{
            required: t('common.validation.required', { field: t('register.email') }),
            pattern: {
              value: /^\S+@\S+$/,
              message: t('common.validation.email')
            }
          }}
        />
        {!isEdit && (
          <FormInput
            control={control}
            name='password'
            label={t('register.password')}
            password
            required
            rules={{
              required: t('common.validation.required', { field: t('register.password') })
            }}
          />
        )}
        <FormSelect
          control={control}
          name='role'
          label={t('register.role')}
          options={roleOptions}
          required
          rules={{
            required: t('common.validation.required', { field: t('register.role') })
          }}
        />
      </Form>
    </CoreModal>
  )
}
