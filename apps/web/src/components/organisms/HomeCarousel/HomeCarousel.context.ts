import { createContext, use } from 'react'

import { PopulatedNoobProHacker } from '@/types/content'

type HomeCarouselContext = {
  noobprohacker: PopulatedNoobProHacker
  carouselIndex: number
  resetAutoScroll: () => void
  startAutoScroll: () => void
  onCategoryClick: (index: number) => void
} | null

export const Context = createContext<HomeCarouselContext>(null)

export const useHomeCarouselContext = () => {
  const context = use(Context)
  if (!context) {
    throw new Error('HomeCarouselContext.Provider is missing')
  }
  return context
}
