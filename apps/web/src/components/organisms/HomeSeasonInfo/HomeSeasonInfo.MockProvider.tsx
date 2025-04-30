import { useState } from 'react'

import { Context } from './HomeSeasonInfo.context'
import {
  mockArchitectsWithTier,
  mockPlacementTestsWithoutWorkInfo,
} from '@/__mock__/placementTest'

export function MockProvider({ children }: { children: React.ReactNode }) {
  const seasons = mockPlacementTestsWithoutWorkInfo.map(
    (x) => x.contentInfo.episode,
  )

  const [currentSeason, setCurrentSeason] = useState(
    Math.max(
      ...mockPlacementTestsWithoutWorkInfo.map(
        (item) => item.contentInfo.episode,
      ),
    ),
  )

  const currentPlacementTest = mockPlacementTestsWithoutWorkInfo.find(
    (x) => x.contentInfo.episode === currentSeason,
  )

  const nextPlecementTest = mockPlacementTestsWithoutWorkInfo.find(
    (x) => x.contentInfo.episode === currentSeason + 1,
  )

  const changeSeason = (season: number) => {
    setCurrentSeason(season)
  }

  return (
    <Context.Provider
      value={{
        seasons,
        currentSeason,
        currentPlacementTest,
        nextPlecementTest,
        architectsWithTier: mockArchitectsWithTier,
        changeSeason,
      }}
    >
      {children}
    </Context.Provider>
  )
}
