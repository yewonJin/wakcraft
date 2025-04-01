import { getTierTextColor } from '@/services/architect'
import { PlacementTestTierInfo } from '@repo/types'
import { cn } from '@repo/utils'

type Props = {
  tier: PlacementTestTierInfo[]
}

export default function ArchitectAllTier({ tier }: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-2 px-4 xl:px-0">
      {tier.map((item) => {
        if (item.result === '언랭') return null

        return (
          <div
            key={item.season}
            className={cn(
              'bg-fill-default flex items-center gap-1 rounded-sm px-2 py-1 text-sm',
              !item.isPortfolioPlacementTest &&
                'border-border-default border-2',
            )}
          >
            <span className="text-text-subtle">{`S${item.season}`}</span>
            <span
              className={cn('font-medium', getTierTextColor(item.result))}
            >{`${item.result}`}</span>
          </div>
        )
      })}
    </div>
  )
}
