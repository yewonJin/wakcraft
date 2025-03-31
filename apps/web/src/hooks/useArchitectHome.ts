import { useState } from 'react'
import { Architect, Tier } from '@repo/types'
import { TIER } from '@repo/constants'

export type SortBy = 'tier' | 'participation' | 'win' | 'hackerWin' | 'proWin'
export type SelectedTier = '전부' | Tier

export const useArchitectHome = () => {
  const [sortKey, setSortKey] = useState<SortBy>('tier')
  const [isDescending, setIsDescending] = useState(true)
  const [selectedTier, setSelectedTier] = useState<SelectedTier>('전부')

  const handleSortClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.dataset['value'] as SortBy

    if (sortKey === value) {
      setIsDescending((prev) => !prev)
      return
    }

    setSortKey(value)
    setIsDescending(true)
  }

  const handleTierClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.dataset['value'] as Tier

    setSelectedTier((prev) => (prev === value ? '전부' : value))
  }

  const compareArchitects = (
    a: Omit<Architect, 'portfolio'>,
    b: Omit<Architect, 'portfolio'>,
  ) => {
    if (sortKey === 'tier') {
      if (a.curTier === b.curTier) {
        return a.minecraftId.localeCompare(b.minecraftId)
      }

      return isDescending
        ? TIER.indexOf(a.curTier) - TIER.indexOf(b.curTier)
        : TIER.indexOf(b.curTier) - TIER.indexOf(a.curTier)
    }

    if (a.statistics[sortKey] === b.statistics[sortKey]) {
      return a.minecraftId.localeCompare(b.minecraftId)
    }

    return isDescending
      ? b.statistics[sortKey] - a.statistics[sortKey]
      : a.statistics[sortKey] - b.statistics[sortKey]
  }

  const filterArchitectsByTier = (architect: Omit<Architect, 'portfolio'>) => {
    return selectedTier === '전부' || architect.curTier === selectedTier
  }

  return {
    sortKey,
    isDescending,
    selectedTier,
    handleSortClick,
    handleTierClick,
    compareArchitects,
    filterArchitectsByTier,
  }
}
