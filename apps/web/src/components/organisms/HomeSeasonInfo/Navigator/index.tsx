import { cn } from '@repo/utils'

import { Button } from '@/components/atoms'

type Props = {
  seasons: number[]
  currentSeason: number
  onSeasonChange: (season: number) => void
}

export function HomeSeasonInfoNavigator({
  seasons,
  currentSeason,
  onSeasonChange,
}: Props) {
  return (
    <div className="w-full overflow-x-scroll pb-4 md:w-auto md:overflow-auto md:pb-0">
      <div className="flex gap-4 md:flex-wrap md:gap-6">
        {seasons
          .sort((a, b) => b - a)
          .map((season) => (
            <Button
              onClick={() => onSeasonChange(season)}
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
