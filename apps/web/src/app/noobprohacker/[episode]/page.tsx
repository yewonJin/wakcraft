import { Metadata } from 'next'
import { headers } from 'next/headers'

import ContentLine from '@/components/organisms/ContentLine'
import { getNoobProHacker } from '@/libs/actions/noobprohacker'
import { isMobile } from '@/utils/shared'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ episode: string }>
}): Promise<Metadata> {
  // read route params
  const { episode } = await params

  const noobprohacker = await getNoobProHacker(Number(episode))

  return {
    title: noobprohacker
      ? `왁크래프트 | 눕프로해커 ${noobprohacker.contentInfo.episode}회`
      : '왁크래프트 | 눕프로해커',
    description: '유튜버 우왁굳의 마인크래프트 컨텐츠 - 눕프로해커',
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

  const noobprohacker = await getNoobProHacker(Number(episode))

  return (
    <ContentLine
      isMobile={isMobile(userAgent)}
      content={JSON.parse(JSON.stringify(noobprohacker))}
    />
  )
}
