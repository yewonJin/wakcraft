import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

import { setInitialThemeMode } from '@/utils/theme'
import GlobalNav from '@/components/organisms/GlobalNav'
import ScrollToTop from '@/components/organisms/ScrollToTop'

const NotoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans',
  display: 'swap',
  style: 'normal',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '왁크래프트 | 홈',
  description: '유튜버 우왁굳의 마인크래프트 컨텐츠 웹사이트',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="kr" suppressHydrationWarning={true}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialThemeMode }} />
      </head>
      <body className={`${NotoSansKR.className} antialiased`}>
        <GlobalNav />
        <ScrollToTop />
        <main className="pt-16 pb-20 md:gap-40">{children}</main>
      </body>
    </html>
  )
}
