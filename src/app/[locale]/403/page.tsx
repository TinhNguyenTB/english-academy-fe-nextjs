'use client'

import { PATHS } from '@/constants/paths'
import { Button, Result } from 'antd'
import { useRouter } from 'next/navigation'

export default function ForbiddenPage() {
  const router = useRouter()
  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are not authorized to access this page.'
      extra={
        <Button onClick={() => router.replace(PATHS.HOME)} type='primary'>
          Back Home
        </Button>
      }
    />
  )
}
