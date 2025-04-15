import { useQuery } from '@tanstack/react-query'
import { AllTier } from '@repo/types'
import { cn } from '@repo/utils'
import { DESCRIPTION } from '@repo/constants'

import { TierBox } from '@/components/atoms'

import { getTierTextColor } from '@/services/architect'
import { groupArchitectTierBySeason } from '@/services/content'
import { getArchitectsWithTier } from '@/libs/actions/architect'

type Props = {
  currentSeason: number
}

export function HomeSeasonInfoTierList({ currentSeason }: Props) {
  const { data: architectsWithTier } = useQuery({
    queryKey: ['architectsWithTier'],
    queryFn: getArchitectsWithTier,
  })

  const TIER_ORDER = ['눕', '계륵', '프로', '국밥', '해커']

  if (!architectsWithTier) return null

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
