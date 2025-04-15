import { Noto_Sans_KR } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics } from '@next/third-parties/google'

import './globals.css'
import { GlobalNav, ScrollToTop } from '@/components/organisms'
import Providers from './provider'

import { setInitialThemeMode } from '@/utils/theme'

const NotoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans',
  display: 'swap',
  style: 'normal',
  subsets: ['latin'],
})

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
        <Providers>
          <SpeedInsights />
          <GoogleAnalytics gaId={process.env.GA_TRACKING_ID as string} />
          <GlobalNav />
          <ScrollToTop />
          <main className="pt-16 pb-20 md:gap-40">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
