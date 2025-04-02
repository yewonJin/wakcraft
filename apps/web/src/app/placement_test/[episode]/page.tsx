import { Metadata } from 'next'

import ContentGrid from '@/components/organisms/ContentGrid'

import { getPlacementTest } from '@/libs/actions/placementTest'

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
  const placementTest = await getPlacementTest(Number(episode))

  if (!placementTest) return <h2>해당 컨텐츠가 없습니다.</h2>

  return <ContentGrid content={JSON.parse(JSON.stringify(placementTest))} />
}
