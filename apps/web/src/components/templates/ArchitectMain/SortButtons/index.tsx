import { LucideArrowDown } from 'lucide-react'
import { cn } from '@repo/utils'

import { Button } from '@/components/atoms'

import { SortBy } from '@/hooks'

type Props = {
  input: string
  sortKey: SortBy
  isDescending: boolean
  onSortClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function ArchitectMainSortButtons({
  input,
  sortKey,
  isDescending,
  onSortClick,
}: Props) {
  const SORT_KEYS = {
    tier: '티어',
    participation: '참여 횟수',
    win: '우승 횟수',
    hackerWin: '해커 우승',
    proWin: '프로 우승',
  } as const

  return (
    <div className="flex flex-wrap gap-2 text-sm md:flex-nowrap md:gap-4 md:text-base">
      {Object.entries(SORT_KEYS).map(([key, label]) => (
        <Button
          key={key}
          onClick={onSortClick}
          data-value={key}
          className={cn(
            'flex items-center gap-1',
            sortKey === key && 'bg-red-900/80 text-white',
            input !== '' &&
              'pointer-events-none opacity-20 hover:cursor-not-allowed',
          )}
        >
          <span>{label}</span>
          <LucideArrowDown
            className={cn(
              'mt-[1px] duration-100',
              sortKey === key && !isDescending && 'rotate-180',
            )}
            width={18}
            height={18}
          />
        </Button>
      ))}
    </div>
  )
}
