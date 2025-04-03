import { Tier } from '@repo/types'
import { cn } from '@repo/utils'
import { TIER } from '@repo/constants'

import { Button } from '@/components/atoms'

import { getTierBackgroundColor } from '@/services/architect'

type Props = {
  selectedTier: Tier | null
  onTierClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function ArchitectMainTierButtons({ selectedTier, onTierClick }: Props) {
  return (
    <div className="bg-fill-default mb-4 overflow-x-scroll rounded-md pb-1.5 md:overflow-x-auto xl:pb-0">
      <div className="flex w-full gap-2 p-2 md:flex-wrap md:gap-3 xl:gap-4">
        {TIER.map((tier) => (
          <Button
            data-value={tier}
            key={tier}
            className={cn(
              'bg-fill-strong relative min-w-max text-sm md:text-base',
              selectedTier === tier
                ? `${getTierBackgroundColor(tier)} text-white`
                : 'hover:bg-fill-subtle',
            )}
            onClick={onTierClick}
          >
            {tier}
          </Button>
        ))}
      </div>
    </div>
  )
}
