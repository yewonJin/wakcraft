'use client'

import { ErrorBoundary } from 'react-error-boundary'

import ErrorFallback from '../ErrorFallback'
import { HomeSeasonInfoProvider } from './HomeSeasonInfo.Provider'
import { HomeSeasonInfoView } from './HomeSeasonInfo.View'

export default function HomeSeasonInfo() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <HomeSeasonInfoProvider>
        <HomeSeasonInfoView />
      </HomeSeasonInfoProvider>
    </ErrorBoundary>
  )
}
