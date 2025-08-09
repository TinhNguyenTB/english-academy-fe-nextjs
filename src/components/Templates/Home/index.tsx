import LanguageSwitcher from '@/components/Atoms/LanguageSwitcher'
import { TRANSLATES } from '@/constants/translates'
import { useTranslations } from 'next-intl'

export default function HomeTemplate() {
  const t = useTranslations(TRANSLATES.HOME)
  return (
    <main>
      <LanguageSwitcher />
      <h1>{t('title')}</h1>
    </main>
  )
}
