'use client'

import { ErrorBoundary } from 'react-error-boundary'

import ErrorFallback from '../ErrorFallback'
import { ContentLineProvider } from './ContentLine.Provider'
import { ContentLineView } from './ContentLine.View'

import {
  PopulatedLineEventNoobProHacker,
  PopulatedNoobProHacker,
} from '@/types/content'

export type Props = {
  isMobile: boolean
  content: PopulatedNoobProHacker | PopulatedLineEventNoobProHacker
}

export default function ContentLine({ isMobile, content }: Props) {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ContentLineProvider isMobile={isMobile} content={content}>
        <ContentLineView />
      </ContentLineProvider>
    </ErrorBoundary>
  )
}
