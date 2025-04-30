'use client'

import { ErrorBoundary } from 'react-error-boundary'
import { Architect } from '@repo/types'

import { ErrorFallback } from '@/components/organisms'
import { ArchitectMainProvider } from './ArchitectMain.Provider'
import { ArchitectMainView } from './ArchitectMain.View'

type Props = {
  architects: Omit<Architect, 'portfolio'>[]
}

export default function ArchitectMain({ architects }: Props) {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ArchitectMainProvider>
        <ArchitectMainView architects={architects} />
      </ArchitectMainProvider>
    </ErrorBoundary>
  )
}
