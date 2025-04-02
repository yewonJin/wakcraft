import { Metadata } from 'next'
import { headers } from 'next/headers'

import ContentGrid from '@/components/organisms/ContentGrid'
import ContentLine from '@/components/organisms/ContentLine'

import { getEventNoobProHacker } from '@/libs/actions/eventNoobProHacker'
import { isMobile } from '@/utils/shared'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ episode: string }>
}): Promise<Metadata> {
  // read route params
  const { episode } = await params

  const eventNoobProHacker = await getEventNoobProHacker(Number(episode))

  return {
    title: eventNoobProHacker
      ? `왁크래프트 | ${eventNoobProHacker.contentInfo.title}`
      : '왁크래프트 | 예능 눕프핵',
    description: '유튜버 우왁굳의 마인크래프트 컨텐츠 - 예능 눕프핵',
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ episode: string }>
}) {
  const { episode } = await params
  const headerList = await headers()
  const userAgent = headerList.get('user-agent') as string

  const eventNoobProHacker = await getEventNoobProHacker(Number(episode))

  if (!eventNoobProHacker) return <h2>해당 컨텐츠가 없습니다.</h2>

  if (eventNoobProHacker.type === 'grid') {
    return (
      <ContentGrid content={JSON.parse(JSON.stringify(eventNoobProHacker))} />
    )
  }

  return (
    <ContentLine
      isMobile={isMobile(userAgent)}
      content={JSON.parse(JSON.stringify(eventNoobProHacker))}
    />
  )
}
