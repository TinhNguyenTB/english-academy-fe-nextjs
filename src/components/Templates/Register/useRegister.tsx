'use client'

import { PATHS } from '@/constants/paths'
import { TRANSLATES } from '@/constants/translates'
import { useMessage } from '@/hooks/useMessage'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { register } from '@/services/auth/register'

type RegisterFormValues = {
  email: string
  password: string
  name: string
}

export function useRegister() {
  const router = useRouter()
  const t = useTranslations(TRANSLATES.REGISTER)
  const { success, error } = useMessage()
  const { handleSubmit, control } = useForm<RegisterFormValues>()

  const onSubmit = handleSubmit(async (data: RegisterFormValues) => {
    try {
      const res = await register(data)
      if (res.data) {
        success(t('success'))
        router.push(PATHS.LOGIN)
      }
    } catch (e) {
      error(t('error'))
      console.error('Register failed:', e)
    }
  })

  return [{ control }, { onSubmit }] as const
}
