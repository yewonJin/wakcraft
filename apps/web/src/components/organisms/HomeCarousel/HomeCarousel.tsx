'use client'

import { HomeCarouselView } from './HomeCarousel.View'
import { HomeCarouselProvider } from './HomeCarousel.Provider'

export default function HomeCarousel() {
  return (
    <HomeCarouselProvider>
      <HomeCarouselView />
    </HomeCarouselProvider>
  )
}
