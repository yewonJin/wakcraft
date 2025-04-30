import { useEffect, useRef, useState } from 'react'

export const useCarousel = (startIndex: number | null, indexLength: number) => {
  const [carouselIndex, setCarouselIndex] = useState(startIndex || 0)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const autoScroll = () => {
    setCarouselIndex((prev) => {
      if (prev === indexLength - 1) {
        return 0
      }
      return prev + 1
    })
  }

  const resetAutoScroll = () => {
    if (window.innerWidth < 800) return
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const startAutoScroll = () => {
    if (window.innerWidth < 800) return
    resetAutoScroll()
    intervalRef.current = setInterval(autoScroll, 4000)
  }

  useEffect(() => {
    startAutoScroll()
    return () => startAutoScroll()
  }, [])

  const onCategoryClick = (index: number) => {
    setCarouselIndex(index)
    resetAutoScroll()
    startAutoScroll()
  }

  return {
    carouselIndex,
    resetAutoScroll,
    startAutoScroll,
    onCategoryClick,
  }
}
