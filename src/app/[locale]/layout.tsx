import '@/app/globals.css'
import { routing } from '@/i18n/routing'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { getMessages } from 'next-intl/server'
import { MessageProvider } from '@/hoc/MessageProvider'
import QueryProvider from '@/hoc/QueryProvider'
import 'antd/dist/reset.css'

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const messages = await getMessages()
  if (!messages) notFound()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <QueryProvider>
          <AntdRegistry>
            <NextIntlClientProvider>
              <MessageProvider>{children}</MessageProvider>
            </NextIntlClientProvider>
          </AntdRegistry>
        </QueryProvider>
      </body>
    </html>
  )
}
