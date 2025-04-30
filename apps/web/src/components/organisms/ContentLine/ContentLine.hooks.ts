import { useState, TouchEvent, useEffect, useRef } from 'react'
import {
  PopulatedNoobProHacker,
  PopulatedLineEventNoobProHacker,
} from '@/types/content'

export const useContentLine = (
  content: PopulatedNoobProHacker | PopulatedLineEventNoobProHacker,
) => {
  const [page, setPage] = useState<number[]>(
    new Array(content.workInfo.length).fill(0),
  )

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

export const useSlider = (length: number) => {
  const [boxWidth, setBoxWidth] = useState(0)

  // offset을 위한 터치가 시작된 절대적인 위치
  const [startPageX, setStartPageX] = useState(0)
  // scrollX를 고려한 터치가 시작된 위치
  const [curPageX, setCurPageX] = useState(0)
  const [scrollX, setScrollX] = useState(0)

  const [isOnScroll, setIsOnScroll] = useState(false)
  const [isLongPressScroll, setIsLongPressScroll] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const onResize = () => {
      if (!ref.current) return

      setBoxWidth(ref.current.clientWidth)
    }

    onResize()

    window.addEventListener('resize', onResize)
  }, [])

  const initLongScrollTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = null
  }

  const startLongScrollTimer = () => {
    timerRef.current = setTimeout(() => {
      setIsLongPressScroll(true)
    }, 500)
  }

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const pageX = Math.floor(e.changedTouches[0].pageX)

    setStartPageX(pageX)
    setCurPageX(pageX - scrollX)

    setIsOnScroll(true)
    startLongScrollTimer()
  }

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const pageX = Math.floor(e.changedTouches[0].pageX)

    if (isDisallowedSlide(pageX)) return

    setScrollX(pageX - curPageX)
  }

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    setIsOnScroll(false)
    initLongScrollTimer()

    // 오랫동안 눌렀을 때는 절반 이상 넘어가야 페이지 전환
    if (isLongPressScroll) {
      setScrollX(
        -boxWidth * (Math.ceil((scrollX - boxWidth / 2) / -boxWidth) - 1),
      )
      setIsLongPressScroll(false)
      return
    }

    // 짧게 눌렀을 때는 조금만 움직여도 페이지 전환
    const pageX = Math.floor(e.changedTouches[0].pageX)
    const offset = pageX - startPageX

    if (offset === 0) return

    if (offset < -10) {
      if (Math.ceil(scrollX / -boxWidth) >= length) return
      setScrollX(-boxWidth * Math.ceil(scrollX / -boxWidth))
    }

    if (offset > -10) {
      if (Math.ceil(scrollX / -boxWidth) <= 0) return
      setScrollX(-boxWidth * (Math.ceil(scrollX / -boxWidth) - 1))
    }
  }

  const isDisallowedSlide = (curPosX: number) =>
    curPosX - curPageX >= 0 || curPosX - curPageX <= -boxWidth * (length - 1)

  return { scrollX, isOnScroll, ref, onTouchStart, onTouchMove, onTouchEnd }
}
