'use client'

import { PATHS } from '@/constants/paths'
import { TRANSLATES } from '@/constants/translates'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { register } from '@/services/auth/register'

type RegisterFormValues = {
  email: string
  password: string
  confirmPassword: string
  name: string
}

export function useRegister() {
  const router = useRouter()
  const t = useTranslations(TRANSLATES.REGISTER)
  const { toastSuccess, toastError } = useGlobalMessage()
  const { handleSubmit, control } = useForm<RegisterFormValues>()

  const onSubmit = handleSubmit(async (data: RegisterFormValues) => {
    try {
      const res = await register(data)
      if (res.data) {
        toastSuccess(t('success'))
        router.push(PATHS.LOGIN)
      }
    } catch (e) {
      toastError(t('error'))
      console.error('Register failed:', e)
    }
  })

  return [{ control }, { onSubmit }] as const
}
