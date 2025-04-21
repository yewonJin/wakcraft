import Script from 'next/script'

import { setInitialThemeMode } from '@/utils/theme'
import { TriangleAlert } from 'lucide-react'
import Link from 'next/link'

export default function ErrorFallback() {
  return (
    <div className="my-16 flex flex-col items-center gap-1.5 px-4 xl:px-0">
      <Script
        id="theme"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: setInitialThemeMode }}
      />
      <TriangleAlert className="text-red-500" width={50} height={50} />
      <h2 className="text-xl font-medium">문제가 발생했습니다.</h2>
      <p>
        <Link
          className="mx-1 text-sky-600"
          target="_blank"
          href={'https://cafe.naver.com/steamindiegame/11638777'}
        >
          왁물원
        </Link>
        을 통해 개발자에게 연락주세요.
      </p>
    </div>
  )
}
