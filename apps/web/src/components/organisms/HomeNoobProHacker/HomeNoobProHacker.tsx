'use client'

import { ErrorBoundary } from 'react-error-boundary'

import ErrorFallback from '../ErrorFallback'
import { HomeNoobProHackerProvider } from './HomeNoobProHacker.Provider'
import { HomeNoobProHackerView } from './HomeNoobProHacker.View'

export default function HomeNoobProHacker() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <HomeNoobProHackerProvider>
        <HomeNoobProHackerView />
      </HomeNoobProHackerProvider>
    </ErrorBoundary>
  )
}
