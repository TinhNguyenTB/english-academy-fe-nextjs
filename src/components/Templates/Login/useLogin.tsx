'use client'

import { PATHS } from '@/constants/paths'
import { TRANSLATES } from '@/constants/translates'
import { useGlobalMessage } from '@/hooks/useGlobalMessage'
import { login } from '@/services/auth/login'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type LoginFormValues = {
  email: string
  password: string
}

export function useLogin() {
  const router = useRouter()
  const t = useTranslations(TRANSLATES.LOGIN)
  const { toastError, toastSuccess } = useGlobalMessage()
  const { handleSubmit, control } = useForm<LoginFormValues>()

  const onSubmit = handleSubmit(async (data: LoginFormValues) => {
    try {
      const res = await login(data)
      if (res.data) {
        // Lưu token vào localStorage
        const token = res.data.token
        localStorage.setItem('token', token)
        toastSuccess(t('success'))
        router.replace(PATHS.HOME)
      }
    } catch (e) {
      toastError(t('error'))
      console.error('Login failed:', e)
    }
  })

  return [{ control }, { onSubmit }] as const
}
