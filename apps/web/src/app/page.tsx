import { Metadata } from 'next'

import { Home } from '@/components/templates'

import { getArchitectsWithTier } from '@/libs/actions/architect'
import {
  getLatestNoobProHacker,
  getRecentNoobProHackers,
  getSweepLines,
} from '@/libs/actions/noobprohacker'
import { getPlacementTestsWithoutWorkInfo } from '@/libs/actions/placementTest'
import { populateWakzooId } from '@/services/content'

export const metadata: Metadata = {
  title: '왁크래프트 | 홈',
  description: '유튜버 우왁굳의 마인크래프트 컨텐츠 웹사이트',
}

export default async function Page() {
  const latestNoobProHacker = await getLatestNoobProHacker()
  const architectsWithTier = await getArchitectsWithTier()
  const placementTestsWithoutWorkInfo = await getPlacementTestsWithoutWorkInfo()
  const recentNoobProHackers = await getRecentNoobProHackers(3).then((res) =>
    res.map((noobprohacker) => ({
      ...noobprohacker,
      workInfo: populateWakzooId(noobprohacker.workInfo, architectsWithTier),
    })),
  )
  const sweepLines = await getSweepLines().then((res) => [
    ...populateWakzooId(res, architectsWithTier),
  ])
  return (
    <Home
      latestNoobProHacker={JSON.parse(JSON.stringify(latestNoobProHacker))}
      architectsWithTier={JSON.parse(JSON.stringify(architectsWithTier))}
      placementTestsWithoutWorkInfo={JSON.parse(
        JSON.stringify(placementTestsWithoutWorkInfo),
      )}
      recentNoobProHackers={JSON.parse(JSON.stringify(recentNoobProHackers))}
      sweepLines={JSON.parse(JSON.stringify(sweepLines))}
    />
  )
}
