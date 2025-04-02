import { Metadata } from 'next'

import NoobProHackerHome from '@/components/templates/NoobProHackerHome'

import { getNoobProHackers } from '@/libs/actions/noobprohacker'

export const metadata: Metadata = {
  title: '왁크래프트 | 눕프로해커',
  description: '유튜버 우왁굳의 마인크래프트 컨텐츠 - 눕프로해커',
}

export default async function Page() {
  const noobprohackers = await getNoobProHackers()

  return (
    <NoobProHackerHome
      noobprohackers={JSON.parse(JSON.stringify(noobprohackers))}
    />
  )
}
