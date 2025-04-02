import { Metadata } from 'next'

import EventNoobProHackerHome from '@/components/templates/EventNoobProHackerHome'

import { getEventNoobProHackers } from '@/libs/actions/eventNoobProHacker'

export const metadata: Metadata = {
  title: '왁크래프트 | 예능 눕프핵',
  description: '유튜버 우왁굳의 마인크래프트 컨텐츠 예능 눕프핵',
}

export default async function Page() {
  const eventNoobProHackers = await getEventNoobProHackers()

  return (
    <EventNoobProHackerHome
      eventNoobProHackers={JSON.parse(JSON.stringify(eventNoobProHackers))}
    />
  )
}
