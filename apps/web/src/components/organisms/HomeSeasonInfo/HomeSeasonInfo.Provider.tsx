import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getPlacementTestsWithoutWorkInfo } from '@/libs/actions/placementTest'
import { getArchitectsWithTier } from '@/libs/actions/architect'

import { Context } from './HomeSeasonInfo.context'

export function HomeSeasonInfoProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data } = useQuery({
    queryKey: ['placementTestsWithoutWorkInfo'],
    queryFn: getPlacementTestsWithoutWorkInfo,
  })

  const { data: architectsWithTier } = useQuery({
    queryKey: ['architectsWithTier'],
    queryFn: getArchitectsWithTier,
  })

  if (!data || !architectsWithTier) {
    throw new Error('데이터를 불러오지 못했습니다.')
  }

  const seasons = data.map((x) => x.contentInfo.episode)

  const [currentSeason, setCurrentSeason] = useState(
    Math.max(...data.map((item) => item.contentInfo.episode)),
  )

  const currentPlacementTest = data.find(
    (x) => x.contentInfo.episode === currentSeason,
  )

  const nextPlecementTest = data.find(
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
        architectsWithTier,
        changeSeason,
      }}
    >
      {children}
    </Context.Provider>
  )
}
