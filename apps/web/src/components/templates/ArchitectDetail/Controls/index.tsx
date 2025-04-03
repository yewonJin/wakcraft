import { Category } from '@repo/types'
import { cn } from '@repo/utils'

import { Button, Switch } from '@/components/atoms'

type Props = {
  category: '전체보기' | Category
  currentView: 'single' | 'grid'
  onCategoryClick: (category: '전체보기' | Category) => void
  onViewToggle: () => void
}

export function ArchitectDetailControls({
  category,
  currentView,
  onCategoryClick,
  onViewToggle,
}: Props) {
  return (
    <div className="mb-6 flex justify-between overflow-x-scroll px-4 pb-4 sm:overflow-x-hidden md:pb-0 xl:px-0">
      <div className="flex gap-4">
        {['전체보기', '눕프로해커', '예능 눕프핵', '배치고사'].map((item) => (
          <Button
            className={cn(
              'duration-300',
              category === item
                ? 'bg-text-subtle text-fill-default'
                : 'hover:bg-fill-subtle',
            )}
            key={item}
            onClick={() => onCategoryClick(item as '전체보기' | Category)}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="hidden items-center md:flex">
        <Switch
          isOn={currentView === 'single'}
          label="하나씩 보기"
          onClick={onViewToggle}
        />
      </div>
    </div>
  )
}
