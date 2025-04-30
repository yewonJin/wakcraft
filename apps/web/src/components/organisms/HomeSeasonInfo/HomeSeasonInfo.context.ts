import { createContext, use } from 'react'
import { FlattenMaps, Types } from 'mongoose'

import { Architect, PlacementTest } from '@repo/types'

type HomeSeasonContext = {
  seasons: number[]
  currentSeason: number
  currentPlacementTest: Omit<PlacementTest, 'workInfo'> | undefined
  nextPlecementTest: Omit<PlacementTest, 'workInfo'> | undefined
  architectsWithTier: FlattenMaps<
    Architect & {
      _id: Types.ObjectId
    } & {
      __v: number
    }
  >[]
  changeSeason: (season: number) => void
} | null

export const Context = createContext<HomeSeasonContext>(null)

export const useHomeSeasonInfoContext = () => {
  const context = use(Context)
  if (!context) {
    throw new Error('HomeSeasonInfoContext.Provider is missing')
  }
  return context
}
