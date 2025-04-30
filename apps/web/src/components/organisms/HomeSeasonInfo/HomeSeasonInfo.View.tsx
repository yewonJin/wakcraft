import { DESCRIPTION } from '@repo/constants'
import { AllTier } from '@repo/types'
import { cn } from '@repo/utils'

import { Button, TierBox } from '@/components/atoms'

import { groupArchitectTierBySeason } from '@/services/content'
import { getTierTextColor } from '@/services/architect'
import { formatDateToKorean, getDaysBetween } from '@/utils/date'
import { useHomeSeasonInfoContext } from './HomeSeasonInfo.context'

export function HomeSeasonInfoView() {
  return (
    <HomeSeasonInfoView.Container>
      <HomeSeasonInfoView.Title />
      <HomeSeasonInfoView.Navigator />
      <HomeSeasonInfoView.ContentWrapper>
        <HomeSeasonInfoView.DateInfo />
        <HomeSeasonInfoView.TierList />
      </HomeSeasonInfoView.ContentWrapper>
    </HomeSeasonInfoView.Container>
  )
}

HomeSeasonInfoView.Container = function Container({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="mb-12 px-4 pt-24 md:mb-32 xl:px-0">{children}</div>
}

HomeSeasonInfoView.Title = function Title() {
  return (
    <h2 className="text-text-strong mb-8 text-2xl font-bold md:text-4xl">
      시즌별 건축가 티어
    </h2>
  )
}

HomeSeasonInfoView.Navigator = function Navigator() {
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

HomeSeasonInfoView.ContentWrapper = function Content({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="mt-8 flex flex-col gap-6 md:gap-8">{children}</div>
}

HomeSeasonInfoView.DateInfo = function DateInfo() {
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

HomeSeasonInfoView.TierList = function TierList() {
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
