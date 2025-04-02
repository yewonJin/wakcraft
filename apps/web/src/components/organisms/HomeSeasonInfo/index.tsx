'use client'

import { useState } from 'react'
import { AllTier, Architect, PlacementTest } from '@repo/types'
import { cn } from '@repo/utils'
import { DESCRIPTION } from '@repo/constants'

import TierBox from '@/components/atoms/TierBox'
import { groupArchitectTierBySeason } from '@/services/content'
import { formatDateToKorean, getDaysBetween } from '@/utils/date'
import { getTierTextColor } from '@/services/architect'

type Props = {
  placementTestsWithoutWorkInfo: Omit<PlacementTest, 'workInfo'>[]
  architectsWithTier: Pick<Architect, '_id' | 'wakzooId' | 'tier'>[]
}

export default function HomeSeasonInfo({
  placementTestsWithoutWorkInfo,
  architectsWithTier,
}: Props) {
  const TIER_ORDER = ['눕', '계륵', '프로', '국밥', '해커']

  const [currentSeason, setCurrentSeason] = useState(
    Math.max(
      ...placementTestsWithoutWorkInfo.map((item) => item.contentInfo.episode),
    ),
  )

  const changeCurrentSeason = (index: number) => {
    setCurrentSeason(index)
  }

  const currentPlacementTest = placementTestsWithoutWorkInfo.find(
    (x) => x.contentInfo.episode === currentSeason,
  )

  const nextPlecementTest = placementTestsWithoutWorkInfo.find(
    (x) => x.contentInfo.episode === currentSeason + 1,
  )

  return (
    <div className="mb-12 px-4 pt-24 md:mb-32 xl:px-0">
      <h2 className="text-text-strong mb-8 text-2xl font-bold md:text-4xl">
        시즌별 건축가 티어
      </h2>
      <div className="w-full overflow-x-scroll pb-4 md:w-auto md:overflow-auto md:pb-0">
        <div className="flex gap-4 md:flex-wrap md:gap-6">
          {placementTestsWithoutWorkInfo
            .map((x) => x.contentInfo.episode)
            .sort((a, b) => b - a)
            .map((season) => (
              <button
                onClick={() => changeCurrentSeason(season)}
                key={season}
                className={cn(
                  'bg-fill-default border-border-default min-w-max rounded-md border-2 px-5 py-2 text-sm hover:cursor-pointer md:w-auto md:text-lg',
                  currentSeason === season &&
                    'bg-text-default text-fill-default',
                )}
              >
                {`시즌 ${season}`}
              </button>
            ))}
        </div>
      </div>
      {currentPlacementTest && (
        <div className="mt-8 flex flex-col gap-6 md:gap-8">
          <div className="flex h-[40px] items-center gap-2">
            <p className="text-text-subtle text-md md:text-lg">
              {`${formatDateToKorean(currentPlacementTest.contentInfo.date)} ~
            ${
              nextPlecementTest
                ? formatDateToKorean(nextPlecementTest.contentInfo.date)
                : ''
            }`}
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
          <div
            key={currentPlacementTest.contentInfo.episode}
            className="grid grid-cols-3 gap-y-12 md:flex md:flex-wrap md:gap-16"
          >
            {groupArchitectTierBySeason(
              architectsWithTier.flatMap((architect) => architect.tier),
              currentSeason,
            )
              .sort(
                (a, b) =>
                  TIER_ORDER.indexOf(b.group) - TIER_ORDER.indexOf(a.group),
              )
              .map((item) => (
                <div
                  key={item.group}
                  className={cn(item.group === '국밥' && 'col-span-2')}
                >
                  <div className="mb-4 flex items-center gap-2">
                    <p className="text-xl font-medium">{item.group}</p>
                    <p className="bg-fill-default rounded-md px-2 py-1.5">
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
                            <span className="block md:hidden">
                              {`${tierName}: `}
                            </span>
                            {count}명
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
