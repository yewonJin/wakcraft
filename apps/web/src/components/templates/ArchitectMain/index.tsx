'use client'

import Link from 'next/link'
import { LucideArrowDown, Search } from 'lucide-react'
import { TIER } from '@repo/constants'
import { Architect, Tier } from '@repo/types'
import { cn } from '@repo/utils'

import Button from '@/components/atoms/Button'
import ArchitectProfile from '@/components/molecules/ArchitectProfile'
import ArchitectStatistics from '@/components/molecules/ArchitectStatistics'

import { SortBy, useArchitectMain } from '@/hooks/useArchitectMain'
import {
  ArchitectWithMatchingIndices,
  useSearchArchitect,
} from '@/hooks/useSearchArchitect'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { getTierBackgroundColor } from '@/services/architect'

type Props = {
  architects: Omit<Architect, 'portfolio'>[]
}

export default function ArchitectMain({ architects }: Props) {
  const {
    sortKey,
    isDescending,
    selectedTier,
    handleSortClick,
    handleTierClick,
    compareArchitects,
    filterArchitectsByTier,
  } = useArchitectMain()
  const {
    input,
    handleInputChange,
    compareMatchingIndex,
    addMatchingIndicesToArchitect,
  } = useSearchArchitect()

  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 md:pt-12 xl:px-0">
      <h1 className="mb-4 text-3xl font-semibold">건축가</h1>
      <h2 className="text-text-subtler mb-6">
        마인크래프트 건축가들의 포트폴리오를 볼 수 있다.
      </h2>
      <div className="mb-4 flex flex-col-reverse justify-between gap-4 lg:flex-row">
        <div className="relative flex items-center">
          <input
            className="border-border-default h-[40px] w-full rounded-md border-2 pl-3 outline-none lg:w-auto"
            placeholder="검색하세요..."
            value={input}
            onChange={handleInputChange}
          ></input>
          <Search width={20} height={20} className="absolute right-3" />
        </div>
        <SortKey
          input={input}
          sortKey={sortKey}
          isDescending={isDescending}
          handleSortClick={handleSortClick}
        />
      </div>
      <FilterTier
        selectedTier={selectedTier}
        handleTierClick={handleTierClick}
      />
      <div className="flex flex-col gap-4">
        {architects
          .reduce(addMatchingIndicesToArchitect, [])
          .filter(filterArchitectsByTier)
          .sort(compareMatchingIndex)
          .sort(input === '' ? compareArchitects : () => 1)
          .map((architect, index) => (
            <ArchitectItem
              key={architect.minecraftId}
              architect={architect}
              order={index}
            />
          ))}
      </div>
    </div>
  )
}

type SortKeyProps = {
  input: string
  sortKey: SortBy
  isDescending: boolean
  handleSortClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function SortKey({
  input,
  sortKey,
  isDescending,
  handleSortClick,
}: SortKeyProps) {
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
          onClick={handleSortClick}
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

type FilterTierProps = {
  selectedTier: Tier | null
  handleTierClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function FilterTier({ selectedTier, handleTierClick }: FilterTierProps) {
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
            onClick={handleTierClick}
          >
            {tier}
          </Button>
        ))}
      </div>
    </div>
  )
}

type ArchitectItemProps = {
  architect: ArchitectWithMatchingIndices
  order: number
}

function ArchitectItem({ architect, order }: ArchitectItemProps) {
  const { observerRef, isIntersecting } =
    useIntersectionObserver<HTMLAnchorElement>(order < 10 ? true : false)

  return (
    <Link
      key={architect.wakzooId}
      href={`/architect/${architect.wakzooId.replaceAll(' ', '-')}`}
      ref={observerRef}
    >
      {isIntersecting ? (
        <div className="bg-fill-default hover:bg-fill-subtle flex flex-col justify-center gap-2 rounded-md p-4">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-0 md:pr-8">
            <ArchitectProfile
              curTier={architect.curTier}
              minecraftId={architect.minecraftId}
              wakzooId={architect.wakzooId}
              wakzooIdMatchingIndex={architect.wakzooIdMatchingIndex}
              minecraftIdMatchingIndex={architect.minecraftIdMatchingIndex}
            />
            <ArchitectStatistics statistics={architect.statistics} />
          </div>
        </div>
      ) : (
        <div className="bg-fill-default h-[127px] rounded-md"></div>
      )}
    </Link>
  )
}

//
