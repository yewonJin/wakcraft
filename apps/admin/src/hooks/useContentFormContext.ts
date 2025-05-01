import { createContext, use } from 'react'
import {
  GridEventNoobProHacker,
  LineEventNoobProHacker,
  NoobProHacker,
  PlacementTest,
} from '@repo/types'

import { useContentForm } from './useContentForm'

export const useContentFormContext = () => {
  const context = use(LineContentFormContext) || use(GridContentFormContext)

  if (!context) {
    throw new Error('ContentFormContext')
  }
  return context
}

export type TLineContentFormContext =
  | (ReturnType<
      typeof useContentForm<NoobProHacker | LineEventNoobProHacker>
    > & {
      isEditMode: boolean
      action: (payload: NoobProHacker | LineEventNoobProHacker) => Promise<void>
    })
  | null

export const LineContentFormContext =
  createContext<TLineContentFormContext>(null)

export const useLineContentFormContext = () => {
  const context = use(LineContentFormContext)
  if (!context) {
    throw new Error('LineContentFormContext')
  }
  return context
}

type TGridContentFormContext =
  | (ReturnType<
      typeof useContentForm<GridEventNoobProHacker | PlacementTest>
    > & {
      isEditMode: boolean
      action: (payload: GridEventNoobProHacker | PlacementTest) => Promise<void>
    })
  | null

export const GridContentFormContext =
  createContext<TGridContentFormContext>(null)

export const useGridContentFormContext = () => {
  const context = use(GridContentFormContext)
  if (!context) {
    throw new Error('GridContentFormContext')
  }
  return context
}
