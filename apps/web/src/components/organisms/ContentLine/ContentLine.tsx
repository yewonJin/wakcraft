'use client'

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
    <ContentLineProvider isMobile={isMobile} content={content}>
      <ContentLineView />
    </ContentLineProvider>
  )
}
