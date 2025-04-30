import { createContext, use } from 'react'

import { Props } from './ArchitectDetail'
import { useArchitectView } from './ArchitectDetail.hooks'

type ArchitectDetailContext =
  | (ReturnType<typeof useArchitectView> & Props)
  | null

export const Context = createContext<ArchitectDetailContext>(null)

export const useArchitectDetailContext = () => {
  const context = use(Context)
  if (!context) {
    throw new Error('ArchitectDetailContext.Provider is missing')
  }
  return context
}
