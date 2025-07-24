import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { TRANSLATES } from '@/constants/translates'

export default function HomePage() {
  const t = useTranslations(TRANSLATES.HOME)
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href='/about'>{t('about')}</Link>
    </div>
  )
}
