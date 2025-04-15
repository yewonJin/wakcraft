import { Metadata } from 'next'

import { ContentMain } from '@/components/templates'

import { getPlacementTestsWithoutWorkInfo } from '@/libs/actions/placementTest'

export const metadata: Metadata = {
  title: '왁크래프트 | 배치고사',
  description: '유튜버 우왁굳의 마인크래프트 컨텐츠 - 배치고사',
}

export default async function Page() {
  const placementTests = await getPlacementTestsWithoutWorkInfo()

  return (
    <ContentMain
      category="배치고사"
      description="마인크래프트 배치고사 컨텐츠를 볼 수 있다."
      contents={JSON.parse(JSON.stringify(placementTests))}
    />
  )
}
