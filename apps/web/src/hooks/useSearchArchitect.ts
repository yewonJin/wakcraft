import { useState } from 'react'
import { Architect } from '@repo/types'

import { fuzzyMatcher, generateMatchingIndex } from '@/utils/search'

export type ArchitectWithMatchingIndices = Omit<Architect, 'portfolio'> & {
  minecraftIdMatchingIndex: number[] | null
  wakzooIdMatchingIndex: number[] | null
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
