import { useState } from 'react'

import { Architect, Tier } from '@repo/types'
import { TIER } from '@repo/constants'
import { fuzzyMatcher, generateMatchingIndex } from '@repo/utils'
import { ArchitectWithMatchingIndices } from '@/types/architect'
import { useQueryString } from '@/hooks'

export type SortBy = 'tier' | 'participation' | 'win' | 'hackerWin' | 'proWin'

export const useArchitectMain = () => {
  const [sortKey, setSortKey] = useState<SortBy>('tier')
  const [isDescending, setIsDescending] = useState(true)
  const {
    queryString: selectedTier,
    setQueryString,
    resetQueryString,
  } = useQueryString<Tier>('tier')

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

    if (value === selectedTier) {
      return resetQueryString()
    }

    setQueryString(value)
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
    return selectedTier === null || architect.curTier === selectedTier
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

export const useSearchArchitect = () => {
  const [input, setInput] = useState('')
  const inputLower = input.toLowerCase()
  const matcher = fuzzyMatcher(inputLower)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const addMatchingIndicesToArchitect = (
    acc: ArchitectWithMatchingIndices[],
    architect: Omit<Architect, 'portfolio'>,
  ) => {
    const wakzooResult = matcher.exec(architect.wakzooId.toLowerCase())
    const minecraftIdResult = matcher.exec(architect.minecraftId.toLowerCase())

    if (!wakzooResult && !minecraftIdResult) return acc

    acc.push({
      ...architect,
      minecraftIdMatchingIndex: minecraftIdResult
        ? generateMatchingIndex(architect.minecraftId, input)
        : null,
      wakzooIdMatchingIndex: wakzooResult
        ? generateMatchingIndex(architect.wakzooId, input)
        : null,
    })
    return acc
  }

  const compareMatchingIndex = (
    a: ArchitectWithMatchingIndices,
    b: ArchitectWithMatchingIndices,
  ) => {
    if (a.wakzooIdMatchingIndex !== null && b.wakzooIdMatchingIndex !== null) {
      return (
        parseInt(a.wakzooIdMatchingIndex.join('')) -
        parseInt(b.wakzooIdMatchingIndex.join(''))
      )
    }

    if (
      a.minecraftIdMatchingIndex !== null &&
      b.minecraftIdMatchingIndex !== null
    ) {
      return (
        parseInt(a.minecraftIdMatchingIndex.join('')) -
        parseInt(b.minecraftIdMatchingIndex.join(''))
      )
    }

    return 1
  }

  return {
    input,
    handleInputChange,
    compareMatchingIndex,
    addMatchingIndicesToArchitect,
  }
}
