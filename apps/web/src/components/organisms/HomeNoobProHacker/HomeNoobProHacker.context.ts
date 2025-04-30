import { createContext, use } from 'react'

import { PopulatedLineInfo, PopulatedNoobProHacker } from '@/types/content'
import { ContentInfo } from '@repo/types'

type HomeNoobProHackerContext = {
  recentNoobProHackers: PopulatedNoobProHacker[]
  sweepLines: {
    contentInfo: ContentInfo
    workInfo: PopulatedLineInfo
  }[]
} | null

export const Context = createContext<HomeNoobProHackerContext>(null)

export const useHomeNoobProHackerContext = () => {
  const context = use(Context)
  if (!context) {
    throw new Error('HomeNoobProHackerContext.Provider is missing')
  }
  return context
}
