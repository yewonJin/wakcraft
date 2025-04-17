import { cn } from '@repo/utils'

import { Button } from '@/components/atoms'
import { PopulatedNoobProHacker } from '@/types/content'

type Props = {
  latestNoobProHacker: PopulatedNoobProHacker
  carouselIndex: number
  onCategoryClick: (index: number) => void
  onMouseOver: () => void
  onMouseOut: () => void
}

export function HomeCarouselNavigator({
  latestNoobProHacker,
  carouselIndex,
  onCategoryClick,
  onMouseOver,
  onMouseOut,
}: Props) {
  return (
    <div className="w-full overflow-x-scroll px-4 pb-4 md:w-auto md:overflow-auto md:pb-0 xl:px-0">
      <div className="flex w-max gap-3 md:justify-center md:gap-4">
        {latestNoobProHacker.workInfo.map((line, lineIndex) => (
          <Button
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={() => onCategoryClick(lineIndex)}
            key={line.title}
            className={cn(
              'border-border-default border-2 md:border-none md:bg-neutral-900/80 md:text-lg md:text-neutral-200',
              carouselIndex === lineIndex
                ? 'text-text-default md:text-white'
                : 'opacity-50 hover:opacity-80',
            )}
          >
            {line.title}
          </Button>
        ))}
      </div>
    </div>
  )
}
