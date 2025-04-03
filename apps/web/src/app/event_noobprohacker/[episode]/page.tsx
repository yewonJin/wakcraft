import { Metadata } from 'next'
import { headers } from 'next/headers'

import ContentDetail from '@/components/templates/ContentDetail'
import NotFound from '@/components/organisms/NotFound'

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
  if (!eventNoobProHacker) return <NotFound />

  return (
    <ContentDetail
      category="예능 눕프핵"
      isMobile={isMobile(userAgent)}
      content={JSON.parse(JSON.stringify(eventNoobProHacker))}
    />
  )
}
