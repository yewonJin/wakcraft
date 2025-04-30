'use client'

import { ErrorBoundary } from 'react-error-boundary'

import ErrorFallback from '../ErrorFallback'
import { HomeCarouselView } from './HomeCarousel.View'
import { HomeCarouselProvider } from './HomeCarousel.Provider'

export default function HomeCarousel() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <HomeCarouselProvider>
        <HomeCarouselView />
      </HomeCarouselProvider>
    </ErrorBoundary>
  )
}
