'use client'

import { Select } from 'antd'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import Image from 'next/image'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const locale = useLocale()

  function onSelectChange(nextLocale: string) {
    if (!pathname || nextLocale === locale) return

    router.replace(
      // @ts-expect-error -- see explanation in original code
      { pathname, params },
      { locale: nextLocale }
    )
  }

  const languages = [
    {
      value: 'en',
      label: (
        <span className='flex gap-1.5 items-center'>
          <Image src='/images/Flag_of_the_United_States.png' alt='English' height={20} width={20} />
          English
        </span>
      )
    },
    {
      value: 'vi',
      label: (
        <span className='flex gap-1.5 items-center'>
          <Image src='/images/Flag_of_Vietnam.png' alt='Tiếng Việt' height={20} width={20} />
          Tiếng Việt
        </span>
      )
    }
  ]

  return (
    <Select style={{ width: 150 }} value={locale} onChange={onSelectChange} options={languages} />
  )
}
