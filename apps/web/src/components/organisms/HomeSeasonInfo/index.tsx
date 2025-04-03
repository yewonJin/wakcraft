'use client'

import { useState } from 'react'
import { Architect, PlacementTest } from '@repo/types'

import { HomeSeasonInfoTitle } from './Title'
import { HomeSeasonInfoNavigator } from './Navigator'
import { HomeSeasonInfoDateInfo } from './DateInfo'
import { HomeSeasonInfoTierList } from './TierList'

type Props = {
  placementTestsWithoutWorkInfo: Omit<PlacementTest, 'workInfo'>[]
  architectsWithTier: Pick<Architect, '_id' | 'wakzooId' | 'tier'>[]
}

export default function HomeSeasonInfo({
  placementTestsWithoutWorkInfo,
  architectsWithTier,
}: Props) {
  const [currentSeason, setCurrentSeason] = useState(
    Math.max(
      ...placementTestsWithoutWorkInfo.map((item) => item.contentInfo.episode),
    ),
  )

  const currentPlacementTest = placementTestsWithoutWorkInfo.find(
    (x) => x.contentInfo.episode === currentSeason,
  )

  const nextPlecementTest = placementTestsWithoutWorkInfo.find(
    (x) => x.contentInfo.episode === currentSeason + 1,
  )

  return (
    <div className="mb-12 px-4 pt-24 md:mb-32 xl:px-0">
      <HomeSeasonInfoTitle />
      <HomeSeasonInfoNavigator
        placementTestsWithoutWorkInfo={placementTestsWithoutWorkInfo}
        currentSeason={currentSeason}
        onSeasonChange={setCurrentSeason}
      />
      {currentPlacementTest && (
        <div className="mt-8 flex flex-col gap-6 md:gap-8">
          <HomeSeasonInfoDateInfo
            currentPlacementTest={currentPlacementTest}
            nextPlecementTest={nextPlecementTest}
          />
          <HomeSeasonInfoTierList
            currentSeason={currentSeason}
            architectsWithTier={architectsWithTier}
          />
        </div>
      )}
    </div>
  )
}
