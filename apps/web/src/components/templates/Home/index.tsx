import { Architect, LineInfo, NoobProHacker, PlacementTest } from '@repo/types'

import {
  HomeCarousel,
  HomeSeasonInfo,
  HomeNoobProHacker,
} from '@/components/organisms'

type Props = {
  latestNoobProHacker: NoobProHacker
  placementTestsWithoutWorkInfo: Omit<PlacementTest, 'workInfo'>[]
  architectsWithTier: Pick<Architect, '_id' | 'wakzooId' | 'tier'>[]
  recentNoobProHackers: NoobProHacker[]
  sweepLines: LineInfo[]
}

export default function Home({
  latestNoobProHacker,
  placementTestsWithoutWorkInfo,
  architectsWithTier,
  recentNoobProHackers,
  sweepLines,
}: Props) {
  return (
    <div className="mx-auto max-w-[1200px]">
      <HomeCarousel
        latestNoobProHacker={JSON.parse(JSON.stringify(latestNoobProHacker))}
      />
      <HomeSeasonInfo
        placementTestsWithoutWorkInfo={placementTestsWithoutWorkInfo}
        architectsWithTier={architectsWithTier}
      />
      <HomeNoobProHacker
        recentNoobProHackers={recentNoobProHackers}
        sweepLines={sweepLines}
      />
    </div>
  )
}
