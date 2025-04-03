import { Metadata } from 'next'

import PlacementTestMain from '@/components/templates/PlacementTestMain'

import { getPlacementTests } from '@/libs/actions/placementTest'

export const metadata: Metadata = {
  title: '왁크래프트 | 배치고사',
  description: '유튜버 우왁굳의 마인크래프트 컨텐츠 - 배치고사',
}

export default async function Page() {
  const placementTests = await getPlacementTests()

  return (
    <PlacementTestMain
      placementTests={JSON.parse(JSON.stringify(placementTests))}
    />
  )
}
