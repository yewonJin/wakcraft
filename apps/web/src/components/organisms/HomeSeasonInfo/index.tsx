'use client'

import { useState } from 'react'
import { AllTier, Architect, PlacementTest } from '@repo/types'
import { cn } from '@repo/utils'
import { DESCRIPTION } from '@repo/constants'

import TierBox from '@/components/atoms/TierBox'
import { groupArchitectTierBySeason } from '@/services/content'
import { getTierTextColor } from '@/libs/architect'
import { formatDateToKorean, getDaysBetween } from '@/utils/date'

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
    <div className="mb-32 pt-24">
      <h2 className="text-text-strong mb-8 text-4xl font-bold">
        시즌 별 건축가 티어
      </h2>
      <div className="flex gap-6">
        {placementTestsWithoutWorkInfo
          .map((x) => x.contentInfo.episode)
          .sort((a, b) => b - a)
          .map((season) => (
            <button
              onClick={() => changeCurrentSeason(season)}
              key={season}
              className={cn(
                'bg-fill-default border-border-default rounded-md border-2 px-5 py-2 text-lg hover:cursor-pointer',
                currentSeason === season && 'bg-text-default text-fill-default',
              )}
            >
              {`시즌 ${season}`}
            </button>
          ))}
      </div>
      {currentPlacementTest && (
        <div className="mt-8 flex flex-col gap-8">
          <div className="flex h-[40px] items-center gap-2">
            <p className="text-text-subtle text-lg">
              {`${formatDateToKorean(currentPlacementTest.contentInfo.date)} ~
            ${
              nextPlecementTest
                ? formatDateToKorean(nextPlecementTest.contentInfo.date)
                : ''
            }`}
            </p>
            {nextPlecementTest && (
              <span className="text-lg">
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
            className="flex flex-wrap gap-16"
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
                <div key={item.group} className="">
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
                  <div className="border-border-default flex flex-col gap-6 rounded-xl border-2 p-4 pr-5">
                    {item.tiers.map((tierObj, index) => {
                      const [tierName, count] = Object.entries(tierObj)[0]
                      return (
                        <div
                          key={index}
                          className="relative flex flex-col items-center gap-2"
                        >
                          <div className="group relative h-full duration-300">
                            <TierBox tier={tierName as AllTier} />
                            <div className="bg-fill-default animate-fadeIn text-text-subtle absolute z-10 hidden w-max max-w-[300px] rounded-md px-4 py-3 group-hover:block">
                              {DESCRIPTION[tierName as AllTier]}
                            </div>
                          </div>
                          <span
                            className={cn(
                              'text-text-default bg-fill-default border-border-default absolute -right-4 flex items-center justify-center rounded-full border-2 px-2 py-1 text-sm',
                              getTierTextColor(tierName as AllTier),
                            )}
                          >
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
