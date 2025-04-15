import { Metadata } from 'next'
import { headers } from 'next/headers'

import { NotFound } from '@/components/organisms'
import { ContentDetail } from '@/components/templates'

import { getPlacementTest } from '@/libs/actions/placementTest'
import { isMobile } from '@/utils/shared'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ episode: string }>
}): Promise<Metadata> {
  // read route params
  const { episode } = await params

  const placementTest = await getPlacementTest(Number(episode))

  return {
    title: placementTest
      ? `왁크래프트 | 시즌${placementTest.contentInfo.episode} 배치고사 `
      : '왁크래프트 | 배치고사',
    description: '유튜버 우왁굳의 마인크래프트 컨텐츠 - 배치고사',
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

  const placementTest = await getPlacementTest(Number(episode))
  if (!placementTest) return <NotFound />

  return (
    <ContentDetail
      category="배치고사"
      isMobile={isMobile(userAgent)}
      content={placementTest}
    />
  )
}
