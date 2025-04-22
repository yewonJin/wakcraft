'use client'

import { createContext, use, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useQuery } from '@tanstack/react-query'
import { DESCRIPTION } from '@repo/constants'
import { AllTier, ArchitectDocument, PlacementTest } from '@repo/types'
import { cn } from '@repo/utils'

import { Button, TierBox } from '@/components/atoms'
import ErrorFallback from '../ErrorFallback'

import { getPlacementTestsWithoutWorkInfo } from '@/libs/actions/placementTest'
import { getArchitectsWithTier } from '@/libs/actions/architect'
import { groupArchitectTierBySeason } from '@/services/content'
import { getTierTextColor } from '@/services/architect'
import { formatDateToKorean, getDaysBetween } from '@/utils/date'

type HomeSeasonContext = {
  seasons: number[]
  currentSeason: number
  currentPlacementTest: Omit<PlacementTest, 'workInfo'> | undefined
  nextPlecementTest: Omit<PlacementTest, 'workInfo'> | undefined
  architectsWithTier: Pick<ArchitectDocument, '_id' | 'wakzooId' | 'tier'>[]
  changeSeason: (season: number) => void
} | null

const Context = createContext<HomeSeasonContext>(null)

const useHomeSeasonInfoContext = () => {
  const context = use(Context)
  if (!context) {
    throw new Error('HomeSeasonInfoContext.Provider is missing')
  }
  return context
}

function HomeSeasonInfo() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <HomeSeasonInfo.Provider>
        <HomeSeasonInfo.Title />
        <HomeSeasonInfo.Navigator />
        <HomeSeasonInfo.ContentWrapper>
          <HomeSeasonInfo.DateInfo />
          <HomeSeasonInfo.TierList />
        </HomeSeasonInfo.ContentWrapper>
      </HomeSeasonInfo.Provider>
    </ErrorBoundary>
  )
}

HomeSeasonInfo.Provider = function Provider({
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
      <div className="mb-12 px-4 pt-24 md:mb-32 xl:px-0">{children}</div>
    </Context.Provider>
  )
}

HomeSeasonInfo.Title = function Title() {
  return (
    <h2 className="text-text-strong mb-8 text-2xl font-bold md:text-4xl">
      시즌별 건축가 티어
    </h2>
  )
}

HomeSeasonInfo.Navigator = function Navigator() {
  const { seasons, currentSeason, changeSeason } = useHomeSeasonInfoContext()

  return (
    <div className="w-full overflow-x-scroll pb-4 md:w-auto md:overflow-auto md:pb-0">
      <div className="flex gap-4 md:flex-wrap md:gap-6">
        {seasons
          .sort((a, b) => b - a)
          .map((season) => (
            <Button
              onClick={() => changeSeason(season)}
              key={season}
              className={cn(
                'border-border-default min-w-max border-2 text-sm md:w-auto md:px-5 md:text-lg',
                currentSeason === season && 'bg-text-default text-fill-default',
              )}
            >
              {`시즌 ${season}`}
            </Button>
          ))}
      </div>
    </div>
  )
}

HomeSeasonInfo.ContentWrapper = function Content({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="mt-8 flex flex-col gap-6 md:gap-8">{children}</div>
}

HomeSeasonInfo.DateInfo = function DateInfo() {
  const { currentPlacementTest, nextPlecementTest } = useHomeSeasonInfoContext()

  if (!currentPlacementTest) return

  return (
    <div className="flex h-[40px] items-center gap-2">
      <p className="text-text-subtle text-md md:text-lg">
        {`${formatDateToKorean(currentPlacementTest.contentInfo.date)} ~
        ${nextPlecementTest ? formatDateToKorean(nextPlecementTest.contentInfo.date) : ''}`}
      </p>
      {nextPlecementTest && (
        <span className="text-md md:text-lg">
          (
          {getDaysBetween(
            currentPlacementTest.contentInfo.date,
            nextPlecementTest.contentInfo.date,
          )}
          일)
        </span>
      )}
    </div>
  )
}

HomeSeasonInfo.TierList = function TierList() {
  const { currentSeason, architectsWithTier } = useHomeSeasonInfoContext()
  const TIER_ORDER = ['눕', '계륵', '프로', '국밥', '해커']

  return (
    <div
      key={currentSeason}
      className="grid grid-cols-3 gap-y-12 md:flex md:flex-wrap md:gap-16"
    >
      {groupArchitectTierBySeason(
        architectsWithTier.flatMap((architect) => architect.tier),
        currentSeason,
      )
        .sort(
          (a, b) => TIER_ORDER.indexOf(b.group) - TIER_ORDER.indexOf(a.group),
        )
        .map((item) => (
          <div
            key={item.group}
            className={cn(item.group === '국밥' && 'col-span-2')}
          >
            <div className="mb-4 flex items-center gap-2">
              <p className="text-xl font-medium">{item.group}</p>
              <p className="bg-fill-default rounded-md px-2 py-1.5 text-sm md:text-base">
                {item.tiers.reduce(
                  (sum, tierObj) => sum + Object.values(tierObj)[0],
                  0,
                )}
                명
              </p>
            </div>
            <div className="md:border-border-default flex flex-col gap-4 rounded-xl md:gap-6 md:border-2 md:p-4 md:pr-5">
              {item.tiers.map((tierObj, index) => {
                const [tierName, count] = Object.entries(tierObj)[0]
                return (
                  <div
                    key={index}
                    className="relative flex items-center gap-2 md:flex-col"
                  >
                    <div className="group relative hidden h-full duration-300 md:block">
                      <TierBox tier={tierName as AllTier} />
                      <div className="bg-fill-default animate-fadeIn text-text-subtle absolute z-10 hidden w-max max-w-[300px] rounded-md px-4 py-3 group-hover:block">
                        {DESCRIPTION[tierName as AllTier]}
                      </div>
                    </div>
                    <span
                      className={cn(
                        'text-text-default bg-fill-default border-border-default flex flex-wrap rounded-sm border-2 px-1.5 py-1 text-sm md:absolute md:-right-4 md:items-center md:justify-center md:rounded-full',
                        getTierTextColor(tierName as AllTier),
                      )}
                    >
                      <span className="block md:hidden">{`${tierName}: `}</span>
                      {count}명
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
    </div>
  )
}

export default HomeSeasonInfo
