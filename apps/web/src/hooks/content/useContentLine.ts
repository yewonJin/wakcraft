import { useState } from 'react'
import {
  PopulatedNoobProHacker,
  PopulatedLineEventNoobProHacker,
} from '@/types/content'

export const useContentLine = (
  content: PopulatedNoobProHacker | PopulatedLineEventNoobProHacker,
) => {
  const [page, setPage] = useState(new Array(content.workInfo.length).fill(0))

  const handleButtonClick = (lineIndex: number, entryIndex: number) => {
    setPage((prev) => {
      const newPage = [...prev]
      newPage[lineIndex] = entryIndex
      return newPage
    })
  }

  const moveToNextPage = (lineIndex: number, length: number) => {
    setPage((prev) => {
      const newPage = [...prev]

      if (prev[lineIndex] === length - 1) {
        return prev
      }

      newPage[lineIndex]++
      return newPage
    })
  }

  const moveToPrevPage = (lineIndex: number) => {
    setPage((prev) => {
      const newPage = [...prev]

      if (prev[lineIndex] === 0) {
        return prev
      }

      newPage[lineIndex]--
      return newPage
    })
  }

  return {
    page,
    handleButtonClick,
    moveToNextPage,
    moveToPrevPage,
  }
}
