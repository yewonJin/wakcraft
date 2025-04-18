'use client'

import { createContext, useContext } from 'react'
import Link from 'next/link'
import { LucideArrowDown, Search } from 'lucide-react'
import { TIER } from '@repo/constants'
import { Architect } from '@repo/types'
import { cn } from '@repo/utils'

import {
  ArchitectProfile,
  ArchitectStatistics,
  MainPageTitle,
} from '@/components/molecules'
import { Button } from '@/components/atoms'

import {
  useArchitectMain,
  useIntersectionObserver,
  useSearchArchitect,
} from '@/hooks'
import { getTierBackgroundColor } from '@/services/architect'
import { ArchitectWithMatchingIndices } from '@/types/architect'

type Props = {
  architects: Omit<Architect, 'portfolio'>[]
}

type ArchitectMainContext = ReturnType<typeof useArchitectMain> &
  ReturnType<typeof useSearchArchitect>

const Context = createContext<ArchitectMainContext | null>(null)
const { Provider: ContextProvider } = Context

function ArchitectMain({ architects }: Props) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 md:pt-12 xl:px-0">
      <MainPageTitle
        title="건축가"
        description="마인크래프트 건축가들의 포트폴리오를 볼 수 있다."
      />
      <ArchitectMain.Provider>
        <div className="mb-4 flex flex-col-reverse justify-between gap-4 lg:flex-row">
          <ArchitectMain.SearchBar />
          <ArchitectMain.SortButtons />
        </div>
        <ArchitectMain.TierButtons />
        <ArchitectMain.ArchitectList architects={architects} />
      </ArchitectMain.Provider>
    </div>
  )
}

ArchitectMain.Provider = function Provider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ContextProvider value={{ ...useArchitectMain(), ...useSearchArchitect() }}>
      {children}
    </ContextProvider>
  )
}

ArchitectMain.SearchBar = function SearchBar() {
  const context = useContext(Context)
  if (!context) return

  const { input, handleInputChange } = context

  return (
    <div className="relative flex items-center">
      <input
        className="border-border-default h-[40px] w-full rounded-md border-2 pl-3 outline-none lg:w-auto"
        placeholder="검색하세요..."
        value={input}
        onChange={handleInputChange}
      />
      <Search width={20} height={20} className="absolute right-3" />
    </div>
  )
}

ArchitectMain.SortButtons = function SortButtons() {
  const context = useContext(Context)
  if (!context) return context

  const { input, isDescending, sortKey, handleSortClick } = context

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

ArchitectMain.TierButtons = function TierButtons() {
  const context = useContext(Context)
  if (!context) return

  const { selectedTier, handleTierClick } = context

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

ArchitectMain.ArchitectList = function ArchitectList({
  architects,
}: {
  architects: Omit<Architect, 'portfolio'>[]
}) {
  const context = useContext(Context)
  if (!context) return

  const {
    input,
    compareArchitects,
    addMatchingIndicesToArchitect,
    filterArchitectsByTier,
    compareMatchingIndex,
  } = context

  return (
    <div className="flex flex-col gap-4">
      {architects
        .reduce(addMatchingIndicesToArchitect, [])
        .filter(filterArchitectsByTier)
        .sort(compareMatchingIndex)
        .sort(input === '' ? compareArchitects : () => 1)
        .map((architect, index) => (
          <ArchitectMain.ArchitectListItem
            key={architect.minecraftId}
            architect={architect}
            order={index}
          />
        ))}
    </div>
  )
}

ArchitectMain.ArchitectListItem = function ArchitectMainItem({
  architect,
  order,
}: {
  architect: ArchitectWithMatchingIndices
  order: number
}) {
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

export default ArchitectMain
