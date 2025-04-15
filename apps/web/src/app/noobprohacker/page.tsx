import { Metadata } from 'next'

import { ContentMain } from '@/components/templates'

import { getNoobProHackers } from '@/libs/actions/noobprohacker'

export const metadata: Metadata = {
  title: '왁크래프트 | 눕프로해커',
  description: '유튜버 우왁굳의 마인크래프트 컨텐츠 - 눕프로해커',
}

export default async function Page() {
  const noobprohackers = await getNoobProHackers()

  return (
    <ContentMain
      category="눕프로해커"
      description="마인크래프트 눕프로해커 컨텐츠를 볼 수 있다."
      contents={noobprohackers}
    />
  )
}
