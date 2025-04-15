'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { HomeSeasonInfoTitle } from './Title'
import { HomeSeasonInfoNavigator } from './Navigator'
import { HomeSeasonInfoDateInfo } from './DateInfo'
import { HomeSeasonInfoTierList } from './TierList'

import { getPlacementTestsWithoutWorkInfo } from '@/libs/actions/placementTest'

export default function HomeSeasonInfo() {
  const { data: placementTestsWithoutWorkInfo } = useQuery({
    queryKey: ['placementTestsWithoutWorkInfo'],
    queryFn: getPlacementTestsWithoutWorkInfo,
  })

  const [currentSeason, setCurrentSeason] = useState(
    Math.max(
      ...placementTestsWithoutWorkInfo!.map((item) => item.contentInfo.episode),
    ),
  )

  const currentPlacementTest = placementTestsWithoutWorkInfo!.find(
    (x) => x.contentInfo.episode === currentSeason,
  )

  const nextPlecementTest = placementTestsWithoutWorkInfo!.find(
    (x) => x.contentInfo.episode === currentSeason + 1,
  )

  if (!placementTestsWithoutWorkInfo) return null

  return (
    <div className="mb-12 px-4 pt-24 md:mb-32 xl:px-0">
      <HomeSeasonInfoTitle />
      <HomeSeasonInfoNavigator
        seasons={placementTestsWithoutWorkInfo.map(
          (x) => x.contentInfo.episode,
        )}
        currentSeason={currentSeason}
        onSeasonChange={setCurrentSeason}
      />
      {currentPlacementTest && (
        <div className="mt-8 flex flex-col gap-6 md:gap-8">
          <HomeSeasonInfoDateInfo
            currentPlacementTest={currentPlacementTest}
            nextPlecementTest={nextPlecementTest}
          />
          <HomeSeasonInfoTierList currentSeason={currentSeason} />
        </div>
      )}
    </div>
  )
}
