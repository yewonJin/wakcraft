'use client'

import { ErrorBoundary } from 'react-error-boundary'

import { ErrorFallback } from '@/components/organisms'
import { ArchitectDetailView } from './ArchitectDetail.View'
import { ArchitectDetailProvider } from './ArchitectDetail.Provider'

import { Architect } from '@repo/types'

export type Props = {
  architect: Architect
  defaultView: 'single' | 'grid'
}

export default function ArchitectDetail({ architect, defaultView }: Props) {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ArchitectDetailProvider architect={architect} defaultView={defaultView}>
        <ArchitectDetailView />
      </ArchitectDetailProvider>
    </ErrorBoundary>
  )
}
