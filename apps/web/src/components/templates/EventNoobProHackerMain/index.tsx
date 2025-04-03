'use client'

import { EventNoobProHacker } from '@repo/types'

import ContentCardItem from '@/components/molecules/ContentCardItem'
import ContentMainTitle from '@/components/molecules/ContentMainTitle'

type Props = {
  eventNoobProHackers: EventNoobProHacker[]
}

export default function EventNoobProHackerMain({ eventNoobProHackers }: Props) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 md:pt-12 xl:px-0">
      <ContentMainTitle
        title="예능 눕프핵"
        description="마인크래프트 예능 눕프핵 컨텐츠를 볼 수 있다."
      />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {eventNoobProHackers
          .sort(
            (a, b) =>
              new Date(b.contentInfo.date).getTime() -
              new Date(a.contentInfo.date).getTime(),
          )
          .map((eventNoobProHacker) => (
            <ContentCardItem
              key={eventNoobProHacker.contentInfo.date}
              category="예능 눕프핵"
              contentInfo={eventNoobProHacker.contentInfo}
              contentUrl={`/event_noobprohacker/${eventNoobProHacker.contentInfo.episode}`}
              lines={
                eventNoobProHacker.type === 'line'
                  ? eventNoobProHacker.workInfo.map((line) => line.title)
                  : null
              }
            />
          ))}
      </div>
    </div>
  )
}
